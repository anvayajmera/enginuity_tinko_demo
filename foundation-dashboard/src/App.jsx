import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Wind, Lightbulb, Zap, Gauge } from 'lucide-react';
import './App.css';

function App() {
  const [sensorData, setSensorData] = useState({
    temperature: 22.5,
    humidity: 65,
    airQuality: 350,
    lightLevel: 450,
    voltage: 3.3,
    pressure: 1013.25
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(0, Math.min(100, prev.humidity + (Math.random() - 0.5) * 5)),
        airQuality: Math.max(0, prev.airQuality + (Math.random() - 0.5) * 50),
        lightLevel: Math.max(0, prev.lightLevel + (Math.random() - 0.5) * 100),
        voltage: Math.max(0, prev.voltage + (Math.random() - 0.5) * 0.2),
        pressure: prev.pressure + (Math.random() - 0.5) * 5
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <header className="header">
        <h1>My Sensor Dashboard</h1>
        <p>Foundation Level Project</p>
      </header>
      
      <div className="sensors-grid">
        <SensorCard
          icon={<Thermometer />}
          title="Temperature"
          value={`${sensorData.temperature.toFixed(1)}°C`}
          color="#ff6b6b"
        />
        <SensorCard
          icon={<Droplets />}
          title="Humidity"
          value={`${sensorData.humidity.toFixed(1)}%`}
          color="#4ecdc4"
        />
        <SensorCard
          icon={<Wind />}
          title="Air Quality"
          value={`${sensorData.airQuality.toFixed(0)} ppm`}
          color="#45b7d1"
        />
        <SensorCard
          icon={<Lightbulb />}
          title="Light Level"
          value={`${sensorData.lightLevel.toFixed(0)} lux`}
          color="#f9ca24"
        />
        <SensorCard
          icon={<Zap />}
          title="Voltage"
          value={`${sensorData.voltage.toFixed(2)}V`}
          color="#6c5ce7"
        />
        <SensorCard
          icon={<Gauge />}
          title="Pressure"
          value={`${sensorData.pressure.toFixed(1)} hPa`}
          color="#fd79a8"
        />
      </div>
    </div>
  );
}

function SensorCard({ icon, title, value, color }) {
  return (
    <div className="sensor-card" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="sensor-icon" style={{ color }}>
        {icon}
      </div>
      <div className="sensor-info">
        <h3>{title}</h3>
        <p className="sensor-value">{value}</p>
      </div>
    </div>
  );
}

export default App;
