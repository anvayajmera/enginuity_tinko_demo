"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Dashboard_1 = require("./components/Dashboard");
var AdvancedDashboard_1 = require("./components/AdvancedDashboard");
var LoginPage_1 = require("./components/LoginPage");
require("./index.css");
var App = function () {
    var _a = react_1.useState('home'), currentView = _a[0], setCurrentView = _a[1];
    var _b = react_1.useState(''), username = _b[0], setUsername = _b[1];
    var handleLogin = function (user) {
        setUsername(user);
        setCurrentView('advanced');
    };
    var handleLogout = function () {
        setUsername('');
        setCurrentView('home');
    };
    var handleBackToHome = function () {
        setCurrentView('home');
    };
    // Home/Mode Selection Screen
    if (currentView === 'home') {
        return (react_1["default"].createElement("div", { style: {
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Arial, sans-serif',
                padding: '20px'
            } },
            react_1["default"].createElement("div", { style: {
                    textAlign: 'center',
                    color: 'white',
                    maxWidth: '900px',
                    width: '100%'
                } },
                react_1["default"].createElement("div", { style: { fontSize: '4rem', marginBottom: '20px' } }, "\uD83C\uDF9B\uFE0F"),
                react_1["default"].createElement("h1", { style: {
                        fontSize: '3rem',
                        marginBottom: '20px',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        fontWeight: '700'
                    } }, "YSWS IoT Dashboard System"),
                react_1["default"].createElement("p", { style: {
                        fontSize: '1.2rem',
                        marginBottom: '50px',
                        opacity: 0.9
                    } }, "Choose your dashboard experience"),
                react_1["default"].createElement("div", { style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '30px',
                        marginBottom: '40px'
                    } },
                    react_1["default"].createElement("div", { style: {
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '20px',
                            padding: '40px 30px',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }, onClick: function () { return setCurrentView('simple'); }, onMouseEnter: function (e) {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
                        }, onMouseLeave: function (e) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.boxShadow = 'none';
                        } },
                        react_1["default"].createElement("div", { style: { fontSize: '3rem', marginBottom: '20px' } }, "\uD83D\uDCCA"),
                        react_1["default"].createElement("h2", { style: { fontSize: '24px', marginBottom: '15px', fontWeight: '600' } }, "Simple Dashboard"),
                        react_1["default"].createElement("ul", { style: {
                                textAlign: 'left',
                                fontSize: '14px',
                                lineHeight: '1.6',
                                listStyle: 'none',
                                padding: 0
                            } },
                            react_1["default"].createElement("li", null, "\u2705 Real-time sensor monitoring"),
                            react_1["default"].createElement("li", null, "\u2705 Interactive charts & alerts"),
                            react_1["default"].createElement("li", null, "\u2705 Device status tracking"),
                            react_1["default"].createElement("li", null, "\u2705 Clean, beginner-friendly interface"))),
                    react_1["default"].createElement("div", { style: {
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '20px',
                            padding: '40px 30px',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }, onClick: function () { return setCurrentView('login'); }, onMouseEnter: function (e) {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
                        }, onMouseLeave: function (e) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.boxShadow = 'none';
                        } },
                        react_1["default"].createElement("div", { style: { fontSize: '3rem', marginBottom: '20px' } }, "\uD83D\uDD27"),
                        react_1["default"].createElement("h2", { style: { fontSize: '24px', marginBottom: '15px', fontWeight: '600' } }, "Advanced Dashboard"),
                        react_1["default"].createElement("ul", { style: {
                                textAlign: 'left',
                                fontSize: '14px',
                                lineHeight: '1.6',
                                listStyle: 'none',
                                padding: 0
                            } },
                            react_1["default"].createElement("li", null,
                                "\uD83D\uDD27 ",
                                react_1["default"].createElement("strong", null, "Electronics Library & Projects")),
                            react_1["default"].createElement("li", null, "\uD83C\uDF9B\uFE0F Device control panels"),
                            react_1["default"].createElement("li", null, "\uD83D\uDCDA Component dictionary"),
                            react_1["default"].createElement("li", null, "\uD83D\uDD10 Login required (advanced123)")))),
                react_1["default"].createElement("div", { style: {
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '15px',
                        padding: '20px',
                        fontSize: '14px'
                    } },
                    react_1["default"].createElement("strong", null, "\uD83D\uDCA1 Quick Access:"),
                    " Advanced Mode Password = ",
                    react_1["default"].createElement("code", null, "advanced123")))));
    }
    // Simple Dashboard
    if (currentView === 'simple') {
        return react_1["default"].createElement(Dashboard_1["default"], { onSwitchMode: handleBackToHome });
    }
    // Login Screen
    if (currentView === 'login') {
        return react_1["default"].createElement(LoginPage_1["default"], { onLogin: handleLogin, onBack: handleBackToHome });
    }
    // Advanced Dashboard (after login)
    if (currentView === 'advanced') {
        return react_1["default"].createElement(AdvancedDashboard_1["default"], { username: username, onLogout: handleLogout });
    }
    return null;
};
exports["default"] = App;
