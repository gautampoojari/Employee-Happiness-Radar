@echo off
REM Employee Happiness Radar - System Diagnostic (Windows)

echo.
echo ================================================
echo Employee Happiness Radar - System Diagnostic
echo ================================================
echo.

set ERRORS=0
set WARNINGS=0

REM Check Node.js
echo [93mChecking Node.js...[0m
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo [92mNode.js installed[0m
    node --version
) else (
    echo [91mNode.js not installed[0m
    set /a ERRORS+=1
)

REM Check npm
echo.
echo [93mChecking npm...[0m
where npm >nul 2>nul
if %errorlevel% equ 0 (
    echo [92mnpm installed[0m
    npm --version
) else (
    echo [91mnpm not installed[0m
    set /a ERRORS+=1
)

REM Check backend directory
echo.
echo [93mChecking backend directory...[0m
if exist "server\" (
    echo [92mServer directory exists[0m
) else (
    echo [91mServer directory not found[0m
    set /a ERRORS+=1
)

REM Check backend package.json
echo.
echo [93mChecking backend package.json...[0m
if exist "server\package.json" (
    echo [92mBackend package.json exists[0m
) else (
    echo [91mBackend package.json not found[0m
    set /a ERRORS+=1
)

REM Check backend node_modules
echo.
echo [93mChecking backend dependencies...[0m
if exist "server\node_modules\" (
    echo [92mBackend dependencies installed[0m
) else (
    echo [93mBackend dependencies not installed[0m
    echo    Run: cd server ^&^& npm install
    set /a WARNINGS+=1
)

REM Check .env file
echo.
echo [93mChecking .env file...[0m
if exist "server\.env" (
    echo [92m.env file exists[0m
    
    findstr /C:"JWT_SECRET" server\.env >nul
    if %errorlevel% equ 0 (
        echo [92mJWT_SECRET configured[0m
    ) else (
        echo [91mJWT_SECRET not found in .env[0m
        set /a ERRORS+=1
    )
    
    findstr /C:"PORT" server\.env >nul
    if %errorlevel% equ 0 (
        echo [92mPORT configured[0m
    ) else (
        echo [93mPORT not configured ^(will use default 5000^)[0m
        set /a WARNINGS+=1
    )
    
    findstr /C:"CLIENT_URL" server\.env >nul
    if %errorlevel% equ 0 (
        echo [92mCLIENT_URL configured[0m
    ) else (
        echo [93mCLIENT_URL not configured[0m
        set /a WARNINGS+=1
    )
) else (
    echo [91m.env file not found[0m
    echo    Run setup.bat to create it
    set /a ERRORS+=1
)

REM Check database
echo.
echo [93mChecking database...[0m
if exist "server\database.sqlite" (
    echo [92mSQLite database exists[0m
    for %%A in (server\database.sqlite) do (
        set SIZE=%%~zA
        echo    Database size: %%~zA bytes
    )
) else (
    echo [93mDatabase not found[0m
    echo    Run: cd server ^&^& npm run seed
    set /a WARNINGS+=1
)

REM Check frontend package.json
echo.
echo [93mChecking frontend package.json...[0m
if exist "package.json" (
    echo [92mFrontend package.json exists[0m
) else (
    echo [91mFrontend package.json not found[0m
    set /a ERRORS+=1
)

REM Check frontend node_modules
echo.
echo [93mChecking frontend dependencies...[0m
if exist "node_modules\" (
    echo [92mFrontend dependencies installed[0m
) else (
    echo [93mFrontend dependencies not installed[0m
    echo    Run: npm install
    set /a WARNINGS+=1
)

REM Check key backend files
echo.
echo [93mChecking key backend files...[0m
set FILES=server\server.js server\config\database.js server\models\User.js server\routes\auth.js server\utils\seed.js

for %%F in (%FILES%) do (
    if exist "%%F" (
        echo [92m%%F[0m
    ) else (
        echo [91m%%F not found[0m
        set /a ERRORS+=1
    )
)

REM Check key frontend files
echo.
echo [93mChecking key frontend files...[0m
set FILES=src\app\App.jsx src\services\api.js src\services\authService.js

for %%F in (%FILES%) do (
    if exist "%%F" (
        echo [92m%%F[0m
    ) else (
        echo [91m%%F not found[0m
        set /a ERRORS+=1
    )
)

REM Check if ports are available
echo.
echo [93mChecking ports...[0m

netstat -ano | findstr :5000 | findstr LISTENING >nul
if %errorlevel% equ 0 (
    echo [93mPort 5000 is already in use[0m
    echo    Backend is either running or another process is using port 5000
    set /a WARNINGS+=1
) else (
    echo [92mPort 5000 is available ^(backend^)[0m
)

netstat -ano | findstr :5173 | findstr LISTENING >nul
if %errorlevel% equ 0 (
    echo [93mPort 5173 is already in use[0m
    echo    Frontend is either running or another process is using port 5173
    set /a WARNINGS+=1
) else (
    echo [92mPort 5173 is available ^(frontend^)[0m
)

REM Summary
echo.
echo ================================================
echo DIAGNOSTIC SUMMARY
echo ================================================
echo.

if %ERRORS% equ 0 (
    if %WARNINGS% equ 0 (
        echo [92mAll checks passed! Your system is ready.[0m
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
    ) else (
        echo [93m%WARNINGS% warning^(s^) found[0m
        echo.
        echo Your system should work, but there are some recommendations above.
        echo.
    )
) else (
    echo [91m%ERRORS% error^(s^) found[0m
    if %WARNINGS% gtr 0 (
        echo [93m%WARNINGS% warning^(s^) found[0m
    )
    echo.
    echo Please fix the errors above before running the application.
    echo.
)

REM Recommendations
if %ERRORS% gtr 0 (
    echo RECOMMENDED ACTIONS:
    echo.
    
    if not exist "server\node_modules\" (
        echo    1. Install backend dependencies:
        echo       cd server ^&^& npm install
        echo.
    )
    
    if not exist "node_modules\" (
        echo    2. Install frontend dependencies:
        echo       npm install
        echo.
    )
    
    if not exist "server\.env" (
        echo    3. Create .env file:
        echo       Run setup.bat
        echo.
    )
    
    if not exist "server\database.sqlite" (
        echo    4. Seed the database:
        echo       cd server ^&^& npm run seed
        echo.
    )
    
    echo    Or run the automated setup:
    echo    setup.bat
    echo.
)

echo ================================================
echo.
pause
