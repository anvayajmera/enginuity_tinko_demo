#!/bin/bash

echo "🔧 Force Saving YSWS Dashboard Files"
echo "===================================="

cd "$(dirname "$0")"

# Check if we're in the right directory
if [ ! -d "ysws-sensor-dashboard" ]; then
    echo "❌ ysws-sensor-dashboard directory not found!"
    echo "📍 Current directory: $(pwd)"
    exit 1
fi

# Navigate to the source directory
cd ysws-sensor-dashboard/src

echo "📁 Working in: $(pwd)"
echo ""

# Check file permissions
echo "🔍 Checking file permissions..."
ls -la

echo ""
echo "📝 Attempting to create/update key files..."

# Force create the main App.tsx if it doesn't exist or is problematic
cat > App.tsx << 'EOF'
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import AdvancedDashboard from './components/AdvancedDashboard';
import LoginPage from './components/LoginPage';
import './index.css';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<'home' | 'simple' | 'login' | 'advanced'>('home');
    const [username, setUsername] = useState('');

    const handleLogin = (user: string) => {
        setUsername(user);
        setCurrentView('advanced');
    };

    const handleLogout = () => {
        setUsername('');
        setCurrentView('home');
    };

    const handleBackToHome = () => {
        setCurrentView('home');
    };

    // Home/Mode Selection Screen
    if (currentView === 'home') {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Arial, sans-serif',
                padding: '20px'
            }}>
                <div style={{
                    textAlign: 'center',
                    color: 'white',
                    maxWidth: '900px',
                    width: '100%'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎛️</div>
                    <h1 style={{
                        fontSize: '3rem',
                        marginBottom: '20px',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        fontWeight: '700'
                    }}>
                        YSWS IoT Dashboard System
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        marginBottom: '50px',
                        opacity: 0.9
                    }}>
                        Choose your dashboard experience
                    </p>
                    
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '30px',
                        marginBottom: '40px'
                    }}>
                        {/* Simple Dashboard */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '20px',
                            padding: '40px 30px',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onClick={() => setCurrentView('simple')}>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📊</div>
                            <h2 style={{ fontSize: '24px', marginBottom: '15px', fontWeight: '600' }}>
                                Simple Dashboard
                            </h2>
                            <ul style={{ 
                                textAlign: 'left', 
                                fontSize: '14px', 
                                lineHeight: '1.6',
                                listStyle: 'none',
                                padding: 0
                            }}>
                                <li>✅ Real-time sensor monitoring</li>
                                <li>✅ Interactive charts & alerts</li>
                                <li>✅ Device status tracking</li>
                                <li>✅ Clean, beginner-friendly interface</li>
                            </ul>
                        </div>
                        
                        {/* Advanced Dashboard */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '20px',
                            padding: '40px 30px',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onClick={() => setCurrentView('login')}>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔧</div>
                            <h2 style={{ fontSize: '24px', marginBottom: '15px', fontWeight: '600' }}>
                                Advanced Dashboard
                            </h2>
                            <ul style={{ 
                                textAlign: 'left', 
                                fontSize: '14px', 
                                lineHeight: '1.6',
                                listStyle: 'none',
                                padding: 0
                            }}>
                                <li>🔧 <strong>Electronics Library & Projects</strong></li>
                                <li>🎛️ Device control panels</li>
                                <li>📚 Component dictionary</li>
                                <li>🔐 Login required (advanced123)</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '15px',
                        padding: '20px',
                        fontSize: '14px'
                    }}>
                        <strong>💡 Quick Access:</strong> Advanced Mode Password = <code>advanced123</code>
                    </div>
                </div>
            </div>
        );
    }

    // Simple Dashboard
    if (currentView === 'simple') {
        return <Dashboard onSwitchMode={handleBackToHome} />;
    }

    // Login Screen
    if (currentView === 'login') {
        return <LoginPage onLogin={handleLogin} onBack={handleBackToHome} />;
    }

    // Advanced Dashboard (after login)
    if (currentView === 'advanced') {
        return <AdvancedDashboard username={username} onLogout={handleLogout} />;
    }

    return null;
};

export default App;
EOF

echo "✅ App.tsx created/updated"

# Check if components directory exists
if [ ! -d "components" ]; then
    echo "📁 Creating components directory..."
    mkdir -p components
fi

# Create a simple test to see if we can write files
echo "🧪 Testing file write permissions..."
echo "test" > test-write.txt
if [ -f "test-write.txt" ]; then
    echo "✅ File write permissions OK"
    rm test-write.txt
else
    echo "❌ Cannot write files - permission issue!"
    echo "🔧 Try running: sudo chown -R $(whoami) $(pwd)"
    exit 1
fi

echo ""
echo "🎯 Next steps:"
echo "1. Close VS Code completely"
echo "2. Reopen VS Code"
echo "3. Open the project folder"
echo "4. Try saving again with Cmd+S"
echo ""
echo "Or run the dashboard directly:"
echo "cd $(pwd) && npm run dev"
