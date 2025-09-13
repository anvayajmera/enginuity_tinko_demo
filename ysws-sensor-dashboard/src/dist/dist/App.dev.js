"use strict";

exports.__esModule = true;

var react_1 = require("react");

var Dashboard_1 = require("./components/Dashboard");

var DifficultySwitcher_1 = require("./components/DifficultySwitcher");

var App = function App() {
  var _a = react_1.useState('simple'),
      currentMode = _a[0],
      setCurrentMode = _a[1];

  var _b = react_1.useState(true),
      showModeSelector = _b[0],
      setShowModeSelector = _b[1];

  var handleModeChange = function handleModeChange(mode) {
    setCurrentMode(mode);
    setShowModeSelector(false);
  };

  var handleBackToModeSelector = function handleBackToModeSelector() {
    setShowModeSelector(true);
    setCurrentMode('simple');
  };

  if (showModeSelector) {
    return react_1["default"].createElement("div", {
      style: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif'
      }
    }, react_1["default"].createElement("div", {
      style: {
        textAlign: 'center',
        color: 'white',
        maxWidth: '600px',
        padding: '40px'
      }
    }, react_1["default"].createElement("h1", {
      style: {
        fontSize: '3rem',
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }
    }, "\uD83D\uDE80 YSWS IoT Dashboard"), react_1["default"].createElement("p", {
      style: {
        fontSize: '1.2rem',
        marginBottom: '40px',
        opacity: 0.9
      }
    }, "Choose your experience level to get started"), react_1["default"].createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }
    }, react_1["default"].createElement("button", {
      onClick: function onClick() {
        return handleModeChange('simple');
      },
      style: {
        background: 'rgba(255, 255, 255, 0.2)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '20px',
        padding: '30px',
        color: 'white',
        fontSize: '18px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)'
      }
    }, react_1["default"].createElement("div", {
      style: {
        fontSize: '3rem',
        marginBottom: '10px'
      }
    }, "\uD83D\uDFE2"), react_1["default"].createElement("div", null, "Simple Mode"), react_1["default"].createElement("div", {
      style: {
        fontSize: '14px',
        opacity: 0.8,
        marginTop: '5px'
      }
    }, "Easy interface for beginners")), react_1["default"].createElement("button", {
      onClick: function onClick() {
        return handleModeChange('advanced');
      },
      style: {
        background: 'rgba(255, 255, 255, 0.2)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '20px',
        padding: '30px',
        color: 'white',
        fontSize: '18px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)'
      }
    }, react_1["default"].createElement("div", {
      style: {
        fontSize: '3rem',
        marginBottom: '10px'
      }
    }, "\uD83D\uDD34"), react_1["default"].createElement("div", null, "Advanced Mode"), react_1["default"].createElement("div", {
      style: {
        fontSize: '14px',
        opacity: 0.8,
        marginTop: '5px'
      }
    }, "Full features with login required")))));
  }

  if (currentMode === 'simple') {
    return react_1["default"].createElement(Dashboard_1["default"], {
      onSwitchMode: handleBackToModeSelector
    });
  }

  return react_1["default"].createElement(DifficultySwitcher_1["default"], {
    onModeChange: setCurrentMode
  });
};

exports["default"] = App;