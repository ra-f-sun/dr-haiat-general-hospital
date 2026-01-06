# Development Guide - Dr. Haiat HMS

## 🚀 Quick Start

### 1. Clone & Setup
```bash
git clone git@github.com:ra-f-sun/dr-haiat-general-hospital.git
cd dr-haiat-general-hospital
```

### 2. Install pnpm (if not installed)
```bash
npm install -g pnpm
```

### 3. Install Dependencies
```bash
# Install all workspace dependencies
pnpm install
```

## 📦 Phase-by-Phase Development

### Phase 1: Core Operations (Weeks 1-4)

#### Branches
- `phase-1-auth` - Authentication & User Management
- `phase-1-patients` - Patient Management
- `phase-1-opd` - OPD Management
- `phase-1-billing` - Billing & Accounts

#### Development Workflow
```bash
# Start from dev branch
git checkout dev

# Create feature branch
git checkout -b phase-1-auth

# After completing feature
git add .
git commit -m "feat(auth): implement JWT authentication"
git push origin phase-1-auth

# Create PR to dev branch
# After review, merge to dev
```

### Phase 2: Clinical Operations (Weeks 5-8)
- `phase-2-ipd` - IPD & Bed Management
- `phase-2-lab` - Laboratory Management
- `phase-2-radiology` - Radiology (USG)
- `phase-2-inventory` - Inventory Management

### Phase 3: Supporting Modules (Weeks 9-12)
- `phase-3-ot` - Operation Theatre
- `phase-3-prescription` - E-Prescription
- `phase-3-hr` - HR & Payroll
- `phase-3-reports` - Reports & MIS

## 🏗️ Project Structure

```
dr-haiat-hms/
├── packages/
│   └── shared-types/          # Shared TypeScript types
│       ├── src/
│       │   ├── common.types.ts
│       │   ├── user.types.ts
│       │   ├── patient.types.ts
│       │   └── ...
│       └── package.json
│
├── backend/                   # NestJS API (To be created)
│   ├── src/
│   ├── prisma/
│   └── package.json
│
├── frontend/                  # React App (To be created)
│   ├── src/
│   │   ├── features/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── lib/
│   └── package.json
│
└── Docs/                      # Documentation
```

## 🛠️ Development Commands

### Root Level
```bash
# Install all dependencies
pnpm install

# Run both frontend and backend
pnpm run dev

# Build all packages
pnpm run build

# Lint code
pnpm run lint
```

### Shared Types
```bash
cd packages/shared-types

# Build types
pnpm run build

# Watch mode (auto-rebuild on changes)
pnpm run dev
```

### Backend (Once created)
```bash
cd backend

# Development mode
pnpm run start:dev

# Build
pnpm run build

# Run tests
pnpm run test

# Prisma commands
pnpm prisma migrate dev
pnpm prisma studio
```

### Frontend (Once created)
```bash
cd frontend

# Development mode
pnpm run dev

# Build
pnpm run build

# Preview build
pnpm run preview
```

## 📝 Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(scope): add new feature
fix(scope): fix bug
docs(scope): update documentation
style(scope): code formatting
refactor(scope): code refactoring
test(scope): add tests
chore(scope): maintenance tasks
```

**Examples:**
```bash
git commit -m "feat(auth): implement login endpoint"
git commit -m "fix(patients): resolve search filter bug"
git commit -m "docs(readme): update installation steps"
```

## 🔄 Typical Development Flow

### 1. Start New Feature
```bash
# Update dev branch
git checkout dev
git pull origin dev

# Create feature branch
git checkout -b phase-1-patients

# Install dependencies if needed
pnpm install
```

### 2. Develop Feature
```bash
# Update shared types if needed
cd packages/shared-types
# Make changes to types
pnpm run build

# Develop backend
cd ../../backend
pnpm run start:dev
# Implement API endpoints

# Develop frontend
cd ../frontend
pnpm run dev
# Implement UI components
```

### 3. Test Integration
```bash
# Ensure backend is running
cd backend
pnpm run start:dev

# In another terminal, run frontend
cd frontend
pnpm run dev

# Test the feature end-to-end
```

### 4. Commit & Push
```bash
# Add all changes
git add .

# Commit with meaningful message
git commit -m "feat(patients): implement patient CRUD operations"

# Push to remote
git push origin phase-1-patients
```

### 5. Create Pull Request
- Go to GitHub repository
- Create PR from `phase-1-patients` to `dev`
- Add description of changes
- Request review if needed
- Merge after approval

## 🔐 Environment Variables

### Backend `.env`
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/drhaiat_hms"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=1d

# Server
PORT=3000
NODE_ENV=development
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:3000
VITE_USE_MOCK=false
```

## 📚 Resources

### Documentation
- NestJS: https://docs.nestjs.com/
- React: https://react.dev/
- Prisma: https://www.prisma.io/docs
- TanStack Query: https://tanstack.com/query/latest

### Tools
- Postman/Insomnia for API testing
- Prisma Studio for database viewing
- React DevTools for frontend debugging

## ⚠️ Important Notes

1. **Always build shared-types** before running backend/frontend if you've made changes to types
2. **Never commit `.env` files** - they're in .gitignore
3. **Run migrations** after pulling backend changes
4. **Test thoroughly** before creating PR
5. **Keep branches up-to-date** with dev branch

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 3000 (backend)
npx kill-port 3000

# Kill process on port 5173 (frontend)
npx kill-port 5173
```

### Prisma issues
```bash
# Reset database
pnpm prisma migrate reset

# Generate Prisma client
pnpm prisma generate
```

### Type errors
```bash
# Rebuild shared types
cd packages/shared-types
pnpm run build
```

---

**Happy Coding! 🎉**
