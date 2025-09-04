"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var LoginPage = function (_a) {
    var onLogin = _a.onLogin, onBack = _a.onBack;
    var _b = react_1.useState(true), isLogin = _b[0], setIsLogin = _b[1];
    var _c = react_1.useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }), formData = _c[0], setFormData = _c[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        if (isLogin) {
            onLogin(formData.username || 'Engineer');
        }
        else {
            onLogin(formData.username || 'New Engineer');
        }
    };
    var handleInputChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
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
                maxWidth: '450px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(20px)'
            } },
            react_1["default"].createElement("button", { onClick: onBack, style: {
                    background: 'none',
                    border: 'none',
                    color: '#667eea',
                    fontSize: '16px',
                    cursor: 'pointer',
                    marginBottom: '20px'
                } }, "\u2190 Back to Simple Mode"),
            react_1["default"].createElement("h2", { style: {
                    textAlign: 'center',
                    margin: '0 0 30px 0',
                    color: '#333',
                    fontSize: '28px'
                } }, isLogin ? 'Engineer Login' : 'Create Account'),
            react_1["default"].createElement("form", { onSubmit: handleSubmit },
                react_1["default"].createElement("div", { style: { marginBottom: '20px' } },
                    react_1["default"].createElement("label", { style: { display: 'block', marginBottom: '8px', color: '#555', fontWeight: '600' } }, "Username"),
                    react_1["default"].createElement("input", { type: "text", value: formData.username, onChange: function (e) { return handleInputChange('username', e.target.value); }, style: {
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.3s'
                        }, placeholder: "Enter your username", required: true })),
                !isLogin && (react_1["default"].createElement("div", { style: { marginBottom: '20px' } },
                    react_1["default"].createElement("label", { style: { display: 'block', marginBottom: '8px', color: '#555', fontWeight: '600' } }, "Email"),
                    react_1["default"].createElement("input", { type: "email", value: formData.email, onChange: function (e) { return handleInputChange('email', e.target.value); }, style: {
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '16px',
                            outline: 'none'
                        }, placeholder: "Enter your email", required: true }))),
                react_1["default"].createElement("div", { style: { marginBottom: '20px' } },
                    react_1["default"].createElement("label", { style: { display: 'block', marginBottom: '8px', color: '#555', fontWeight: '600' } }, "Password"),
                    react_1["default"].createElement("input", { type: "password", value: formData.password, onChange: function (e) { return handleInputChange('password', e.target.value); }, style: {
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '16px',
                            outline: 'none'
                        }, placeholder: "Enter your password", required: true })),
                !isLogin && (react_1["default"].createElement("div", { style: { marginBottom: '20px' } },
                    react_1["default"].createElement("label", { style: { display: 'block', marginBottom: '8px', color: '#555', fontWeight: '600' } }, "Confirm Password"),
                    react_1["default"].createElement("input", { type: "password", value: formData.confirmPassword, onChange: function (e) { return handleInputChange('confirmPassword', e.target.value); }, style: {
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '16px',
                            outline: 'none'
                        }, placeholder: "Confirm your password", required: true }))),
                react_1["default"].createElement("button", { type: "submit", style: {
                        width: '100%',
                        background: '#667eea',
                        color: 'white',
                        border: 'none',
                        padding: '15px',
                        borderRadius: '10px',
                        fontSize: '18px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginBottom: '20px',
                        transition: 'background 0.3s'
                    } }, isLogin ? 'Login' : 'Create Account')),
            react_1["default"].createElement("div", { style: { textAlign: 'center' } },
                react_1["default"].createElement("button", { onClick: function () { return setIsLogin(!isLogin); }, style: {
                        background: 'none',
                        border: 'none',
                        color: '#667eea',
                        fontSize: '16px',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                    } }, isLogin ? "Don't have an account? Sign up" : "Already have an account? Login")))));
};
exports["default"] = LoginPage;
