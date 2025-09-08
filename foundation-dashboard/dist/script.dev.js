"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Simple animations and interactions for foundation students
var SensorDashboard =
/*#__PURE__*/
function () {
  function SensorDashboard() {
    _classCallCheck(this, SensorDashboard);

    this.data = [];
    this.currentIndex = 0;
    this.init();
  }

  _createClass(SensorDashboard, [{
    key: "init",
    value: function init() {
      return regeneratorRuntime.async(function init$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.loadData());

            case 2:
              this.updateDisplay();
              this.startDataLoop();

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var response, csvText;
      return regeneratorRuntime.async(function loadData$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(fetch('sensor-data.csv'));

            case 3:
              response = _context2.sent;
              _context2.next = 6;
              return regeneratorRuntime.awrap(response.text());

            case 6:
              csvText = _context2.sent;
              this.data = this.parseCSV(csvText);
              _context2.next = 14;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              console.error('Error loading data:', _context2.t0);
              this.showConnectionError();

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[0, 10]]);
    }
  }, {
    key: "parseCSV",
    value: function parseCSV(text) {
      var lines = text.trim().split('\n');
      var headers = lines[0].split(',');
      return lines.slice(1).map(function (line) {
        var values = line.split(',');
        var row = {};
        headers.forEach(function (header, index) {
          row[header] = values[index];
        });
        return row;
      });
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay() {
      if (this.data.length === 0) return;
      var current = this.data[this.currentIndex]; // Update sensor values

      document.querySelector('.temperature .sensor-value').textContent = "".concat(current.temperature, "\xB0C");
      document.querySelector('.light .sensor-value').textContent = "".concat(current.light, " lux");
      document.querySelector('.sound .sensor-value').textContent = "".concat(current.sound, " dB");
      document.querySelector('.compass .sensor-value').textContent = "".concat(current.compass, "\xB0"); // Update movement

      var movement = this.calculateMovement(current);
      document.querySelector('.acceleration .sensor-value').textContent = movement.status;
      document.querySelector('.acceleration .sensor-status').textContent = movement.description; // Update buttons

      var buttonStatus = this.getButtonStatus(current);
      document.querySelector('.buttons .sensor-value').textContent = buttonStatus.display;
      document.querySelector('.buttons .sensor-status').textContent = buttonStatus.status; // Update statuses

      this.updateStatuses(current); // Add to activity log

      this.addLogEntry(current);
    }
  }, {
    key: "calculateMovement",
    value: function calculateMovement(data) {
      var totalAccel = Math.sqrt(Math.pow(parseFloat(data.acceleration_x), 2) + Math.pow(parseFloat(data.acceleration_y), 2) + Math.pow(parseFloat(data.acceleration_z), 2));
      if (totalAccel > 10.5) return {
        status: 'Moving',
        description: 'Motion Detected'
      };
      return {
        status: 'Still',
        description: 'No Motion'
      };
    }
  }, {
    key: "getButtonStatus",
    value: function getButtonStatus(data) {
      var aPressed = data.button_a === '1';
      var bPressed = data.button_b === '1';
      if (aPressed && bPressed) return {
        display: 'A + B',
        status: 'Both Pressed'
      };
      if (aPressed) return {
        display: 'A',
        status: 'A Pressed'
      };
      if (bPressed) return {
        display: 'B',
        status: 'B Pressed'
      };
      return {
        display: 'None',
        status: 'Not Pressed'
      };
    }
  }, {
    key: "updateStatuses",
    value: function updateStatuses(data) {
      // Temperature status
      var temp = parseFloat(data.temperature);
      var tempStatus = temp > 25 ? 'Warm' : temp < 20 ? 'Cool' : 'Normal';
      document.querySelector('.temperature .sensor-status').textContent = tempStatus; // Light status

      var light = parseInt(data.light);
      var lightStatus = light > 800 ? 'Very Bright' : light > 500 ? 'Bright' : light > 200 ? 'Dim' : 'Dark';
      document.querySelector('.light .sensor-status').textContent = lightStatus; // Sound status

      var sound = parseInt(data.sound);
      var soundStatus = sound > 60 ? 'Loud' : sound > 40 ? 'Moderate' : 'Quiet';
      document.querySelector('.sound .sensor-status').textContent = soundStatus; // Compass status

      var compass = parseInt(data.compass);
      var compassStatus = this.getDirection(compass);
      document.querySelector('.compass .sensor-status').textContent = compassStatus;
    }
  }, {
    key: "getDirection",
    value: function getDirection(degrees) {
      var directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
      var index = Math.round(degrees / 45) % 8;
      return directions[index];
    }
  }, {
    key: "addLogEntry",
    value: function addLogEntry(data) {
      var logEntries = document.querySelector('.log-entries');
      var time = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      var entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.innerHTML = "\n            <span class=\"log-time\">".concat(time, "</span>\n            <span class=\"log-message\">Data updated - Temp: ").concat(data.temperature, "\xB0C</span>\n        ");
      logEntries.insertBefore(entry, logEntries.firstChild); // Keep only last 5 entries

      while (logEntries.children.length > 5) {
        logEntries.removeChild(logEntries.lastChild);
      }
    }
  }, {
    key: "startDataLoop",
    value: function startDataLoop() {
      var _this = this;

      setInterval(function () {
        _this.currentIndex = (_this.currentIndex + 1) % _this.data.length;

        _this.updateDisplay();
      }, 2000); // Update every 2 seconds
    }
  }, {
    key: "showConnectionError",
    value: function showConnectionError() {
      document.querySelector('.connection-badge span:last-child').textContent = 'Error loading data';
      document.querySelector('.status-dot').className = 'status-dot disconnected';
    }
  }]);

  return SensorDashboard;
}(); // Initialize dashboard when page loads


document.addEventListener('DOMContentLoaded', function () {
  new SensorDashboard();
});