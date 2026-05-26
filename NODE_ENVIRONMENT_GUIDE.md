# Node.js Environment Management Guide 🔧

A comprehensive guide to managing your Node.js development environment for the Employee Happiness Radar application.

## 📋 Table of Contents

1. [Understanding Node.js Environments](#understanding-nodejs-environments)
2. [Environment Variables](#environment-variables)
3. [Managing Dependencies](#managing-dependencies)
4. [Version Management](#version-management)
5. [Development vs Production](#development-vs-production)
6. [Best Practices](#best-practices)

---

## 🌍 Understanding Node.js Environments

Unlike Python's virtual environments (venv), Node.js uses a **project-based dependency system** through npm (Node Package Manager).

### Key Differences from Python:

| Aspect | Python (venv) | Node.js (npm) |
|--------|--------------|---------------|
| **Dependencies** | Global or venv-isolated | Per-project in `node_modules/` |
| **Activation** | `source venv/bin/activate` | No activation needed |
| **Package file** | `requirements.txt` | `package.json` |
| **Lock file** | `requirements.txt` | `package-lock.json` |
| **Isolation** | Virtual environment | Project directory |

### How Node.js Manages Dependencies:

```
project-root/
├── package.json          # Defines dependencies and scripts
├── package-lock.json     # Locks exact versions
└── node_modules/         # Contains all installed packages
    ├── express/
    ├── react/
    └── ... (500+ packages)
```

**No activation required!** Dependencies are automatically loaded from `node_modules/` when you run the application.

---

## ⚙️ Environment Variables

Environment variables control application behavior without changing code.

### What are Environment Variables?

Environment variables are key-value pairs stored outside your code:

```bash
PORT=5000
NODE_ENV=development
JWT_SECRET=my-secret-key
```

### Why Use Environment Variables?

✅ **Security:** Keep secrets out of source code  
✅ **Flexibility:** Change behavior without code changes  
✅ **Portability:** Different settings for dev/prod  
✅ **Best Practice:** Industry-standard approach  

### File Structure:

```
project-root/
├── .env                  # Frontend environment (your local settings)
├── .env.example          # Frontend template (committed to git)
└── server/
    ├── .env              # Backend environment (your local settings)
    └── .env.example      # Backend template (committed to git)
```

### Creating Environment Files:

#### Backend Environment:

```bash
# Navigate to backend directory
cd server

# Copy template
cp .env.example .env

# On Windows:
copy .env.example .env
```

**Edit `server/.env`:**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Security
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# CORS
CLIENT_URL=http://localhost:5173
```

#### Frontend Environment:

```bash
# In project root
cp .env.example .env

# On Windows:
copy .env.example .env
```

**Edit `.env`:**
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Application
VITE_APP_NAME=Employee Happiness Radar
VITE_ENABLE_DEBUG_MODE=false
```

### Important Notes:

⚠️ **Frontend variables must start with `VITE_`**  
⚠️ **Never commit `.env` files to git** (add to `.gitignore`)  
⚠️ **Always commit `.env.example` files** (as templates)  
⚠️ **Restart servers after changing `.env` files**  

### How to Use Environment Variables:

**Backend (Node.js):**
```javascript
// Access any environment variable
const port = process.env.PORT || 5000;
const secret = process.env.JWT_SECRET;
```

**Frontend (Vite/React):**
```javascript
// Only VITE_ prefixed variables are exposed
const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_APP_NAME;
```

---

## 📦 Managing Dependencies

### Understanding package.json

The `package.json` file defines your project's dependencies and scripts:

```json
{
  "name": "employee-happiness-radar",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.21.2",
    "react": "18.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}
```

### Types of Dependencies:

1. **dependencies** - Required for production
   ```bash
   npm install express
   ```

2. **devDependencies** - Only for development
   ```bash
   npm install --save-dev nodemon
   ```

### Common npm Commands:

```bash
# Install all dependencies from package.json
npm install

# Install a new package
npm install package-name

# Install a dev dependency
npm install --save-dev package-name

# Install specific version
npm install package-name@1.2.3

# Uninstall a package
npm uninstall package-name

# Update all packages
npm update

# Check for outdated packages
npm outdated

# View installed packages
npm list --depth=0

# Clear npm cache
npm cache clean --force
```

### Understanding package-lock.json:

- **Auto-generated** when you run `npm install`
- **Locks exact versions** of all dependencies
- **Commit to git** for consistent builds
- **Don't edit manually**

### Cleaning and Reinstalling:

If you encounter dependency issues:

```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# On Windows:
rmdir /s node_modules
del package-lock.json

# Reinstall everything
npm install
```

### Project Structure:

```
employee-happiness-radar/
├── package.json              # Frontend dependencies
├── package-lock.json         # Frontend lock file
├── node_modules/             # Frontend packages (500+ packages)
│
└── server/
    ├── package.json          # Backend dependencies
    ├── package-lock.json     # Backend lock file
    └── node_modules/         # Backend packages (150+ packages)
```

**Note:** Each directory (root and server) has its own dependencies!

---

## 🔄 Version Management

### Node.js Version Management

Use **nvm** (Node Version Manager) to manage multiple Node.js versions:

#### Installing nvm:

**macOS/Linux:**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

**Windows:**
- Download nvm-windows: https://github.com/coreybutler/nvm-windows/releases

#### Using nvm:

```bash
# Install a specific Node.js version
nvm install 18.17.0

# Use a specific version
nvm use 18.17.0

# Set default version
nvm alias default 18.17.0

# List installed versions
nvm list

# List available versions
nvm list available

# Install LTS version
nvm install --lts
```

### Recommended Versions:

For Employee Happiness Radar:

```
Node.js:  v18.17.0 or higher (LTS recommended)
npm:      v8.0.0 or higher (comes with Node.js)
```

### Checking Versions:

```bash
# Current versions
node --version      # v18.17.0
npm --version       # 9.6.7

# Package versions
npm list express    # Backend
npm list react      # Frontend
```

### Creating .nvmrc (Optional):

Create a file to specify Node.js version:

```bash
# In project root
echo "18.17.0" > .nvmrc

# Use the version
nvm use
```

---

## 🔀 Development vs Production

### Development Environment

**Purpose:** Local development and testing

**Characteristics:**
- ✅ Hot-reloading (auto-restart on file changes)
- ✅ Detailed error messages
- ✅ Source maps for debugging
- ✅ Unminified code
- ✅ DevTools enabled

**Configuration:**

**Backend (`server/.env`):**
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=dev-secret-key
CLIENT_URL=http://localhost:5173
```

**Frontend (`.env`):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_ENABLE_DEBUG_MODE=true
```

**Running in Development:**
```bash
# Backend (with auto-restart)
cd server
npm run dev          # Uses nodemon

# Frontend (with hot-reload)
npm run dev          # Uses Vite
```

### Production Environment

**Purpose:** Deployed application for end users

**Characteristics:**
- ✅ Optimized and minified code
- ✅ No source maps
- ✅ Secure configurations
- ✅ Error logging to files
- ✅ Performance optimizations

**Configuration:**

**Backend (`server/.env`):**
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=super-secure-random-64-character-string-change-this
CLIENT_URL=https://your-domain.com
```

**Frontend (`.env`):**
```env
VITE_API_URL=https://api.your-domain.com/api
VITE_ENABLE_DEBUG_MODE=false
```

**Building for Production:**
```bash
# Frontend
npm run build        # Creates /dist folder with optimized files

# Backend
npm start            # Runs without nodemon
```

### Environment Comparison:

| Feature | Development | Production |
|---------|-------------|------------|
| **Hot Reload** | ✅ Yes | ❌ No |
| **Error Details** | ✅ Full stack traces | ❌ Generic messages |
| **Code Size** | Large (unminified) | Small (minified) |
| **Speed** | Slower | Faster |
| **Debugging** | Easy | Difficult |
| **Security** | Relaxed | Strict |

---

## 🏆 Best Practices

### 1. **Never Commit Secrets**

❌ **Bad:**
```javascript
const JWT_SECRET = "my-secret-123";  // In source code
```

✅ **Good:**
```javascript
const JWT_SECRET = process.env.JWT_SECRET;  // From .env
```

**Add to `.gitignore`:**
```
.env
.env.local
.env.*.local
node_modules/
database.sqlite
*.log
```

### 2. **Use Environment Templates**

Always commit `.env.example` files:

```bash
# .env.example (committed)
PORT=5000
JWT_SECRET=your-secret-here

# .env (NOT committed)
PORT=5000
JWT_SECRET=actual-secret-xyz123
```

### 3. **Keep Dependencies Updated**

```bash
# Check for updates
npm outdated

# Update safely (respects semantic versioning)
npm update

# Update to latest major versions (careful!)
npm install package@latest
```

### 4. **Separate Dev and Prod Dependencies**

```bash
# Production dependencies
npm install express

# Development-only dependencies
npm install --save-dev nodemon
```

### 5. **Use Lock Files**

✅ **Always commit `package-lock.json`**  
✅ **Use `npm ci` in CI/CD** (faster, stricter)  
✅ **Don't edit lock files manually**  

### 6. **Document Environment Variables**

Always document required variables:

**README.md:**
```markdown
## Required Environment Variables

### Backend (`server/.env`):
- `PORT` - Server port (default: 5000)
- `JWT_SECRET` - JWT signing key (required)
- `CLIENT_URL` - Frontend URL for CORS

### Frontend (`.env`):
- `VITE_API_URL` - Backend API URL
```

### 7. **Security Checklist**

Before deploying to production:

- [ ] Change JWT_SECRET to secure random string
- [ ] Set NODE_ENV=production
- [ ] Use HTTPS for all URLs
- [ ] Enable rate limiting
- [ ] Set up error monitoring
- [ ] Configure proper CORS
- [ ] Remove debug/development code
- [ ] Use environment-specific configs

### 8. **Project Organization**

```
project-root/
├── .env                    # Frontend env (local only)
├── .env.example            # Frontend template (committed)
├── .gitignore              # Ignore .env, node_modules
├── package.json            # Frontend dependencies
├── node_modules/           # Frontend packages (git ignored)
│
└── server/
    ├── .env                # Backend env (local only)
    ├── .env.example        # Backend template (committed)
    ├── package.json        # Backend dependencies
    └── node_modules/       # Backend packages (git ignored)
```

### 9. **Troubleshooting Dependencies**

If you have issues:

1. **Delete and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   npm install
   ```

3. **Check Node.js version:**
   ```bash
   node --version  # Should be v16+ 
   ```

4. **Update npm:**
   ```bash
   npm install -g npm@latest
   ```

### 10. **Running Multiple Environments**

You can have multiple environment files:

```
.env                  # Default
.env.local            # Local overrides
.env.development      # Development
.env.production       # Production
.env.test             # Testing
```

**Load specific environment:**
```bash
# Using cross-env (install: npm i cross-env)
cross-env NODE_ENV=production npm start
```

---

## 🚀 Quick Reference

### Essential Commands:

```bash
# Setup (one-time)
npm install                    # Install dependencies
cp .env.example .env           # Create environment file

# Development
npm run dev                    # Start dev server (frontend)
cd server && npm run dev       # Start dev server (backend)

# Production
npm run build                  # Build frontend
npm start                      # Start production server

# Maintenance
npm update                     # Update packages
npm outdated                   # Check for updates
npm audit                      # Check security issues
npm audit fix                  # Fix security issues
```

### File Checklist:

✅ `package.json` - Dependencies and scripts  
✅ `package-lock.json` - Locked versions (commit)  
✅ `node_modules/` - Installed packages (ignore)  
✅ `.env` - Your local config (ignore)  
✅ `.env.example` - Template (commit)  
✅ `.gitignore` - Files to ignore  

---

## 📚 Additional Resources

### Official Documentation:
- **Node.js:** https://nodejs.org/docs
- **npm:** https://docs.npmjs.com
- **Vite:** https://vitejs.dev
- **Express:** https://expressjs.com

### Tools:
- **nvm:** https://github.com/nvm-sh/nvm
- **nvm-windows:** https://github.com/coreybutler/nvm-windows
- **nodemon:** https://nodemon.io

### Learning Resources:
- **npm crash course:** https://www.youtube.com/watch?v=jHDhaSSKmB0
- **Environment variables:** https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html

---

## ❓ FAQ

### Q: Do I need to "activate" anything like Python's venv?

**A:** No! Node.js automatically uses dependencies from `node_modules/` in the current project directory.

### Q: Where are packages installed?

**A:** In the `node_modules/` folder in your project directory (not globally).

### Q: Why are there two package.json files?

**A:** The backend (`/server`) and frontend (`/`) are separate applications with different dependencies.

### Q: Do I need to install packages globally?

**A:** No, install locally per project. Global installs are only for CLI tools (e.g., `npm install -g vercel`).

### Q: What's the difference between npm and npx?

**A:** 
- `npm` - Package manager (install packages)
- `npx` - Package runner (run packages without installing)

### Q: How do I reset everything?

**A:**
```bash
# Delete everything
rm -rf node_modules package-lock.json server/node_modules server/package-lock.json

# Reinstall
npm install
cd server && npm install
```

---

**Last Updated:** March 3, 2026  
**Version:** 1.0.0
