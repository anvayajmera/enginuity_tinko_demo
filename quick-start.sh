#!/bin/bash

echo "🚀 YSWS IoT Dashboard - Quick Start"
echo "=================================="

cd "$(dirname "$0")"

# Function to start service in new terminal
start_service() {
    local service_name=$1
    local directory=$2
    local command=$3
    
    echo "Starting $service_name..."
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        osascript -e "tell app \"Terminal\" to do script \"cd '$PWD/$directory' && echo '🟢 $service_name Starting...' && $command\""
    else
        # Linux/WSL
        gnome-terminal -- bash -c "cd '$PWD/$directory' && echo '🟢 $service_name Starting...' && $command; exec bash"
    fi
}

# Check dependencies
echo "📦 Installing dependencies..."

# WebSocket Server
cd websocket-server
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

# Foundation Dashboard
cd foundation-dashboard
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

# YSWS Dashboard
cd ysws-sensor-dashboard
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

echo "✅ Dependencies installed!"
echo ""

# Start services
start_service "WebSocket Server" "websocket-server" "node server.js"
sleep 3

start_service "Foundation Dashboard" "foundation-dashboard" "npm run dev"
sleep 2

start_service "YSWS Advanced Dashboard" "ysws-sensor-dashboard" "npm run dev"
it 
echo ""
echo "🎉 All services starting!"
echo ""
echo "📱 Access your dashboards in ~15 seconds:"
echo "  • Foundation Dashboard: http://localhost:5173"
echo "  • YSWS Dashboard: http://localhost:5174"
echo "  • WebSocket Server: ws://localhost:8080"
echo ""
echo "🔧 Electronics Library Access:"
echo "  1. Go to http://localhost:5174"
echo "  2. Click 'Switch to Advanced Mode'"
echo "  3. Login with password: advanced123"
echo "  4. Click '🔧 Electronics' tab"
echo ""
echo "To stop services: Close the terminal windows or press Ctrl+C"
