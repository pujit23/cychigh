// ==============================================
// CycHigh — Admin Login Page
// ==============================================

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { loginAdmin } from '../services/api';
import { GiHoneycomb } from 'react-icons/gi';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await loginAdmin({ email, password });
            login(res.data.data, res.data.token);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
        setLoading(false);
    };

    return (
        <div className="login-page">
            <form className="glass-card login-card" onSubmit={handleSubmit}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <GiHoneycomb style={{ fontSize: '3rem', color: 'var(--honey-gold)' }} />
                </div>
                <h2>Admin Login</h2>
                <p className="login-sub">Sign in to manage CycHigh encyclopedia</p>

                {error && <div style={{ background: 'rgba(231,76,60,0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: 8, marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</div>}

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" className="input" placeholder="admin@cychigh.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" className="input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>
        </div>
    );
}
