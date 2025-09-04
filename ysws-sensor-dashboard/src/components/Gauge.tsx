import React from 'react';

interface GaugeProps {
    value: number;
    min: number;
    max: number;
    label: string;
    unit?: string;
}

const Gauge: React.FC<GaugeProps> = ({ value, min, max, label, unit = '' }) => {
    const percentage = ((value - min) / (max - min)) * 100;
    
    const getColor = (percentage: number) => {
        if (percentage < 30) return '#10B981'; // Green
        if (percentage < 70) return '#F59E0B'; // Yellow
        return '#EF4444'; // Red
    };

    const color = getColor(percentage);

    return (
        <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: '2px solid #f1f5f9',
            transition: 'all 0.3s ease'
        }}>
            {/* Circular Progress */}
            <div style={{
                width: '100px',
                height: '100px',
                margin: '0 auto 20px',
                position: 'relative'
            }}>
                <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                    {/* Background circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${percentage * 2.51} 251`}
                        style={{ transition: 'stroke-dasharray 0.5s ease' }}
                    />
                </svg>
                
                {/* Value in center */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#374151'
                }}>
                    <div style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        lineHeight: '1'
                    }}>
                        {value}
                    </div>
                    {unit && (
                        <div style={{
                            fontSize: '11px',
                            opacity: 0.7,
                            marginTop: '2px'
                        }}>
                            {unit}
                        </div>
                    )}
                </div>
            </div>

            {/* Label */}
            <div style={{
                color: '#374151',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '8px'
            }}>
                {label}
            </div>
            
            {/* Range */}
            <div style={{
                color: '#6b7280',
                fontSize: '12px'
            }}>
                {min} - {max} {unit}
            </div>
        </div>
    );
};

export default Gauge;