import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Dashboard from './components/TaskList.jsx';
import { getUser } from './utils/localStorage';

function App() {
    const [username, setUsername] = useState(getUser());

    return (
        <Routes>
            <Route
                path="/"
                element={username ? <Navigate to="/dashboard" /> : <Login onLogin={setUsername} />}
            />
            <Route
                path="/dashboard"
                element={username ? <Dashboard onLogout={() => setUsername(null)} /> : <Navigate to="/" />}
            />
        </Routes>
    );
}

export default App;
