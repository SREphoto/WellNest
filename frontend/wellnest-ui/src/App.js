import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import ConnectionsPage from './components/ConnectionsPage';
import DashboardPage from './components/DashboardPage';

function App() {
    const [currentPage, setCurrentPage] = useState('login');
    const [token, setToken] = useState('');

    const handleLoginSuccess = (newToken) => {
        setToken(newToken);
        setCurrentPage('dashboard'); // Go to dashboard after login
    };

    const handleLogout = () => {
        setToken('');
        setCurrentPage('login');
    };

    const LoginPageWithCallback = () => <LoginPage onLoginSuccess={handleLoginSuccess} />;

    return (
        <div>
            <nav>
                {token ? (
                    <>
                        <button onClick={() => setCurrentPage('dashboard')}>Dashboard</button>
                        <button onClick={() => setCurrentPage('connections')}>Connections</button>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setCurrentPage('login')}>Login</button>
                        <button onClick={() => setCurrentPage('register')}>Register</button>
                    </>
                )}
            </nav>

            {currentPage === 'login' && <LoginPageWithCallback />}
            {currentPage === 'register' && <RegistrationPage />}
            {currentPage === 'dashboard' && token && <DashboardPage token={token} />}
            {currentPage === 'connections' && token && <ConnectionsPage token={token} />}
        </div>
    );
}

export default App;
