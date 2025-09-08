"use strict";
exports.__esModule = true;
var react_1 = require("react");
var LoginPage = function (_a) {
    var onLogin = _a.onLogin, onBack = _a.onBack;
    var _b = react_1.useState(''), username = _b[0], setUsername = _b[1];
    var _c = react_1.useState(''), password = _c[0], setPassword = _c[1];
    var _d = react_1.useState(''), error = _d[0], setError = _d[1];
    var handleLogin = function (e) {
        e.preventDefault();
        // Simple validation - in real app, use proper authentication
        if (username.trim() && password === 'advanced123') {
            onLogin(username);
        }
        else {
            setError('Invalid credentials. Use password: advanced123');
        }
    };
    return (react_1["default"].createElement("div", { style: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Arial, sans-serif'
        } },
        react_1["default"].createElement("div", { style: {
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '40px',
                width: '100%',
                maxWidth: '400px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(20px)'
            } },
            react_1["default"].createElement("h2", { style: {
                    textAlign: 'center',
                    margin: '0 0 30px 0',
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#333'
                } }, "\uD83D\uDD10 Advanced Login"),
            react_1["default"].createElement("form", { onSubmit: handleLogin },
                react_1["default"].createElement("div", { style: { marginBottom: '20px' } },
                    react_1["default"].createElement("label", { style: {
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#374151'
                        } }, "Username"),
                    react_1["default"].createElement("input", { type: "text", value: username, onChange: function (e) { return setUsername(e.target.value); }, style: {
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.2s ease'
                        }, placeholder: "Enter your username", required: true })),
                react_1["default"].createElement("div", { style: { marginBottom: '20px' } },
                    react_1["default"].createElement("label", { style: {
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#374151'
                        } }, "Password"),
                    react_1["default"].createElement("input", { type: "password", value: password, onChange: function (e) { return setPassword(e.target.value); }, style: {
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.2s ease'
                        }, placeholder: "Enter password", required: true })),
                error && (react_1["default"].createElement("div", { style: {
                        background: '#FEF2F2',
                        border: '1px solid #FECACA',
                        color: '#DC2626',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '14px'
                    } }, error)),
                react_1["default"].createElement("div", { style: {
                        background: '#F3F4F6',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        padding: '12px',
                        marginBottom: '20px',
                        fontSize: '14px',
                        color: '#6B7280'
                    } },
                    "\uD83D\uDCA1 Demo Password: ",
                    react_1["default"].createElement("strong", null, "advanced123")),
                react_1["default"].createElement("div", { style: {
                        display: 'flex',
                        gap: '10px'
                    } },
                    react_1["default"].createElement("button", { type: "button", onClick: onBack, style: {
                            flex: 1,
                            background: '#6B7280',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '10px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background 0.2s ease'
                        } }, "Back"),
                    react_1["default"].createElement("button", { type: "submit", style: {
                            flex: 2,
                            background: '#10B981',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '10px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background 0.2s ease'
                        } }, "Login to Advanced Mode"))))));
};
exports["default"] = LoginPage;
