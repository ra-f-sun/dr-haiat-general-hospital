# Phase 1 Implementation Roadmap - Dr. Haiat HMS

**Timeline:** Weeks 1-4  
**Goal:** Complete core operational modules with full integration

---

## 📋 Phase 1 Modules

### 1. Authentication & User Management
### 2. Patient Management
### 3. OPD Management
### 4. Billing & Accounts
### 5. Dashboard (Basic)

---

## 🗓️ Week-by-Week Breakdown

### Week 1: Authentication & Foundation

#### Backend (3-4 days)
**Branch:** `phase-1-auth-backend`

- [ ] Set up NestJS project
- [ ] Configure PostgreSQL with Prisma
- [ ] Set up Redis for caching
- [ ] Create User module
  - [ ] User entity (Prisma schema)
  - [ ] User service (CRUD)
  - [ ] User controller
- [ ] Create Auth module
  - [ ] JWT strategy with Passport
  - [ ] Login endpoint
  - [ ] Logout endpoint
  - [ ] Get current user endpoint
  - [ ] Change password endpoint
- [ ] Create guards
  - [ ] JWT Auth Guard
  - [ ] Roles Guard
- [ ] Create decorators
  - [ ] @CurrentUser()
  - [ ] @Roles()
- [ ] Seed database with initial users
  - Administrator
  - Chairman
  - Manager
  - Receptionist
- [ ] Test all endpoints with Postman

**Deliverables:**
- Working auth API
- JWT authentication
- Role-based access control
- Seeded users

#### Frontend (3-4 days)
**Branch:** `phase-1-auth-frontend`

- [ ] Set up React + Vite + TypeScript project
- [ ] Install and configure dependencies
  - React Router
  - TanStack Query
  - Zustand
  - Axios
  - Tailwind CSS + Headless UI
  - React Hook Form + Zod
- [ ] Create project structure
  - features/
  - components/
  - hooks/
  - lib/
  - store/
- [ ] Configure Axios with interceptors
- [ ] Create auth store (Zustand)
- [ ] Implement auth API calls
- [ ] Build Login page
  - Hospital branding
  - Form with validation
  - Loading states
  - Error handling
- [ ] Build Layout components
  - Sidebar (collapsible)
  - Header (user info, logout)
  - Main layout wrapper
- [ ] Implement protected routes
- [ ] Create role-based route guards
- [ ] Build basic Dashboard page

**Deliverables:**
- Working login system
- Protected routes
- Role-based navigation
- Basic layout

#### Integration (1 day)
- [ ] Connect frontend to backend
- [ ] Test login flow
- [ ] Test token management
- [ ] Test role-based access
- [ ] Fix any integration issues

---

### Week 2: Patient Management

#### Shared Types (1 day)
**Branch:** `phase-1-patients-types`

- [ ] Complete patient.types.ts
  - Patient interface
  - CreatePatientDto
  - UpdatePatientDto
  - SearchPatientDto
- [ ] Build shared-types package
- [ ] Publish to local workspace

#### Backend (2-3 days)
**Branch:** `phase-1-patients-backend`

- [ ] Create Patient module
- [ ] Create Patient entity (Prisma schema)
- [ ] Implement patient ID generator (PID-0001)
- [ ] Create Patient service
  - Create patient
  - Get all patients (with pagination)
  - Get patient by ID
  - Update patient
  - Delete patient (soft delete)
  - Search patients (by name, phone, patientId)
- [ ] Create Patient controller
- [ ] Add role-based guards
- [ ] Seed database with 50+ patients
- [ ] Test all endpoints

**Deliverables:**
- Patient CRUD API
- Search functionality
- Auto-generated patient IDs
- Seeded patient data

#### Frontend (3-4 days)
**Branch:** `phase-1-patients-frontend`

- [ ] Create patients feature folder
- [ ] Implement usePatients hook (React Query)
- [ ] Build Patient List page
  - Table with sorting
  - Pagination
  - Search bar
  - Filters (gender, age)
- [ ] Build Add Patient page
  - Form with validation (Zod)
  - Success/error notifications
- [ ] Build Patient Details page
  - Patient info tab
  - Edit patient functionality
- [ ] Build PatientSearch component (reusable)
- [ ] Add loading states
- [ ] Add empty states

**Deliverables:**
- Patient list with search/filter
- Add/edit patient forms
- Patient details view
- Reusable patient search component

#### Integration & Testing (1 day)
- [ ] Connect frontend to backend
- [ ] Test patient creation
- [ ] Test patient search
- [ ] Test patient updates
- [ ] End-to-end testing
- [ ] Fix bugs

---

### Week 3: OPD Management

#### Shared Types (1 day)
**Branch:** `phase-1-opd-types`

- [ ] Complete opd.types.ts
  - OPDVisit interface
  - CreateOPDVisitDto
  - OPDStatus enum
- [ ] Complete doctor.types.ts (partial)
  - Doctor interface (basic)
  - DoctorSchedule interface
- [ ] Build and publish types

#### Backend (2-3 days)
**Branch:** `phase-1-opd-backend`

- [ ] Create Doctor module (basic)
  - Doctor entity
  - Doctor service (CRUD)
  - Doctor controller
  - Seed 4 doctors
- [ ] Create OPD module
- [ ] Create OPDVisit entity (Prisma)
  - Relations: Patient, Doctor
- [ ] Implement OPD ID generator (OPD-0001)
- [ ] Create OPD service
  - Create OPD visit
  - Get all visits (with filters)
  - Get visit by ID
  - Update visit
  - Link to patient
  - Assign doctor
- [ ] Create OPD controller
- [ ] Seed 100+ OPD visits
- [ ] Test endpoints

**Deliverables:**
- OPD visit CRUD API
- Doctor management API
- Auto-generated OPD IDs
- Seeded data

#### Frontend (3-4 days)
**Branch:** `phase-1-opd-frontend`

- [ ] Create opd feature folder
- [ ] Create doctors feature folder (basic)
- [ ] Implement useOPD hook
- [ ] Implement useDoctors hook
- [ ] Build OPD List page
  - Table with visits
  - Filters (date, doctor, status)
  - Pagination
- [ ] Build New OPD Visit page
  - Patient search/select
  - Doctor selection
  - Chief complaint
  - Symptoms
  - Diagnosis
  - Follow-up date
  - Form validation
- [ ] Build OPD Visit Details page
- [ ] Add OPD quick action to dashboard

**Deliverables:**
- OPD visit creation
- OPD visit list
- Doctor selection
- Patient linking

#### Integration & Testing (1 day)
- [ ] Integrate frontend with backend
- [ ] Test OPD visit workflow
- [ ] Test doctor assignment
- [ ] Fix integration issues

---

### Week 4: Billing & Accounts

#### Shared Types (1 day)
**Branch:** `phase-1-billing-types`

- [ ] Complete billing.types.ts
  - Invoice interface
  - InvoiceItem interface
  - Payment interface
  - InvoiceType enum
  - InvoiceStatus enum
  - PaymentMethod enum
  - CreateInvoiceDto
  - PaymentDto
- [ ] Build and publish types

#### Backend (2-3 days)
**Branch:** `phase-1-billing-backend`

- [ ] Create Billing module
- [ ] Create Invoice entity (Prisma)
  - Relations: Patient, User (created by)
- [ ] Create InvoiceItem entity
- [ ] Create Payment entity
- [ ] Implement invoice ID generator (INV-0001)
- [ ] Implement payment ID generator (PAY-0001)
- [ ] Create Billing service
  - Create invoice (multi-item)
  - Get invoices (with filters)
  - Get invoice by ID
  - Process payment (full/partial)
  - Calculate dues
  - Get dues list
  - Refund processing
  - Track creator signature
- [ ] Create Billing controller
- [ ] Seed 200+ invoices with various statuses
- [ ] Test all endpoints

**Deliverables:**
- Invoice CRUD API
- Payment processing API
- Due tracking
- Signature tracking
- Seeded invoice data

#### Frontend (3-4 days)
**Branch:** `phase-1-billing-frontend`

- [ ] Create billing feature folder
- [ ] Implement useBilling hook
- [ ] Build Create Invoice page
  - Patient selection
  - Invoice type selection
  - Multi-item table (add/remove rows)
  - Item price, quantity
  - Subtotal, discount, total
  - Form validation
- [ ] Build Invoice List page
  - Filters (date, status, patient)
  - Pagination
- [ ] Build Payment page
  - Payment method selection
  - Partial payment support
  - Receipt generation
- [ ] Build Dues List page
  - Outstanding dues
  - Patient-wise grouping
- [ ] Build print templates
  - Invoice print (with signature)
  - Payment receipt
  - Due invoice
- [ ] Implement react-to-print
- [ ] Add billing quick actions to dashboard

**Deliverables:**
- Invoice creation with multiple items
- Payment processing
- Due tracking
- Printable invoices with signatures
- Printable receipts

#### Integration & Testing (1-2 days)
- [ ] Integrate frontend with backend
- [ ] Test invoice creation workflow
- [ ] Test payment processing
- [ ] Test due calculations
- [ ] Test printing
- [ ] End-to-end billing flow testing
- [ ] Fix any issues

---

### Week 4 (Continued): Dashboard Enhancement

#### Backend (1 day)
**Branch:** `phase-1-dashboard-backend`

- [ ] Create Dashboard endpoint
  - Today's revenue
  - Total patients count
  - OPD visits today
  - Pending invoices
  - Recent patients (last 10)
  - Daily revenue chart (last 7 days)

#### Frontend (1 day)
**Branch:** `phase-1-dashboard-frontend`

- [ ] Build Dashboard page
  - Stats cards (revenue, patients, visits, dues)
  - Recent patients table
  - Revenue chart (Recharts)
  - Quick action buttons
    - New Patient
    - New OPD Visit
    - Create Invoice
  - Role-based dashboard views

#### Integration
- [ ] Connect dashboard to API
- [ ] Test real-time stats
- [ ] Polish UI/UX

---

## 🎯 Phase 1 Completion Checklist

### Backend
- [ ] All Phase 1 modules deployed
- [ ] Database schema finalized
- [ ] All endpoints tested
- [ ] API documentation (Swagger)
- [ ] Seed data script working

### Frontend
- [ ] All Phase 1 pages completed
- [ ] Forms validated
- [ ] Loading/error states
- [ ] Print templates working
- [ ] Responsive design (desktop/tablet)
- [ ] Role-based access working

### Integration
- [ ] All modules integrated
- [ ] End-to-end workflows tested
- [ ] No critical bugs
- [ ] Performance acceptable

### Documentation
- [ ] API endpoints documented
- [ ] Frontend components documented
- [ ] User guide (basic) created

---

## 🚀 Phase 1 Success Criteria

✅ Users can log in with role-based access  
✅ Receptionists can register new patients  
✅ Receptionists can create OPD visits  
✅ Receptionists can generate invoices  
✅ Receptionists can process payments  
✅ Manager can view all transactions  
✅ Dashboard shows real-time statistics  
✅ All forms have proper validation  
✅ Invoices and receipts can be printed  
✅ System is responsive and fast  
✅ No console errors or warnings  

---

## 📦 Phase 1 Deliverables

### Working Features:
1. ✅ User authentication with JWT
2. ✅ Role-based access control (4 roles)
3. ✅ Patient registration and management
4. ✅ Patient search functionality
5. ✅ OPD visit creation and management
6. ✅ Doctor assignment
7. ✅ Invoice generation (multi-item)
8. ✅ Payment processing (full/partial)
9. ✅ Due tracking and management
10. ✅ Printable invoices with signatures
11. ✅ Printable payment receipts
12. ✅ Dashboard with statistics
13. ✅ Responsive UI

### Database:
- Users (with roles)
- Patients (50+ seeded)
- Doctors (4 seeded)
- OPD Visits (100+ seeded)
- Invoices (200+ seeded)
- Payments
- Invoice Items

### Ready for:
- Phase 2: IPD, Lab, Radiology, Inventory
- Real hospital testing (soft launch)
- User feedback collection

---

## 🎓 Learning Resources for Phase 1

### NestJS
- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [Prisma with NestJS](https://docs.nestjs.com/recipes/prisma)
- [Guards and Interceptors](https://docs.nestjs.com/guards)

### React
- [TanStack Query Guide](https://tanstack.com/query/latest/docs/react/overview)
- [React Hook Form](https://react-hook-form.com/get-started)
- [Zod Validation](https://zod.dev/)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Headless UI Components](https://headlessui.com/)

---

**Let's build Phase 1! 🚀**
