"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Gauge = function (_a) {
    var value = _a.value, min = _a.min, max = _a.max, label = _a.label, _b = _a.unit, unit = _b === void 0 ? '' : _b;
    var percentage = ((value - min) / (max - min)) * 100;
    var getColor = function (percentage) {
        if (percentage < 30)
            return '#10B981'; // Green
        if (percentage < 70)
            return '#F59E0B'; // Yellow
        return '#EF4444'; // Red
    };
    var color = getColor(percentage);
    return (react_1["default"].createElement("div", { style: {
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: '2px solid #f1f5f9',
            transition: 'all 0.3s ease'
        } },
        react_1["default"].createElement("div", { style: {
                width: '100px',
                height: '100px',
                margin: '0 auto 20px',
                position: 'relative'
            } },
            react_1["default"].createElement("svg", { width: "100", height: "100", style: { transform: 'rotate(-90deg)' } },
                react_1["default"].createElement("circle", { cx: "50", cy: "50", r: "40", fill: "none", stroke: "#e2e8f0", strokeWidth: "8" }),
                react_1["default"].createElement("circle", { cx: "50", cy: "50", r: "40", fill: "none", stroke: color, strokeWidth: "8", strokeLinecap: "round", strokeDasharray: percentage * 2.51 + " 251", style: { transition: 'stroke-dasharray 0.5s ease' } })),
            react_1["default"].createElement("div", { style: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#374151'
                } },
                react_1["default"].createElement("div", { style: {
                        fontSize: '20px',
                        fontWeight: '700',
                        lineHeight: '1'
                    } }, value),
                unit && (react_1["default"].createElement("div", { style: {
                        fontSize: '11px',
                        opacity: 0.7,
                        marginTop: '2px'
                    } }, unit)))),
        react_1["default"].createElement("div", { style: {
                color: '#374151',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '8px'
            } }, label),
        react_1["default"].createElement("div", { style: {
                color: '#6b7280',
                fontSize: '12px'
            } },
            min,
            " - ",
            max,
            " ",
            unit)));
};
exports["default"] = Gauge;
