import React, { useState } from 'react';
import Gauge from './Gauge';
import DeviceControlPanel from './DeviceControlPanel';
import ComponentLibrary from './ComponentLibrary';

interface AdvancedDashboardProps {
    username: string;
    onLogout: () => void;
}

const AdvancedDashboard: React.FC<AdvancedDashboardProps> = ({ username, onLogout }) => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'library' | 'projects'>('dashboard');
    const [ledState, setLedState] = useState(false);
    const [motorSpeed, setMotorSpeed] = useState(0);
    
    const sensors = [
        { label: 'Temperature', value: 25, min: 0, max: 50, unit: '°C' },
        { label: 'Distance', value: 87, min: 0, max: 200, unit: 'cm' },
        { label: 'Light Level', value: 340, min: 0, max: 1023, unit: 'lux' },
        { label: 'Humidity', value: 68, min: 0, max: 100, unit: '%' },
        { label: 'Buzzer', value: 1, min: 0, max: 1, unit: '' },
        { label: 'Relay', value: 0, min: 0, max: 1, unit: '' }
    ];

    const projects = [
        { name: 'Smart Home Monitor', status: 'Active', lastUpdated: '2 minutes ago' },
        { name: 'Weather Station', status: 'Completed', lastUpdated: '1 hour ago' },
        { name: 'Robot Car', status: 'In Progress', lastUpdated: '30 minutes ago' },
        { name: 'LED Matrix Display', status: 'Planning', lastUpdated: '1 day ago' }
    ];

    const handleToggleLED = () => setLedState(!ledState);
    const handleChangeMotorSpeed = (speed: number) => setMotorSpeed(speed);
    const handleTriggerBuzzer = () => console.log('Buzzer triggered!');

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Arial, sans-serif'
        }}>
            {/* Advanced Header */}
            <header style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                padding: '15px 40px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <h1 style={{
                        color: 'white',
                        margin: 0,
                        fontSize: '24px',
                        fontWeight: '700'
                    }}>
                        YSWS Advanced Dashboard
                    </h1>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <span style={{ color: 'white', fontSize: '16px' }}>
                            Welcome, {username}! 👋
                        </span>
                        <button
                            onClick={onLogout}
                            style={{
                                background: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                fontSize: '14px',
                                cursor: 'pointer'
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    marginTop: '20px'
                }}>
                    {(['dashboard', 'library', 'projects'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                background: activeTab === tab ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                                color: 'white',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                padding: '10px 20px',
                                borderRadius: '25px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </header>

            {/* Main Content */}
            <main style={{
                padding: '40px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {activeTab === 'dashboard' && (
                    <>
                        {/* Enhanced Sensor Gauges */}
                        <div style={{
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
                                Live Sensor Data (Enhanced)
                            </h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '20px'
                            }}>
                                {sensors.map((sensor) => (
                                    <Gauge
                                        key={sensor.label}
                                        label={sensor.label}
                                        value={sensor.value}
                                        min={sensor.min}
                                        max={sensor.max}
                                        unit={sensor.unit}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Device Control Panel */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '20px',
                            padding: '30px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                            backdropFilter: 'blur(20px)'
                        }}>
                            <DeviceControlPanel
                                onToggleLED={handleToggleLED}
                                onChangeMotorSpeed={handleChangeMotorSpeed}
                                onTriggerBuzzer={handleTriggerBuzzer}
                            />
                        </div>
                    </>
                )}

                {activeTab === 'library' && <ComponentLibrary />}

                {activeTab === 'projects' && (
                    <div style={{
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
                            My Projects
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '20px'
                        }}>
                            {projects.map((project, index) => (
                                <div key={index} style={{
                                    background: '#f8fafc',
                                    border: '2px solid #e2e8f0',
                                    borderRadius: '15px',
                                    padding: '20px'
                                }}>
                                    <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{project.name}</h3>
                                    <div style={{
                                        display: 'inline-block',
                                        background: project.status === 'Active' ? '#10B981' : 
                                                   project.status === 'Completed' ? '#3B82F6' :
                                                   project.status === 'In Progress' ? '#F59E0B' : '#6B7280',
                                        color: 'white',
                                        padding: '4px 12px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        marginBottom: '10px'
                                    }}>
                                        {project.status}
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
        </div>
    );
};

export default AdvancedDashboard;
