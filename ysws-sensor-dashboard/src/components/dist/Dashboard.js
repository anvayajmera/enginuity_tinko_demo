"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var Gauge_1 = require("./Gauge");
var SensorChart_1 = require("./SensorChart");
var Dashboard = function (_a) {
    var onSwitchMode = _a.onSwitchMode;
    var _b = react_1.useState({
        temperature: 23.5,
        humidity: 65,
        distance: 127,
        lightLevel: 456,
        pressure: 1013.25,
        airQuality: 85
    }), sensorData = _b[0], setSensorData = _b[1];
    var _c = react_1.useState([]), chartData = _c[0], setChartData = _c[1];
    var _d = react_1.useState([]), alerts = _d[0], setAlerts = _d[1];
    var _e = react_1.useState(true), isOnline = _e[0], setIsOnline = _e[1];
    // Simulate real-time data updates
    react_1.useEffect(function () {
        var interval = setInterval(function () {
            setSensorData(function (prev) { return ({
                temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() - 0.5) * 2)),
                humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 5)),
                distance: Math.max(10, Math.min(200, prev.distance + (Math.random() - 0.5) * 20)),
                lightLevel: Math.max(0, Math.min(1023, prev.lightLevel + (Math.random() - 0.5) * 100)),
                pressure: Math.max(990, Math.min(1030, prev.pressure + (Math.random() - 0.5) * 2)),
                airQuality: Math.max(0, Math.min(100, prev.airQuality + (Math.random() - 0.5) * 10))
            }); });
            // Add to chart data
            var now = new Date();
            setChartData(function (prev) {
                var newData = __spreadArrays(prev, [{
                        time: now.toLocaleTimeString(),
                        temperature: sensorData.temperature,
                        humidity: sensorData.humidity
                    }]);
                return newData.slice(-20); // Keep last 20 data points
            });
            // Generate alerts
            if (sensorData.temperature > 30) {
                setAlerts(function (prev) { return __spreadArrays(prev, [{
                        id: Date.now(),
                        type: 'warning',
                        message: 'High temperature detected!',
                        time: now.toLocaleTimeString()
                    }]).slice(-5); });
            }
        }, 2000);
        return function () { return clearInterval(interval); };
    }, [sensorData.temperature]);
    // Simulate connection status
    react_1.useEffect(function () {
        var statusInterval = setInterval(function () {
            setIsOnline(Math.random() > 0.1); // 90% uptime
        }, 10000);
        return function () { return clearInterval(statusInterval); };
    }, []);
    return (react_1["default"].createElement("div", { style: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Arial, sans-serif'
        } },
        react_1["default"].createElement("header", { style: {
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                padding: '20px 40px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
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
                            fontWeight: '700'
                        } }, "\uD83C\uDF10 YSWS IoT Dashboard - Simple Mode"),
                    react_1["default"].createElement("div", { style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            marginTop: '10px'
                        } },
                        react_1["default"].createElement("div", { style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: isOnline ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                padding: '5px 12px',
                                borderRadius: '15px',
                                border: "1px solid " + (isOnline ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)')
                            } },
                            react_1["default"].createElement("div", { style: {
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: isOnline ? '#10B981' : '#EF4444'
                                } }),
                            react_1["default"].createElement("span", { style: {
                                    color: 'white',
                                    fontSize: '14px',
                                    fontWeight: '600'
                                } }, isOnline ? 'Online' : 'Offline')),
                        react_1["default"].createElement("span", { style: {
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '14px'
                            } },
                            "Last updated: ",
                            new Date().toLocaleTimeString()))),
                react_1["default"].createElement("button", { onClick: onSwitchMode, style: {
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        padding: '12px 24px',
                        borderRadius: '25px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    } }, "Switch Mode"))),
        react_1["default"].createElement("main", { style: {
                padding: '30px',
                maxWidth: '1400px',
                margin: '0 auto'
            } },
            react_1["default"].createElement("section", { style: {
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
                    } }, "\uD83D\uDCCA Live Sensor Data"),
                react_1["default"].createElement("div", { style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '20px'
                    } },
                    react_1["default"].createElement(Gauge_1["default"], { label: "\uD83C\uDF21\uFE0F Temperature", value: sensorData.temperature, min: 0, max: 50, unit: "\u00B0C" }),
                    react_1["default"].createElement(Gauge_1["default"], { label: "\uD83D\uDCA7 Humidity", value: sensorData.humidity, min: 0, max: 100, unit: "%" }),
                    react_1["default"].createElement(Gauge_1["default"], { label: "\uD83D\uDCCF Distance", value: sensorData.distance, min: 0, max: 200, unit: "cm" }),
                    react_1["default"].createElement(Gauge_1["default"], { label: "\u2600\uFE0F Light Level", value: sensorData.lightLevel, min: 0, max: 1023, unit: "lux" }),
                    react_1["default"].createElement(Gauge_1["default"], { label: "\uD83C\uDF00 Pressure", value: sensorData.pressure, min: 990, max: 1030, unit: "hPa" }),
                    react_1["default"].createElement(Gauge_1["default"], { label: "\uD83C\uDF2C\uFE0F Air Quality", value: sensorData.airQuality, min: 0, max: 100, unit: "AQI" }))),
            react_1["default"].createElement("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: '30px',
                    marginBottom: '30px'
                } },
                react_1["default"].createElement("div", { style: {
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '20px',
                        padding: '30px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(20px)'
                    } },
                    react_1["default"].createElement("h3", { style: {
                            margin: '0 0 20px 0',
                            fontSize: '20px',
                            fontWeight: '600',
                            color: '#333'
                        } }, "\uD83D\uDCC8 Temperature & Humidity Trends"),
                    react_1["default"].createElement(SensorChart_1["default"], { data: chartData })),
                react_1["default"].createElement("div", { style: {
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '20px',
                        padding: '30px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(20px)'
                    } },
                    react_1["default"].createElement("h3", { style: {
                            margin: '0 0 20px 0',
                            fontSize: '20px',
                            fontWeight: '600',
                            color: '#333'
                        } }, "\uD83D\uDEA8 Alerts"),
                    react_1["default"].createElement("div", { style: {
                            maxHeight: '300px',
                            overflowY: 'auto'
                        } }, alerts.length === 0 ? (react_1["default"].createElement("div", { style: {
                            textAlign: 'center',
                            color: '#6b7280',
                            fontSize: '14px',
                            padding: '20px'
                        } }, "No alerts at this time \u2705")) : (alerts.map(function (alert) { return (react_1["default"].createElement("div", { key: alert.id, style: {
                            background: '#FEF2F2',
                            border: '1px solid #FECACA',
                            borderRadius: '10px',
                            padding: '15px',
                            marginBottom: '10px'
                        } },
                        react_1["default"].createElement("div", { style: {
                                color: '#DC2626',
                                fontWeight: '600',
                                fontSize: '14px'
                            } }, alert.message),
                        react_1["default"].createElement("div", { style: {
                                color: '#6B7280',
                                fontSize: '12px',
                                marginTop: '5px'
                            } }, alert.time))); }))))),
            react_1["default"].createElement("section", { style: {
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
                    } }, "\uD83D\uDD27 Device Status"),
                react_1["default"].createElement("div", { style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px'
                    } }, ['Arduino Uno', 'ESP32', 'Raspberry Pi', 'DHT22 Sensor', 'HC-SR04', 'LED Matrix'].map(function (device, index) { return (react_1["default"].createElement("div", { key: device, style: {
                        background: '#f8fafc',
                        border: '2px solid #e2e8f0',
                        borderRadius: '15px',
                        padding: '20px',
                        textAlign: 'center'
                    } },
                    react_1["default"].createElement("div", { style: {
                            fontSize: '2rem',
                            marginBottom: '10px'
                        } }, index % 3 === 0 ? '🟢' : index % 3 === 1 ? '🟡' : '🔴'),
                    react_1["default"].createElement("h4", { style: {
                            margin: '0 0 5px 0',
                            color: '#333',
                            fontSize: '16px'
                        } }, device),
                    react_1["default"].createElement("div", { style: {
                            fontSize: '14px',
                            color: '#6b7280'
                        } }, index % 3 === 0 ? 'Online' : index % 3 === 1 ? 'Warning' : 'Offline'))); }))))));
};
exports["default"] = Dashboard;
