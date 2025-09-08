import React from 'react';

const ComponentLibrary: React.FC = () => {
    const components = [
        {
            name: 'Temperature Sensor',
            type: 'DHT22',
            description: 'Digital temperature and humidity sensor',
            pins: ['VCC', 'Data', 'GND'],
            image: '🌡️'
        },
        {
            name: 'Ultrasonic Sensor',
            type: 'HC-SR04',
            description: 'Distance measurement sensor using ultrasonic waves',
            pins: ['VCC', 'Trig', 'Echo', 'GND'],
            image: '📡'
        },
        {
            name: 'LED',
            type: 'Standard LED',
            description: 'Light emitting diode for visual indicators',
            pins: ['Anode (+)', 'Cathode (-)'],
            image: '💡'
        },
        {
            name: 'Servo Motor',
            type: 'SG90',
            description: 'Precise angular positioning motor',
            pins: ['VCC', 'Signal', 'GND'],
            image: '⚙️'
        },
        {
            name: 'Buzzer',
            type: 'Active Buzzer',
            description: 'Audio output device for alerts and notifications',
            pins: ['VCC', 'GND'],
            image: '🔊'
        },
        {
            name: 'Light Sensor',
            type: 'LDR',
            description: 'Light dependent resistor for ambient light detection',
            pins: ['A0', 'GND'],
            image: '☀️'
        }
    ];

    return (
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
                Component Library
            </h2>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px'
            }}>
                {components.map((component, index) => (
                    <div key={index} style={{
                        background: '#f8fafc',
                        border: '2px solid #e2e8f0',
                        borderRadius: '15px',
                        padding: '20px',
                        transition: 'transform 0.2s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}>
                        <div style={{
                            fontSize: '48px',
                            textAlign: 'center',
                            marginBottom: '15px'
                        }}>
                            {component.image}
                        </div>
                        
                        <h3 style={{
                            margin: '0 0 5px 0',
                            color: '#333',
                            fontSize: '18px',
                            fontWeight: '600'
                        }}>
                            {component.name}
                        </h3>
                        
                        <div style={{
                            background: '#E5E7EB',
                            color: '#374151',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            display: 'inline-block',
                            marginBottom: '10px'
                        }}>
                            {component.type}
                        </div>
                        
                        <p style={{
                            margin: '0 0 15px 0',
                            fontSize: '14px',
                            color: '#6b7280',
                            lineHeight: '1.5'
                        }}>
                            {component.description}
                        </p>
                        
                        <div>
                            <h4 style={{
                                margin: '0 0 8px 0',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#333'
                            }}>
                                Pin Configuration:
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                {component.pins.map((pin, pinIndex) => (
                                    <span key={pinIndex} style={{
                                        background: '#3B82F6',
                                        color: 'white',
                                        padding: '2px 8px',
                                        borderRadius: '10px',
                                        fontSize: '12px',
                                        fontWeight: '500'
                                    }}>
                                        {pin}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComponentLibrary;
