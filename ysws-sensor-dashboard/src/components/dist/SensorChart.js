"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_chartjs_2_1 = require("react-chartjs-2");
var SensorChart = function (_a) {
    var sensorData = _a.sensorData;
    var chartRef = react_1.useRef(null);
    var data = {
        labels: sensorData.map(function (_, index) { return index.toString(); }),
        datasets: [
            {
                label: 'Sensor Data',
                data: sensorData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true
            },
        ]
    };
    react_1.useEffect(function () {
        if (chartRef.current) {
            chartRef.current.chartInstance.update();
        }
    }, [sensorData]);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h2", null, "Live Sensor Data"),
        react_1["default"].createElement(react_chartjs_2_1.Line, { ref: chartRef, data: data })));
};
exports["default"] = SensorChart;
