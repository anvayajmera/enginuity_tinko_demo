import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';

interface SensorChartProps {
    sensorData: number[];
}

const SensorChart: React.FC<SensorChartProps> = ({ sensorData }) => {
    const chartRef = useRef<any>(null);

    const data = {
        labels: sensorData.map((_, index) => index.toString()),
        datasets: [
            {
                label: 'Sensor Data',
                data: sensorData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.chartInstance.update();
        }
    }, [sensorData]);

    return (
        <div>
            <h2>Live Sensor Data</h2>
            <Line ref={chartRef} data={data} />
        </div>
    );
};

export default SensorChart;