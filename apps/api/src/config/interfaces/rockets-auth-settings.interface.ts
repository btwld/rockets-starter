export interface EmailTemplateSettings {
  fileName: string;
  subject: string;
  logo: string;
}

export interface RocketsAuthSettingsInterface {
  email: {
    from: string;
    baseUrl: string;
    templates: {
      sendOtp: EmailTemplateSettings;
      invitation: EmailTemplateSettings;
      invitationAccepted: EmailTemplateSettings;
    };
  };
  otp: {
    assignment: 'userOtp';
    category: 'auth-login';
    type: 'numeric';
    expiresIn: string;
  };
  role: {
    adminRoleName: string;
    defaultUserRoleName: string;
  };
}

