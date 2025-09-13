"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Gauge = function (_a) {
    var label = _a.label, value = _a.value, min = _a.min, max = _a.max, unit = _a.unit;
    var percentage = ((value - min) / (max - min)) * 100;
    var getColor = function () {
        if (percentage < 30)
            return '#10B981';
        if (percentage < 70)
            return '#F59E0B';
        return '#EF4444';
    };
    return (react_1["default"].createElement("div", { style: {
            background: '#f8fafc',
            border: '2px solid #e2e8f0',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center'
        } },
        react_1["default"].createElement("h3", { style: { margin: '0 0 15px 0', color: '#333', fontSize: '16px' } }, label),
        react_1["default"].createElement("div", { style: { position: 'relative', margin: '0 auto 15px', width: '80px', height: '80px' } },
            react_1["default"].createElement("svg", { width: "80", height: "80", style: { transform: 'rotate(-90deg)' } },
                react_1["default"].createElement("circle", { cx: "40", cy: "40", r: "35", fill: "none", stroke: "#e2e8f0", strokeWidth: "8" }),
                react_1["default"].createElement("circle", { cx: "40", cy: "40", r: "35", fill: "none", stroke: getColor(), strokeWidth: "8", strokeLinecap: "round", strokeDasharray: (percentage / 100) * 220 + " 220", style: { transition: 'stroke-dasharray 0.5s ease' } })),
            react_1["default"].createElement("div", { style: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: getColor()
                } },
                value,
                unit)),
        react_1["default"].createElement("div", { style: { fontSize: '12px', color: '#6b7280' } },
            "Range: ",
            min,
            " - ",
            max,
            " ",
            unit)));
};
exports["default"] = Gauge;
