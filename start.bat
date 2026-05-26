@echo off
REM Employee Happiness Radar - Start Script (Windows)
REM This script helps you start both backend and frontend servers

echo.
echo ============================================
echo Employee Happiness Radar - Quick Start
echo ============================================
echo.

REM Check if setup has been run
if not exist "server\.env" (
    echo [91mSetup not complete![0m
    echo.
    echo Please run setup first:
    echo   setup.bat
    echo.
    pause
    exit /b 1
)

if not exist "server\node_modules" (
    echo [91mDependencies not installed![0m
    echo.
    echo Please run setup first:
    echo   setup.bat
    echo.
    pause
    exit /b 1
)

if not exist "server\database.sqlite" (
    echo [93mDatabase not found. Creating database...[0m
    cd server
    call npm run seed
    cd ..
    echo.
)

echo [94mStarting servers...[0m
echo.

REM Create a batch file to start backend
echo @echo off > temp_backend.bat
echo cd server >> temp_backend.bat
echo npm start >> temp_backend.bat
echo pause >> temp_backend.bat

REM Create a batch file to start frontend
echo @echo off > temp_frontend.bat
echo npm run dev >> temp_frontend.bat
echo pause >> temp_frontend.bat

REM Start backend in new window
echo [93mStarting backend server...[0m
start "Employee Happiness Radar - Backend" temp_backend.bat

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

echo [92mBackend running on http://localhost:5000[0m
echo.

REM Start frontend in new window
echo [93mStarting frontend server...[0m
start "Employee Happiness Radar - Frontend" temp_frontend.bat

REM Wait a bit for frontend to start
timeout /t 3 /nobreak >nul

echo [92mFrontend running on http://localhost:5173[0m
echo.

REM Clean up temp files
del temp_backend.bat
del temp_frontend.bat

echo ============================================
echo [92mApplication is running![0m
echo.
echo Default Login Credentials:
echo.
echo    Admin:
echo       Email: admin@example.com
echo       Password: admin123
echo.
echo    Employee:
echo       Email: john@example.com
echo       Password: password123
echo.
echo Open your browser:
echo    http://localhost:5173
echo.
echo Close the Backend and Frontend windows to stop servers
echo ============================================
echo.
pause
