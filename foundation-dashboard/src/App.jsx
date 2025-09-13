import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    airQuality: 0,
    lightLevel: 0,
    voltage: 0,
    pressure: 0
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket('ws://localhost:8080');
    
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
    };
    
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'sensorData') {
          setSensorData(message.data);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);

  const sensors = [
    {
      name: 'Temperature',
      value: sensorData.temperature?.toFixed(1) || '0.0',
      unit: '°C',
      icon: '🌡️'
    },
    {
      name: 'Humidity', 
      value: sensorData.humidity?.toFixed(1) || '0.0',
      unit: '%',
      icon: '💧'
    },
    {
      name: 'Air Quality',
      value: Math.round(sensorData.airQuality) || '0',
      unit: 'ppm',
      icon: '🌬️'
    },
    {
      name: 'Light Level',
      value: Math.round(sensorData.lightLevel) || '0',
      unit: 'lux',
      icon: '☀️'
    },
    {
      name: 'Voltage',
      value: sensorData.voltage?.toFixed(2) || '0.00',
      unit: 'V',
      icon: '⚡'
    },
    {
      name: 'Pressure',
      value: sensorData.pressure?.toFixed(1) || '0.0',
      unit: 'hPa',
      icon: '🌀'
    }
  ];

  return (
    <div className="dashboard">
      <header className="header">
        <h1>🏠 Foundation IoT Dashboard</h1>
        <p>Real-time sensor monitoring made simple</p>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '10px',
          padding: '5px 15px',
          borderRadius: '20px',
          background: isConnected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
          border: `1px solid ${isConnected ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: isConnected ? '#10B981' : '#EF4444'
          }} />
          <span style={{ 
            color: 'white', 
            fontSize: '14px',
            fontWeight: '600'
          }}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </header>

      <main className="sensors-grid">
        {sensors.map((sensor, index) => (
          <div key={sensor.name} className="sensor-card" style={{
            animationDelay: `${index * 0.1}s`
          }}>
            <div className="sensor-icon">
              {sensor.icon}
            </div>
            <div className="sensor-info">
              <h3>{sensor.name}</h3>
              <div className="sensor-value">
                {sensor.value} {sensor.unit}
              </div>
            </div>
          </div>
        ))}
      </main>

      {!isConnected && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#EF4444',
          color: 'white',
          padding: '15px 20px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          ⚠️ WebSocket Server Disconnected
          <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.9 }}>
            Make sure the server is running on port 8080
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
