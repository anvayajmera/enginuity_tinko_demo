import React, { useState, useEffect } from 'react';
import Gauge from './Gauge';
import DeviceControlPanel from './DeviceControlPanel';
import ComponentLibrary from './ComponentLibrary';
import ElectronicsLibrary from './ElectronicsLibrary';

interface AdvancedDashboardProps {
    username: string;
    onLogout: () => void;
}

const AdvancedDashboard: React.FC<AdvancedDashboardProps> = ({ username, onLogout }) => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'library' | 'electronics' | 'projects'>('dashboard');
    const [sensorData, setSensorData] = useState({
        temperature: 25,
        humidity: 68,
        distance: 87,
        lightLevel: 340,
        airQuality: 125,
        pressure: 1013.2,
        voltage: 3.3,
        current: 0.25
    });
    const [isConnected, setIsConnected] = useState(true);

    // Simulate real-time data with WebSocket connection
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        
        ws.onopen = () => {
            setIsConnected(true);
        };
        
        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'sensorData') {
                    setSensorData(prev => ({
                        ...prev,
                        temperature: message.data.temperature || prev.temperature,
                        humidity: message.data.humidity || prev.humidity,
                        distance: message.data.distance || prev.distance,
                        lightLevel: message.data.lightLevel || prev.lightLevel,
                        airQuality: message.data.airQuality || prev.airQuality,
                        pressure: message.data.pressure || prev.pressure,
                        voltage: message.data.voltage || prev.voltage,
                        current: (message.data.voltage || 3.3) * 0.075 // Simulated current
                    }));
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };
        
        ws.onclose = () => {
            setIsConnected(false);
        };
        
        ws.onerror = () => {
            setIsConnected(false);
        };

        return () => {
            ws.close();
        };
    }, []);

    const sensors = [
        { label: '🌡️ Temperature', value: sensorData.temperature, min: 0, max: 50, unit: '°C' },
        { label: '💧 Humidity', value: sensorData.humidity, min: 0, max: 100, unit: '%' },
        { label: '📏 Distance', value: sensorData.distance, min: 0, max: 200, unit: 'cm' },
        { label: '☀️ Light Level', value: sensorData.lightLevel, min: 0, max: 1023, unit: 'lux' },
        { label: '🌬️ Air Quality', value: sensorData.airQuality, min: 0, max: 500, unit: 'ppm' },
        { label: '🌀 Pressure', value: sensorData.pressure, min: 990, max: 1030, unit: 'hPa' },
        { label: '⚡ Voltage', value: sensorData.voltage, min: 0, max: 5, unit: 'V' },
        { label: '🔋 Current', value: sensorData.current * 1000, min: 0, max: 500, unit: 'mA' }
    ];

    const handleToggleLED = () => console.log('LED toggled');
    const handleChangeMotorSpeed = (speed: number) => console.log('Motor speed:', speed);
    const handleTriggerBuzzer = () => console.log('Buzzer triggered!');

    const projects = [
        { 
            name: 'Smart Home Monitor', 
            status: 'Active', 
            lastUpdated: '2 minutes ago',
            progress: 85,
            sensors: ['Temperature', 'Humidity', 'Motion'],
            icon: '🏠'
        },
        { 
            name: 'Weather Station', 
            status: 'Completed', 
            lastUpdated: '1 hour ago',
            progress: 100,
            sensors: ['Temperature', 'Humidity', 'Pressure'],
            icon: '🌤️'
        },
        { 
            name: 'Robot Car', 
            status: 'In Progress', 
            lastUpdated: '30 minutes ago',
            progress: 60,
            sensors: ['Ultrasonic', 'Gyroscope'],
            icon: '🤖'
        },
        { 
            name: 'LED Matrix Display', 
            status: 'Planning', 
            lastUpdated: '1 day ago',
            progress: 15,
            sensors: ['None'],
            icon: '💡'
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Arial, sans-serif',
            animation: 'fadeIn 0.8s ease-out'
        }}>
            {/* Enhanced Header */}
            <header style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                padding: '20px 40px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                animation: 'slideInDown 0.6s ease-out'
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
                            fontWeight: '700',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                        }}>
                            🎛️ YSWS Advanced Dashboard
                        </h1>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            marginTop: '8px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: isConnected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                padding: '4px 12px',
                                borderRadius: '15px',
                                border: `1px solid ${isConnected ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`
                            }}>
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: isConnected ? '#10B981' : '#EF4444',
                                    animation: isConnected ? 'pulse 2s infinite' : 'none'
                                }} />
                                <span style={{
                                    color: 'white',
                                    fontSize: '12px',
                                    fontWeight: '600'
                                }}>
                                    {isConnected ? 'Connected' : 'Disconnected'}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <span style={{ 
                            color: 'rgba(255, 255, 255, 0.9)', 
                            fontSize: '16px',
                            animation: 'slideInRight 0.8s ease-out'
                        }}>
                            Welcome, <strong>{username}</strong>! 👋
                        </span>
                        <button
                            onClick={onLogout}
                            style={{
                                background: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                padding: '10px 20px',
                                borderRadius: '20px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                animation: 'slideInRight 1s ease-out'
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Enhanced Navigation Tabs */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '15px',
                    marginTop: '25px',
                    animation: 'slideInUp 0.8s ease-out'
                }}>
                    {(['dashboard', 'library', 'electronics', 'projects'] as const).map((tab, index) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                background: activeTab === tab ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                border: `2px solid ${activeTab === tab ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)'}`,
                                padding: '12px 24px',
                                borderRadius: '25px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'capitalize',
                                animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            {tab === 'electronics' ? '🔧 Electronics' : 
                             tab === 'dashboard' ? '📊 Dashboard' :
                             tab === 'library' ? '📚 Components' : '🚀 Projects'}
                        </button>
                    ))}
                </div>
            </header>

            {/* Main Content */}
            <main style={{
                padding: '40px',
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                {activeTab === 'dashboard' && (
                    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                        {/* Enhanced Sensor Gauges */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '20px',
                            padding: '30px',
                            marginBottom: '30px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                            backdropFilter: 'blur(20px)',
                            animation: 'slideInUp 0.6s ease-out'
                        }}>
                            <h2 style={{
                                margin: '0 0 25px 0',
                                fontSize: '24px',
                                fontWeight: '600',
                                color: '#333',
                                animation: 'slideInLeft 0.8s ease-out'
                            }}>
                                🔬 Advanced Sensor Monitoring
                            </h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                gap: '20px'
                            }}>
                                {sensors.map((sensor, index) => (
                                    <div key={sensor.label} style={{
                                        animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
                                    }}>
                                        <Gauge
                                            label={sensor.label}
                                            value={sensor.value}
                                            min={sensor.min}
                                            max={sensor.max}
                                            unit={sensor.unit}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Device Control Panel */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '20px',
                            padding: '30px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                            backdropFilter: 'blur(20px)',
                            animation: 'slideInUp 0.8s ease-out'
                        }}>
                            <DeviceControlPanel
                                onToggleLED={handleToggleLED}
                                onChangeMotorSpeed={handleChangeMotorSpeed}
                                onTriggerBuzzer={handleTriggerBuzzer}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'library' && (
                    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                        <ComponentLibrary />
                    </div>
                )}

                {activeTab === 'electronics' && (
                    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                        <ElectronicsLibrary />
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '20px',
                        padding: '30px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(20px)',
                        animation: 'fadeIn 0.5s ease-out'
                    }}>
                        <h2 style={{
                            margin: '0 0 25px 0',
                            fontSize: '28px',
                            fontWeight: '600',
                            color: '#333',
                            textAlign: 'center',
                            animation: 'slideInDown 0.6s ease-out'
                        }}>
                            🚀 My IoT Projects
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                            gap: '25px'
                        }}>
                            {projects.map((project, index) => (
                                <div key={index} style={{
                                    background: 'white',
                                    border: '2px solid #e2e8f0',
                                    borderRadius: '15px',
                                    padding: '25px',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                        <div style={{ fontSize: '2rem' }}>{project.icon}</div>
                                        <div>
                                            <h3 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '18px' }}>
                                                {project.name}
                                            </h3>
                                            <div style={{
                                                display: 'inline-block',
                                                background: 
                                                    project.status === 'Active' ? '#10B981' : 
                                                    project.status === 'Completed' ? '#3B82F6' :
                                                    project.status === 'In Progress' ? '#F59E0B' : '#6B7280',
                                                color: 'white',
                                                padding: '4px 12px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontWeight: '600'
                                            }}>
                                                {project.status}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    <div style={{ marginBottom: '15px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                                                Progress
                                            </span>
                                            <span style={{ fontSize: '14px', color: '#6B7280' }}>
                                                {project.progress}%
                                            </span>
                                        </div>
                                        <div style={{
                                            width: '100%',
                                            height: '8px',
                                            background: '#E5E7EB',
                                            borderRadius: '4px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${project.progress}%`,
                                                height: '100%',
                                                background: 'linear-gradient(90deg, #3B82F6, #1D4ED8)',
                                                transition: 'width 1s ease-out',
                                                animation: 'progressFill 2s ease-out'
                                            }} />
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <strong style={{ fontSize: '14px', color: '#374151' }}>Sensors: </strong>
                                        <span style={{ fontSize: '14px', color: '#6B7280' }}>
                                            {project.sensors.join(', ')}
                                        </span>
                                    </div>
                                    
                                    <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                                        Last updated: {project.lastUpdated}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideInDown {
                        from { opacity: 0; transform: translateY(-30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes slideInUp {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes slideInLeft {
                        from { opacity: 0; transform: translateX(-30px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes slideInRight {
                        from { opacity: 0; transform: translateX(30px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                    @keyframes progressFill {
                        from { width: 0%; }
                        to { width: ${100}%; }
                    }
                `}
            </style>
        </div>
    );
};

export default AdvancedDashboard;
