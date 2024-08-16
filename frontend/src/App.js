import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactsPage from './pages/ContactsPage';

const App = () => {
    return (
        <div>
        <h1> Hello world</h1>
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="*" element={<RegisterPage />} />
            </Routes>
        </Router>
        </div>
    );
};

export default App;
