#!/bin/bash

# Employee Happiness Radar - Start Script
# This script helps you start both backend and frontend servers

echo "🚀 Employee Happiness Radar - Quick Start"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if setup has been run
if [ ! -f "server/.env" ]; then
    echo -e "${RED}❌ Setup not complete!${NC}"
    echo ""
    echo "Please run setup first:"
    echo "  $ ./setup.sh"
    echo ""
    exit 1
fi

if [ ! -d "server/node_modules" ]; then
    echo -e "${RED}❌ Dependencies not installed!${NC}"
    echo ""
    echo "Please run setup first:"
    echo "  $ ./setup.sh"
    echo ""
    exit 1
fi

if [ ! -f "server/database.sqlite" ]; then
    echo -e "${YELLOW}⚠️  Database not found. Creating database...${NC}"
    cd server
    npm run seed
    cd ..
    echo ""
fi

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Stopping servers...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✅ Servers stopped${NC}"
    exit 0
}

# Trap CTRL+C
trap cleanup INT

echo -e "${BLUE}📋 Starting servers...${NC}"
echo ""

# Start backend
echo -e "${YELLOW}🔧 Starting backend server...${NC}"
cd server
npm start &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Check if backend is running
if ! ps -p $BACKEND_PID > /dev/null; then
    echo -e "${RED}❌ Backend failed to start${NC}"
    echo "Check server/database.sqlite exists and .env is configured"
    exit 1
fi

echo -e "${GREEN}✅ Backend running on http://localhost:5000${NC}"
echo ""

# Start frontend
echo -e "${YELLOW}🎨 Starting frontend server...${NC}"
npm run dev &
FRONTEND_PID=$!

# Wait for frontend to start
sleep 3

# Check if frontend is running
if ! ps -p $FRONTEND_PID > /dev/null; then
    echo -e "${RED}❌ Frontend failed to start${NC}"
    kill $BACKEND_PID
    exit 1
fi

echo -e "${GREEN}✅ Frontend running on http://localhost:5173${NC}"
echo ""

echo "=========================================="
echo -e "${GREEN}🎉 Application is running!${NC}"
echo ""
echo "📝 Default Login Credentials:"
echo ""
echo "   👤 Admin:"
echo "      Email: admin@example.com"
echo "      Password: admin123"
echo ""
echo "   👨‍💼 Employee:"
echo "      Email: john@example.com"
echo "      Password: password123"
echo ""
echo "🌐 Open your browser:"
echo "   http://localhost:5173"
echo ""
echo "⚠️  Press CTRL+C to stop both servers"
echo "=========================================="
echo ""

# Wait for both processes
wait
