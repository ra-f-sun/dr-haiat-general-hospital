# Dr. Haiat HMS - MVP Demo

## 🎯 Overview
This is a **frontend-only MVP demo** of the Hospital Management System. It uses mock data stored in browser localStorage to demonstrate the core features before the full-stack Phase 1 implementation.

## 🚀 Quick Start

### Prerequisites
- Node.js 20 LTS or higher
- npm (comes with Node.js)

### Installation & Running

```bash
npm install
npm run dev
```

The app will be available at http://localhost:5173

### Demo Credentials
- **Email**: Any valid email (e.g., admin@example.com)
- **Password**: demo123

## ✨ Features Implemented (Day 1)

### ✅ Completed
- [x] Authentication system with mock login
- [x] Protected routes
- [x] Main layout with sidebar and header
- [x] Dashboard with statistics
- [x] Responsive design with Tailwind CSS
- [x] State management with Zustand
- [x] LocalStorage persistence

### 📦 Tech Stack
- **React 19** - UI framework
- **TypeScript 5** - Type safety
- **Vite 7** - Build tool & dev server
- **React Router 6** - Routing
- **Zustand 4** - State management
- **React Hook Form 7** - Form handling
- **Zod 3** - Schema validation
- **Tailwind CSS 3** - Styling
- **Lucide React** - Icons
- **date-fns 3** - Date utilities

## 📂 Project Structure

```
src/
├── features/          # Feature-based modules
│   ├── auth/         # Login, ProtectedRoute
│   ├── dashboard/    # Dashboard page
│   ├── patients/     # Patient management (Day 2)
│   ├── opd/          # OPD visits (Day 3)
│   └── billing/      # Billing & invoicing (Day 4)
├── components/       # Shared components
│   ├── layout/       # Sidebar, Header, MainLayout
│   └── ui/           # Reusable UI components
├── store/            # Zustand stores
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── hooks/            # Custom React hooks
└── App.tsx           # Main app with routing
```

## 📅 MVP Development Plan

### Day 1: Auth + Layout ✅ COMPLETED
- [x] Login page with form validation
- [x] Protected routes
- [x] Sidebar navigation
- [x] Header with user info
- [x] Dashboard with statistics

### Day 2: Patient Management (Next)
- [ ] Patient list with search/filter
- [ ] Add new patient form
- [ ] Edit patient details
- [ ] Patient profile view

### Day 3: OPD Visits
- [ ] Today's OPD queue
- [ ] Create new visit
- [ ] Visit details
- [ ] Mark visit status

### Day 4: Billing & Invoicing
- [ ] Create bill/invoice
- [ ] Add line items
- [ ] Calculate totals
- [ ] Payment recording

### Day 5: Polish & Demo
- [ ] Add sample data
- [ ] Bug fixes
- [ ] Documentation

## 🚧 Limitations (MVP)

This is a frontend-only demo. The following are NOT implemented:
- ❌ Real backend API
- ❌ Database
- ❌ Real authentication
- ❌ File uploads
- ❌ Advanced reporting

These will be in **Phase 1** of full-stack development.

## 📖 Resources

- [Main Project README](../README.md)
- [Development Guide](../DEVELOPMENT.md)
- [Phase 1 Roadmap](../PHASE-1-ROADMAP.md)
- [MVP Plan](../Docs/MVP-PLAN.txt)

---

**MVP Status**: Day 1 Complete ✅  
**Started**: January 6, 2026

// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
