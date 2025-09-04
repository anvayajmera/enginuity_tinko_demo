"use strict";
exports.__esModule = true;
var react_1 = require("react");
var DeviceControlPanel = function (_a) {
    var onToggleLED = _a.onToggleLED, onChangeMotorSpeed = _a.onChangeMotorSpeed, onTriggerBuzzer = _a.onTriggerBuzzer;
    var _b = react_1["default"].useState(0), motorSpeed = _b[0], setMotorSpeed = _b[1];
    var handleMotorSpeedChange = function (event) {
        var speed = Number(event.target.value);
        setMotorSpeed(speed);
        onChangeMotorSpeed(speed);
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h2", { style: {
                margin: '0 0 25px 0',
                fontSize: '24px',
                fontWeight: '600',
                color: '#333'
            } }, "Device Control Panel"),
        react_1["default"].createElement("div", { style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
            } },
            react_1["default"].createElement("div", { style: {
                    background: '#f8fafc',
                    padding: '20px',
                    borderRadius: '15px',
                    border: '2px solid #e2e8f0',
                    textAlign: 'center'
                } },
                react_1["default"].createElement("h3", { style: { margin: '0 0 15px 0', color: '#374151' } }, "LED Control"),
                react_1["default"].createElement("button", { onClick: onToggleLED, style: {
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
                    } }, "Toggle LED")),
            react_1["default"].createElement("div", { style: {
                    background: '#f8fafc',
                    padding: '20px',
                    borderRadius: '15px',
                    border: '2px solid #e2e8f0'
                } },
                react_1["default"].createElement("h3", { style: { margin: '0 0 15px 0', color: '#374151', textAlign: 'center' } }, "Motor Speed"),
                react_1["default"].createElement("input", { type: "range", min: "0", max: "100", value: motorSpeed, onChange: handleMotorSpeedChange, style: {
                        width: '100%',
                        height: '8px',
                        borderRadius: '5px',
                        background: '#e2e8f0',
                        outline: 'none',
                        marginBottom: '10px'
                    } }),
                react_1["default"].createElement("div", { style: {
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#374151'
                    } },
                    motorSpeed,
                    "%")),
            react_1["default"].createElement("div", { style: {
                    background: '#f8fafc',
                    padding: '20px',
                    borderRadius: '15px',
                    border: '2px solid #e2e8f0',
                    textAlign: 'center'
                } },
                react_1["default"].createElement("h3", { style: { margin: '0 0 15px 0', color: '#374151' } }, "Buzzer"),
                react_1["default"].createElement("button", { onClick: onTriggerBuzzer, style: {
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
                    } }, "Trigger Buzzer")))));
};
exports["default"] = DeviceControlPanel;
