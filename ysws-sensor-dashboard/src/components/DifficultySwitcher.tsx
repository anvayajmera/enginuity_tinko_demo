import React, { useState } from 'react';
import LoginPage from './LoginPage';
import AdvancedDashboard from './AdvancedDashboard';

interface DifficultySwitcherProps {
    onModeChange?: (mode: 'simple' | 'advanced') => void;
}

const DifficultySwitcher: React.FC<DifficultySwitcherProps> = ({ onModeChange }) => {
    const [difficulty, setDifficulty] = useState<'simple' | 'advanced'>('simple');
    const [showLogin, setShowLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleSwitchToAdvanced = () => {
        setShowLogin(true);
    };

    const handleLogin = (user: string) => {
        setUsername(user);
        setIsLoggedIn(true);
        setShowLogin(false);
        setDifficulty('advanced');
        onModeChange?.('advanced');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setDifficulty('simple');
        onModeChange?.('simple');
    };

    const handleBackToSimple = () => {
        setShowLogin(false);
        setDifficulty('simple');
        onModeChange?.('simple');
    };

    if (showLogin) {
        return <LoginPage onLogin={handleLogin} onBack={handleBackToSimple} />;
    }

    if (isLoggedIn && difficulty === 'advanced') {
        return <AdvancedDashboard username={username} onLogout={handleLogout} />;
    }

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '15px',
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
            <h2 style={{
                color: 'white',
                margin: '0 0 15px 0',
                fontSize: '20px',
                fontWeight: '600'
            }}>
                Current Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </h2>
            <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                margin: '0 0 15px 0',
                fontSize: '14px'
            }}>
                {difficulty === 'simple' 
                    ? 'Simple mode for quick sensor monitoring' 
                    : 'Advanced mode with login and enhanced features'
                }
            </p>
            <button 
                onClick={difficulty === 'simple' ? handleSwitchToAdvanced : handleLogout}
                style={{
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
                }}
            >
                {difficulty === 'simple' ? 'Switch to Advanced Mode' : 'Back to Simple Mode'}
            </button>
        </div>
    );
};

export default DifficultySwitcher;