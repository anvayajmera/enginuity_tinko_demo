# 🚀 YSWS IoT Dashboard System

A comprehensive IoT dashboard system with WebSocket real-time data, dual complexity modes, and multiple project examples.

## 📁 Project Structure

```
enginuity_tinko_demo/
├── foundation-dashboard/          # Simple React dashboard
├── ysws-sensor-dashboard/        # Advanced TypeScript dashboard  
├── websocket-server/            # Real-time data server
└── README.md                   # This file
```

## 🛠️ Quick Start

### 1. Install Dependencies

```bash
# Navigate to project root
cd /Users/james/Documents/GitHub/enginuity_tinko_demo

# Install WebSocket server dependencies
cd websocket-server
npm install ws
cd ..

# Install Foundation Dashboard dependencies
cd foundation-dashboard
npm install
cd ..

# Install YSWS Dashboard dependencies  
cd ysws-sensor-dashboard
npm install
cd ..
```

### 2. Start All Services

Open **3 separate terminal windows**:

**Terminal 1 - WebSocket Server:**
```bash
cd /Users/james/Documents/GitHub/enginuity_tinko_demo/websocket-server
node dist/server.dev.js
```

**Terminal 2 - Foundation Dashboard:**
```bash
cd /Users/james/Documents/GitHub/enginuity_tinko_demo/foundation-dashboard
npm run dev
```

**Terminal 3 - YSWS Advanced Dashboard:**
```bash
cd /Users/james/Documents/GitHub/enginuity_tinko_demo/ysws-sensor-dashboard
npm run dev
```

### 3. Access Dashboards

- **Foundation Dashboard**: http://localhost:5173 (or next available port)
- **YSWS Dashboard**: http://localhost:5174 (or next available port)  
- **WebSocket Server**: ws://localhost:8080

## 🎯 Dashboard Features

### 📊 Foundation Dashboard (Simple)
- Real-time sensor data display
- Clean, educational interface
- Perfect for beginners
- WebSocket integration

### 🎛️ YSWS Dashboard (Advanced)
- **Simple Mode**: Comprehensive sensor monitoring with charts
- **Advanced Mode**: Login system + device controls + component library
- Dual complexity switching
- Professional UI with tabs and projects

## 🔌 WebSocket Server

The server simulates real IoT sensor data:
- Temperature, Humidity, Air Quality
- Light Level, Pressure, Motion
- UV Index, CO2, Vibration
- Updates every 2 seconds

## 🚀 Usage Instructions

1. **Start WebSocket Server First** - This provides data to both dashboards
2. **Start Foundation Dashboard** - Simple interface for basic monitoring
3. **Start YSWS Dashboard** - Choose Simple or Advanced mode
4. **Advanced Mode Login** - Use password: `advanced123`

## 📱 Features Overview

### Simple Mode Features:
- ✅ Real-time sensor gauges
- ✅ Interactive charts
- ✅ Alert system
- ✅ Device status monitoring
- ✅ Responsive design

### Advanced Mode Features:
- ✅ User authentication
- ✅ Device control panels (LED, Motor, Buzzer)
- ✅ Component library with educational content
- ✅ Project management system
- ✅ Tabbed interface
- ✅ Enhanced visualizations

## 🛠️ Development

### Adding New Sensors
Edit `websocket-server/dist/server.dev.js` to add more sensor types:

```javascript
function generateSensorData() {
    return {
        // ...existing sensors...
        newSensor: Math.random() * 100
    };
}
```

### Customizing UI
- **Foundation**: Edit `foundation-dashboard/src/App.jsx`
- **YSWS**: Edit components in `ysws-sensor-dashboard/src/components/`

## 🔧 Troubleshooting

### Port Conflicts
If ports are busy, the system will automatically try the next available port.

### WebSocket Connection Issues
1. Ensure WebSocket server is running first
2. Check console for connection errors
3. Verify port 8080 is available

### Dashboard Not Loading
1. Check if `npm install` was run in each directory
2. Ensure Node.js and npm are installed
3. Try clearing browser cache

## 📋 System Requirements

- Node.js 16+ 
- npm 8+
- Modern web browser
- 3 available ports (typically 5173, 5174, 8080)

## 🎓 Educational Use

Perfect for:
- IoT workshops and training
- Student projects and demos
- Maker space demonstrations
- Professional IoT prototyping

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test all dashboards
5. Submit pull request

---

**Need Help?** Check the individual README files in each project directory for more specific instructions.