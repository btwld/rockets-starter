import { registerAs } from '@nestjs/config';
import { ROCKETS_AUTH_SETTINGS } from './config.constants';
import { RocketsAuthSettingsInterface } from './interfaces/rockets-auth-settings.interface';


export const rocketsAuthSettings = registerAs(
  ROCKETS_AUTH_SETTINGS,
  (): RocketsAuthSettingsInterface => ({
    email: {
      from: process.env.EMAIL_FROM ?? 'noreply@rockets-starter.com',
      baseUrl: process.env.APP_BASE_URL ?? 'http://localhost:3001',
      templates: {
        sendOtp: {
          fileName: 'send-otp.template.hbs',
          subject: 'Your verification code',
        },
        invitation: {
          logo: process.env.EMAIL_LOGO_URL ?? 'https://example.com/logo.png',
          fileName: 'invitation.template.hbs',
          subject: 'You have been invited',
        },
        invitationAccepted: {
          logo: process.env.EMAIL_LOGO_URL ?? 'https://example.com/logo.png',
          fileName: 'invitation-accepted.template.hbs',
          subject: 'Invitation accepted',
        },
      },
    },
    otp: {
      assignment: 'userOtp',
      category: 'auth-login',
      expiresIn: process.env.OTP_EXPIRES_IN ?? '10m',
    },
    role: {
      adminRoleName: process.env.ADMIN_ROLE_NAME ?? 'admin',
      defaultUserRoleName: process.env.DEFAULT_ROLE_NAME ?? 'user',
    },
  }),
);

