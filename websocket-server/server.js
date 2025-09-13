const { WebSocketServer } = require('ws');

function createServer(port = 8080) {
  const wss = new WebSocketServer({
    port: port,
    perMessageDeflate: false
  });

  wss.on('listening', () => {
    console.log(`🌐 WebSocket server running on port ${port}`);
    console.log(`📡 React dashboards should connect to ws://localhost:${port}`);
    console.log(`✅ Server ready to accept connections!`);
    console.log('');
  });

  wss.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.log(`⚠️  Port ${port} is busy, trying port ${port + 1}...`);
      createServer(port + 1);
    } else {
      console.error('❌ Server error:', error);
    }
  });

  // Simulate realistic IoT sensor data
  function generateSensorData() {
    const now = new Date();
    const timeOfDay = now.getHours() + now.getMinutes() / 60;
    
    // Simulate daily patterns
    const tempBase = 22 + Math.sin((timeOfDay - 6) * Math.PI / 12) * 8;
    const humidityBase = 60 + Math.sin((timeOfDay - 12) * Math.PI / 12) * 20;
    const lightBase = timeOfDay > 6 && timeOfDay < 20 ? 
      400 + Math.sin((timeOfDay - 6) * Math.PI / 14) * 400 : 
      50 + Math.random() * 100;

    return {
      timestamp: now.toISOString(),
      temperature: Math.max(15, Math.min(35, tempBase + (Math.random() - 0.5) * 4)),
      humidity: Math.max(30, Math.min(90, humidityBase + (Math.random() - 0.5) * 10)),
      airQuality: Math.max(0, Math.min(1000, 200 + Math.random() * 400)),
      lightLevel: Math.max(0, Math.min(1023, lightBase + (Math.random() - 0.5) * 100)),
      voltage: Math.max(2.5, Math.min(5.5, 3.3 + (Math.random() - 0.5) * 0.4)),
      pressure: Math.max(980, Math.min(1040, 1013.25 + (Math.random() - 0.5) * 20)),
      motion: Math.random() > 0.85,
      sound: Math.max(20, Math.min(80, 35 + Math.random() * 25)),
      co2: Math.max(350, Math.min(1200, 400 + Math.random() * 300)),
      uvIndex: timeOfDay > 8 && timeOfDay < 18 ? Math.random() * 8 : 0,
      vibration: Math.random() * 50,
      magneticField: Math.max(20, Math.min(80, 45 + (Math.random() - 0.5) * 15)),
      distance: Math.max(5, Math.min(200, 50 + Math.random() * 100)),
      soilMoisture: Math.max(0, Math.min(100, 40 + Math.random() * 40)),
      windSpeed: Math.max(0, Math.min(50, Math.random() * 20)),
      rainLevel: Math.random() > 0.9 ? Math.random() * 10 : 0
    };
  }

  let connectedClients = 0;

  wss.on('connection', function connection(ws, request) {
    connectedClients++;
    console.log(`👤 Client connected from ${request.socket.remoteAddress} (${connectedClients} total)`);
    
    // Send welcome message with initial data
    const initialData = generateSensorData();
    ws.send(JSON.stringify({
      type: 'welcome',
      message: 'Connected to YSWS IoT WebSocket Server',
      data: initialData
    }));

    // Send sensor data immediately
    ws.send(JSON.stringify({
      type: 'sensorData',
      data: initialData
    }));

    // Send data every 2 seconds
    const interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        const sensorData = generateSensorData();
        ws.send(JSON.stringify({
          type: 'sensorData',
          data: sensorData
        }));
        
        // Occasionally send alerts
        if (sensorData.temperature > 30) {
          ws.send(JSON.stringify({
            type: 'alert',
            level: 'warning',
            message: `High temperature detected: ${sensorData.temperature.toFixed(1)}°C`,
            timestamp: sensorData.timestamp
          }));
        }
        
        if (sensorData.airQuality > 800) {
          ws.send(JSON.stringify({
            type: 'alert',
            level: 'critical',
            message: `Poor air quality: ${Math.round(sensorData.airQuality)} ppm`,
            timestamp: sensorData.timestamp
          }));
        }
      }
    }, 2000);

    // Handle incoming messages
    ws.on('message', function message(data) {
      try {
        const message = JSON.parse(data.toString());
        console.log(`📨 Received message from client:`, message);
        
        // Echo back confirmation
        ws.send(JSON.stringify({
          type: 'confirmation',
          originalMessage: message,
          timestamp: new Date().toISOString()
        }));
      } catch (error) {
        console.error('❌ Error parsing client message:', error);
      }
    });

    ws.on('close', function close() {
      connectedClients--;
      console.log(`👋 Client disconnected (${connectedClients} remaining)`);
      clearInterval(interval);
    });

    ws.on('error', function error(error) {
      console.error('❌ WebSocket client error:', error);
      clearInterval(interval);
    });

    // Send ping every 30 seconds to keep connection alive
    const pingInterval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.ping();
      } else {
        clearInterval(pingInterval);
      }
    }, 30000);

    ws.on('close', () => {
      clearInterval(pingInterval);
    });
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down WebSocket server...');
    wss.close(() => {
      console.log('✅ Server closed successfully');
      process.exit(0);
    });
  });

  return wss;
}

// Start the server
console.log('🚀 Starting YSWS IoT WebSocket Server...');
console.log('=====================================');
createServer();
