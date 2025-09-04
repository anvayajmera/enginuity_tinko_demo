"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Gauge_1 = require("./Gauge");
var DeviceControlPanel_1 = require("./DeviceControlPanel");
var ComponentLibrary_1 = require("./ComponentLibrary");
var AdvancedDashboard = function (_a) {
    var username = _a.username, onLogout = _a.onLogout;
    var _b = react_1.useState('dashboard'), activeTab = _b[0], setActiveTab = _b[1];
    var _c = react_1.useState(false), ledState = _c[0], setLedState = _c[1];
    var _d = react_1.useState(0), motorSpeed = _d[0], setMotorSpeed = _d[1];
    var sensors = [
        { label: 'Temperature', value: 25, min: 0, max: 50, unit: '°C' },
        { label: 'Distance', value: 87, min: 0, max: 200, unit: 'cm' },
        { label: 'Light Level', value: 340, min: 0, max: 1023, unit: 'lux' },
        { label: 'Humidity', value: 68, min: 0, max: 100, unit: '%' },
        { label: 'Buzzer', value: 1, min: 0, max: 1, unit: '' },
        { label: 'Relay', value: 0, min: 0, max: 1, unit: '' }
    ];
    var projects = [
        { name: 'Smart Home Monitor', status: 'Active', lastUpdated: '2 minutes ago' },
        { name: 'Weather Station', status: 'Completed', lastUpdated: '1 hour ago' },
        { name: 'Robot Car', status: 'In Progress', lastUpdated: '30 minutes ago' },
        { name: 'LED Matrix Display', status: 'Planning', lastUpdated: '1 day ago' }
    ];
    var handleToggleLED = function () { return setLedState(!ledState); };
    var handleChangeMotorSpeed = function (speed) { return setMotorSpeed(speed); };
    var handleTriggerBuzzer = function () { return console.log('Buzzer triggered!'); };
    return (react_1["default"].createElement("div", { style: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Arial, sans-serif'
        } },
        react_1["default"].createElement("header", { style: {
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                padding: '15px 40px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            } },
            react_1["default"].createElement("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    maxWidth: '1200px',
                    margin: '0 auto'
                } },
                react_1["default"].createElement("h1", { style: {
                        color: 'white',
                        margin: 0,
                        fontSize: '24px',
                        fontWeight: '700'
                    } }, "YSWS Advanced Dashboard"),
                react_1["default"].createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '20px' } },
                    react_1["default"].createElement("span", { style: { color: 'white', fontSize: '16px' } },
                        "Welcome, ",
                        username,
                        "! \uD83D\uDC4B"),
                    react_1["default"].createElement("button", { onClick: onLogout, style: {
                            background: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '14px',
                            cursor: 'pointer'
                        } }, "Logout"))),
            react_1["default"].createElement("div", { style: {
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    marginTop: '20px'
                } }, ['dashboard', 'library', 'projects'].map(function (tab) { return (react_1["default"].createElement("button", { key: tab, onClick: function () { return setActiveTab(tab); }, style: {
                    background: activeTab === tab ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                } }, tab.charAt(0).toUpperCase() + tab.slice(1))); }))),
        react_1["default"].createElement("main", { style: {
                padding: '40px',
                maxWidth: '1200px',
                margin: '0 auto'
            } },
            activeTab === 'dashboard' && (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("div", { style: {
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '20px',
                        padding: '30px',
                        marginBottom: '30px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(20px)'
                    } },
                    react_1["default"].createElement("h2", { style: {
                            margin: '0 0 25px 0',
                            fontSize: '24px',
                            fontWeight: '600',
                            color: '#333'
                        } }, "Live Sensor Data (Enhanced)"),
                    react_1["default"].createElement("div", { style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '20px'
                        } }, sensors.map(function (sensor) { return (react_1["default"].createElement(Gauge_1["default"], { key: sensor.label, label: sensor.label, value: sensor.value, min: sensor.min, max: sensor.max, unit: sensor.unit })); }))),
                react_1["default"].createElement("div", { style: {
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '20px',
                        padding: '30px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(20px)'
                    } },
                    react_1["default"].createElement(DeviceControlPanel_1["default"], { onToggleLED: handleToggleLED, onChangeMotorSpeed: handleChangeMotorSpeed, onTriggerBuzzer: handleTriggerBuzzer })))),
            activeTab === 'library' && react_1["default"].createElement(ComponentLibrary_1["default"], null),
            activeTab === 'projects' && (react_1["default"].createElement("div", { style: {
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '20px',
                    padding: '30px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(20px)'
                } },
                react_1["default"].createElement("h2", { style: {
                        margin: '0 0 25px 0',
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#333'
                    } }, "My Projects"),
                react_1["default"].createElement("div", { style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '20px'
                    } }, projects.map(function (project, index) { return (react_1["default"].createElement("div", { key: index, style: {
                        background: '#f8fafc',
                        border: '2px solid #e2e8f0',
                        borderRadius: '15px',
                        padding: '20px'
                    } },
                    react_1["default"].createElement("h3", { style: { margin: '0 0 10px 0', color: '#333' } }, project.name),
                    react_1["default"].createElement("div", { style: {
                            display: 'inline-block',
                            background: project.status === 'Active' ? '#10B981' :
                                project.status === 'Completed' ? '#3B82F6' :
                                    project.status === 'In Progress' ? '#F59E0B' : '#6B7280',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            marginBottom: '10px'
                        } }, project.status),
                    react_1["default"].createElement("p", { style: { margin: 0, fontSize: '14px', color: '#6b7280' } },
                        "Last updated: ",
                        project.lastUpdated))); })))))));
};
exports["default"] = AdvancedDashboard;
