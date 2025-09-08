import React, { useState } from 'react';

interface LoginPageProps {
    onLogin: (username: string) => void;
    onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Simple validation - in real app, use proper authentication
        if (username.trim() && password === 'advanced123') {
            onLogin(username);
        } else {
            setError('Invalid credentials. Use password: advanced123');
        }
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
                maxWidth: '400px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(20px)'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    margin: '0 0 30px 0',
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#333'
                }}>
                    🔐 Advanced Login
                </h2>
                
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#374151'
                        }}>
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid #e2e8f0',
                                borderRadius: '10px',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.2s ease'
                            }}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#374151'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid #e2e8f0',
                                borderRadius: '10px',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.2s ease'
                            }}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    
                    {error && (
                        <div style={{
                            background: '#FEF2F2',
                            border: '1px solid #FECACA',
                            color: '#DC2626',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            fontSize: '14px'
                        }}>
                            {error}
                        </div>
                    )}
                    
                    <div style={{
                        background: '#F3F4F6',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        padding: '12px',
                        marginBottom: '20px',
                        fontSize: '14px',
                        color: '#6B7280'
                    }}>
                        💡 Demo Password: <strong>advanced123</strong>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        gap: '10px'
                    }}>
                        <button
                            type="button"
                            onClick={onBack}
                            style={{
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
                            }}
                        >
                            Back
                        </button>
                        
                        <button
                            type="submit"
                            style={{
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
                            }}
                        >
                            Login to Advanced Mode
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
