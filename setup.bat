@echo off
REM Employee Happiness Radar - Complete Setup Script (Windows)
REM This script will set up both backend and frontend from scratch

echo.
echo ============================================
echo Employee Happiness Radar - Complete Setup
echo ============================================
echo.

REM Check Node.js
echo [92mChecking prerequisites...[0m
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [91mNode.js is not installed. Please install Node.js first.[0m
    pause
    exit /b 1
)

echo [92mNode.js installed[0m
node --version
echo [92mnpm installed[0m
npm --version
echo.

REM Install backend dependencies
echo [93mInstalling backend dependencies...[0m
cd server
call npm install
if %errorlevel% neq 0 (
    echo [91mFailed to install backend dependencies[0m
    pause
    exit /b 1
)
echo [92mBackend dependencies installed[0m
echo.

REM Check if .env exists
if not exist ".env" (
    echo [93mCreating .env file...[0m
    (
        echo # Server Configuration
        echo PORT=5000
        echo NODE_ENV=development
        echo.
        echo # JWT Secret ^(Change this in production!^)
        echo JWT_SECRET=your-super-secret-jwt-key-employee-happiness-radar-2024
        echo.
        echo # Client URL for CORS
        echo CLIENT_URL=http://localhost:5173
        echo.
        echo # Database will be created automatically ^(SQLite^)
        echo # No additional configuration needed
    ) > .env
    echo [92m.env file created[0m
) else (
    echo [92m.env file already exists[0m
)
echo.

REM Seed database
echo [93mSeeding database with sample data...[0m
call npm run seed
if %errorlevel% neq 0 (
    echo [91mFailed to seed database[0m
    pause
    exit /b 1
)
echo [92mDatabase seeded successfully[0m
echo.

REM Return to root directory
cd ..

REM Install frontend dependencies
echo [93mInstalling frontend dependencies...[0m
call npm install
if %errorlevel% neq 0 (
    echo [91mFailed to install frontend dependencies[0m
    pause
    exit /b 1
)
echo [92mFrontend dependencies installed[0m
echo.

echo ============================================
echo [92mSetup Complete![0m
echo.
echo Sample Login Credentials:
echo.
echo    Admin:
echo       Email: admin@example.com
echo       Password: admin123
echo.
echo    Employee:
echo       Email: john@example.com
echo       Password: password123
echo.
echo Admin Invite Tokens ^(for creating new admins^):
echo    - ADMIN-INVITE-2025-MAIN
echo    - ADMIN-INVITE-HR-001
echo    - ADMIN-INVITE-EXEC-001
echo.
echo To start the application:
echo.
echo    Terminal 1 ^(Backend^):
echo    cd server
echo    npm start
echo.
echo    Terminal 2 ^(Frontend^):
echo    npm run dev
echo.
echo    Then open: http://localhost:5173
echo.
echo ============================================
pause
