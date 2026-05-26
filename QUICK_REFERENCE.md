# Quick Reference Card 🚀

**Employee Happiness Radar - Command Cheat Sheet**

---

## 🏁 First Time Setup

```bash
# macOS/Linux
./setup.sh

# Windows
setup.bat
```

---

## ▶️ Start Application

### Quick Start (Both Servers)
```bash
# macOS/Linux
./start.sh

# Windows
start.bat
```

### Manual Start (Two Terminals)
```bash
# Terminal 1 - Backend
cd server
npm start              # or: npm run dev

# Terminal 2 - Frontend
npm run dev
```

---

## 🌐 Access URLs

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

---

## 🔑 Default Logins

### Admin
```
Email:    admin@example.com
Password: admin123
```

### Employee
```
Email:    john@example.com
Password: password123
```

### Admin Tokens
```
ADMIN-INVITE-2025-MAIN
ADMIN-INVITE-HR-001
ADMIN-INVITE-EXEC-001
```

---

## 📦 Backend Commands

```bash
cd server

# Start & Development
npm start              # Start server
npm run dev            # Start with auto-restart

# Database
npm run seed           # Seed sample data
npm run view           # View database contents
npm run reset          # Reset database (macOS/Linux)
npm run reset:win      # Reset database (Windows)
npm run backup         # Backup database

# Testing
npm run test           # Test API

# Maintenance
npm install            # Install dependencies
npm run clean          # Clean node_modules (macOS/Linux)
npm run clean:win      # Clean node_modules (Windows)
npm run reinstall      # Reinstall (macOS/Linux)
npm run reinstall:win  # Reinstall (Windows)
```

---

## 🎨 Frontend Commands

```bash
# In project root

npm run dev            # Start dev server
npm run build          # Build for production
npm install            # Install dependencies
```

---

## ⚙️ Environment Files

### Create Environment Files
```bash
# Backend
cd server
cp .env.example .env      # macOS/Linux
copy .env.example .env    # Windows

# Frontend
cd ..
cp .env.example .env      # macOS/Linux
copy .env.example .env    # Windows
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🐛 Common Issues

### Port in use
```bash
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows (as Admin)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Cannot find module
```bash
# Backend
cd server
rm -rf node_modules package-lock.json
npm install

# Frontend
cd ..
rm -rf node_modules package-lock.json
npm install
```

### Database locked
```bash
cd server
npm run reset          # macOS/Linux
npm run reset:win      # Windows
```

### Network error
1. Check backend: http://localhost:5000/api/health
2. Check `CLIENT_URL` in `server/.env`
3. Restart both servers

---

## 📚 Documentation

| File | Description |
|------|-------------|
| [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md) | Complete setup instructions |
| [NODE_ENVIRONMENT_GUIDE.md](./NODE_ENVIRONMENT_GUIDE.md) | Node.js environment guide |
| [ENVIRONMENT_SETUP_COMPLETE.md](./ENVIRONMENT_SETUP_COMPLETE.md) | Environment setup summary |
| [README.md](./README.md) | Project overview |
| [QUICK_START.md](./QUICK_START.md) | 5-minute quick start |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | Common issues |

---

## 🔐 Security Notes

❌ **Never commit:**
- `.env` files
- `database.sqlite`
- `node_modules/`

✅ **Always commit:**
- `.env.example` files
- `package.json`
- `package-lock.json`

---

## 🚀 Production Deployment

### Checklist
- [ ] Generate secure JWT_SECRET
- [ ] Set `NODE_ENV=production`
- [ ] Update `CLIENT_URL` to production URL
- [ ] Update `VITE_API_URL` to production API
- [ ] Build frontend: `npm run build`
- [ ] Set up database backups
- [ ] Enable HTTPS
- [ ] Configure monitoring

### Generate Secure Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 📁 Project Structure

```
employee-happiness-radar/
├── .env                      # Frontend config
├── .env.example              # Frontend template
├── package.json              # Frontend deps
├── src/                      # React app
│
└── server/
    ├── .env                  # Backend config
    ├── .env.example          # Backend template
    ├── package.json          # Backend deps
    ├── server.js             # Express server
    ├── database.sqlite       # SQLite DB
    ├── models/               # DB models
    ├── routes/               # API routes
    └── utils/                # Utilities
```

---

## 💡 Pro Tips

1. **Use `npm run dev`** for development (auto-restart)
2. **Check health endpoint** to verify backend: http://localhost:5000/api/health
3. **View database** anytime: `cd server && npm run view`
4. **Backup database** before big changes: `cd server && npm run backup`
5. **Read the docs** - they're comprehensive and helpful!

---

## ❓ Need Help?

1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Read [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md)
3. Check console for error messages
4. Verify environment files exist
5. Try clean reinstall:
   ```bash
   cd server && npm run reinstall
   cd .. && npm install
   ```

---

**Print this page and keep it handy!** 📌

---

**Version:** 1.0.0 | **Last Updated:** March 3, 2026
