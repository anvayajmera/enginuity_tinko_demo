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
var SensorChart = function (_a) {
    var data = _a.data;
    var maxTemp = Math.max.apply(Math, __spreadArrays(data.map(function (d) { return d.temperature; }), [35]));
    var minTemp = Math.min.apply(Math, __spreadArrays(data.map(function (d) { return d.temperature; }), [15]));
    var maxHumidity = Math.max.apply(Math, __spreadArrays(data.map(function (d) { return d.humidity; }), [100]));
    var minHumidity = Math.min.apply(Math, __spreadArrays(data.map(function (d) { return d.humidity; }), [30]));
    var chartWidth = 600;
    var chartHeight = 300;
    var padding = 50;
    var getTemperatureY = function (temp) {
        return chartHeight - padding - ((temp - minTemp) / (maxTemp - minTemp)) * (chartHeight - 2 * padding);
    };
    var getHumidityY = function (humidity) {
        return chartHeight - padding - ((humidity - minHumidity) / (maxHumidity - minHumidity)) * (chartHeight - 2 * padding);
    };
    var getX = function (index) {
        return padding + (index / Math.max(data.length - 1, 1)) * (chartWidth - 2 * padding);
    };
    if (data.length === 0) {
        return (react_1["default"].createElement("div", { style: {
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f8fafc',
                borderRadius: '10px',
                border: '2px dashed #e2e8f0',
                color: '#6b7280',
                fontSize: '16px'
            } }, "\uD83D\uDCCA Waiting for sensor data..."));
    }
    return (react_1["default"].createElement("div", { style: {
            background: '#f8fafc',
            borderRadius: '15px',
            padding: '20px',
            border: '2px solid #e2e8f0'
        } },
        react_1["default"].createElement("svg", { width: chartWidth, height: chartHeight, style: { width: '100%', height: 'auto' } },
            react_1["default"].createElement("defs", null,
                react_1["default"].createElement("pattern", { id: "grid", width: "40", height: "30", patternUnits: "userSpaceOnUse" },
                    react_1["default"].createElement("path", { d: "M 40 0 L 0 0 0 30", fill: "none", stroke: "#e2e8f0", strokeWidth: "1" }))),
            react_1["default"].createElement("rect", { width: chartWidth, height: chartHeight, fill: "url(#grid)" }),
            react_1["default"].createElement("path", { d: data.map(function (point, index) {
                    return (index === 0 ? 'M' : 'L') + " " + getX(index) + " " + getTemperatureY(point.temperature);
                }).join(' '), fill: "none", stroke: "#EF4444", strokeWidth: "3", strokeLinecap: "round" }),
            react_1["default"].createElement("path", { d: data.map(function (point, index) {
                    return (index === 0 ? 'M' : 'L') + " " + getX(index) + " " + getHumidityY(point.humidity);
                }).join(' '), fill: "none", stroke: "#3B82F6", strokeWidth: "3", strokeLinecap: "round" }),
            data.map(function (point, index) { return (react_1["default"].createElement("g", { key: index },
                react_1["default"].createElement("circle", { cx: getX(index), cy: getTemperatureY(point.temperature), r: "4", fill: "#EF4444" }),
                react_1["default"].createElement("circle", { cx: getX(index), cy: getHumidityY(point.humidity), r: "4", fill: "#3B82F6" }))); }),
            react_1["default"].createElement("text", { x: 20, y: padding, textAnchor: "middle", fontSize: "12", fill: "#6b7280" },
                maxTemp.toFixed(0),
                "\u00B0C"),
            react_1["default"].createElement("text", { x: 20, y: chartHeight - padding, textAnchor: "middle", fontSize: "12", fill: "#6b7280" },
                minTemp.toFixed(0),
                "\u00B0C"),
            data.length > 0 && (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("text", { x: padding, y: chartHeight - 10, textAnchor: "start", fontSize: "12", fill: "#6b7280" }, data[0].time),
                react_1["default"].createElement("text", { x: chartWidth - padding, y: chartHeight - 10, textAnchor: "end", fontSize: "12", fill: "#6b7280" }, data[data.length - 1].time)))),
        react_1["default"].createElement("div", { style: {
                display: 'flex',
                justifyContent: 'center',
                gap: '30px',
                marginTop: '15px'
            } },
            react_1["default"].createElement("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                } },
                react_1["default"].createElement("div", { style: {
                        width: '16px',
                        height: '3px',
                        background: '#EF4444',
                        borderRadius: '2px'
                    } }),
                react_1["default"].createElement("span", { style: {
                        fontSize: '14px',
                        color: '#333',
                        fontWeight: '600'
                    } }, "Temperature (\u00B0C)")),
            react_1["default"].createElement("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                } },
                react_1["default"].createElement("div", { style: {
                        width: '16px',
                        height: '3px',
                        background: '#3B82F6',
                        borderRadius: '2px'
                    } }),
                react_1["default"].createElement("span", { style: {
                        fontSize: '14px',
                        color: '#333',
                        fontWeight: '600'
                    } }, "Humidity (%)")))));
};
exports["default"] = SensorChart;
