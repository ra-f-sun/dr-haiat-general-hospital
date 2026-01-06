# Dr. Haiat General Hospital - Hospital Management System

A comprehensive Hospital Management System built for Dr. Haiat General Hospital using **React + TypeScript** (Frontend) and **NestJS + TypeScript** (Backend).

## 🏥 Project Overview

- **Hospital Type**: Small-scale Gynecology focused hospital
- **Capacity**: 1 OT, 1 Lab, 1 USG Room, 3 Cabins, 1 Ward (5 beds), 1 Chamber
- **Staff**: 4 Doctors, Support staff (nurses, manager, receptionist, lab assistant)

## 🚀 Tech Stack

### Frontend
- React 18.x with TypeScript
- Vite (Build tool)
- React Router v6
- TanStack Query v5 (React Query)
- Zustand (State management)
- Tailwind CSS + Headless UI
- React Hook Form + Zod

### Backend
- NestJS 10.x with TypeScript
- Node.js 20 LTS
- PostgreSQL 15
- Prisma ORM
- Redis 7
- Passport.js (JWT)

## 📁 Project Structure

```
dr-haiat-hms/
├── packages/
│   └── shared-types/      # Shared TypeScript types
├── backend/               # NestJS API
├── frontend/              # React App
└── Docs/                  # Documentation & Planning
```

## 🔄 Development Workflow

We follow a **phased development approach** with parallel frontend and backend development:

### Phase 1 (Weeks 1-4): Core Operations
- Authentication & User Management
- Patient Management
- OPD Management
- Billing & Accounts

### Phase 2 (Weeks 5-8): Clinical Operations
- IPD & Bed Management
- Laboratory Management
- Radiology (USG)
- Inventory Management

### Phase 3 (Weeks 9-12): Supporting Modules
- Operation Theatre
- E-Prescription
- HR & Payroll
- Reports & MIS

## 🌿 Branch Strategy

- `dev` - Main development branch
- `phase-1-*` - Phase 1 features
- `phase-2-*` - Phase 2 features
- `phase-3-*` - Phase 3 features
- `production` - Production-ready code

## 🛠️ Getting Started

### Prerequisites
- Node.js 20 LTS
- PostgreSQL 15
- Redis 7
- pnpm (recommended) or npm

### Installation

```bash
# Clone repository
git clone git@github.com:ra-f-sun/dr-haiat-general-hospital.git
cd dr-haiat-general-hospital

# Install shared types
cd packages/shared-types
pnpm install

# Install backend dependencies
cd ../../backend
pnpm install

# Install frontend dependencies
cd ../frontend
pnpm install
```

### Running Development Servers

```bash
# Backend (http://localhost:3000)
cd backend
pnpm run start:dev

# Frontend (http://localhost:5173)
cd frontend
pnpm run dev
```

## 📚 Documentation

Detailed documentation available in `/Docs`:
- `drHaiatHmsPlan.txt` - Complete project plan
- `drHaiatHmsPlan.json` - Structured project data
- `drHaiatHmsPlanChecklist.txt` - Implementation checklist

## 👥 User Roles

1. **Administrator** - Full system access
2. **Chairman** - All access except activity logs
3. **Manager** - Operational management
4. **Receptionist** - Front desk operations

## 📝 License

Private - Dr. Haiat General Hospital

## 👨‍💻 Development Team

- Project Lead: [Your Name]
- Hospital: Dr. Haiat General Hospital

---

**Status**: 🚧 Phase 1 In Development
