import React from 'react';

interface ChartData {
    time: string;
    temperature: number;
    humidity: number;
}

interface SensorChartProps {
    data: ChartData[];
}

const SensorChart: React.FC<SensorChartProps> = ({ data }) => {
    const maxTemp = Math.max(...data.map(d => d.temperature), 35);
    const minTemp = Math.min(...data.map(d => d.temperature), 15);
    const maxHumidity = Math.max(...data.map(d => d.humidity), 100);
    const minHumidity = Math.min(...data.map(d => d.humidity), 30);

    const chartWidth = 600;
    const chartHeight = 300;
    const padding = 50;

    const getTemperatureY = (temp: number) => {
        return chartHeight - padding - ((temp - minTemp) / (maxTemp - minTemp)) * (chartHeight - 2 * padding);
    };

    const getHumidityY = (humidity: number) => {
        return chartHeight - padding - ((humidity - minHumidity) / (maxHumidity - minHumidity)) * (chartHeight - 2 * padding);
    };

    const getX = (index: number) => {
        return padding + (index / Math.max(data.length - 1, 1)) * (chartWidth - 2 * padding);
    };

    if (data.length === 0) {
        return (
            <div style={{
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f8fafc',
                borderRadius: '10px',
                border: '2px dashed #e2e8f0',
                color: '#6b7280',
                fontSize: '16px'
            }}>
                📊 Waiting for sensor data...
            </div>
        );
    }

    return (
        <div style={{
            background: '#f8fafc',
            borderRadius: '15px',
            padding: '20px',
            border: '2px solid #e2e8f0'
        }}>
            <svg width={chartWidth} height={chartHeight} style={{ width: '100%', height: 'auto' }}>
                {/* Grid lines */}
                <defs>
                    <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width={chartWidth} height={chartHeight} fill="url(#grid)" />

                {/* Temperature line */}
                <path
                    d={data.map((point, index) => 
                        `${index === 0 ? 'M' : 'L'} ${getX(index)} ${getTemperatureY(point.temperature)}`
                    ).join(' ')}
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                {/* Humidity line */}
                <path
                    d={data.map((point, index) => 
                        `${index === 0 ? 'M' : 'L'} ${getX(index)} ${getHumidityY(point.humidity)}`
                    ).join(' ')}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                {/* Data points */}
                {data.map((point, index) => (
                    <g key={index}>
                        <circle
                            cx={getX(index)}
                            cy={getTemperatureY(point.temperature)}
                            r="4"
                            fill="#EF4444"
                        />
                        <circle
                            cx={getX(index)}
                            cy={getHumidityY(point.humidity)}
                            r="4"
                            fill="#3B82F6"
                        />
                    </g>
                ))}

                {/* Y-axis labels */}
                <text x={20} y={padding} textAnchor="middle" fontSize="12" fill="#6b7280">
                    {maxTemp.toFixed(0)}°C
                </text>
                <text x={20} y={chartHeight - padding} textAnchor="middle" fontSize="12" fill="#6b7280">
                    {minTemp.toFixed(0)}°C
                </text>

                {/* X-axis labels */}
                {data.length > 0 && (
                    <>
                        <text x={padding} y={chartHeight - 10} textAnchor="start" fontSize="12" fill="#6b7280">
                            {data[0].time}
                        </text>
                        <text x={chartWidth - padding} y={chartHeight - 10} textAnchor="end" fontSize="12" fill="#6b7280">
                            {data[data.length - 1].time}
                        </text>
                    </>
                )}
            </svg>

            {/* Legend */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '30px',
                marginTop: '15px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <div style={{
                        width: '16px',
                        height: '3px',
                        background: '#EF4444',
                        borderRadius: '2px'
                    }} />
                    <span style={{
                        fontSize: '14px',
                        color: '#333',
                        fontWeight: '600'
                    }}>
                        Temperature (°C)
                    </span>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <div style={{
                        width: '16px',
                        height: '3px',
                        background: '#3B82F6',
                        borderRadius: '2px'
                    }} />
                    <span style={{
                        fontSize: '14px',
                        color: '#333',
                        fontWeight: '600'
                    }}>
                        Humidity (%)
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SensorChart;