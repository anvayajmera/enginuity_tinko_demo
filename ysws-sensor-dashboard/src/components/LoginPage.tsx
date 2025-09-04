import React, { useState } from 'react';

interface LoginPageProps {
    onLogin: (username: string) => void;
    onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            onLogin(formData.username || 'Engineer');
        } else {
            onLogin(formData.username || 'New Engineer');
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '40px',
                width: '100%',
                maxWidth: '450px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(20px)'
            }}>
                <button 
                    onClick={onBack}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#667eea',
                        fontSize: '16px',
                        cursor: 'pointer',
                        marginBottom: '20px'
                    }}
                >
                    ← Back to Simple Mode
                </button>

                <h2 style={{
                    textAlign: 'center',
                    margin: '0 0 30px 0',
                    color: '#333',
                    fontSize: '28px'
                }}>
                    {isLogin ? 'Engineer Login' : 'Create Account'}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '600' }}>
                            Username
                        </label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '2px solid #e2e8f0',
                                borderRadius: '10px',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.3s'
                            }}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '600' }}>
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '2px solid #e2e8f0',
                                    borderRadius: '10px',
                                    fontSize: '16px',
                                    outline: 'none'
                                }}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    )}

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '600' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '2px solid #e2e8f0',
                                borderRadius: '10px',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '600' }}>
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '2px solid #e2e8f0',
                                    borderRadius: '10px',
                                    fontSize: '16px',
                                    outline: 'none'
                                }}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        style={{
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
                        }}
                    >
                        {isLogin ? 'Login' : 'Create Account'}
                    </button>
                </form>

                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#667eea',
                            fontSize: '16px',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
