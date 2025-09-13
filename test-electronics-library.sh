#!/bin/bash

echo "🧪 Testing Electronics Library Access"
echo "===================================="

cd "$(dirname "$0")"

# Kill existing processes
pkill -f "node.*server" 2>/dev/null || true
pkill -f "npm.*dev" 2>/dev/null || true
sleep 2

# Start WebSocket server
echo "🌐 Starting WebSocket Server..."
cd websocket-server
node server.js &
WS_PID=$!
sleep 3

# Start YSWS Dashboard
echo "🎛️ Starting YSWS Dashboard..."
cd ../ysws-sensor-dashboard
npm run dev &
YSWS_PID=$!
sleep 5

echo ""
echo "✅ Services started! Testing Electronics Library access..."
echo ""
echo "🔍 Step-by-step instructions:"
echo ""
echo "1️⃣ Open browser and go to: http://localhost:5174"
echo ""
echo "2️⃣ You should see TWO options:"
echo "   📊 Simple Dashboard"
echo "   🔧 Advanced Dashboard"
echo ""
echo "3️⃣ Click on '🔧 Advanced Dashboard'"
echo ""
echo "4️⃣ Login Screen appears - Enter:"
echo "   Username: anything (e.g., 'student')"
echo "   Password: advanced123"
echo ""
echo "5️⃣ After login, you'll see tabs at the top:"
echo "   📊 Dashboard | 📚 Components | 🔧 Electronics | 🚀 Projects"
echo ""
echo "6️⃣ Click '🔧 Electronics' tab to see:"
echo "   • Components tab: Arduino, ESP32, sensors with specs"
echo "   • Projects tab: 5 hands-on projects"
echo "   • Dictionary tab: Electronics terms"
echo ""
echo "🎯 What to look for in Electronics Library:"
echo "   ✅ Arduino Uno R3 card with specs"
echo "   ✅ ESP32 DevKit with WiFi info"
echo "   ✅ Project cards (LED Blink, Weather Station, etc.)"
echo "   ✅ Search and filter functionality"
echo ""
echo "❌ If you don't see the Electronics Library:"
echo "   • Make sure you clicked 'Advanced Dashboard' not 'Simple'"
echo "   • Verify you logged in with password 'advanced123'"
echo "   • Look for the '🔧 Electronics' tab after login"
echo "   • Try hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R"
echo ""

# Wait and provide real-time help
sleep 10
echo "⏰ Services should be ready now!"
echo ""
echo "🌐 WebSocket Server: Running on port 8080"
echo "🎛️ YSWS Dashboard: http://localhost:5174"
echo ""
echo "💬 Still having issues? Check these common problems:"
echo "   • Browser cache - try incognito/private mode"
echo "   • Port conflicts - check if other services are running"
echo "   • Component files - make sure ElectronicsLibrary.tsx exists"
echo ""
echo "Press Ctrl+C to stop all services..."

# Wait for interrupt
trap 'echo "🛑 Stopping services..."; kill $WS_PID $YSWS_PID 2>/dev/null; exit 0' INT
wait
