import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post('/api/auth/login', { email, password }, config);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Login successful');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const register = async (username, email, password) => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post('/api/auth/register', { username, email, password }, config);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Registration successful');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
            setUser(null);
            localStorage.removeItem('userInfo');
            toast.success('Logged out');
        } catch (error) {
            toast.error('Logout failed');
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = require('react').useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;
