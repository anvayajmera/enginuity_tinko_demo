#!/bin/bash

echo "🚀 Starting YSWS IoT Dashboard System..."
echo "========================================="

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Node.js is installed
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo ""

# Navigate to project directory
cd "$(dirname "$0")"
PROJECT_DIR=$(pwd)

echo "📍 Project directory: $PROJECT_DIR"
echo ""

# Install dependencies if needed
echo "📦 Checking dependencies..."

# WebSocket Server
echo "  - WebSocket Server..."
cd "$PROJECT_DIR/websocket-server"
if [ ! -d "node_modules" ]; then
    echo "    Installing WebSocket server dependencies..."
    npm install
fi

# Foundation Dashboard
echo "  - Foundation Dashboard..."
cd "$PROJECT_DIR/foundation-dashboard"
if [ ! -d "node_modules" ]; then
    echo "    Installing Foundation dashboard dependencies..."
    npm install
fi

# YSWS Dashboard
echo "  - YSWS Dashboard..."
cd "$PROJECT_DIR/ysws-sensor-dashboard"
if [ ! -d "node_modules" ]; then
    echo "    Installing YSWS dashboard dependencies..."
    npm install
fi

echo "✅ All dependencies checked"
echo ""

# Start services
echo "🔥 Starting services..."
echo ""

# Start WebSocket Server
echo "1️⃣ Starting WebSocket Server..."
cd "$PROJECT_DIR/websocket-server"
osascript -e 'tell app "Terminal" to do script "cd \"'$PROJECT_DIR'/websocket-server\" && echo \"🌐 WebSocket Server Starting...\" && node server.js"'

sleep 2

# Start Foundation Dashboard
echo "2️⃣ Starting Foundation Dashboard..."
cd "$PROJECT_DIR/foundation-dashboard"
osascript -e 'tell app "Terminal" to do script "cd \"'$PROJECT_DIR'/foundation-dashboard\" && echo \"🏠 Foundation Dashboard Starting...\" && npm run dev"'

sleep 2

# Start YSWS Dashboard
echo "3️⃣ Starting YSWS Dashboard..."
cd "$PROJECT_DIR/ysws-sensor-dashboard"
osascript -e 'tell app "Terminal" to do script "cd \"'$PROJECT_DIR'/ysws-sensor-dashboard\" && echo \"🎛️ YSWS Dashboard Starting...\" && npm run dev"'

echo ""
echo "🎉 All services are starting!"
echo ""
echo "📱 Access your dashboards:"
echo "  • Foundation Dashboard: http://localhost:5173"
echo "  • YSWS Dashboard: http://localhost:5174"
echo "  • WebSocket Server: ws://localhost:8080"
echo "  • Test Client: Open test-client.html in your browser"
echo ""
echo "⏱️  Please wait 10-15 seconds for all services to fully start..."
echo ""
echo "🔐 Advanced Mode Password: advanced123"
echo ""
echo "To stop all services, close the terminal windows or press Ctrl+C in each."
