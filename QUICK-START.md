# Quick Reference - Phase 1 Development

## 🚀 Start Development

```bash
# 1. Navigate to project
cd f:\workPlace\drhaiatgh

# 2. Install dependencies (first time only)
pnpm install

# 3. Create feature branch
git checkout -b phase-1-auth-backend
```

---

## 📁 Current Project Structure

```
dr-haiat-general-hospital/
├── .git/
├── Docs/                          # Planning documents
│   ├── drHaiatHmsPlan.json
│   ├── drHaiatHmsPlan.txt
│   └── drHaiatHmsPlanChecklist.txt
├── packages/
│   └── shared-types/              # ✅ CREATED
│       ├── src/
│       │   ├── common.types.ts    # ✅ Base types, enums
│       │   ├── user.types.ts      # ✅ User & Auth types
│       │   ├── patient.types.ts   # ✅ Patient types
│       │   ├── opd.types.ts       # TODO: Complete in Week 3
│       │   ├── billing.types.ts   # TODO: Complete in Week 4
│       │   └── ...
│       ├── package.json
│       └── tsconfig.json
├── backend/                       # TODO: Create in Week 1
├── frontend/                      # TODO: Create in Week 1
├── .gitignore
├── README.md
├── DEVELOPMENT.md
├── PHASE-1-ROADMAP.md
└── package.json
```

---

## 📝 Week 1: Authentication - TODO List

### Backend Setup (Day 1-2)

```bash
# Create backend folder
cd f:\workPlace\drhaiatgh
nest new backend
cd backend

# Install dependencies
pnpm add @nestjs/passport @nestjs/jwt passport passport-jwt bcrypt
pnpm add @prisma/client
pnpm add -D @types/passport-jwt @types/bcrypt prisma

# Install Redis
pnpm add @nestjs/redis ioredis
pnpm add -D @types/ioredis

# Initialize Prisma
npx prisma init
```

### Frontend Setup (Day 1-2)

```bash
# Create frontend folder
cd f:\workPlace\drhaiatgh
pnpm create vite frontend -- --template react-ts
cd frontend

# Install dependencies
pnpm add react-router-dom
pnpm add @tanstack/react-query
pnpm add zustand
pnpm add axios
pnpm add react-hook-form @hookform/resolvers zod
pnpm add date-fns
pnpm add recharts
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

## 🌿 Git Workflow

### Create Feature Branch
```bash
# From dev branch
git checkout dev
git pull origin dev

# Create new branch
git checkout -b phase-1-auth-backend
```

### During Development
```bash
# Check status
git status

# Add files
git add .

# Commit
git commit -m "feat(auth): implement JWT authentication"

# Push
git push origin phase-1-auth-backend
```

### Merge to Dev
```bash
# Switch to dev
git checkout dev

# Merge feature branch
git merge phase-1-auth-backend

# Push to remote
git push origin dev

# Delete local branch (optional)
git branch -d phase-1-auth-backend
```

---

## 🔑 Mock Users for Testing

```typescript
// Use these credentials for testing
const mockUsers = [
  {
    username: 'admin',
    password: 'admin123',
    role: 'ADMINISTRATOR',
    name: 'System Admin'
  },
  {
    username: 'chairman',
    password: 'chair123',
    role: 'CHAIRMAN',
    name: 'Dr. Chairman'
  },
  {
    username: 'manager',
    password: 'manager123',
    role: 'MANAGER',
    name: 'Hospital Manager'
  },
  {
    username: 'receptionist',
    password: 'recep123',
    role: 'RECEPTIONIST',
    name: 'Front Desk'
  }
];
```

---

## 🔧 Environment Variables

### Backend `.env`
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/drhaiat_hms"
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1d
PORT=3000
NODE_ENV=development
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:3000
```

---

## 🎯 Phase 1 Branch Naming Convention

```
phase-1-auth-backend          # Week 1 - Backend auth
phase-1-auth-frontend         # Week 1 - Frontend auth
phase-1-patients-types        # Week 2 - Shared types
phase-1-patients-backend      # Week 2 - Backend patients
phase-1-patients-frontend     # Week 2 - Frontend patients
phase-1-opd-types             # Week 3 - Shared types
phase-1-opd-backend           # Week 3 - Backend OPD
phase-1-opd-frontend          # Week 3 - Frontend OPD
phase-1-billing-types         # Week 4 - Shared types
phase-1-billing-backend       # Week 4 - Backend billing
phase-1-billing-frontend      # Week 4 - Frontend billing
phase-1-dashboard-backend     # Week 4 - Backend dashboard
phase-1-dashboard-frontend    # Week 4 - Frontend dashboard
```

---

## 🚦 Development Ports

- **Backend API:** http://localhost:3000
- **Frontend App:** http://localhost:5173
- **PostgreSQL:** localhost:5432
- **Redis:** localhost:6379
- **Prisma Studio:** http://localhost:5555

---

## 🛠️ Common Commands

### Shared Types
```bash
cd packages/shared-types
pnpm run build          # Build types
pnpm run dev            # Watch mode
```

### Backend
```bash
cd backend
pnpm run start:dev      # Dev mode with hot reload
pnpm run build          # Build
pnpm run start:prod     # Production mode

# Prisma
pnpm prisma generate    # Generate client
pnpm prisma migrate dev # Run migrations
pnpm prisma studio      # Open Prisma Studio
pnpm prisma db seed     # Seed database
```

### Frontend
```bash
cd frontend
pnpm run dev            # Dev mode
pnpm run build          # Build
pnpm run preview        # Preview build
```

---

## 📋 Daily Checklist

### Morning
- [ ] Pull latest changes: `git pull origin dev`
- [ ] Check branch: `git branch`
- [ ] Start backend: `cd backend && pnpm run start:dev`
- [ ] Start frontend: `cd frontend && pnpm run dev`

### During Development
- [ ] Commit frequently with meaningful messages
- [ ] Test features as you build
- [ ] Check console for errors
- [ ] Update types when changing data structures

### End of Day
- [ ] Commit all changes
- [ ] Push to remote branch
- [ ] Update task progress in PHASE-1-ROADMAP.md

---

## 🐛 Quick Troubleshooting

### Port Already in Use
```bash
# Windows
npx kill-port 3000
npx kill-port 5173
```

### Type Errors
```bash
# Rebuild shared types
cd packages/shared-types
pnpm run build
```

### Database Issues
```bash
# Reset database
cd backend
pnpm prisma migrate reset
pnpm prisma generate
```

### Can't Connect to Database
```powershell
# Check if PostgreSQL is running
Get-Service -Name postgresql*

# Start PostgreSQL if stopped
Start-Service postgresql-x64-15
```

---

## 📞 Support

- **Planning Documents:** See `/Docs` folder
- **Development Guide:** See `DEVELOPMENT.md`
- **Phase 1 Roadmap:** See `PHASE-1-ROADMAP.md`
- **Repository:** https://github.com/ra-f-sun/dr-haiat-general-hospital

---

## ✅ Next Steps

1. **Install Prerequisites:**
   - Node.js 20 LTS
   - PostgreSQL 15
   - Redis 7
   - pnpm

2. **Create Backend Project:**
   ```bash
   cd f:\workPlace\drhaiatgh
   nest new backend
   ```

3. **Create Frontend Project:**
   ```bash
   cd f:\workPlace\drhaiatgh
   pnpm create vite frontend -- --template react-ts
   ```

4. **Start Week 1 Development:**
   - Follow PHASE-1-ROADMAP.md
   - Create `phase-1-auth-backend` branch
   - Begin implementing authentication

---

**Ready to code! 💪**
