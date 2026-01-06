# Phase 1 Complete Setup & Execution Plan

## 📦 Project Status

✅ **COMPLETED:**
- Git repository initialized
- Connected to GitHub (dev branch)
- Monorepo structure created
- Shared types package scaffolded
- Basic type definitions created (User, Patient, Common)
- Documentation created (README, DEVELOPMENT, PHASE-1-ROADMAP, QUICK-START)

🔄 **NEXT STEPS:**
- Create backend NestJS project
- Create frontend React project  
- Start Phase 1 Week 1 implementation

---

## 🎯 Phase 1 Overview

**Goal:** Build core operational system (Auth + Patients + OPD + Billing)

**Timeline:** 4 Weeks

**Parallel Development:** Backend + Frontend simultaneously

**Integration:** End of each week

---

## 📅 Implementation Schedule

### **Week 1: Authentication & Foundation**
```
Day 1-2:  Backend + Frontend Setup
Day 3-4:  Authentication Implementation
Day 5:    Integration & Testing
```

### **Week 2: Patient Management**
```
Day 1:    Shared Types
Day 2-3:  Backend API
Day 3-4:  Frontend UI
Day 5:    Integration & Testing
```

### **Week 3: OPD Management**
```
Day 1:    Shared Types
Day 2-3:  Backend API (OPD + Doctors)
Day 3-4:  Frontend UI
Day 5:    Integration & Testing
```

### **Week 4: Billing & Dashboard**
```
Day 1:    Shared Types
Day 2-3:  Backend API
Day 3-4:  Frontend UI + Print Templates
Day 5:    Integration, Dashboard & Final Testing
```

---

## 🚀 Step-by-Step Execution

### **STEP 1: Install Prerequisites** (30 minutes)

#### Check if already installed:
```powershell
node --version          # Should be v20.x.x
pnpm --version         # Should be 8.x.x or higher
psql --version         # Should be 15.x
redis-cli --version    # Should be 7.x
```

#### Install if missing:

**Node.js 20 LTS:**
```powershell
# Download from: https://nodejs.org/
# Or use winget:
winget install OpenJS.NodeJS.LTS
```

**pnpm:**
```powershell
npm install -g pnpm
```

**PostgreSQL 15:**
```powershell
# Download from: https://www.postgresql.org/download/windows/
# During installation:
# - Set password: postgres
# - Port: 5432
# - Remember your password!
```

**Redis 7:**
```powershell
# Option 1: WSL2 + Redis
wsl --install
wsl
sudo apt update
sudo apt install redis-server
sudo service redis-server start

# Option 2: Redis for Windows (memurai)
# Download from: https://www.memurai.com/
```

---

### **STEP 2: Create Backend Project** (15 minutes)

```powershell
# Navigate to project root
cd f:\workPlace\drhaiatgh

# Install NestJS CLI globally
npm install -g @nestjs/cli

# Create backend project
nest new backend

# When prompted:
# - Package manager: pnpm
# - Skip git initialization: Yes

# Navigate to backend
cd backend

# Install additional dependencies
pnpm add @nestjs/passport @nestjs/jwt passport passport-jwt bcrypt
pnpm add @prisma/client
pnpm add @nestjs/config
pnpm add class-validator class-transformer
pnpm add -D @types/passport-jwt @types/bcrypt prisma

# Initialize Prisma
npx prisma init

# This creates:
# - prisma/schema.prisma
# - .env
```

---

### **STEP 3: Create Frontend Project** (15 minutes)

```powershell
# Navigate to project root
cd f:\workPlace\drhaiatgh

# Create Vite React TypeScript project
pnpm create vite frontend -- --template react-ts

# Navigate to frontend
cd frontend

# Install dependencies
pnpm install

# Install additional packages
pnpm add react-router-dom
pnpm add @tanstack/react-query
pnpm add zustand
pnpm add axios
pnpm add react-hook-form @hookform/resolvers zod
pnpm add date-fns recharts
pnpm add react-hot-toast
pnpm add react-to-print
pnpm add lucide-react

# Install Tailwind CSS
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install Headless UI
pnpm add @headlessui/react
```

---

### **STEP 4: Configure Backend** (20 minutes)

#### 4.1 Update `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/drhaiat_hms"
JWT_SECRET=your-super-secret-jwt-key-change-in-production-xyz123
JWT_EXPIRES_IN=1d
PORT=3000
NODE_ENV=development
```

#### 4.2 Update `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User model
model User {
  id           String   @id @default(uuid())
  username     String   @unique
  email        String?  @unique
  password     String
  name         String
  role         Role     @default(RECEPTIONIST)
  status       UserStatus @default(ACTIVE)
  phone        String?
  lastLoginAt  DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("users")
}

enum Role {
  ADMINISTRATOR
  CHAIRMAN
  MANAGER
  RECEPTIONIST
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}
```

#### 4.3 Create database:
```powershell
# Connect to PostgreSQL
psql -U postgres

# In psql prompt:
CREATE DATABASE drhaiat_hms;
\q

# Run migration
cd backend
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

---

### **STEP 5: Configure Frontend** (15 minutes)

#### 5.1 Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
      },
    },
  },
  plugins: [],
}
```

#### 5.2 Update `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 5.3 Create `.env`:
```env
VITE_API_URL=http://localhost:3000
```

---

### **STEP 6: Build Shared Types** (5 minutes)

```powershell
cd f:\workPlace\drhaiatgh\packages\shared-types
pnpm install
pnpm run build
```

---

### **STEP 7: Test Everything** (10 minutes)

#### Terminal 1 - Backend:
```powershell
cd f:\workPlace\drhaiatgh\backend
pnpm run start:dev

# Should see:
# Application is running on: http://localhost:3000
```

#### Terminal 2 - Frontend:
```powershell
cd f:\workPlace\drhaiatgh\frontend
pnpm run dev

# Should see:
# Local: http://localhost:5173
```

#### Test:
- Open browser: http://localhost:5173
- Open browser: http://localhost:3000 (should see NestJS)

---

### **STEP 8: Commit Setup** (5 minutes)

```powershell
# From project root
cd f:\workPlace\drhaiatgh

git add .
git commit -m "chore: complete Phase 1 project setup - backend & frontend initialized"
git push origin dev
```

---

## 🎯 START Week 1 Development

### Day 1-2: Backend Auth Setup

#### Create feature branch:
```powershell
git checkout -b phase-1-auth-backend
```

#### Tasks:
1. **Create Auth Module:**
   ```bash
   cd backend
   nest g module auth
   nest g service auth
   nest g controller auth
   ```

2. **Create Users Module:**
   ```bash
   nest g module users
   nest g service users
   nest g controller users
   ```

3. **Implement JWT Strategy** (see PHASE-1-ROADMAP.md for details)

4. **Create seed script** with test users

5. **Test with Postman**

#### Commit & push:
```bash
git add .
git commit -m "feat(auth): implement JWT authentication with role-based access"
git push origin phase-1-auth-backend
```

---

### Day 3-4: Frontend Auth Setup

#### Create feature branch:
```powershell
git checkout dev
git checkout -b phase-1-auth-frontend
```

#### Tasks:
1. **Create folder structure** (see PHASE-1-ROADMAP.md)
2. **Set up Axios with interceptors**
3. **Create auth store (Zustand)**
4. **Build Login page**
5. **Build Layout components (Sidebar, Header)**
6. **Implement protected routes**
7. **Test login flow**

#### Commit & push:
```bash
git add .
git commit -m "feat(auth): implement login UI with protected routes"
git push origin phase-1-auth-frontend
```

---

### Day 5: Integration

#### Merge branches:
```powershell
git checkout dev
git merge phase-1-auth-backend
git merge phase-1-auth-frontend
git push origin dev
```

#### Test end-to-end:
1. Start backend
2. Start frontend
3. Login with test users
4. Verify role-based access
5. Test logout
6. Fix any issues

---

## 📊 Progress Tracking

Update checkboxes in `PHASE-1-ROADMAP.md` as you complete tasks:

```markdown
### Week 1: Authentication & Foundation

#### Backend (3-4 days)
- [x] Set up NestJS project
- [x] Configure PostgreSQL with Prisma
- [ ] Create User module
  - [ ] User entity (Prisma schema)
  - [ ] User service (CRUD)
  ...
```

---

## 🎉 Phase 1 Completion

After 4 weeks, you should have:

✅ Working authentication system  
✅ Patient management (CRUD + Search)  
✅ OPD visit management  
✅ Billing system with invoices  
✅ Payment processing  
✅ Due tracking  
✅ Printable invoices & receipts  
✅ Dashboard with statistics  
✅ Role-based access control  
✅ Responsive UI  

**Ready for Phase 2!**

---

## 📞 Resources

- **Planning:** `/Docs` folder
- **Phase 1 Details:** `PHASE-1-ROADMAP.md`
- **Development Guide:** `DEVELOPMENT.md`
- **Quick Reference:** `QUICK-START.md`
- **Repository:** https://github.com/ra-f-sun/dr-haiat-general-hospital

---

## 🐛 Common Issues

### PostgreSQL Connection Error
```powershell
# Check if running
Get-Service -Name postgresql*

# Start service
Start-Service postgresql-x64-15
```

### Redis Not Running (WSL)
```bash
wsl
sudo service redis-server start
redis-cli ping  # Should return PONG
```

### Port Already in Use
```powershell
# Kill ports
npx kill-port 3000
npx kill-port 5173
```

### Prisma Client Errors
```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

---

**You're all set! Begin Week 1 implementation! 🚀**
