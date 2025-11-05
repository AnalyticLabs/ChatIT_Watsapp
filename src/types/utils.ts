export interface CustomIconProps {
    name: string;
    as: string;
    size: number;
    color?: string;
  }
  
  export enum VerificationType {
    DOCUMENT = 'document',
    ID_NUMBER = 'id_number',
    ADDRESS = 'address',
    PHONE = 'phone',
  }
  
  export enum AllowedTypes {
    DRIVING_LICENSE = 'driving_license',
    PASSPORT = 'passport',
    ID_CARD = 'id_card',
  }
  
  export enum PhoneOtpCheckTypes {
    ATTEMPT = 'attempt',
    NONE = 'none',
    REQUIRED = 'required',
  }
  
  export type VerificationSessionOptions = {
    verificationType: VerificationType;
    requireMatchingSelfie: boolean;
    requireIdNumber: boolean;
    allowedTypes: Record<AllowedTypes, boolean>;
    requireLiveCapture: boolean;
    requireAddress: boolean;
    phoneFallbackToDocument: boolean;
    phoneOtpCheckType: PhoneOtpCheckTypes;
  };
  
  export type RootStackParamList = {
    App: undefined;
    Login: undefined;
    SettingsStackNavigator: {
      screen: keyof SettingsStackParamList;
    };
  };
  
  export type SettingsStackParamList = {
    StoreListing: undefined;
    // add other screens in the stack as needed
  };
  