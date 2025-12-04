import { registerAs } from '@nestjs/config';
import { ROCKETS_SETTINGS } from './config.constants';
import { RocketsSettingsInterface } from './interfaces/rockets-settings.interface';

export const rocketsSettings = registerAs(
  ROCKETS_SETTINGS,
  (): RocketsSettingsInterface => ({
    settings: {},
    enableGlobalGuard: process.env.ENABLE_GLOBAL_GUARD !== 'false',
  }),
);

