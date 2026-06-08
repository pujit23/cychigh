import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAdmin } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function AdminLogin() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAdmin();
    const nav = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        const result = await login(data);
        setLoading(false);

        if (result.success) {
            toast.success('Welcome back, Admin', { icon: '🐝' });
            nav('/admin');
        } else {
            toast.error(result.error || 'Invalid credentials');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center relative p-6">
            {/* Background hex grid behind form */}
            <div className="absolute inset-0 bg-hex-grid opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-bee-black pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative z-10 w-full max-w-md bg-bee-panel border border-bee-border rounded-3xl p-8 sm:p-10 shadow-glow"
            >
                <div className="text-center mb-10">
                    <div className="text-5xl mb-4 bee-fly inline-block filter drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">🐝</div>
                    <h1 className="font-heading text-4xl text-gold tracking-widest drop-shadow-[0_0_5px_rgba(255,215,0,0.3)]">
                        ADMIN ACCESS
                    </h1>
                    <p className="text-gray-500 font-body text-sm mt-2">Sign in to manage the CycHigh encyclopedia.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-xs font-heading tracking-widest text-gold mb-2 uppercase">Email Address</label>
                        <input
                            type="email"
                            placeholder="admin@cychigh.com"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                            })}
                            className={`w-full bg-bee-black border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors
                ${errors.email ? 'border-danger focus:border-danger ring-1 ring-danger' : 'border-bee-border focus:border-gold focus:ring-1 focus:ring-gold hover:border-gold/50'}
              `}
                        />
                        {errors.email && <span className="text-danger text-xs mt-1 block font-body">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label className="block text-xs font-heading tracking-widest text-gold mb-2 uppercase">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register('password', { required: 'Password is required' })}
                                className={`w-full bg-bee-black border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors
                  ${errors.password ? 'border-danger focus:border-danger ring-1 ring-danger' : 'border-bee-border focus:border-gold focus:ring-1 focus:ring-gold hover:border-gold/50'}
                `}
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex="-1"
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        {errors.password && <span className="text-danger text-xs mt-1 block font-body">{errors.password.message}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gold text-bee-black font-heading text-xl tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-glow hover:shadow-glow-lg disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02]"
                    >
                        {loading ? (
                            <span className="w-6 h-6 border-2 border-bee-black border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            'LOGIN NOW'
                        )}
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-xs text-text-dim">Secured by P23 Authentication</p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
