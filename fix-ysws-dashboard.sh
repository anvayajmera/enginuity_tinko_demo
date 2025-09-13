#!/bin/bash

echo "🔧 Fixing YSWS Dashboard Access to Electronics Library"
echo "===================================================="

cd "$(dirname "$0")"

# Kill any existing processes
echo "🛑 Stopping existing services..."
pkill -f "node.*server.js" 2>/dev/null || true
pkill -f "npm.*run.*dev" 2>/dev/null || true
sleep 2

# Start WebSocket server
echo "🌐 Starting WebSocket Server..."
cd websocket-server
if [ ! -f "server.js" ]; then
    echo "❌ WebSocket server files missing!"
    exit 1
fi

# Start in background
node server.js &
WS_PID=$!
echo "✅ WebSocket Server started (PID: $WS_PID)"
sleep 3

# Start YSWS Dashboard
echo "🎛️ Starting YSWS Dashboard..."
cd ../ysws-sensor-dashboard

# Check if files exist
if [ ! -f "src/App.tsx" ]; then
    echo "❌ YSWS Dashboard files missing!"
    kill $WS_PID
    exit 1
fi

npm run dev &
YSWS_PID=$!
echo "✅ YSWS Dashboard started (PID: $YSWS_PID)"

echo ""
echo "🎉 Services started successfully!"
echo ""
echo "📱 How to Access Electronics Library:"
echo "  1. Go to: http://localhost:5174"
echo "  2. You'll see TWO MODE BUTTONS:"
echo "     🟢 Simple Mode - Basic sensor monitoring"
echo "     🔴 Advanced Mode - Full electronics library"
echo "  3. Click '🔴 Advanced Mode'"
echo "  4. Login with password: advanced123"
echo "  5. Click '🔧 Electronics' tab at the top"
echo ""
echo "📚 What you'll find in Electronics Library:"
echo "  • Components tab: Arduino, ESP32, sensors, specs"
echo "  • Projects tab: Step-by-step tutorials"
echo "  • Dictionary tab: Electronics terms explained"
echo ""
echo "⚠️  If you don't see the mode selector:"
echo "  • Refresh the browser page"
echo "  • Clear browser cache (Cmd+Shift+R)"
echo ""
echo "To stop services: Press Ctrl+C"

# Wait for interrupt
trap 'echo "🛑 Stopping services..."; kill $WS_PID $YSWS_PID 2>/dev/null; exit 0' INT
wait
