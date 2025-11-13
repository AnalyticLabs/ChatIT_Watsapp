export interface User {
  id: string | number;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role?: string;
  requireVerification?: boolean;
  accessToken?: string;
  phoneNumber?: string;
  dob?: string;
  profileImage?: string;
  biometricEnabled?: boolean;
  status?: string;
  subscriptions?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  patientCode: string;
  password: string;
  type: string;
}

export interface LoginResponse {
  token: string;
  status?: string;
  message?: string;
  isAuthenticated?: boolean;
  data?: User;
}
