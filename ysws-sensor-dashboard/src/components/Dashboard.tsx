import React, { useState } from 'react';
import Gauge from './Gauge';
import DifficultySwitcher from './DifficultySwitcher';
import DeviceControlPanel from './DeviceControlPanel';

const Dashboard: React.FC = () => {
    const [currentMode, setCurrentMode] = useState<'simple' | 'advanced'>('simple');
    const [ledState, setLedState] = useState(false);
    const [motorSpeed, setMotorSpeed] = useState(0);
    
    const sensors = [
        { label: 'Temperature', value: 23, min: 0, max: 50, unit: '°C' },
        { label: 'Distance', value: 120, min: 0, max: 200, unit: 'cm' },
        { label: 'Buzzer', value: 1, min: 0, max: 1, unit: '' },
        { label: 'Relay', value: 0, min: 0, max: 1, unit: '' }
    ];

    const handleToggleLED = () => setLedState(!ledState);
    const handleChangeMotorSpeed = (speed: number) => setMotorSpeed(speed);
    const handleTriggerBuzzer = () => console.log('Buzzer triggered!');

    // If advanced mode is active, DifficultySwitcher will handle the full page
    if (currentMode === 'advanced') {
        return <DifficultySwitcher onModeChange={setCurrentMode} />;
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Arial, sans-serif',
            padding: '20px'
        }}>
            {/* Header */}
            <h1 style={{
                color: 'white',
                textAlign: 'center',
                margin: '0 0 30px 0',
                fontSize: '32px'
            }}>
                YSWS Sensor Dashboard
            </h1>

            {/* Difficulty Switcher */}
            <DifficultySwitcher onModeChange={setCurrentMode} />

            {/* Sensor Gauges - Simple Mode */}
            <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '30px',
                margin: '30px 0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>Live Sensor Data</h2>
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
                background: 'white',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
                <DeviceControlPanel
                    onToggleLED={handleToggleLED}
                    onChangeMotorSpeed={handleChangeMotorSpeed}
                    onTriggerBuzzer={handleTriggerBuzzer}
                />
            </div>
        </div>
    );
};

export default Dashboard;
