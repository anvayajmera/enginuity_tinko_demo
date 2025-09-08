import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [sensorData, setSensorData] = useState([])
  const [connectionStatus, setConnectionStatus] = useState('Connecting...')
  const [currentPort, setCurrentPort] = useState(null)
  const [latestData, setLatestData] = useState(null)
  const [alerts, setAlerts] = useState([])

  // Enhanced sensor data structure for Arduino
  const [arduinoSensors, setArduinoSensors] = useState({
    temperature: { value: 0, unit: '°C', status: 'normal', threshold: { min: 15, max: 35 } },
    humidity: { value: 0, unit: '%', status: 'normal', threshold: { min: 30, max: 70 } },
    pressure: { value: 0, unit: 'hPa', status: 'normal', threshold: { min: 950, max: 1050 } },
    light: { value: 0, unit: 'lux', status: 'normal', threshold: { min: 100, max: 900 } },
    soilMoisture: { value: 0, unit: '%', status: 'normal', threshold: { min: 20, max: 80 } },
    gasLevel: { value: 0, unit: 'ppm', status: 'normal', threshold: { min: 0, max: 500 } },
    motion: { value: false, status: 'normal' },
    ultrasonic: { value: 0, unit: 'cm', status: 'normal', threshold: { min: 5, max: 400 } }
  })

  useEffect(() => {
    const tryPorts = [8080, 8081, 8082, 8083]
    let ws = null
    
    const connectToPort = (portIndex = 0) => {
      if (portIndex >= tryPorts.length) {
        setConnectionStatus('Failed to connect')
        return
      }
      
      const port = tryPorts[portIndex]
      console.log(`Attempting to connect to port ${port}...`)
      
      ws = new WebSocket(`ws://localhost:${port}`)
      
      const connectTimeout = setTimeout(() => {
        ws.close()
        connectToPort(portIndex + 1)
      }, 2000)
      
      ws.onopen = () => {
        clearTimeout(connectTimeout)
        setConnectionStatus('Connected')
        setCurrentPort(port)
        console.log(`Connected to WebSocket server on port ${port}`)
      }
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.type === 'sensorData') {
          processSensorData(data.data)
          setSensorData(prev => [...prev.slice(-19), data.data])
          setLatestData(data.data)
        }
      }
      
      ws.onclose = () => {
        clearTimeout(connectTimeout)
        if (connectionStatus === 'Connected') {
          setConnectionStatus('Disconnected')
          console.log('Disconnected from WebSocket server')
        }
      }
      
      ws.onerror = (error) => {
        clearTimeout(connectTimeout)
        console.log(`Failed to connect to port ${port}`)
        connectToPort(portIndex + 1)
      }
    }
    
    connectToPort()
    
    return () => {
      if (ws) {
        ws.close()
      }
    }
  }, [connectionStatus])

  const processSensorData = (data) => {
    const newSensors = { ...arduinoSensors }
    
    // Process temperature
    if (data.temperature !== undefined) {
      newSensors.temperature.value = data.temperature
      newSensors.temperature.status = getStatus(data.temperature, newSensors.temperature.threshold)
    }
    
    // Process humidity  
    if (data.humidity !== undefined) {
      newSensors.humidity.value = data.humidity
      newSensors.humidity.status = getStatus(data.humidity, newSensors.humidity.threshold)
    }
    
    // Process pressure
    if (data.pressure !== undefined) {
      newSensors.pressure.value = data.pressure
      newSensors.pressure.status = getStatus(data.pressure, newSensors.pressure.threshold)
    }
    
    // Simulate additional Arduino sensors
    newSensors.light.value = Math.floor(Math.random() * 1000)
    newSensors.soilMoisture.value = Math.floor(Math.random() * 100)
    newSensors.gasLevel.value = Math.floor(Math.random() * 200)
    newSensors.motion.value = Math.random() > 0.8
    newSensors.ultrasonic.value = Math.floor(5 + Math.random() * 395)
    
    setArduinoSensors(newSensors)
    checkAlerts(newSensors)
  }

  const getStatus = (value, threshold) => {
    if (!threshold) return 'normal'
    if (value < threshold.min || value > threshold.max) return 'warning'
    return 'normal'
  }

  const checkAlerts = (sensors) => {
    const newAlerts = []
    Object.entries(sensors).forEach(([key, sensor]) => {
      if (sensor.status === 'warning') {
        newAlerts.push({
          id: Date.now() + Math.random(),
          type: 'warning',
          message: `${key.charAt(0).toUpperCase() + key.slice(1)} out of range: ${sensor.value}${sensor.unit || ''}`,
          timestamp: new Date()
        })
      }
    })
    
    if (newAlerts.length > 0) {
      setAlerts(prev => [...newAlerts, ...prev.slice(0, 4)])
    }
  }

  const getSensorIcon = (sensorType) => {
    const icons = {
      temperature: 'https://via.placeholder.com/80x80/ff6b6b/white?text=TEMP',
      humidity: 'https://via.placeholder.com/80x80/4ecdc4/white?text=HUM',
      pressure: 'https://via.placeholder.com/80x80/45b7d1/white?text=PRES',
      light: 'https://via.placeholder.com/80x80/ffd93d/white?text=LIGHT',
      soilMoisture: 'https://via.placeholder.com/80x80/8bc34a/white?text=SOIL',
      gasLevel: 'https://via.placeholder.com/80x80/ff9800/white?text=GAS',
      motion: 'https://via.placeholder.com/80x80/e91e63/white?text=MOV',
      ultrasonic: 'https://via.placeholder.com/80x80/9c27b0/white?text=DIST'
    }
    return icons[sensorType] || 'https://via.placeholder.com/80x80/gray/white?text=SENS'
  }

  return (
    <div className="dashboard">
      <div className="header">
        <h1>🚀 Arduino Sensor Network</h1>
        <p>Professional IoT Dashboard</p>
        <div className="status-bar">
          <div className={`connection-status ${connectionStatus.toLowerCase().replace(' ', '-')}`}>
            <div className="status-indicator"></div>
            <span>{connectionStatus}</span>
            {currentPort && <span className="port-info">Port: {currentPort}</span>}
          </div>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="alerts-container">
          <h3>⚠️ System Alerts</h3>
          <div className="alerts-list">
            {alerts.map(alert => (
              <div key={alert.id} className={`alert alert-${alert.type}`}>
                <span className="alert-message">{alert.message}</span>
                <span className="alert-time">{alert.timestamp.toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {latestData && (
        <div className="current-readings">
          <h2>📊 Live Sensor Network</h2>
          <div className="sensor-grid">
            {Object.entries(arduinoSensors).map(([key, sensor]) => (
              <div key={key} className={`sensor-card ${key} ${sensor.status}`}>
                <div className="sensor-header">
                  <img src={getSensorIcon(key)} alt={key} className="sensor-icon" />
                  <div className="sensor-info">
                    <h3>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</h3>
                    <div className="sensor-value">
                      {typeof sensor.value === 'boolean' 
                        ? (sensor.value ? 'Detected' : 'Clear')
                        : `${sensor.value.toFixed(1)}${sensor.unit}`
                      }
                    </div>
                    <div className={`sensor-status ${sensor.status}`}>
                      {sensor.status === 'warning' ? '⚠️ Warning' : '✅ Normal'}
                    </div>
                  </div>
                </div>
                <div className="sensor-graph">
                  <div className="graph-placeholder">📈</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="data-history">
        <h2>📈 Historical Data</h2>
        <div className="data-table">
          <div className="table-header">
            <div>Timestamp</div>
            <div>Temperature</div>
            <div>Humidity</div>
            <div>Pressure</div>
            <div>Light</div>
            <div>Status</div>
          </div>
          {sensorData.slice().reverse().map((data, index) => (
            <div key={index} className="table-row">
              <div className="timestamp">{new Date(data.timestamp).toLocaleTimeString()}</div>
              <div className="temp-value">{data.temperature?.toFixed(1)}°C</div>
              <div className="humidity-value">{data.humidity?.toFixed(1)}%</div>
              <div className="pressure-value">{data.pressure?.toFixed(1)} hPa</div>
              <div className="light-value">{arduinoSensors.light.value} lux</div>
              <div className="status-value">
                <span className="status-indicator normal">●</span> Active
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {sensorData.length === 0 && connectionStatus === 'Connected' && (
        <div className="waiting-message">
          <div className="spinner"></div>
          <p>Initializing sensor network...</p>
        </div>
      )}
    </div>
  )
}

export default App
