#!/bin/bash

# Employee Happiness Radar - Complete Setup Script
# This script will set up both backend and frontend from scratch

echo "🚀 Employee Happiness Radar - Complete Setup"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Node.js
echo -e "${YELLOW}📦 Checking prerequisites...${NC}"
if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js installed: $(node --version)${NC}"
echo -e "${GREEN}✅ npm installed: $(npm --version)${NC}"
echo ""

# Install backend dependencies
echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
cd server
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Backend dependencies installed${NC}"
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚙️  Creating .env file...${NC}"
    cat > .env << 'EOF'
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (Change this in production!)
JWT_SECRET=your-super-secret-jwt-key-employee-happiness-radar-2024

# Client URL for CORS
CLIENT_URL=http://localhost:5173

# Database will be created automatically (SQLite)
# No additional configuration needed
EOF
    echo -e "${GREEN}✅ .env file created${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi
echo ""

# Seed database
echo -e "${YELLOW}🌱 Seeding database with sample data...${NC}"
npm run seed
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to seed database${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Database seeded successfully${NC}"
echo ""

# Return to root directory
cd ..

# Install frontend dependencies
echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
echo ""

echo "=============================================="
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo ""
echo "📋 Sample Login Credentials:"
echo ""
echo "   👤 Admin:"
echo "      Email: admin@example.com"
echo "      Password: admin123"
echo ""
echo "   👨‍💼 Employee:"
echo "      Email: john@example.com"
echo "      Password: password123"
echo ""
echo "🔑 Admin Invite Tokens (for creating new admins):"
echo "   - ADMIN-INVITE-2025-MAIN"
echo "   - ADMIN-INVITE-HR-001"
echo "   - ADMIN-INVITE-EXEC-001"
echo ""
echo "🚀 To start the application:"
echo ""
echo "   Terminal 1 (Backend):"
echo "   $ cd server"
echo "   $ npm start"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   $ npm run dev"
echo ""
echo "   Then open: http://localhost:5173"
echo ""
echo "=============================================="
