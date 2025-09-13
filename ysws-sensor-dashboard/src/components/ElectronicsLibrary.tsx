import React, { useState } from 'react';

interface ElectronicComponent {
    id: string;
    name: string;
    category: string;
    description: string;
    pins: string[];
    voltage: string;
    current?: string;
    image: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    price: string;
    applications: string[];
    specifications: Record<string, string>;
}

interface Project {
    id: string;
    name: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    components: string[];
    description: string;
    steps: string[];
    image: string;
    skills: string[];
}

const ElectronicsLibrary: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'components' | 'projects' | 'dictionary'>('components');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const components: ElectronicComponent[] = [
        {
            id: 'arduino-uno',
            name: 'Arduino Uno R3',
            category: 'Microcontrollers',
            description: 'Popular microcontroller board based on ATmega328P',
            pins: ['Digital 0-13', 'Analog A0-A5', 'Power', 'Ground'],
            voltage: '5V',
            current: '40mA per pin',
            image: '🖥️',
            difficulty: 'Beginner',
            price: '$25',
            applications: ['IoT Projects', 'Robotics', 'Automation', 'Learning'],
            specifications: {
                'Processor': 'ATmega328P',
                'Clock Speed': '16MHz',
                'Flash Memory': '32KB',
                'RAM': '2KB',
                'EEPROM': '1KB'
            }
        },
        {
            id: 'esp32',
            name: 'ESP32 DevKit',
            category: 'Microcontrollers',
            description: 'WiFi and Bluetooth enabled microcontroller',
            pins: ['GPIO 0-39', 'ADC', 'DAC', 'PWM'],
            voltage: '3.3V',
            current: '240mA',
            image: '📡',
            difficulty: 'Intermediate',
            price: '$12',
            applications: ['WiFi Projects', 'IoT', 'Bluetooth', 'Web Server'],
            specifications: {
                'Processor': 'Xtensa LX6',
                'Clock Speed': '240MHz',
                'Flash Memory': '4MB',
                'RAM': '520KB',
                'WiFi': '802.11 b/g/n',
                'Bluetooth': 'v4.2 BR/EDR and BLE'
            }
        },
        {
            id: 'raspberry-pi',
            name: 'Raspberry Pi 4',
            category: 'Single Board Computers',
            description: 'Complete computer on a single board',
            pins: ['40 GPIO pins', 'HDMI', 'USB', 'Ethernet'],
            voltage: '5V',
            current: '3A',
            image: '🥧',
            difficulty: 'Advanced',
            price: '$75',
            applications: ['Linux Projects', 'Computer Vision', 'AI/ML', 'Media Center'],
            specifications: {
                'Processor': 'Quad-core ARM Cortex-A72',
                'Clock Speed': '1.5GHz',
                'RAM': '4GB/8GB',
                'Storage': 'MicroSD',
                'OS': 'Linux-based'
            }
        },
        {
            id: 'dht22',
            name: 'DHT22 Temperature & Humidity Sensor',
            category: 'Sensors',
            description: 'Digital temperature and humidity sensor',
            pins: ['VCC', 'Data', 'NC', 'GND'],
            voltage: '3.3-5V',
            image: '🌡️',
            difficulty: 'Beginner',
            price: '$8',
            applications: ['Weather Station', 'Climate Control', 'Home Automation'],
            specifications: {
                'Temperature Range': '-40°C to 80°C',
                'Humidity Range': '0-100% RH',
                'Accuracy': '±0.5°C, ±2% RH',
                'Resolution': '0.1°C, 0.1% RH'
            }
        },
        {
            id: 'hc-sr04',
            name: 'HC-SR04 Ultrasonic Sensor',
            category: 'Sensors',
            description: 'Ultrasonic distance measurement sensor',
            pins: ['VCC', 'Trig', 'Echo', 'GND'],
            voltage: '5V',
            current: '15mA',
            image: '📡',
            difficulty: 'Beginner',
            price: '$3',
            applications: ['Distance Measurement', 'Obstacle Avoidance', 'Parking Sensor'],
            specifications: {
                'Range': '2cm - 400cm',
                'Accuracy': '±3mm',
                'Angle': '15°',
                'Frequency': '40kHz'
            }
        },
        {
            id: 'servo-sg90',
            name: 'SG90 Micro Servo',
            category: 'Actuators',
            description: 'Small servo motor for precise positioning',
            pins: ['Signal', 'VCC', 'GND'],
            voltage: '4.8-6V',
            current: '500mA',
            image: '⚙️',
            difficulty: 'Beginner',
            price: '$5',
            applications: ['Robotics', 'Camera Gimbal', 'Automated Systems'],
            specifications: {
                'Rotation': '180°',
                'Torque': '1.8kg/cm',
                'Speed': '0.1s/60°',
                'Control': 'PWM'
            }
        },
        {
            id: 'neopixel',
            name: 'NeoPixel LED Strip',
            category: 'Display',
            description: 'Addressable RGB LED strip',
            pins: ['Din', 'VCC', 'GND'],
            voltage: '5V',
            current: '60mA per LED',
            image: '🌈',
            difficulty: 'Intermediate',
            price: '$15',
            applications: ['Lighting Effects', 'Status Display', 'Art Projects'],
            specifications: {
                'LEDs per meter': '30/60/144',
                'Colors': '16.7 million',
                'Protocol': 'WS2812B',
                'Control': 'Single wire'
            }
        },
        {
            id: 'mpu6050',
            name: 'MPU6050 Gyroscope & Accelerometer',
            category: 'Sensors',
            description: '6-axis motion tracking sensor',
            pins: ['VCC', 'GND', 'SCL', 'SDA', 'XDA', 'XCL', 'AD0', 'INT'],
            voltage: '3.3-5V',
            image: '🎯',
            difficulty: 'Intermediate',
            price: '$6',
            applications: ['Motion Detection', 'Drone Stabilization', 'Gaming Controllers'],
            specifications: {
                'Accelerometer': '±2, ±4, ±8, ±16g',
                'Gyroscope': '±250, ±500, ±1000, ±2000°/s',
                'Interface': 'I2C',
                'Frequency': '400kHz'
            }
        }
    ];

    const projects: Project[] = [
        {
            id: 'led-blink',
            name: 'Blinking LED',
            difficulty: 'Beginner',
            duration: '30 minutes',
            components: ['arduino-uno', 'LED', 'Resistor'],
            description: 'Your first Arduino project - make an LED blink!',
            steps: [
                'Connect LED to pin 13 through a 220Ω resistor',
                'Connect the other end to ground',
                'Upload the blink sketch',
                'Watch your LED blink every second!'
            ],
            image: '💡',
            skills: ['Basic wiring', 'Arduino IDE', 'Digital output']
        },
        {
            id: 'temperature-monitor',
            name: 'Temperature Monitor',
            difficulty: 'Beginner',
            duration: '1 hour',
            components: ['arduino-uno', 'dht22', 'LCD Display'],
            description: 'Monitor temperature and humidity with LCD display',
            steps: [
                'Connect DHT22 to pin 2',
          'Wire up 16x2 LCD display',
                'Install DHT sensor library',
                'Program to read and display values',
                'Add temperature alerts'
            ],
            image: '🌡️',
            skills: ['Sensor interfacing', 'LCD display', 'Libraries']
        },
        {
            id: 'distance-radar',
            name: 'Ultrasonic Distance Radar',
            difficulty: 'Intermediate',
            duration: '2 hours',
            components: ['arduino-uno', 'hc-sr04', 'servo-sg90', 'LED Strip'],
            description: 'Create a rotating distance radar with visual feedback',
            steps: [
                'Mount ultrasonic sensor on servo',
                'Connect servo to pin 9',
                'Wire ultrasonic sensor (Trig: pin 7, Echo: pin 8)',
                'Add LED strip for distance visualization',
                'Program servo sweep and distance calculation',
                'Create radar visualization'
            ],
            image: '📡',
            skills: ['Servo control', 'Distance measurement', 'Data visualization']
        },
        {
            id: 'iot-weather-station',
            name: 'IoT Weather Station',
            difficulty: 'Advanced',
            duration: '4 hours',
            components: ['esp32', 'dht22', 'BMP280', 'OLED Display'],
            description: 'WiFi-enabled weather station with web dashboard',
            steps: [
                'Connect DHT22 and BMP280 sensors',
                'Add OLED display for local readings',
                'Set up WiFi connection',
                'Create web server for data display',
                'Implement data logging',
                'Add weather forecasting features'
            ],
            image: '🌤️',
            skills: ['WiFi programming', 'Web servers', 'Sensor fusion', 'Data logging']
        },
        {
            id: 'smart-home-hub',
            name: 'Smart Home Control Hub',
            difficulty: 'Advanced',
            duration: '6 hours',
            components: ['raspberry-pi', 'Multiple sensors', 'Relay modules', 'Camera'],
            description: 'Complete home automation system with mobile app',
            steps: [
                'Set up Raspberry Pi with Linux',
                'Install home automation software',
                'Connect various sensors and actuators',
                'Set up camera for security',
                'Create mobile app interface',
                'Implement automation rules'
            ],
            image: '🏠',
            skills: ['Linux administration', 'Python programming', 'Mobile apps', 'Networking']
        }
    ];

    const categories = ['all', ...Array.from(new Set(components.map(c => c.category)))];

    const filteredComponents = components.filter(component => {
        const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
        const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            component.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const ComponentCard: React.FC<{ component: ElectronicComponent }> = ({ component }) => (
        <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            animation: 'slideInUp 0.6s ease-out',
            border: '1px solid #e2e8f0'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        }}>
            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{component.image}</div>
                <h3 style={{ color: '#333', margin: '0 0 5px 0', fontSize: '18px' }}>{component.name}</h3>
                <div style={{
                    display: 'inline-block',
                    background: component.difficulty === 'Beginner' ? '#10B981' :
                               component.difficulty === 'Intermediate' ? '#F59E0B' : '#EF4444',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '10px'
                }}>
                    {component.difficulty}
                </div>
            </div>
            
            <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: '1.5', marginBottom: '15px' }}>
                {component.description}
            </p>
            
            <div style={{ marginBottom: '15px' }}>
                <strong style={{ color: '#374151', fontSize: '14px' }}>Voltage: </strong>
                <span style={{ color: '#6B7280', fontSize: '14px' }}>{component.voltage}</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
                <strong style={{ color: '#374151', fontSize: '14px' }}>Price: </strong>
                <span style={{ color: '#059669', fontSize: '14px', fontWeight: '600' }}>{component.price}</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
                <strong style={{ color: '#374151', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                    Key Pins:
                </strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {component.pins.slice(0, 4).map((pin, index) => (
                        <span key={index} style={{
                            background: '#3B82F6',
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: '500'
                        }}>
                            {pin}
                        </span>
                    ))}
                </div>
            </div>
            
            <div>
                <strong style={{ color: '#374151', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                    Applications:
                </strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {component.applications.slice(0, 2).map((app, index) => (
                        <span key={index} style={{
                            background: '#F3F4F6',
                            color: '#374151',
                            padding: '2px 8px',
                            borderRadius: '8px',
                            fontSize: '11px'
                        }}>
                            {app}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );

    const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
        <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            animation: 'slideInUp 0.6s ease-out',
            border: '1px solid #e2e8f0'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        }}>
            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{project.image}</div>
                <h3 style={{ color: '#333', margin: '0 0 5px 0', fontSize: '18px' }}>{project.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{
                        background: project.difficulty === 'Beginner' ? '#10B981' :
                                   project.difficulty === 'Intermediate' ? '#F59E0B' : '#EF4444',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                    }}>
                        {project.difficulty}
                    </div>
                    <div style={{
                        background: '#6B7280',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                    }}>
                        {project.duration}
                    </div>
                </div>
            </div>
            
            <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: '1.5', marginBottom: '15px' }}>
                {project.description}
            </p>
            
            <div style={{ marginBottom: '15px' }}>
                <strong style={{ color: '#374151', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                    Required Components:
                </strong>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>
                    {project.components.join(', ')}
                </div>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
                <strong style={{ color: '#374151', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                    Skills Learned:
                </strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {project.skills.map((skill, index) => (
                        <span key={index} style={{
                            background: '#EDE9FE',
                            color: '#7C3AED',
                            padding: '2px 8px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontWeight: '500'
                        }}>
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
            
            <button style={{
                width: '100%',
                background: '#3B82F6',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
            }}>
                Start Project
            </button>
        </div>
    );

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(20px)',
            animation: 'fadeIn 0.8s ease-out'
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h2 style={{
                    margin: '0 0 10px 0',
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#333',
                    animation: 'slideInDown 0.6s ease-out'
                }}>
                    🔧 Electronics Library & Projects
                </h2>
                <p style={{ color: '#6B7280', fontSize: '16px', animation: 'slideInDown 0.8s ease-out' }}>
                    Comprehensive guide to electronic components and hands-on projects
                </p>
            </div>

            {/* Navigation Tabs */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '15px',
                marginBottom: '30px',
                animation: 'slideInUp 0.6s ease-out'
            }}>
                {(['components', 'projects', 'dictionary'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            background: activeTab === tab ? '#3B82F6' : 'transparent',
                            color: activeTab === tab ? 'white' : '#6B7280',
                            border: `2px solid ${activeTab === tab ? '#3B82F6' : '#E5E7EB'}`,
                            padding: '12px 24px',
                            borderRadius: '25px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textTransform: 'capitalize'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Components Tab */}
            {activeTab === 'components' && (
                <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    {/* Search and Filter */}
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        marginBottom: '30px',
                        flexWrap: 'wrap',
                        alignItems: 'center'
                    }}>
                        <input
                            type="text"
                            placeholder="Search components..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                flex: 1,
                                minWidth: '250px',
                                padding: '12px 16px',
                                border: '2px solid #E5E7EB',
                                borderRadius: '25px',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.3s ease'
                            }}
                        />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={{
                                padding: '12px 16px',
                                border: '2px solid #E5E7EB',
                                borderRadius: '25px',
                                fontSize: '16px',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'All Categories' : category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Components Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '25px'
                    }}>
                        {filteredComponents.map((component, index) => (
                            <div key={component.id} style={{ animationDelay: `${index * 0.1}s` }}>
                                <ComponentCard component={component} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
                <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '25px'
                    }}>
                        {projects.map((project, index) => (
                            <div key={project.id} style={{ animationDelay: `${index * 0.1}s` }}>
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Dictionary Tab */}
            {activeTab === 'dictionary' && (
                <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '20px'
                    }}>
                        {[
                            { term: 'GPIO', definition: 'General Purpose Input/Output - programmable pins on microcontrollers' },
                            { term: 'PWM', definition: 'Pulse Width Modulation - technique for controlling power to electrical devices' },
                            { term: 'I2C', definition: 'Inter-Integrated Circuit - communication protocol for connecting devices' },
                            { term: 'SPI', definition: 'Serial Peripheral Interface - synchronous serial communication protocol' },
                            { term: 'UART', definition: 'Universal Asynchronous Receiver-Transmitter - serial communication protocol' },
                            { term: 'ADC', definition: 'Analog-to-Digital Converter - converts analog signals to digital values' },
                            { term: 'DAC', definition: 'Digital-to-Analog Converter - converts digital values to analog signals' },
                            { term: 'Pull-up Resistor', definition: 'Resistor that ensures a pin reads HIGH when not connected' }
                        ].map((item, index) => (
                            <div key={index} style={{
                                background: 'white',
                                borderRadius: '12px',
                                padding: '20px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                border: '1px solid #e2e8f0',
                                animation: 'slideInUp 0.6s ease-out',
                                animationDelay: `${index * 0.1}s`
                            }}>
                                <h4 style={{
                                    color: '#3B82F6',
                                    margin: '0 0 10px 0',
                                    fontSize: '18px',
                                    fontWeight: '600'
                                }}>
                                    {item.term}
                                </h4>
                                <p style={{
                                    color: '#6B7280',
                                    margin: 0,
                                    fontSize: '14px',
                                    lineHeight: '1.5'
                                }}>
                                    {item.definition}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideInUp {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes slideInDown {
                        from { opacity: 0; transform: translateY(-30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}
            </style>
        </div>
    );
};

export default ElectronicsLibrary;
