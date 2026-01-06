// Core type definitions for MVP
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'receptionist' | 'nurse';
  phone?: string;
}

export interface Patient {
  id: string;
  patientId: string; // Display ID like P-001
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email?: string;
  address?: string;
  bloodGroup?: string;
  createdAt: string;
}

export interface OPDVisit {
  id: string;
  visitId: string; // Display ID like OPD-001
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  chiefComplaint: string;
  diagnosis?: string;
  prescription?: string;
  visitDate: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'cancelled';
  fee: number;
}

export interface Bill {
  id: string;
  billNo: string; // Display ID like INV-001
  patientId: string;
  patientName: string;
  date: string;
  items: BillItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paid: number;
  balance: number;
  status: 'paid' | 'partial' | 'unpaid';
  paymentMethod?: 'cash' | 'card' | 'upi' | 'bank-transfer';
}

export interface BillItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface DashboardStats {
  totalPatients: number;
  todayVisits: number;
  todayRevenue: number;
  pendingBills: number;
}
