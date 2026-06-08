import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin';
import toast from 'react-hot-toast';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAdmin();
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const res = await login(email, password);
        if (res.success) {
            toast.success('System Override Authorized');
            nav('/admin');
        } else {
            toast.error(res.message || 'Access Denied', {
                style: { border: '1px solid #DC2626' },
                iconTheme: { primary: '#DC2626', secondary: '#000' }
            });
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen w-full bg-bg-deepest bg-sharp-grid flex items-center justify-center p-6 bg-noise">
            <div className="w-full max-w-md bg-bg-dark border border-border-mid p-8 shadow-dark-lift relative">

                <div className="absolute top-0 left-0 w-full h-[2px] bg-gold"></div>

                <div className="text-center mb-10">
                    <span className="font-heading text-4xl text-gold tracking-widest block mb-4">P23</span>
                    <h1 className="font-heading text-5xl text-text-primary uppercase m-0 leading-none">ADMIN ACCESS</h1>
                    <p className="font-mono text-[10px] text-text-muted mt-2 tracking-[0.2em]">[ SECURE DASHBOARD PORTAL ]</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-body text-[10px] uppercase text-text-secondary tracking-[0.2em] mb-2">Identifier</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full bg-bg-deepest border border-border-mid text-text-primary px-4 py-3 font-mono text-sm focus:border-gold transition-colors rounded-none outline-none"
                        />
                    </div>

                    <div>
                        <label className="block font-body text-[10px] uppercase text-text-secondary tracking-[0.2em] mb-2">Passcode</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full bg-bg-deepest border border-border-mid text-text-primary px-4 py-3 font-mono text-sm focus:border-gold transition-colors rounded-none outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gold text-bg-deepest font-heading text-xl py-3 mt-4 hover:bg-gold-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase rounded-none tracking-widest"
                    >
                        {isSubmitting ? 'Authenticating...' : 'Enter System'}
                    </button>
                </form>

            </div>
        </div>
    );
}
