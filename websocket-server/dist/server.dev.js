"use strict";

var _require = require('ws'),
    WebSocketServer = _require.WebSocketServer;

function createServer() {
  var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8080;
  var wss = new WebSocketServer({
    port: port,
    perMessageDeflate: false
  });
  wss.on('listening', function () {
    console.log("\uD83C\uDF10 WebSocket server running on port ".concat(port));
    console.log("\uD83D\uDCE1 React dashboards should connect to ws://localhost:".concat(port));
    console.log("\u2705 Server ready to accept connections!");
    console.log('');
  });
  wss.on('error', function (error) {
    if (error.code === 'EADDRINUSE') {
      console.log("\u26A0\uFE0F  Port ".concat(port, " is busy, trying port ").concat(port + 1, "..."));
      createServer(port + 1);
    } else {
      console.error('❌ Server error:', error);
    }
  }); // Simulate realistic IoT sensor data

  function generateSensorData() {
    var now = new Date();
    var timeOfDay = now.getHours() + now.getMinutes() / 60; // Simulate daily patterns

    var tempBase = 22 + Math.sin((timeOfDay - 6) * Math.PI / 12) * 8;
    var humidityBase = 60 + Math.sin((timeOfDay - 12) * Math.PI / 12) * 20;
    var lightBase = timeOfDay > 6 && timeOfDay < 20 ? 400 + Math.sin((timeOfDay - 6) * Math.PI / 14) * 400 : 50 + Math.random() * 100;
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

  var connectedClients = 0;
  wss.on('connection', function connection(ws, request) {
    connectedClients++;
    console.log("\uD83D\uDC64 Client connected from ".concat(request.socket.remoteAddress, " (").concat(connectedClients, " total)")); // Send welcome message with initial data

    var initialData = generateSensorData();
    ws.send(JSON.stringify({
      type: 'welcome',
      message: 'Connected to YSWS IoT WebSocket Server',
      data: initialData
    })); // Send sensor data immediately

    ws.send(JSON.stringify({
      type: 'sensorData',
      data: initialData
    })); // Send data every 2 seconds

    var interval = setInterval(function () {
      if (ws.readyState === ws.OPEN) {
        var sensorData = generateSensorData();
        ws.send(JSON.stringify({
          type: 'sensorData',
          data: sensorData
        })); // Occasionally send alerts

        if (sensorData.temperature > 30) {
          ws.send(JSON.stringify({
            type: 'alert',
            level: 'warning',
            message: "High temperature detected: ".concat(sensorData.temperature.toFixed(1), "\xB0C"),
            timestamp: sensorData.timestamp
          }));
        }

        if (sensorData.airQuality > 800) {
          ws.send(JSON.stringify({
            type: 'alert',
            level: 'critical',
            message: "Poor air quality: ".concat(Math.round(sensorData.airQuality), " ppm"),
            timestamp: sensorData.timestamp
          }));
        }
      }
    }, 2000); // Handle incoming messages

    ws.on('message', function message(data) {
      try {
        var _message = JSON.parse(data.toString());

        console.log("\uD83D\uDCE8 Received message from client:", _message); // Echo back confirmation

        ws.send(JSON.stringify({
          type: 'confirmation',
          originalMessage: _message,
          timestamp: new Date().toISOString()
        }));
      } catch (error) {
        console.error('❌ Error parsing client message:', error);
      }
    });
    ws.on('close', function close() {
      connectedClients--;
      console.log("\uD83D\uDC4B Client disconnected (".concat(connectedClients, " remaining)"));
      clearInterval(interval);
    });
    ws.on('error', function error(error) {
      console.error('❌ WebSocket client error:', error);
      clearInterval(interval);
    }); // Send ping every 30 seconds to keep connection alive

    var pingInterval = setInterval(function () {
      if (ws.readyState === ws.OPEN) {
        ws.ping();
      } else {
        clearInterval(pingInterval);
      }
    }, 30000);
    ws.on('close', function () {
      clearInterval(pingInterval);
    });
  }); // Graceful shutdown

  process.on('SIGINT', function () {
    console.log('\n🛑 Shutting down WebSocket server...');
    wss.close(function () {
      console.log('✅ Server closed successfully');
      process.exit(0);
    });
  });
  return wss;
} // Start the server


console.log('🚀 Starting YSWS IoT WebSocket Server...');
console.log('=====================================');
createServer();