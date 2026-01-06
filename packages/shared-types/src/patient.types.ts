import { BaseEntity, Gender, BloodGroup } from './common.types';

// ==================== Patient Interface ====================

export interface Patient extends BaseEntity {
  patientId: string; // PID-0001
  name: string;
  age: number;
  gender: Gender;
  phone: string;
  email?: string;
  address: string;
  bloodGroup?: BloodGroup;
  emergencyContact?: string;
  emergencyContactPhone?: string;
  notes?: string;
}

// ==================== DTOs ====================

export interface CreatePatientDto {
  name: string;
  age: number;
  gender: Gender;
  phone: string;
  email?: string;
  address: string;
  bloodGroup?: BloodGroup;
  emergencyContact?: string;
  emergencyContactPhone?: string;
  notes?: string;
}

export interface UpdatePatientDto {
  name?: string;
  age?: number;
  gender?: Gender;
  phone?: string;
  email?: string;
  address?: string;
  bloodGroup?: BloodGroup;
  emergencyContact?: string;
  emergencyContactPhone?: string;
  notes?: string;
}

export interface SearchPatientDto {
  q?: string; // Search query (name, phone, patientId)
  gender?: Gender;
  ageMin?: number;
  ageMax?: number;
}
