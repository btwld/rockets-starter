import { RocketsAuthSettingsInterface as BaseRocketsAuthSettingsInterface } from '@bitwild/rockets-auth';

export interface RocketsAuthSettingsInterface
  extends Omit<
    BaseRocketsAuthSettingsInterface,
    'otp'
  > {
  otp: Omit<
    BaseRocketsAuthSettingsInterface['otp'],
    'type'
  >;
}

