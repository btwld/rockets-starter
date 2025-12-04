import { DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { TYPEORM_MODULE_SETTINGS } from './config.constants';
import {
  UserEntity,
  UserOtpEntity,
  FederatedEntity,
  RoleEntity,
  UserRoleEntity,
  UserMetadataEntity,
  InvitationEntity,
} from '../entities';

export const ormSettingsFactory = (): DataSourceOptions => {
  return {
    logging: process.env.NODE_ENV === 'development' ? 'all' : false,
    type: 'postgres',
    url:
      process.env.DATABASE_URL ??
      'postgresql://postgres:postgres@localhost:5432/music-management',
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

