import React from 'react';

const ComponentLibrary: React.FC = () => {
    const components = [
        {
            name: 'Arduino Uno',
            category: 'Microcontrollers',
            description: 'Popular development board with ATmega328P',
            image: '🔌',
            specs: '14 digital pins, 6 analog inputs, USB connection'
        },
        {
            name: 'Micro:bit',
            category: 'Microcontrollers',
            description: 'Educational single-board computer',
            image: '💻',
            specs: 'Built-in LED matrix, accelerometer, Bluetooth'
        },
        {
            name: 'Ultrasonic Sensor',
            category: 'Sensors',
            description: 'HC-SR04 distance measurement sensor',
            image: '📡',
            specs: 'Range: 2cm-400cm, Frequency: 40kHz'
        },
        {
            name: 'Temperature Sensor',
            category: 'Sensors',
            description: 'DS18B20 digital temperature sensor',
            image: '🌡️',
            specs: 'Range: -55°C to +125°C, ±0.5°C accuracy'
        },
        {
            name: 'LED',
            category: 'Outputs',
            description: 'Light Emitting Diode',
            image: '💡',
            specs: 'Various colors, 20mA current, 2-3V forward voltage'
        },
        {
            name: 'Servo Motor',
            category: 'Actuators',
            description: 'SG90 micro servo motor',
            image: '⚙️',
            specs: '180° rotation, 4.8-6V, PWM control'
        },
        {
            name: 'Buzzer',
            category: 'Outputs',
            description: 'Active buzzer for audio feedback',
            image: '🔊',
            specs: '5V operation, 85dB sound level'
        },
        {
            name: 'Relay Module',
            category: 'Switches',
            description: '5V relay for controlling high power devices',
            image: '🔌',
            specs: '10A/250VAC, 10A/30VDC switching capacity'
        }
    ];

    const categories = [...new Set(components.map(c => c.category))];

    return (
        <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            margin: '20px 0',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
            <h2 style={{
                margin: '0 0 25px 0',
                fontSize: '24px',
                fontWeight: '600',
                color: '#333'
            }}>
                Component Library
            </h2>

            {categories.map(category => (
                <div key={category} style={{ marginBottom: '30px' }}>
                    <h3 style={{
                        color: '#667eea',
                        fontSize: '18px',
                        fontWeight: '600',
                        marginBottom: '15px',
                        borderBottom: '2px solid #e2e8f0',
                        paddingBottom: '8px'
                    }}>
                        {category}
                    </h3>
                    
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '15px'
                    }}>
                        {components
                            .filter(component => component.category === category)
                            .map((component, index) => (
                            <div key={index} style={{
                                background: '#f8fafc',
                                border: '2px solid #e2e8f0',
                                borderRadius: '12px',
                                padding: '20px',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '12px'
                                }}>
                                    <div style={{
                                        fontSize: '32px',
                                        marginRight: '15px'
                                    }}>
                                        {component.image}
                                    </div>
                                    <div>
                                        <h4 style={{
                                            margin: '0 0 5px 0',
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            color: '#333'
                                        }}>
                                            {component.name}
                                        </h4>
                                        <p style={{
                                            margin: 0,
                                            fontSize: '14px',
                                            color: '#6b7280'
                                        }}>
                                            {component.description}
                                        </p>
                                    </div>
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#6b7280',
                                    background: 'white',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    border: '1px solid #e2e8f0'
                                }}>
                                    <strong>Specs:</strong> {component.specs}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ComponentLibrary;
