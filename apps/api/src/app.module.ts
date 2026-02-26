import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExtModule } from '@concepta/nestjs-typeorm-ext';
import { EventModule } from '@concepta/nestjs-event';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import {
  RocketsAuthModule,
  RocketsJwtAuthProvider,
} from '@bitwild/rockets-auth';
import { RocketsModule } from '@bitwild/rockets';

import { ormSettings } from './config/typeorm.settings';
import { rocketsAuthSettings } from './config/rockets-auth.settings';
import { rocketsSettings } from './config/rockets.settings';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserCreateDto, UserDto, UserUpdateDto } from './modules/user/dto/user.dto';
import { EmailSendOptionsInterface } from '@concepta/nestjs-common';
import {
  UserMetadataCreateDto,
  UserMetadataUpdateDto,
} from './modules/user/dto/user-metadata.dto';
import { RoleTypeOrmCrudAdapter } from './modules/role/adapters/role-typeorm-crud.adapter';
import { RoleCreateDto, RoleDto, RoleUpdateDto } from './modules/role/dto/role.dto';
import { ACService } from './access-control.service';
import { acRules } from './app.acl';
import { RoleEntity } from './modules/role/entities/role.entity';
import { UserRoleEntity } from './modules/role/entities/user-role.entity';
import { UserEntity } from './modules/user/entities/user.entity';
import { UserMetadataEntity } from './modules/user/entities/user-metadata.entity';
import { UserOtpEntity } from './modules/user/entities/user-otp.entity';
import { FederatedEntity } from './modules/user/entities/federated.entity';
import { InvitationEntity } from './modules/invitation/entities/invitation.entity';
import { UserTypeOrmCrudAdapter } from './modules/user/adapters/user-typeorm-crud.adapter';
import { UserMetadataTypeOrmCrudAdapter } from './modules/user/adapters/user-metadata-typeorm-crud.adapter';

@Module({
  imports: [
    // Global configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormSettings, rocketsAuthSettings, rocketsSettings],
    }),

    // Throttler Module - Rate limiting for API endpoints
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60000, // 60 seconds
        limit: 10, // Default limit (can be overridden by @Throttle decorator)
      },
    ]),

    // Event Module - Required for event-driven features
    EventModule.forRoot({}),

    // TypeORM configuration with PostgreSQL
    TypeOrmExtModule.forRootAsync({
      inject: [ormSettings.KEY],
      useFactory: async (config: ConfigType<typeof ormSettings>) => config,
    }),
    // Rockets Auth Module - Complete authentication system
    RocketsAuthModule.forRootAsync({
      imports: [
        ConfigModule,
        TypeOrmModule.forFeature([UserEntity]),
        TypeOrmExtModule.forFeature({
          user: { entity: UserEntity },
          role: { entity: RoleEntity },
          userRole: { entity: UserRoleEntity },
          userOtp: { entity: UserOtpEntity },
          federated: { entity: FederatedEntity },
          invitation: { entity: InvitationEntity },
        }),
      ],
      inject: [rocketsAuthSettings.KEY],
      enableGlobalJWTGuard: false,
      useFactory: (authSettings: ConfigType<typeof rocketsAuthSettings>) => ({
        // Required: Email service (console logger for development)
        services: {
          mailerService: {
            sendMail: (options: EmailSendOptionsInterface) => {
              console.log('Email would be sent:', {
                to: options.to,
                subject: options.subject,
              });
              console.log(options);
              return Promise.resolve();
            },
          },
        },

        // Email and OTP settings loaded from config
        // Type assertion needed because we omit 'type' from otp in our interface
        // but the module requires it, so we add a default value
        settings: {
          ...authSettings,
          otp: {
            ...authSettings.otp,
            // TODO: this is set by default on sdk, if you change nothing will happens
            type: 'uuid', // Default type value
          },
        },
      }),
      userCrud: {
        imports: [TypeOrmModule.forFeature([UserEntity, UserMetadataEntity])],
        model: UserDto,
        adapter: UserTypeOrmCrudAdapter,
        dto: {
          createOne: UserCreateDto,
          updateOne: UserUpdateDto,
        },
        userMetadataConfig: {
          imports: [TypeOrmModule.forFeature([UserMetadataEntity])],
          entity: UserMetadataEntity,
          adapter: UserMetadataTypeOrmCrudAdapter,
          createDto: UserMetadataCreateDto,
          updateDto: UserMetadataUpdateDto,
        },
      },
      // Admin role CRUD functionality
      roleCrud: {
        imports: [TypeOrmModule.forFeature([RoleEntity])],
        adapter: RoleTypeOrmCrudAdapter,
        model: RoleDto,
        dto: {
          createOne: RoleCreateDto,
          updateOne: RoleUpdateDto,
        },
      },
      // Access Control configuration
      accessControl: {
        service: new ACService(),
        settings: {
          rules: acRules,
        },
      },
    }),

    // Rockets Module - User Metadata and other features
    // MUST be imported AFTER RocketsAuthModule
    RocketsModule.forRootAsync({
      imports: [
        ConfigModule,
        TypeOrmExtModule.forFeature({
          user: { entity: UserEntity },
          userMetadata: { entity: UserMetadataEntity },
        }),
      ],
      inject: [RocketsJwtAuthProvider, rocketsSettings.KEY],
      useFactory: (
        authProvider: RocketsJwtAuthProvider,
        rocketSettings: ConfigType<typeof rocketsSettings>,
      ) => ({
        settings: rocketSettings.settings,
        authProvider,
        userMetadata: {
          createDto: UserMetadataCreateDto,
          updateDto: UserMetadataUpdateDto,
        },
        enableGlobalGuard: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Apply ThrottlerGuard globally
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
