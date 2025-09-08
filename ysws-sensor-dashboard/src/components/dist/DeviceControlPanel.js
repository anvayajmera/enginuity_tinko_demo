"use strict";
exports.__esModule = true;
var react_1 = require("react");
var DeviceControlPanel = function (_a) {
    var onToggleLED = _a.onToggleLED, onChangeMotorSpeed = _a.onChangeMotorSpeed, onTriggerBuzzer = _a.onTriggerBuzzer;
    var _b = react_1.useState(false), ledState = _b[0], setLedState = _b[1];
    var _c = react_1.useState(0), motorSpeed = _c[0], setMotorSpeed = _c[1];
    var handleLEDToggle = function () {
        setLedState(!ledState);
        onToggleLED();
    };
    var handleMotorSpeedChange = function (e) {
        var speed = parseInt(e.target.value);
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
            } },
            react_1["default"].createElement("div", { style: {
                    background: '#f8fafc',
                    border: '2px solid #e2e8f0',
                    borderRadius: '15px',
                    padding: '20px'
                } },
                react_1["default"].createElement("h3", { style: { margin: '0 0 15px 0', color: '#333' } }, "LED Control"),
                react_1["default"].createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '15px' } },
                    react_1["default"].createElement("button", { onClick: handleLEDToggle, style: {
                            background: ledState ? '#10B981' : '#6B7280',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '25px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        } }, ledState ? 'ON' : 'OFF'),
                    react_1["default"].createElement("div", { style: {
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: ledState ? '#10B981' : '#E5E7EB',
                            transition: 'all 0.3s ease',
                            boxShadow: ledState ? '0 0 10px #10B981' : 'none'
                        } }))),
            react_1["default"].createElement("div", { style: {
                    background: '#f8fafc',
                    border: '2px solid #e2e8f0',
                    borderRadius: '15px',
                    padding: '20px'
                } },
                react_1["default"].createElement("h3", { style: { margin: '0 0 15px 0', color: '#333' } }, "Motor Speed"),
                react_1["default"].createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
                    react_1["default"].createElement("input", { type: "range", min: "0", max: "255", value: motorSpeed, onChange: handleMotorSpeedChange, style: {
                            width: '100%',
                            height: '8px',
                            borderRadius: '5px',
                            background: '#E5E7EB',
                            outline: 'none'
                        } }),
                    react_1["default"].createElement("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '14px',
                            color: '#6B7280'
                        } },
                        react_1["default"].createElement("span", null, "0"),
                        react_1["default"].createElement("span", { style: { fontWeight: 'bold', color: '#333' } }, motorSpeed),
                        react_1["default"].createElement("span", null, "255")))),
            react_1["default"].createElement("div", { style: {
                    background: '#f8fafc',
                    border: '2px solid #e2e8f0',
                    borderRadius: '15px',
                    padding: '20px'
                } },
                react_1["default"].createElement("h3", { style: { margin: '0 0 15px 0', color: '#333' } }, "Buzzer"),
                react_1["default"].createElement("button", { onClick: onTriggerBuzzer, style: {
                        background: '#F59E0B',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '25px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        width: '100%'
                    } }, "\uD83D\uDD0A Trigger Buzzer")))));
};
exports["default"] = DeviceControlPanel;
