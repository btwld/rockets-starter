import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExtModule } from '@concepta/nestjs-typeorm-ext';
import { EventModule } from '@concepta/nestjs-event';
import {
  RocketsAuthModule,
  RocketsJwtAuthProvider,
} from '@bitwild/rockets-auth';
import { RocketsModule } from '@bitwild/rockets';
import { UserAdapter } from './adapters/user.adapter';
import { UserMetadataAdapter } from './adapters/user-metadata.adapter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  UserEntity,
  UserOtpEntity,
  FederatedEntity,
  RoleEntity,
  UserRoleEntity,
  UserMetadataEntity,
  InvitationEntity,
} from './entities';
import { UserCreateDto, UserUpdateDto } from './modules/user/dto/user.dto';
import { EmailSendOptionsInterface } from '@concepta/nestjs-common';
import {
  UserMetadataCreateDto,
  UserMetadataUpdateDto,
} from './modules/user/dto/user-metadata.dto';
import { RoleTypeOrmCrudAdapter } from './modules/role/adapters/role-typeorm-crud.adapter';
import { RoleCreateDto, RoleDto, RoleUpdateDto } from './modules/role/role.dto';
import { ACService } from './access-control.service';
import { acRules } from './app.acl';

@Module({
  imports: [
    // Global configuration
    ConfigModule.forRoot({ isGlobal: true }),

    // Event Module - Required for event-driven features
    EventModule.forRoot({}),

    // TypeORM configuration with SQLite
    TypeOrmExtModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true, // Only for development - use migrations in production
      logging: false,
      entities: [
        UserEntity,
        UserOtpEntity,
        FederatedEntity,
        RoleEntity,
        UserRoleEntity,
        UserMetadataEntity,
        InvitationEntity,
      ],
    }),
    // Rockets Auth Module - Complete authentication system
    RocketsAuthModule.forRootAsync({
      imports: [
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
      enableGlobalJWTGuard: false,
      useFactory: () => ({
        // Required: Email service (console logger for development)
        services: {
          mailerService: {
            sendMail: (options: EmailSendOptionsInterface) => {
              console.log('📧 Email would be sent:', {
                to: options.to,
                subject: options.subject,
              });
              return Promise.resolve();
            },
          },
        },

        // Email and OTP settings for development
        settings: {
          email: {
            from: 'noreply@music-management.com',
            baseUrl: 'http://localhost:3001',
            templates: {
              sendOtp: {
                fileName: 'send-otp.template.hbs',
                subject: 'Your verification code',
              },
              invitation: {
                logo: 'https://example.com/logo.png',
                fileName: 'invitation.template.hbs',
                subject: 'You have been invited',
              },
              invitationAccepted: {
                logo: 'https://example.com/logo.png',
                fileName: 'invitation-accepted.template.hbs',
                subject: 'Invitation accepted',
              },
            },
          },
          otp: {
            assignment: 'userOtp',
            category: 'auth-login',
            type: 'numeric',
            expiresIn: '10m',
          },
          role: {
            adminRoleName: 'admin',
            defaultUserRoleName: 'user',
          },
        },
      }),
      userCrud: {
        imports: [TypeOrmModule.forFeature([UserEntity, UserMetadataEntity])],
        model: UserEntity,
        adapter: UserAdapter,
        dto: {
          createOne: UserCreateDto,
          updateOne: UserUpdateDto,
        },
        userMetadataConfig: {
          imports: [TypeOrmModule.forFeature([UserMetadataEntity])],
          entity: UserMetadataEntity,
          adapter: UserMetadataAdapter,
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
        TypeOrmExtModule.forFeature({
          user: { entity: UserEntity },
          userMetadata: { entity: UserMetadataEntity },
        }),
      ],
      inject: [RocketsJwtAuthProvider],
      useFactory: (authProvider: RocketsJwtAuthProvider) => ({
        settings: {},
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
  providers: [AppService],
})
export class AppModule {}
