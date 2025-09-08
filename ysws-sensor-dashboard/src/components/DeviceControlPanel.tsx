import React, { useState } from 'react';

interface DeviceControlPanelProps {
    onToggleLED: () => void;
    onChangeMotorSpeed: (speed: number) => void;
    onTriggerBuzzer: () => void;
}

const DeviceControlPanel: React.FC<DeviceControlPanelProps> = ({
    onToggleLED,
    onChangeMotorSpeed,
    onTriggerBuzzer
}) => {
    const [ledState, setLedState] = useState(false);
    const [motorSpeed, setMotorSpeed] = useState(0);

    const handleLEDToggle = () => {
        setLedState(!ledState);
        onToggleLED();
    };

    const handleMotorSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const speed = parseInt(e.target.value);
        setMotorSpeed(speed);
        onChangeMotorSpeed(speed);
    };

    return (
        <div>
            <h2 style={{
                margin: '0 0 25px 0',
                fontSize: '24px',
                fontWeight: '600',
                color: '#333'
            }}>
                Device Control Panel
            </h2>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
            }}>
                {/* LED Control */}
                <div style={{
                    background: '#f8fafc',
                    border: '2px solid #e2e8f0',
                    borderRadius: '15px',
                    padding: '20px'
                }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>LED Control</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button
                            onClick={handleLEDToggle}
                            style={{
                                background: ledState ? '#10B981' : '#6B7280',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '25px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {ledState ? 'ON' : 'OFF'}
                        </button>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: ledState ? '#10B981' : '#E5E7EB',
                            transition: 'all 0.3s ease',
                            boxShadow: ledState ? '0 0 10px #10B981' : 'none'
                        }} />
                    </div>
                </div>

                {/* Motor Control */}
                <div style={{
                    background: '#f8fafc',
                    border: '2px solid #e2e8f0',
                    borderRadius: '15px',
                    padding: '20px'
                }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Motor Speed</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input
                            type="range"
                            min="0"
                            max="255"
                            value={motorSpeed}
                            onChange={handleMotorSpeedChange}
                            style={{
                                width: '100%',
                                height: '8px',
                                borderRadius: '5px',
                                background: '#E5E7EB',
                                outline: 'none'
                            }}
                        />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '14px',
                            color: '#6B7280'
                        }}>
                            <span>0</span>
                            <span style={{ fontWeight: 'bold', color: '#333' }}>{motorSpeed}</span>
                            <span>255</span>
                        </div>
                    </div>
                </div>

                {/* Buzzer Control */}
                <div style={{
                    background: '#f8fafc',
                    border: '2px solid #e2e8f0',
                    borderRadius: '15px',
                    padding: '20px'
                }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Buzzer</h3>
                    <button
                        onClick={onTriggerBuzzer}
                        style={{
                            background: '#F59E0B',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '25px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            width: '100%'
                        }}
                    >
                        🔊 Trigger Buzzer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeviceControlPanel;