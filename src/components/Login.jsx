import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../utils/localStorage';
import { useTheme } from '../context/ThemeContext';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useTheme();  // ✅ Use global theme

    const handleLogin = (e) => {
        e.preventDefault();
        if (!username.trim()) return;
        setUser(username);
        onLogin(username);
        navigate('/dashboard');
    };

    return (
        <div className={`login-container ${darkMode ? 'dark' : ''}`}>
            <div className="login-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Login</h2>

                {/* 🌗 Styled Toggle Switch */}
                <div
                    className="dark-toggle-switch"
                    onClick={toggleDarkMode}
                    title="Toggle theme"
                    role="button"
                    aria-label="Toggle theme"
                    style={{
                        cursor: 'pointer',
                        width: '50px',
                        height: '26px',
                        background: darkMode ? '#444' : '#ddd',
                        borderRadius: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '3px',
                        transition: 'background 0.3s',
                    }}
                >
                    <div
                        className={`toggle-thumb`}
                        style={{
                            height: '20px',
                            width: '20px',
                            background: darkMode ? '#fff' : '#333',
                            borderRadius: '50%',
                            transform: darkMode ? 'translateX(24px)' : 'translateX(0)',
                            transition: 'transform 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                        }}
                    >
                        {darkMode ? '🌙' : '☀️'}
                    </div>
                </div>
            </div>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
