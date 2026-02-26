import { DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { TYPEORM_MODULE_SETTINGS } from './config.constants';
import { UserEntity } from '../modules/user/entities/user.entity';
import { UserMetadataEntity } from '../modules/user/entities/user-metadata.entity';
import { UserOtpEntity } from '../modules/user/entities/user-otp.entity';
import { FederatedEntity } from '../modules/user/entities/federated.entity';
import { RoleEntity } from '../modules/role/entities/role.entity';
import { UserRoleEntity } from '../modules/role/entities/user-role.entity';
import { InvitationEntity } from '../modules/invitation/entities/invitation.entity';

export const ormSettingsFactory = (): DataSourceOptions => {
  return {
    logging: process.env.NODE_ENV === 'development' ? 'all' : false,
    type: 'postgres',
    url:
      process.env.DATABASE_URL ??
      'postgresql://postgres:postgres@localhost:5432/rockets-starter',
    entities: [
      UserEntity,
      UserOtpEntity,
      FederatedEntity,
      RoleEntity,
      UserRoleEntity,
      UserMetadataEntity,
      InvitationEntity,
    ],
    migrations: [__dirname + '/../migrations/*.js'],
    synchronize: process.env.NODE_ENV === 'development',
    extra: {
      ssl:
        process.env.DATABASE_SSL === 'true'
          ? {
              rejectUnauthorized: false,
            }
          : false,
    },
  };
};

export const ormSettings = registerAs(
  TYPEORM_MODULE_SETTINGS,
  ormSettingsFactory,
);

