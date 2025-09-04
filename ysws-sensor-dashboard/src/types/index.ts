export interface SensorData {
    distance?: number;
    temperature?: number;
    buzzerActive?: boolean;
    relayState?: boolean;
    ledState?: boolean;
}

export interface DeviceControlProps {
    onToggleLED: (state: boolean) => void;
    onChangeMotorSpeed: (speed: number) => void;
    onTriggerBuzzer: () => void;
}

export interface DifficultyLevel {
    label: string;
    value: 'simple' | 'advanced';
}