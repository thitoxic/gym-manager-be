export interface loginRequest {
  adminId?: string;
  phone?: number;
  password: string;
}

export interface registerRequest {
  phone: number;
  password: string;
  fullName: number;
  email?: string;
}

export interface updateRequest {
  adminId: string;
  phone?: number;
  fullName?: number;
  email?: string;
}

export interface changePasswordRequest {
  adminId?: string;
  phone?: string;
  currPassword: string;
  updatedPassword: string;
}

export type ChangePasswordResponse =
  | { success: true; message: string; code?: number }
  | { success: false; message: string; code: number };
