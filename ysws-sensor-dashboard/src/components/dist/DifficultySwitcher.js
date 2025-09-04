"use strict";
exports.__esModule = true;
var react_1 = require("react");
var LoginPage_1 = require("./LoginPage");
var AdvancedDashboard_1 = require("./AdvancedDashboard");
var DifficultySwitcher = function (_a) {
    var onModeChange = _a.onModeChange;
    var _b = react_1.useState('simple'), difficulty = _b[0], setDifficulty = _b[1];
    var _c = react_1.useState(false), showLogin = _c[0], setShowLogin = _c[1];
    var _d = react_1.useState(false), isLoggedIn = _d[0], setIsLoggedIn = _d[1];
    var _e = react_1.useState(''), username = _e[0], setUsername = _e[1];
    var handleSwitchToAdvanced = function () {
        setShowLogin(true);
    };
    var handleLogin = function (user) {
        setUsername(user);
        setIsLoggedIn(true);
        setShowLogin(false);
        setDifficulty('advanced');
        onModeChange === null || onModeChange === void 0 ? void 0 : onModeChange('advanced');
    };
    var handleLogout = function () {
        setIsLoggedIn(false);
        setUsername('');
        setDifficulty('simple');
        onModeChange === null || onModeChange === void 0 ? void 0 : onModeChange('simple');
    };
    var handleBackToSimple = function () {
        setShowLogin(false);
        setDifficulty('simple');
        onModeChange === null || onModeChange === void 0 ? void 0 : onModeChange('simple');
    };
    if (showLogin) {
        return react_1["default"].createElement(LoginPage_1["default"], { onLogin: handleLogin, onBack: handleBackToSimple });
    }
    if (isLoggedIn && difficulty === 'advanced') {
        return react_1["default"].createElement(AdvancedDashboard_1["default"], { username: username, onLogout: handleLogout });
    }
    return (react_1["default"].createElement("div", { style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '15px',
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        } },
        react_1["default"].createElement("h2", { style: {
                color: 'white',
                margin: '0 0 15px 0',
                fontSize: '20px',
                fontWeight: '600'
            } },
            "Current Difficulty: ",
            difficulty.charAt(0).toUpperCase() + difficulty.slice(1)),
        react_1["default"].createElement("p", { style: {
                color: 'rgba(255, 255, 255, 0.8)',
                margin: '0 0 15px 0',
                fontSize: '14px'
            } }, difficulty === 'simple'
            ? 'Simple mode for quick sensor monitoring'
            : 'Advanced mode with login and enhanced features'),
        react_1["default"].createElement("button", { onClick: difficulty === 'simple' ? handleSwitchToAdvanced : handleLogout, style: {
                background: difficulty === 'simple' ? '#10B981' : '#EF4444',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
            } }, difficulty === 'simple' ? 'Switch to Advanced Mode' : 'Back to Simple Mode')));
};
exports["default"] = DifficultySwitcher;
