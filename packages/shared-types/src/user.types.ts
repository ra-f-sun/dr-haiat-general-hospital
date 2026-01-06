import { BaseEntity } from './common.types';

// ==================== User Role Enum ====================

export enum UserRole {
  ADMINISTRATOR = 'ADMINISTRATOR',
  CHAIRMAN = 'CHAIRMAN',
  MANAGER = 'MANAGER',
  RECEPTIONIST = 'RECEPTIONIST'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED'
}

// ==================== User Interface ====================

export interface User extends BaseEntity {
  username: string;
  email?: string;
  password: string; // Hashed
  name: string;
  role: UserRole;
  status: UserStatus;
  phone?: string;
  lastLoginAt?: Date;
}

// ==================== DTOs ====================

export interface CreateUserDto {
  username: string;
  email?: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
}

export interface UpdateUserDto {
  email?: string;
  name?: string;
  phone?: string;
  status?: UserStatus;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

// ==================== Auth Types ====================

export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: Omit<User, 'password'>;
  accessToken: string;
  refreshToken?: string;
}

export interface JwtPayload {
  sub: string; // User ID
  username: string;
  role: UserRole;
}

// ==================== User without sensitive data ====================

export type SafeUser = Omit<User, 'password'>;
