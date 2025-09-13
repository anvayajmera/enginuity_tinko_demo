import React, { useState, useEffect } from 'react';
import Gauge from './Gauge';
import SensorChart from './SensorChart';

interface DashboardProps {
    onSwitchMode: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSwitchMode }) => {
    const [sensorData, setSensorData] = useState({
        temperature: 23.5,
        humidity: 65,
        distance: 127,
        lightLevel: 456,
        pressure: 1013.25,
        airQuality: 85
    });

    const [chartData, setChartData] = useState<Array<{time: string, temperature: number, humidity: number}>>([]);
    const [alerts, setAlerts] = useState<Array<{id: number, type: string, message: string, time: string}>>([]);
    const [isOnline, setIsOnline] = useState(true);

    // Simulate real-time data updates
    useEffect(() => {
        const interval = setInterval(() => {
            setSensorData(prev => ({
                temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() - 0.5) * 2)),
                humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 5)),
                distance: Math.max(10, Math.min(200, prev.distance + (Math.random() - 0.5) * 20)),
                lightLevel: Math.max(0, Math.min(1023, prev.lightLevel + (Math.random() - 0.5) * 100)),
                pressure: Math.max(990, Math.min(1030, prev.pressure + (Math.random() - 0.5) * 2)),
                airQuality: Math.max(0, Math.min(100, prev.airQuality + (Math.random() - 0.5) * 10))
            }));

            // Add to chart data
            const now = new Date();
            setChartData(prev => {
                const newData = [...prev, {
                    time: now.toLocaleTimeString(),
                    temperature: sensorData.temperature,
                    humidity: sensorData.humidity
                }];
                return newData.slice(-20); // Keep last 20 data points
            });

            // Generate alerts
            if (sensorData.temperature > 30) {
                setAlerts(prev => [...prev, {
                    id: Date.now(),
                    type: 'warning',
                    message: 'High temperature detected!',
                    time: now.toLocaleTimeString()
                }].slice(-5));
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [sensorData.temperature]);

    // Simulate connection status
    useEffect(() => {
        const statusInterval = setInterval(() => {
            setIsOnline(Math.random() > 0.1); // 90% uptime
        }, 10000);

        return () => clearInterval(statusInterval);
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Arial, sans-serif'
        }}>
            {/* Header */}
            <header style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                padding: '20px 40px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    <div>
                        <h1 style={{
                            color: 'white',
                            margin: 0,
                            fontSize: '28px',
                            fontWeight: '700'
                        }}>
                            🌐 YSWS IoT Dashboard - Simple Mode
                        </h1>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            marginTop: '10px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: isOnline ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                padding: '5px 12px',
                                borderRadius: '15px',
                                border: `1px solid ${isOnline ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`
                            }}>
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: isOnline ? '#10B981' : '#EF4444'
                                }} />
                                <span style={{
                                    color: 'white',
                                    fontSize: '14px',
                                    fontWeight: '600'
                                }}>
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                            </div>
                            <span style={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '14px'
                            }}>
                                Last updated: {new Date().toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                    
                    <button
                        onClick={onSwitchMode}
                        style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            padding: '12px 24px',
                            borderRadius: '25px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Switch Mode
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main style={{
                padding: '30px',
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                {/* Sensor Gauges */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '20px',
                    padding: '30px',
                    marginBottom: '30px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(20px)'
                }}>
                    <h2 style={{
                        margin: '0 0 25px 0',
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#333'
                    }}>
                        📊 Live Sensor Data
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '20px'
                    }}>
                        <Gauge
                            label="🌡️ Temperature"
                            value={sensorData.temperature}
                            min={0}
                            max={50}
                            unit="°C"
                        />
                        <Gauge
                            label="💧 Humidity"
                            value={sensorData.humidity}
                            min={0}
                            max={100}
                            unit="%"
                        />
                        <Gauge
                            label="📏 Distance"
                            value={sensorData.distance}
                            min={0}
                            max={200}
                            unit="cm"
                        />
                        <Gauge
                            label="☀️ Light Level"
                            value={sensorData.lightLevel}
                            min={0}
                            max={1023}
                            unit="lux"
                        />
                        <Gauge
                            label="🌀 Pressure"
                            value={sensorData.pressure}
                            min={990}
                            max={1030}
                            unit="hPa"
                        />
                        <Gauge
                            label="🌬️ Air Quality"
                            value={sensorData.airQuality}
                            min={0}
                            max={100}
                            unit="AQI"
                        />
                    </div>
                </section>

                {/* Charts Section */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: '30px',
                    marginBottom: '30px'
                }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '20px',
                        padding: '30px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(20px)'
                    }}>
                        <h3 style={{
                            margin: '0 0 20px 0',
                            fontSize: '20px',
                            fontWeight: '600',
                            color: '#333'
                        }}>
                            📈 Temperature & Humidity Trends
                        </h3>
                        <SensorChart data={chartData} />
                    </div>

                    {/* Alerts Panel */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '20px',
                        padding: '30px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(20px)'
                    }}>
                        <h3 style={{
                            margin: '0 0 20px 0',
                            fontSize: '20px',
                            fontWeight: '600',
                            color: '#333'
                        }}>
                            🚨 Alerts
                        </h3>
                        <div style={{
                            maxHeight: '300px',
                            overflowY: 'auto'
                        }}>
                            {alerts.length === 0 ? (
                                <div style={{
                                    textAlign: 'center',
                                    color: '#6b7280',
                                    fontSize: '14px',
                                    padding: '20px'
                                }}>
                                    No alerts at this time ✅
                                </div>
                            ) : (
                                alerts.map(alert => (
                                    <div key={alert.id} style={{
                                        background: '#FEF2F2',
                                        border: '1px solid #FECACA',
                                        borderRadius: '10px',
                                        padding: '15px',
                                        marginBottom: '10px'
                                    }}>
                                        <div style={{
                                            color: '#DC2626',
                                            fontWeight: '600',
                                            fontSize: '14px'
                                        }}>
                                            {alert.message}
                                        </div>
                                        <div style={{
                                            color: '#6B7280',
                                            fontSize: '12px',
                                            marginTop: '5px'
                                        }}>
                                            {alert.time}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Device Status Cards */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '20px',
                    padding: '30px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(20px)'
                }}>
                    <h2 style={{
                        margin: '0 0 25px 0',
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#333'
                    }}>
                        🔧 Device Status
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px'
                    }}>
                        {['Arduino Uno', 'ESP32', 'Raspberry Pi', 'DHT22 Sensor', 'HC-SR04', 'LED Matrix'].map((device, index) => (
                            <div key={device} style={{
                                background: '#f8fafc',
                                border: '2px solid #e2e8f0',
                                borderRadius: '15px',
                                padding: '20px',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    fontSize: '2rem',
                                    marginBottom: '10px'
                                }}>
                                    {index % 3 === 0 ? '🟢' : index % 3 === 1 ? '🟡' : '🔴'}
                                </div>
                                <h4 style={{
                                    margin: '0 0 5px 0',
                                    color: '#333',
                                    fontSize: '16px'
                                }}>
                                    {device}
                                </h4>
                                <div style={{
                                    fontSize: '14px',
                                    color: '#6b7280'
                                }}>
                                    {index % 3 === 0 ? 'Online' : index % 3 === 1 ? 'Warning' : 'Offline'}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
