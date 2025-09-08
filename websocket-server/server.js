import { WebSocketServer } from 'ws';

function createServer(port = 8080) {
  const wss = new WebSocketServer({ 
    port: port,
    perMessageDeflate: false
  });

  wss.on('listening', () => {
    console.log(`WebSocket server running on port ${port}`);
    console.log(`Test client: open test-client.html in your browser`);
    console.log(`React dashboard should connect to ws://localhost:${port}`);
  });

  wss.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying port ${port + 1}...`);
      createServer(port + 1);
    } else {
      console.error('Server error:', error);
    }
  });

  // Simulate sensor data
  function generateSensorData() {
    return {
      timestamp: new Date().toISOString(),
      temperature: 20 + Math.random() * 15,
      humidity: 40 + Math.random() * 40,
      airQuality: 200 + Math.random() * 400,
      lightLevel: 100 + Math.random() * 800,
      voltage: 3 + Math.random() * 2,
      pressure: 1000 + Math.random() * 50,
      motion: Math.random() > 0.8,
      sound: 30 + Math.random() * 50,
      co2: 400 + Math.random() * 600,
      uvIndex: Math.random() * 11,
      vibration: Math.random() * 100,
      magneticField: 25 + Math.random() * 50
    };
  }

  wss.on('connection', function connection(ws) {
    console.log('Client connected');
    
    // Send initial data
    ws.send(JSON.stringify({
      type: 'sensorData',
      data: generateSensorData()
    }));
    
    // Send data every 2 seconds
    const interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({
          type: 'sensorData',
          data: generateSensorData()
        }));
      }
    }, 2000);
    
    ws.on('close', function() {
      console.log('Client disconnected');
      clearInterval(interval);
    });
    
    ws.on('error', function(error) {
      console.error('WebSocket error:', error);
      clearInterval(interval);
    });
  });
}

createServer();
