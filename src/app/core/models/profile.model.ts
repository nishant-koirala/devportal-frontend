export interface UserProfile {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  roles?: string[];
  [key: string]: unknown;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  [key: string]: unknown;
}

export interface ChangePasswordRequest {
  currentPassword?: string;
  newPassword?: string;
}
