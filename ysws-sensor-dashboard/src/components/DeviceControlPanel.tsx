import React from 'react';

interface DeviceControlProps {
    onToggleLED: () => void;
    onChangeMotorSpeed: (speed: number) => void;
    onTriggerBuzzer: () => void;
}

const DeviceControlPanel: React.FC<DeviceControlProps> = ({ onToggleLED, onChangeMotorSpeed, onTriggerBuzzer }) => {
    const [motorSpeed, setMotorSpeed] = React.useState(0);

    const handleMotorSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const speed = Number(event.target.value);
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
            }}>
                {/* Toggle LED */}
                <div style={{
                    background: '#f8fafc',
                    padding: '20px',
                    borderRadius: '15px',
                    border: '2px solid #e2e8f0',
                    textAlign: 'center'
                }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#374151' }}>LED Control</h3>
                    <button 
                        onClick={onToggleLED}
                        style={{
                            background: '#4F46E5',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '10px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            width: '100%'
                        }}
                    >
                        Toggle LED
                    </button>
                </div>

                {/* Motor Speed */}
                <div style={{
                    background: '#f8fafc',
                    padding: '20px',
                    borderRadius: '15px',
                    border: '2px solid #e2e8f0'
                }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#374151', textAlign: 'center' }}>Motor Speed</h3>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={motorSpeed}
                        onChange={handleMotorSpeedChange}
                        style={{
                            width: '100%',
                            height: '8px',
                            borderRadius: '5px',
                            background: '#e2e8f0',
                            outline: 'none',
                            marginBottom: '10px'
                        }}
                    />
                    <div style={{
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#374151'
                    }}>
                        {motorSpeed}%
                    </div>
                </div>

                {/* Buzzer */}
                <div style={{
                    background: '#f8fafc',
                    padding: '20px',
                    borderRadius: '15px',
                    border: '2px solid #e2e8f0',
                    textAlign: 'center'
                }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#374151' }}>Buzzer</h3>
                    <button 
                        onClick={onTriggerBuzzer}
                        style={{
                            background: '#EF4444',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '10px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            width: '100%'
                        }}
                    >
                        Trigger Buzzer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeviceControlPanel;