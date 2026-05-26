#!/bin/bash

# Employee Happiness Radar - System Diagnostic
# This script checks if everything is properly configured

echo ""
echo "🔍 Employee Happiness Radar - System Diagnostic"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

ERRORS=0
WARNINGS=0

# Check Node.js
echo "📦 Checking Node.js..."
if command -v node >/dev/null 2>&1; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js installed: $NODE_VERSION${NC}"
    
    # Extract major version number
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | tr -d 'v')
    if [ "$MAJOR_VERSION" -lt 16 ]; then
        echo -e "${RED}⚠️  Node.js version should be 16 or higher${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e "${RED}❌ Node.js not installed${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check npm
echo ""
echo "📦 Checking npm..."
if command -v npm >/dev/null 2>&1; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✅ npm installed: $NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm not installed${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check backend directory
echo ""
echo "📁 Checking backend directory..."
if [ -d "server" ]; then
    echo -e "${GREEN}✅ Server directory exists${NC}"
else
    echo -e "${RED}❌ Server directory not found${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check backend package.json
echo ""
echo "📄 Checking backend package.json..."
if [ -f "server/package.json" ]; then
    echo -e "${GREEN}✅ Backend package.json exists${NC}"
else
    echo -e "${RED}❌ Backend package.json not found${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check backend node_modules
echo ""
echo "📦 Checking backend dependencies..."
if [ -d "server/node_modules" ]; then
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠️  Backend dependencies not installed${NC}"
    echo "   Run: cd server && npm install"
    WARNINGS=$((WARNINGS + 1))
fi

# Check .env file
echo ""
echo "⚙️  Checking .env file..."
if [ -f "server/.env" ]; then
    echo -e "${GREEN}✅ .env file exists${NC}"
    
    # Check for required variables
    if grep -q "JWT_SECRET" server/.env; then
        echo -e "${GREEN}✅ JWT_SECRET configured${NC}"
    else
        echo -e "${RED}❌ JWT_SECRET not found in .env${NC}"
        ERRORS=$((ERRORS + 1))
    fi
    
    if grep -q "PORT" server/.env; then
        echo -e "${GREEN}✅ PORT configured${NC}"
    else
        echo -e "${YELLOW}⚠️  PORT not configured (will use default 5000)${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
    
    if grep -q "CLIENT_URL" server/.env; then
        echo -e "${GREEN}✅ CLIENT_URL configured${NC}"
    else
        echo -e "${YELLOW}⚠️  CLIENT_URL not configured${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e "${RED}❌ .env file not found${NC}"
    echo "   The .env file should be created automatically,"
    echo "   but you can create it manually in server/.env"
    ERRORS=$((ERRORS + 1))
fi

# Check database
echo ""
echo "🗄️  Checking database..."
if [ -f "server/database.sqlite" ]; then
    echo -e "${GREEN}✅ SQLite database exists${NC}"
    
    # Check database size
    SIZE=$(ls -lh server/database.sqlite | awk '{print $5}')
    echo "   Database size: $SIZE"
    
    if [ "$SIZE" = "0" ] || [ "$SIZE" = "0B" ]; then
        echo -e "${YELLOW}⚠️  Database is empty${NC}"
        echo "   Run: cd server && npm run seed"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e "${YELLOW}⚠️  Database not found${NC}"
    echo "   Run: cd server && npm run seed"
    WARNINGS=$((WARNINGS + 1))
fi

# Check frontend package.json
echo ""
echo "📄 Checking frontend package.json..."
if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ Frontend package.json exists${NC}"
else
    echo -e "${RED}❌ Frontend package.json not found${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check frontend node_modules
echo ""
echo "📦 Checking frontend dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠️  Frontend dependencies not installed${NC}"
    echo "   Run: npm install"
    WARNINGS=$((WARNINGS + 1))
fi

# Check key backend files
echo ""
echo "📄 Checking key backend files..."
FILES=(
    "server/server.js"
    "server/config/database.js"
    "server/models/User.js"
    "server/routes/auth.js"
    "server/utils/seed.js"
)

for FILE in "${FILES[@]}"; do
    if [ -f "$FILE" ]; then
        echo -e "${GREEN}✅ $FILE${NC}"
    else
        echo -e "${RED}❌ $FILE not found${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done

# Check key frontend files
echo ""
echo "📄 Checking key frontend files..."
FILES=(
    "src/app/App.jsx"
    "src/services/api.js"
    "src/services/authService.js"
)

for FILE in "${FILES[@]}"; do
    if [ -f "$FILE" ]; then
        echo -e "${GREEN}✅ $FILE${NC}"
    else
        echo -e "${RED}❌ $FILE not found${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done

# Check if ports are available
echo ""
echo "🔌 Checking ports..."

# Check port 5000 (backend)
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Port 5000 is already in use${NC}"
    echo "   Backend is either running or another process is using port 5000"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}✅ Port 5000 is available (backend)${NC}"
fi

# Check port 5173 (frontend)
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Port 5173 is already in use${NC}"
    echo "   Frontend is either running or another process is using port 5173"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}✅ Port 5173 is available (frontend)${NC}"
fi

# Summary
echo ""
echo "================================================"
echo "📊 DIAGNOSTIC SUMMARY"
echo "================================================"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed! Your system is ready.${NC}"
    echo ""
    echo "To start the application:"
    echo ""
    echo "   Terminal 1 (Backend):"
    echo "   $ cd server"
    echo "   $ npm start"
    echo ""
    echo "   Terminal 2 (Frontend):"
    echo "   $ npm run dev"
    echo ""
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  $WARNINGS warning(s) found${NC}"
    echo ""
    echo "Your system should work, but there are some recommendations above."
    echo ""
else
    echo -e "${RED}❌ $ERRORS error(s) found${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠️  $WARNINGS warning(s) found${NC}"
    fi
    echo ""
    echo "Please fix the errors above before running the application."
    echo ""
fi

# Recommendations
if [ $ERRORS -gt 0 ] || [ $WARNINGS -gt 0 ]; then
    echo "💡 RECOMMENDED ACTIONS:"
    echo ""
    
    if [ ! -d "server/node_modules" ]; then
        echo "   1. Install backend dependencies:"
        echo "      $ cd server && npm install"
        echo ""
    fi
    
    if [ ! -d "node_modules" ]; then
        echo "   2. Install frontend dependencies:"
        echo "      $ npm install"
        echo ""
    fi
    
    if [ ! -f "server/.env" ]; then
        echo "   3. Create .env file:"
        echo "      $ Run the setup.sh script"
        echo ""
    fi
    
    if [ ! -f "server/database.sqlite" ] || [ "$SIZE" = "0" ] || [ "$SIZE" = "0B" ]; then
        echo "   4. Seed the database:"
        echo "      $ cd server && npm run seed"
        echo ""
    fi
    
    echo "   Or run the automated setup:"
    echo "   $ chmod +x setup.sh && ./setup.sh"
    echo ""
fi

echo "================================================"
echo ""

exit 0
