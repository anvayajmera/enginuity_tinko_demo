"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var Gauge_1 = require("./Gauge");
var DeviceControlPanel_1 = require("./DeviceControlPanel");
var ComponentLibrary_1 = require("./ComponentLibrary");
var ElectronicsLibrary_1 = require("./ElectronicsLibrary");
var AdvancedDashboard = function (_a) {
    var username = _a.username, onLogout = _a.onLogout;
    var _b = react_1.useState('dashboard'), activeTab = _b[0], setActiveTab = _b[1];
    var _c = react_1.useState({
        temperature: 25,
        humidity: 68,
        distance: 87,
        lightLevel: 340,
        airQuality: 125,
        pressure: 1013.2,
        voltage: 3.3,
        current: 0.25
    }), sensorData = _c[0], setSensorData = _c[1];
    var _d = react_1.useState(true), isConnected = _d[0], setIsConnected = _d[1];
    // Simulate real-time data with WebSocket connection
    react_1.useEffect(function () {
        var ws = new WebSocket('ws://localhost:8080');
        ws.onopen = function () {
            setIsConnected(true);
        };
        ws.onmessage = function (event) {
            try {
                var message_1 = JSON.parse(event.data);
                if (message_1.type === 'sensorData') {
                    setSensorData(function (prev) { return (__assign(__assign({}, prev), { temperature: message_1.data.temperature || prev.temperature, humidity: message_1.data.humidity || prev.humidity, distance: message_1.data.distance || prev.distance, lightLevel: message_1.data.lightLevel || prev.lightLevel, airQuality: message_1.data.airQuality || prev.airQuality, pressure: message_1.data.pressure || prev.pressure, voltage: message_1.data.voltage || prev.voltage, current: (message_1.data.voltage || 3.3) * 0.075 // Simulated current
                     })); });
                }
            }
            catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };
        ws.onclose = function () {
            setIsConnected(false);
        };
        ws.onerror = function () {
            setIsConnected(false);
        };
        return function () {
            ws.close();
        };
    }, []);
    var sensors = [
        { label: '🌡️ Temperature', value: sensorData.temperature, min: 0, max: 50, unit: '°C' },
        { label: '💧 Humidity', value: sensorData.humidity, min: 0, max: 100, unit: '%' },
        { label: '📏 Distance', value: sensorData.distance, min: 0, max: 200, unit: 'cm' },
        { label: '☀️ Light Level', value: sensorData.lightLevel, min: 0, max: 1023, unit: 'lux' },
        { label: '🌬️ Air Quality', value: sensorData.airQuality, min: 0, max: 500, unit: 'ppm' },
        { label: '🌀 Pressure', value: sensorData.pressure, min: 990, max: 1030, unit: 'hPa' },
        { label: '⚡ Voltage', value: sensorData.voltage, min: 0, max: 5, unit: 'V' },
        { label: '🔋 Current', value: sensorData.current * 1000, min: 0, max: 500, unit: 'mA' }
    ];
    var handleToggleLED = function () { return console.log('LED toggled'); };
    var handleChangeMotorSpeed = function (speed) { return console.log('Motor speed:', speed); };
    var handleTriggerBuzzer = function () { return console.log('Buzzer triggered!'); };
    var projects = [
        {
            name: 'Smart Home Monitor',
            status: 'Active',
            lastUpdated: '2 minutes ago',
            progress: 85,
            sensors: ['Temperature', 'Humidity', 'Motion'],
            icon: '🏠'
        },
        {
            name: 'Weather Station',
            status: 'Completed',
            lastUpdated: '1 hour ago',
            progress: 100,
            sensors: ['Temperature', 'Humidity', 'Pressure'],
            icon: '🌤️'
        },
        {
            name: 'Robot Car',
            status: 'In Progress',
            lastUpdated: '30 minutes ago',
            progress: 60,
            sensors: ['Ultrasonic', 'Gyroscope'],
            icon: '🤖'
        },
        {
            name: 'LED Matrix Display',
            status: 'Planning',
            lastUpdated: '1 day ago',
            progress: 15,
            sensors: ['None'],
            icon: '💡'
        }
    ];
    return (react_1["default"].createElement("div", { style: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Arial, sans-serif',
            animation: 'fadeIn 0.8s ease-out'
        } },
        react_1["default"].createElement("header", { style: {
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                padding: '20px 40px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                animation: 'slideInDown 0.6s ease-out'
            } },
            react_1["default"].createElement("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    maxWidth: '1400px',
                    margin: '0 auto'
                } },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("h1", { style: {
                            color: 'white',
                            margin: 0,
                            fontSize: '28px',
                            fontWeight: '700',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                        } }, "\uD83C\uDF9B\uFE0F YSWS Advanced Dashboard"),
                    react_1["default"].createElement("div", { style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            marginTop: '8px'
                        } },
                        react_1["default"].createElement("div", { style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: isConnected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                padding: '4px 12px',
                                borderRadius: '15px',
                                border: "1px solid " + (isConnected ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)')
                            } },
                            react_1["default"].createElement("div", { style: {
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: isConnected ? '#10B981' : '#EF4444',
                                    animation: isConnected ? 'pulse 2s infinite' : 'none'
                                } }),
                            react_1["default"].createElement("span", { style: {
                                    color: 'white',
                                    fontSize: '12px',
                                    fontWeight: '600'
                                } }, isConnected ? 'Connected' : 'Disconnected')))),
                react_1["default"].createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '20px' } },
                    react_1["default"].createElement("span", { style: {
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '16px',
                            animation: 'slideInRight 0.8s ease-out'
                        } },
                        "Welcome, ",
                        react_1["default"].createElement("strong", null, username),
                        "! \uD83D\uDC4B"),
                    react_1["default"].createElement("button", { onClick: onLogout, style: {
                            background: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            padding: '10px 20px',
                            borderRadius: '20px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            animation: 'slideInRight 1s ease-out'
                        } }, "Logout"))),
            react_1["default"].createElement("div", { style: {
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '15px',
                    marginTop: '25px',
                    animation: 'slideInUp 0.8s ease-out'
                } }, ['dashboard', 'library', 'electronics', 'projects'].map(function (tab, index) { return (react_1["default"].createElement("button", { key: tab, onClick: function () { return setActiveTab(tab); }, style: {
                    background: activeTab === tab ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: "2px solid " + (activeTab === tab ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)'),
                    padding: '12px 24px',
                    borderRadius: '25px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'capitalize',
                    animation: "slideInUp 0.6s ease-out " + index * 0.1 + "s both",
                    backdropFilter: 'blur(10px)'
                } }, tab === 'electronics' ? '🔧 Electronics' :
                tab === 'dashboard' ? '📊 Dashboard' :
                    tab === 'library' ? '📚 Components' : '🚀 Projects')); }))),
        react_1["default"].createElement("main", { style: {
                padding: '40px',
                maxWidth: '1400px',
                margin: '0 auto'
            } },
            activeTab === 'dashboard' && (react_1["default"].createElement("div", { style: { animation: 'fadeIn 0.5s ease-out' } },
                react_1["default"].createElement("div", { style: {
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '20px',
                        padding: '30px',
                        marginBottom: '30px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(20px)',
                        animation: 'slideInUp 0.6s ease-out'
                    } },
                    react_1["default"].createElement("h2", { style: {
                            margin: '0 0 25px 0',
                            fontSize: '24px',
                            fontWeight: '600',
                            color: '#333',
                            animation: 'slideInLeft 0.8s ease-out'
                        } }, "\uD83D\uDD2C Advanced Sensor Monitoring"),
                    react_1["default"].createElement("div", { style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: '20px'
                        } }, sensors.map(function (sensor, index) { return (react_1["default"].createElement("div", { key: sensor.label, style: {
                            animation: "slideInUp 0.6s ease-out " + index * 0.1 + "s both"
                        } },
                        react_1["default"].createElement(Gauge_1["default"], { label: sensor.label, value: sensor.value, min: sensor.min, max: sensor.max, unit: sensor.unit }))); }))),
                react_1["default"].createElement("div", { style: {
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '20px',
                        padding: '30px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(20px)',
                        animation: 'slideInUp 0.8s ease-out'
                    } },
                    react_1["default"].createElement(DeviceControlPanel_1["default"], { onToggleLED: handleToggleLED, onChangeMotorSpeed: handleChangeMotorSpeed, onTriggerBuzzer: handleTriggerBuzzer })))),
            activeTab === 'library' && (react_1["default"].createElement("div", { style: { animation: 'fadeIn 0.5s ease-out' } },
                react_1["default"].createElement(ComponentLibrary_1["default"], null))),
            activeTab === 'electronics' && (react_1["default"].createElement("div", { style: { animation: 'fadeIn 0.5s ease-out' } },
                react_1["default"].createElement(ElectronicsLibrary_1["default"], null))),
            activeTab === 'projects' && (react_1["default"].createElement("div", { style: {
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '20px',
                    padding: '30px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(20px)',
                    animation: 'fadeIn 0.5s ease-out'
                } },
                react_1["default"].createElement("h2", { style: {
                        margin: '0 0 25px 0',
                        fontSize: '28px',
                        fontWeight: '600',
                        color: '#333',
                        textAlign: 'center',
                        animation: 'slideInDown 0.6s ease-out'
                    } }, "\uD83D\uDE80 My IoT Projects"),
                react_1["default"].createElement("div", { style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '25px'
                    } }, projects.map(function (project, index) { return (react_1["default"].createElement("div", { key: index, style: {
                        background: 'white',
                        border: '2px solid #e2e8f0',
                        borderRadius: '15px',
                        padding: '25px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        animation: "slideInUp 0.6s ease-out " + index * 0.1 + "s both"
                    }, onMouseEnter: function (e) {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                    }, onMouseLeave: function (e) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    } },
                    react_1["default"].createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' } },
                        react_1["default"].createElement("div", { style: { fontSize: '2rem' } }, project.icon),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("h3", { style: { margin: '0 0 5px 0', color: '#333', fontSize: '18px' } }, project.name),
                            react_1["default"].createElement("div", { style: {
                                    display: 'inline-block',
                                    background: project.status === 'Active' ? '#10B981' :
                                        project.status === 'Completed' ? '#3B82F6' :
                                            project.status === 'In Progress' ? '#F59E0B' : '#6B7280',
                                    color: 'white',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    fontWeight: '600'
                                } }, project.status))),
                    react_1["default"].createElement("div", { style: { marginBottom: '15px' } },
                        react_1["default"].createElement("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '5px' } },
                            react_1["default"].createElement("span", { style: { fontSize: '14px', fontWeight: '600', color: '#374151' } }, "Progress"),
                            react_1["default"].createElement("span", { style: { fontSize: '14px', color: '#6B7280' } },
                                project.progress,
                                "%")),
                        react_1["default"].createElement("div", { style: {
                                width: '100%',
                                height: '8px',
                                background: '#E5E7EB',
                                borderRadius: '4px',
                                overflow: 'hidden'
                            } },
                            react_1["default"].createElement("div", { style: {
                                    width: project.progress + "%",
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #3B82F6, #1D4ED8)',
                                    transition: 'width 1s ease-out',
                                    animation: 'progressFill 2s ease-out'
                                } }))),
                    react_1["default"].createElement("div", { style: { marginBottom: '10px' } },
                        react_1["default"].createElement("strong", { style: { fontSize: '14px', color: '#374151' } }, "Sensors: "),
                        react_1["default"].createElement("span", { style: { fontSize: '14px', color: '#6B7280' } }, project.sensors.join(', '))),
                    react_1["default"].createElement("p", { style: { margin: 0, fontSize: '14px', color: '#6b7280' } },
                        "Last updated: ",
                        project.lastUpdated))); }))))),
        react_1["default"].createElement("style", null, "\n                    @keyframes fadeIn {\n                        from { opacity: 0; }\n                        to { opacity: 1; }\n                    }\n                    @keyframes slideInDown {\n                        from { opacity: 0; transform: translateY(-30px); }\n                        to { opacity: 1; transform: translateY(0); }\n                    }\n                    @keyframes slideInUp {\n                        from { opacity: 0; transform: translateY(30px); }\n                        to { opacity: 1; transform: translateY(0); }\n                    }\n                    @keyframes slideInLeft {\n                        from { opacity: 0; transform: translateX(-30px); }\n                        to { opacity: 1; transform: translateX(0); }\n                    }\n                    @keyframes slideInRight {\n                        from { opacity: 0; transform: translateX(30px); }\n                        to { opacity: 1; transform: translateX(0); }\n                    }\n                    @keyframes pulse {\n                        0%, 100% { opacity: 1; }\n                        50% { opacity: 0.5; }\n                    }\n                    @keyframes progressFill {\n                        from { width: 0%; }\n                        to { width: " + 100 + "%; }\n                    }\n                ")));
};
exports["default"] = AdvancedDashboard;
