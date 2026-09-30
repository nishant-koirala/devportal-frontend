export interface LoginCredentials {
  email?: string;
  password?: string;
  [key: string]: string | undefined;
}

export interface RegisterDto {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
}

export interface AuthResponse {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
  authStatus?: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    [key: string]: string | string[] | undefined;
  };
}

export interface OtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword?: string;
  password?: string;
}
