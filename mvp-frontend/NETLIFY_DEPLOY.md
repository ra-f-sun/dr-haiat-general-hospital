# Netlify Deployment Guide

## 🚀 Deploy to Netlify (Two Methods)

### Method 1: Deploy via Netlify CLI (Recommended)

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Build the project
```bash
cd mvp-frontend
npm run build
```

#### Step 3: Deploy to Netlify
```bash
# Login to Netlify (will open browser)
netlify login

# Deploy (first time creates new site)
netlify deploy --prod --dir=dist
```

Follow the prompts:
- Create & configure a new site? **Yes**
- Team: Select your team
- Site name: `dr-haiat-hospital-mvp` (or your choice)
- The site will be deployed to: `https://dr-haiat-hospital-mvp.netlify.app`

---

### Method 2: Deploy via Netlify Web UI

#### Step 1: Build the project locally
```bash
cd mvp-frontend
npm run build
```
This creates a `dist/` folder with production files.

#### Step 2: Deploy via Netlify UI

1. **Go to [Netlify](https://app.netlify.com/)**
2. **Sign in / Sign up** with GitHub, GitLab, or email
3. **Click "Add new site" → "Deploy manually"**
4. **Drag and drop** the `dist` folder
5. **Done!** Your site is live at `https://[random-name].netlify.app`

---

### Method 3: Deploy from GitHub (Continuous Deployment)

#### Step 1: Connect GitHub Repository

1. Go to [Netlify](https://app.netlify.com/)
2. Click **"Add new site" → "Import an existing project"**
3. Select **GitHub** and authorize
4. Select your repository: `ra-f-sun/dr-haiat-general-hospital`
5. Select branch: `mvp-demo`

#### Step 2: Configure Build Settings

- **Base directory:** `mvp-frontend`
- **Build command:** `npm run build`
- **Publish directory:** `mvp-frontend/dist`

#### Step 3: Deploy

Click **"Deploy site"** - Netlify will automatically build and deploy!

**Every push to `mvp-demo` branch will auto-deploy** 🎉

---

## 📋 Configuration File (Optional but Recommended)

Create `netlify.toml` in the `mvp-frontend/` directory:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

This ensures:
- ✅ Correct build command
- ✅ SPA routing works (redirects to index.html)
- ✅ Uses Node.js 20

---

## 🔧 Post-Deployment Steps

### 1. Custom Domain (Optional)
- Go to **Site settings → Domain management**
- Click **"Add custom domain"**
- Follow instructions to configure DNS

### 2. Update Site Name
- Go to **Site settings → General → Site details**
- Click **"Change site name"**
- Enter: `dr-haiat-hospital-mvp`
- URL becomes: `https://dr-haiat-hospital-mvp.netlify.app`

### 3. Enable HTTPS (Automatic)
- Netlify automatically provisions SSL certificate
- Site is served over HTTPS

---

## ✅ Verification Checklist

After deployment, test:
- [ ] Login page loads
- [ ] Can login with any credentials
- [ ] Dashboard displays correctly
- [ ] Can navigate to all pages (Patients, OPD, Billing)
- [ ] "Load Sample Data" button works
- [ ] All CRUD operations work
- [ ] Data persists in localStorage
- [ ] Responsive on mobile/tablet

---

## 🐛 Troubleshooting

### Issue: 404 on page refresh
**Solution:** Add `netlify.toml` with redirects (see above)

### Issue: Build fails
**Solutions:**
1. Check Node.js version: `node --version` (should be 20+)
2. Clear cache: `rm -rf node_modules package-lock.json && npm install`
3. Build locally first: `npm run build`

### Issue: Blank page after deployment
**Solutions:**
1. Check browser console for errors
2. Verify base path in `vite.config.ts`
3. Check if assets are loading (Network tab)

---

## 📊 Current Build Info

- **Build tool:** Vite 7
- **Output directory:** `dist/`
- **Build size:** ~130 KB (gzipped)
- **Build time:** ~10 seconds
- **Node.js required:** 20+

---

## 🌐 Example Deployed URL

After deployment, your site will be available at:
```
https://[your-site-name].netlify.app
```

Example:
```
https://dr-haiat-hospital-mvp.netlify.app
```

---

## 🎯 Quick Deploy (One Command)

For quick deploys after initial setup:

```bash
# Build and deploy in one go
npm run build && netlify deploy --prod --dir=dist
```

---

## 📝 Notes

- **Free tier:** 100 GB bandwidth/month (more than enough for MVP demo)
- **Auto-deploys:** Available with GitHub integration
- **Preview deploys:** Get preview URLs for pull requests
- **Rollbacks:** Easy to rollback to previous deployments
- **Analytics:** Basic analytics included

---

**Ready to deploy? Choose your method above and get your MVP live in minutes!** 🚀
