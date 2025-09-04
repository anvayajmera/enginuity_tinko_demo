"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Gauge_1 = require("./Gauge");
var DifficultySwitcher_1 = require("./DifficultySwitcher");
var DeviceControlPanel_1 = require("./DeviceControlPanel");
var Dashboard = function () {
    var _a = react_1.useState('simple'), currentMode = _a[0], setCurrentMode = _a[1];
    var _b = react_1.useState(false), ledState = _b[0], setLedState = _b[1];
    var _c = react_1.useState(0), motorSpeed = _c[0], setMotorSpeed = _c[1];
    var sensors = [
        { label: 'Temperature', value: 23, min: 0, max: 50, unit: '°C' },
        { label: 'Distance', value: 120, min: 0, max: 200, unit: 'cm' },
        { label: 'Buzzer', value: 1, min: 0, max: 1, unit: '' },
        { label: 'Relay', value: 0, min: 0, max: 1, unit: '' }
    ];
    var handleToggleLED = function () { return setLedState(!ledState); };
    var handleChangeMotorSpeed = function (speed) { return setMotorSpeed(speed); };
    var handleTriggerBuzzer = function () { return console.log('Buzzer triggered!'); };
    // If advanced mode is active, DifficultySwitcher will handle the full page
    if (currentMode === 'advanced') {
        return react_1["default"].createElement(DifficultySwitcher_1["default"], { onModeChange: setCurrentMode });
    }
    return (react_1["default"].createElement("div", { style: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Arial, sans-serif',
            padding: '20px'
        } },
        react_1["default"].createElement("h1", { style: {
                color: 'white',
                textAlign: 'center',
                margin: '0 0 30px 0',
                fontSize: '32px'
            } }, "YSWS Sensor Dashboard"),
        react_1["default"].createElement(DifficultySwitcher_1["default"], { onModeChange: setCurrentMode }),
        react_1["default"].createElement("div", { style: {
                background: 'white',
                borderRadius: '15px',
                padding: '30px',
                margin: '30px 0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            } },
            react_1["default"].createElement("h2", { style: { margin: '0 0 20px 0', color: '#333' } }, "Live Sensor Data"),
            react_1["default"].createElement("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px'
                } }, sensors.map(function (sensor) { return (react_1["default"].createElement(Gauge_1["default"], { key: sensor.label, label: sensor.label, value: sensor.value, min: sensor.min, max: sensor.max, unit: sensor.unit })); }))),
        react_1["default"].createElement("div", { style: {
                background: 'white',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            } },
            react_1["default"].createElement(DeviceControlPanel_1["default"], { onToggleLED: handleToggleLED, onChangeMotorSpeed: handleChangeMotorSpeed, onTriggerBuzzer: handleTriggerBuzzer }))));
};
exports["default"] = Dashboard;
