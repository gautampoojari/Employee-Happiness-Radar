# Troubleshooting Guide 🔧

## Common Issues and Solutions

### Installation Issues

#### ❌ "npm install" fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### ❌ "Module not found" errors
**Solution:**
```bash
# Make sure all dependencies are installed
npm install

# If specific package is missing
npm install [package-name]
```

---

## Authentication Issues

### Admin Signup

#### ❌ "Token has already been used"
**Problem:** You tried to use a token that's already been used.

**Solution:**
- Use a different default token (3 available)
- OR login as an existing admin and generate a new token in Settings

#### ❌ "Token has expired"
**Problem:** Token expiry date has passed.

**Solution:**
- Use a different default token
- OR generate a new token from Admin Settings

#### ❌ "Invalid invite token"
**Problem:** Token format is incorrect or has typos.

**Solution:**
- Copy token exactly from Admin Signup page or ADMIN_TOKENS.txt
- Don't add extra spaces
- Tokens are case-sensitive

#### ❌ "Admin with this email already exists"
**Problem:** You're trying to create an admin with an email that's already registered.

**Solution:**
- Use a different email address
- OR clear all data: Open browser console → `localStorage.clear()` → Refresh

### Employee Signup

#### ❌ "Employee with this email already exists"
**Solution:**
- Use a different email
- OR clear localStorage and start fresh

#### ❌ "Passwords do not match"
**Solution:**
- Make sure Password and Confirm Password fields match exactly
- Check for extra spaces

### Login Issues

#### ❌ "Invalid credentials"
**Problem:** Email or password is wrong.

**Solution:**
- Double-check email and password
- Password is case-sensitive
- If you forgot password, you need to create a new account (no password reset in demo)

#### ❌ Stuck on loading screen
**Solution:**
```bash
# Open browser console (F12)
# Check for errors
# Try clearing localStorage
localStorage.clear();
# Refresh page
```

---

## Dashboard Issues

### Admin Dashboard

#### ❌ Dashboard shows 0 employees
**Problem:** No employees have signed up yet.

**Solution:**
1. Create an employee account
2. Refresh admin dashboard
3. Employee should appear

#### ❌ No burnout alerts showing
**Problem:** No employee has triggered burnout conditions.

**Solution to test:**
1. Login as employee
2. Submit 3 check-ins with:
   - Stress = 5
   - Motivation = 1
3. Refresh admin dashboard
4. Alert should appear

#### ❌ Charts are empty
**Problem:** No mood check-in data exists.

**Solution:**
1. Login as employee
2. Submit mood check-ins
3. Refresh admin dashboard
4. Charts will populate

### Employee Dashboard

#### ❌ Streak not increasing
**Problem:** Streak only increases once per day.

**Solution:**
- If you already checked in today, streak won't increase until tomorrow
- Streaks are based on calendar days, not 24-hour periods
- Missing a full day resets the streak

#### ❌ Can't submit mood check-in
**Problem:** Department is required.

**Solution:**
- Make sure to select a department from the dropdown
- All fields except notes are required

#### ❌ Surveys not showing
**Problem:** No active surveys exist.

**Solution:**
1. Login as admin
2. Go to Surveys tab
3. Create and publish a survey
4. Login back as employee
5. Survey should appear

---

## Data Issues

### ❌ Data disappeared after refresh
**Problem:** Unlikely with localStorage, but possible if browser clears data.

**Solution:**
- Check if you're in incognito/private mode (data clears on close)
- Use normal browser mode
- Check browser settings for cookie/storage policies

### ❌ Want to reset all data
**Solution:**
```javascript
// Open browser console (F12)
localStorage.clear();
// Refresh page
location.reload();
```

### ❌ Corrupted data / weird behavior
**Solution:**
```javascript
// Clear specific keys
localStorage.removeItem('hr_employees');
localStorage.removeItem('hr_admins');
localStorage.removeItem('hr_mood_checkins');
localStorage.removeItem('hr_surveys');
localStorage.removeItem('hr_survey_responses');
localStorage.removeItem('hr_feedback');

// Or clear everything
localStorage.clear();
location.reload();
```

---

## UI Issues

### ❌ Dark mode not working
**Solution:**
- Click the sun/moon icon in header
- Theme should toggle
- Preference is saved in localStorage
- If stuck, clear localStorage and try again

### ❌ Charts not rendering
**Problem:** Recharts might not be loaded.

**Solution:**
```bash
# Reinstall recharts
npm install recharts
```

### ❌ Emojis not displaying
**Solution:**
- Make sure you're using a modern browser
- Update your operating system for latest emoji support
- Chrome, Firefox, Safari, and Edge all support emojis

### ❌ Layout looks broken
**Solutions:**
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Check if CSS is loading (open DevTools → Network tab)
4. Restart dev server: `npm run dev`

---

## Browser-Specific Issues

### Chrome
- Usually works best
- If issues, try incognito mode
- Check for extensions that might block localStorage

### Firefox
- May have strict privacy settings
- Check: Preferences → Privacy & Security → Cookies and Site Data
- Allow site to store data

### Safari
- May block localStorage in private mode
- Use normal browsing mode
- Check: Preferences → Privacy → Prevent cross-site tracking

### Edge
- Similar to Chrome
- Usually no issues
- Clear cache if problems occur

---

## Performance Issues

### ❌ App running slow
**Solutions:**
1. Clear localStorage (too much data)
2. Close other browser tabs
3. Restart browser
4. Check CPU usage (close other apps)

### ❌ Charts laggy
**Solution:**
- Reduce time range in analytics (use 7 days instead of 30)
- Clear old check-in data
- Restart browser

---

## Development Issues

### ❌ Hot reload not working
**Solution:**
```bash
# Stop the dev server (Ctrl+C)
# Restart
npm run dev
```

### ❌ Changes not showing
**Solution:**
1. Hard refresh browser
2. Clear browser cache
3. Check if file is saved
4. Restart dev server

### ❌ Build fails
**Solution:**
```bash
# Check for syntax errors
npm run build

# If errors, check console output
# Fix any errors shown
# Try again
```

---

## Data Inspection

### View localStorage data
```javascript
// Open browser console (F12)

// View all admins
console.log(JSON.parse(localStorage.getItem('hr_admins')));

// View all employees
console.log(JSON.parse(localStorage.getItem('hr_employees')));

// View all check-ins
console.log(JSON.parse(localStorage.getItem('hr_mood_checkins')));

// View all surveys
console.log(JSON.parse(localStorage.getItem('hr_surveys')));

// View all feedback
console.log(JSON.parse(localStorage.getItem('hr_feedback')));

// View admin tokens
console.log(JSON.parse(localStorage.getItem('admin_invite_tokens')));

// View current session
console.log(localStorage.getItem('hr_admin'));
console.log(localStorage.getItem('hr_employee'));
```

### Manually add test data
```javascript
// Add a test employee
const employees = JSON.parse(localStorage.getItem('hr_employees') || '[]');
employees.push({
  id: 'emp_' + Date.now(),
  name: 'Test Employee',
  email: 'test@test.com',
  password: 'test123',
  department: 'Engineering',
  createdAt: Date.now(),
  streak: 5,
  lastCheckIn: new Date().toISOString().split('T')[0]
});
localStorage.setItem('hr_employees', JSON.stringify(employees));
location.reload();
```

---

## Getting More Help

### Check Console for Errors
1. Press F12 to open DevTools
2. Click "Console" tab
3. Look for red error messages
4. Error messages usually tell you what's wrong

### Check Network Tab
1. Press F12 to open DevTools
2. Click "Network" tab
3. Check if any requests are failing

### Verify Installation
```bash
# Check Node version (should be 14+)
node --version

# Check npm version
npm --version

# Check if all packages installed
npm list
```

---

## Emergency Reset

If nothing works, complete reset:

```bash
# 1. Clear browser data
# Browser → Settings → Clear browsing data → Cached images and cookies

# 2. Delete project node_modules
rm -rf node_modules package-lock.json

# 3. Reinstall
npm install

# 4. Start fresh
npm run dev

# 5. In browser, clear localStorage
localStorage.clear();
location.reload();
```

---

## Still Having Issues?

1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions
2. Review [FEATURES_CHECKLIST.md](./FEATURES_CHECKLIST.md) for feature status
3. Make sure you're using JavaScript files (.jsx) not TypeScript (.tsx)
4. Verify all dependencies in package.json are installed
5. Check that you're running the latest version of Node.js

---

## Known Limitations

✓ This is a demo app using localStorage (not a production backend)  
✓ Data is stored per browser (not synced across devices)  
✓ Private/incognito mode clears data on browser close  
✓ No password recovery (create new account if forgotten)  
✓ Limited to browser storage capacity (~10MB)  
✓ No real-time updates (manual refresh needed in some cases)  

---

**Remember**: Most issues can be solved by clearing localStorage and starting fresh!

```javascript
localStorage.clear();
location.reload();
```
