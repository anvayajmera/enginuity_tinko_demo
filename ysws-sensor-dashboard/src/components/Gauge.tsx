import React from 'react';

interface GaugeProps {
    label: string;
    value: number;
    min: number;
    max: number;
    unit: string;
}

const Gauge: React.FC<GaugeProps> = ({ label, value, min, max, unit }) => {
    const percentage = ((value - min) / (max - min)) * 100;
    const getColor = () => {
        if (percentage < 30) return '#10B981';
        if (percentage < 70) return '#F59E0B';
        return '#EF4444';
    };

    return (
        <div style={{
            background: '#f8fafc',
            border: '2px solid #e2e8f0',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center'
        }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '16px' }}>{label}</h3>
            
            {/* Circular Progress */}
            <div style={{ position: 'relative', margin: '0 auto 15px', width: '80px', height: '80px' }}>
                <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                        cx="40"
                        cy="40"
                        r="35"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                    />
                    <circle
                        cx="40"
                        cy="40"
                        r="35"
                        fill="none"
                        stroke={getColor()}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${(percentage / 100) * 220} 220`}
                        style={{ transition: 'stroke-dasharray 0.5s ease' }}
                    />
                </svg>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: getColor()
                }}>
                    {value}{unit}
                </div>
            </div>
            
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
                Range: {min} - {max} {unit}
            </div>
        </div>
    );
};

export default Gauge;