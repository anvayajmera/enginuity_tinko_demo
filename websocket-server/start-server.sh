#!/bin/bash

echo "🚀 Starting WebSocket Server for YSWS Dashboard..."
echo "================================================"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

# Check if server.js exists
if [ ! -f "server.js" ]; then
    echo "❌ server.js not found in current directory"
    echo "📍 Current directory: $(pwd)"
    echo "💡 Make sure you're in the websocket-server folder"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Kill any existing process on port 8080
echo "🔍 Checking for existing processes on port 8080..."
if lsof -ti:8080 > /dev/null 2>&1; then
    echo "⚠️  Found existing process on port 8080. Stopping it..."
    kill -9 $(lsof -ti:8080) 2>/dev/null || true
    sleep 2
fi

echo "🌐 Starting WebSocket server..."
node server.js
