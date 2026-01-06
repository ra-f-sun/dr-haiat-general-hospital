# Dr. Haiat General Hospital - MVP Demo

A modern Hospital Management System frontend built with React, TypeScript, and Tailwind CSS for demonstration purposes.

## 🚀 Features

### ✅ Authentication & Authorization
- Mock login system for demo purposes
- Protected routes with authentication checks
- Session management with Zustand

### 👥 Patient Management
- Complete patient CRUD operations
- Patient search and filtering by name, ID, phone, or gender
- Detailed patient profiles with medical history
- Track patient visits and billing history

### 🏥 OPD Visit Management
- Create and manage outpatient visits
- Visit status tracking (Waiting → In Progress → Completed)
- Chief complaint, diagnosis, and prescription records
- Doctor assignment and fee management
- Date-based filtering (Today, This Week, All Time)

### 💰 Billing & Invoicing
- Dynamic invoice creation with line items
- Real-time calculation (subtotal, discount, tax, total)
- Payment recording with multiple methods (Cash, Card, Mobile Banking, Bank Transfer)
- Partial payment support
- Status tracking (Unpaid → Partial → Paid)
- Print-friendly invoice format
- Revenue tracking dashboard

### 📊 Dashboard
- Real-time statistics (Total Patients, Today's Visits, Revenue, Pending Bills)
- Quick action buttons for common tasks
- Recent visits overview
- Pending payments tracking

## 🛠️ Tech Stack

- **Framework:** React 19
- **Language:** TypeScript 5
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 3
- **Routing:** React Router 6
- **State Management:** Zustand 4 with localStorage persistence
- **Form Handling:** React Hook Form 7 + Zod 3 validation
- **Icons:** Lucide React
- **Date Handling:** date-fns 3

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:ra-f-sun/dr-haiat-general-hospital.git
   cd dr-haiat-general-hospital/mvp-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🔐 Demo Credentials

```
Username: admin
Password: admin123
```

> Note: This is a mock authentication system. Any username/password combination will work.

## 📚 Usage Guide

### Getting Started

1. **Login** with any username and password
2. **Load Sample Data** from the dashboard (click "Load Sample Data" button)
3. Explore the features through the sidebar navigation

### Managing Patients

- Navigate to **Patients** from the sidebar
- Click **"+ Add Patient"** to create a new patient
- Use the search bar to find patients by name, ID, or phone
- Filter patients by gender (All, Male, Female)
- Click on any patient to view their detailed profile with visit and billing history

### Recording OPD Visits

- Navigate to **OPD** from the sidebar
- Click **"+ New Visit"** to create a visit
- Select a patient from the dropdown
- Enter chief complaint (required)
- Add diagnosis and prescription
- Set visit fee
- Update visit status as patient progresses through consultation

### Creating Invoices

- Navigate to **Billing** from the sidebar
- Click **"+ New Invoice"**
- Select patient from dropdown
- Add line items with description, quantity, and rate
- Click "Add Item" to add more line items
- Add discount or tax if applicable
- Enter payment amount and select payment method
- Balance is calculated automatically
- Invoice status updates based on payment (Unpaid/Partial/Paid)

### Recording Payments

- Go to **Billing** and click on any invoice
- Click **"Record Payment"** button in the invoice details
- Enter payment amount and select payment method
- Balance updates automatically
- Status changes from Unpaid → Partial → Paid

## 🎨 Features Highlights

### Bangladesh Context
- **Currency:** BDT (Bangladeshi Taka) - ৳
- **Phone Format:** +880 1XXX-XXXXXX
- **Sample Data:** Bangladeshi names and Dhaka addresses
- **Hospital Type:** General hospital with gynecology specialization (serves all patients)
- **Services:** Gynecology consultations, general medicine, diagnostic tests, and more

### Data Persistence
- All data stored in **localStorage**
- Data persists across browser sessions
- Clear data by resetting browser localStorage or using browser dev tools

### Responsive Design
- Fully responsive for mobile, tablet, and desktop
- Modern UI with cards, modals, and tables
- Tailwind CSS utility-first styling
- Smooth transitions and hover effects

## 📁 Project Structure

```
mvp-frontend/
├── src/
│   ├── components/
│   │   └── layout/              # Layout components
│   │       ├── MainLayout.tsx   # Main layout with sidebar
│   │       ├── Sidebar.tsx      # Navigation sidebar
│   │       └── Header.tsx       # Top header with user info
│   ├── features/
│   │   ├── auth/                # Authentication
│   │   │   ├── LoginPage.tsx    # Login form
│   │   │   └── ProtectedRoute.tsx  # Route guard
│   │   ├── dashboard/           # Dashboard
│   │   │   └── DashboardPage.tsx   # Stats and quick actions
│   │   ├── patients/            # Patient management
│   │   │   ├── PatientsPage.tsx    # Patient list
│   │   │   ├── AddPatientModal.tsx # Add patient form
│   │   │   ├── EditPatientModal.tsx # Edit patient form
│   │   │   └── PatientProfilePage.tsx # Patient details
│   │   ├── opd/                 # OPD visit management
│   │   │   ├── OPDPage.tsx         # Visit list
│   │   │   ├── CreateVisitModal.tsx # New visit form
│   │   │   └── VisitDetailsModal.tsx # Visit details/edit
│   │   └── billing/             # Billing and invoicing
│   │       ├── BillingPage.tsx     # Invoice list
│   │       ├── CreateInvoiceModal.tsx # New invoice form
│   │       └── InvoiceDetailsModal.tsx # Invoice details/payment
│   ├── lib/
│   │   └── sampleData.ts        # Sample data generator
│   ├── store/
│   │   └── index.ts             # Zustand stores (auth + data)
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── utils/
│   │   └── index.ts             # Utility functions
│   ├── App.tsx                  # Main app with routes
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── vite.config.ts               # Vite config
└── tailwind.config.js           # Tailwind config
```

## 🔧 Available Scripts

- **`npm run dev`** - Start development server on http://localhost:5173
- **`npm run build`** - Build for production (outputs to `dist/`)
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint for code quality

## 🌟 Sample Data

The system includes comprehensive sample data:
- **15 Patients** - Mix of male and female patients with Bangladeshi names
- **11 OPD Visits** - Gynecological consultations + general medical consultations
- **8 Invoices** - Mix of paid, partial, and unpaid invoices

### Sample Patients Include:
- **Gynecology Patients:** Fatima Rahman (P-001), Ayesha Begum (P-002), Nusrat Jahan (P-003), and 9 more
- **General Patients:** Mohammad Karim (P-013), Rafiq Ahmed (P-014), Aminul Haque (P-015)

### Sample Services:
- **Gynecology:** Antenatal care, PCOS treatment, menstrual issues, routine checkups
- **General Medicine:** Fever treatment, health checkups, chronic conditions
- **Diagnostic Tests:** Blood tests (CBC, lipid profile, blood sugar), ultrasounds, urine tests

## 🚧 MVP Limitations

This is a **frontend-only** MVP demo with the following limitations:

- ❌ No backend server or REST API
- ❌ Data stored only in browser localStorage (not persistent across devices)
- ❌ Mock authentication (no real security)
- ❌ No real payment processing or gateway integration
- ❌ No email/SMS notifications
- ❌ No file uploads for medical records or documents
- ❌ No multi-user or multi-tenant support
- ❌ No role-based access control (RBAC)
- ❌ No audit logs or activity tracking
- ❌ No backup or data export functionality

## 🎯 Future Enhancements (Phase 1+)

For the full production version, planned enhancements include:

### Backend & Infrastructure
- Node.js/Express backend with PostgreSQL database
- RESTful API with proper authentication (JWT)
- Data validation and security
- Automated backups

### Advanced Features
- Multi-tenant support for multiple hospitals
- Role-based access control (Admin, Doctor, Receptionist, etc.)
- Appointment scheduling and calendar
- Lab test integration and result management
- Inventory and pharmacy management
- Advanced reporting and analytics
- Prescription printing with doctor signatures
- Medical record attachments (PDF, images)

### Notifications
- Email notifications for appointments
- SMS reminders for patients
- Push notifications for doctors

### Payments
- Payment gateway integration (bKash, Nagad, card payments)
- Automated receipts and invoices
- Payment history and tracking

### Mobile
- Progressive Web App (PWA) support
- Responsive mobile interface
- Offline mode capability

## 🐛 Known Issues

- React Compiler warning about `watch()` function in forms (non-blocking, expected with React Hook Form)
- VS Code may show temporary module resolution errors for newly created files (restart TypeScript server)

## 📝 Development Notes

### State Management
The app uses Zustand for state management with two stores:
- **authStore**: Manages authentication state
- **dataStore**: Manages patients, visits, and bills with localStorage persistence

### Data Persistence
Data is automatically saved to localStorage whenever it changes. To reset:
```javascript
localStorage.clear();
window.location.reload();
```

### Styling
- Tailwind CSS with custom utility classes
- Custom classes: `.btn-primary`, `.btn-secondary`, `.input-field`, `.card`
- Color scheme: Primary blue, with green, orange, and purple accents

## 📄 License

This project is for demonstration purposes only.

## 🤝 Contributing

This is an MVP demo project. For the full production version or contributions, please contact the development team.

## 📧 Contact & Support

For questions, support, or to discuss the full Phase 1 implementation:
- **Email:** Contact hospital IT department
- **GitHub:** [dr-haiat-general-hospital](https://github.com/ra-f-sun/dr-haiat-general-hospital)

---

**Built with ❤️ for Dr. Haiat General Hospital**

*MVP Demo completed in 4 days (January 2026)*
