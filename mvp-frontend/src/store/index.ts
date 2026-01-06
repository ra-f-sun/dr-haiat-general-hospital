import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Patient, OPDVisit, Bill } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface DataState {
  patients: Patient[];
  visits: OPDVisit[];
  bills: Bill[];
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  addVisit: (visit: OPDVisit) => void;
  updateVisit: (id: string, visit: Partial<OPDVisit>) => void;
  addBill: (bill: Bill) => void;
  updateBill: (id: string, bill: Partial<Bill>) => void;
}

// Mock authentication
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock login - accepts any email with password "demo123"
        if (password === 'demo123') {
          const user: User = {
            id: '1',
            name: 'Dr. Admin',
            email,
            role: email.includes('admin') ? 'admin' : 'doctor',
            phone: '+880 1712-345678',
          };
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Data store with localStorage persistence
export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      patients: [],
      visits: [],
      bills: [],
      addPatient: (patient) =>
        set((state) => ({ patients: [...state.patients, patient] })),
      updatePatient: (id, updatedPatient) =>
        set((state) => ({
          patients: state.patients.map((p) =>
            p.id === id ? { ...p, ...updatedPatient } : p
          ),
        })),
      deletePatient: (id) =>
        set((state) => ({
          patients: state.patients.filter((p) => p.id !== id),
        })),
      addVisit: (visit) =>
        set((state) => ({ visits: [...state.visits, visit] })),
      updateVisit: (id, updatedVisit) =>
        set((state) => ({
          visits: state.visits.map((v) =>
            v.id === id ? { ...v, ...updatedVisit } : v
          ),
        })),
      addBill: (bill) =>
        set((state) => ({ bills: [...state.bills, bill] })),
      updateBill: (id, updatedBill) =>
        set((state) => ({
          bills: state.bills.map((b) =>
            b.id === id ? { ...b, ...updatedBill } : b
          ),
        })),
    }),
    {
      name: 'hms-data-storage',
    }
  )
);
