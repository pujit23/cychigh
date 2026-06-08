import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCycles } from '../context/CycleContext';
import { User, Settings, LogOut, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CycleCard from '../components/cycle/CycleCard';
import axios from 'axios';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const { cycles } = useCycles();
    const navigate = useNavigate();
    const [savedCycles, setSavedCycles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('/api/users/profile', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                // Find complete cycle objects from global context
                const saved = cycles.filter(c => data.savedCycles?.includes(c._id || c.id));
                setSavedCycles(saved);
            } catch (error) {
                console.error("Profile load error", error);
            } finally {
                setLoading(false);
            }
        };

        if (cycles.length > 0) {
            fetchProfile();
        }
    }, [user, navigate, cycles]);

    if (!user) return null;

    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <h1 className="heading-lg mb-8">Pilot Profile</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Fixed Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl text-center border-t-2 border-brand-gold">
                        <div className="w-24 h-24 mx-auto bg-black/50 border border-brand-gold/30 rounded-full flex justify-center items-center mb-4">
                            <span className="font-bebas text-4xl text-brand-gold">{user.username.charAt(0).toUpperCase()}</span>
                        </div>
                        <h2 className="font-bebas text-2xl text-white tracking-widest leading-none mb-1">{user.username}</h2>
                        <p className="text-brand-muted font-dmono text-xs">{user.email}</p>
                        
                        {user.isAdmin && (
                            <span className="inline-block mt-4 bg-brand-red/20 text-brand-red px-3 py-1 font-dmono text-[10px] uppercase tracking-widest rounded border border-brand-red/30">
                                Admin Privileges Active
                            </span>
                        )}
                    </div>
                    
                    <div className="glass-panel rounded-2xl overflow-hidden divide-y divide-white/5 font-dsans text-sm flex flex-col">
                        <button className="flex items-center gap-3 p-4 hover:bg-white/5 hover:text-brand-gold transition-colors text-white text-left">
                            <User size={18} /> Edit Profile
                        </button>
                        <button className="flex items-center gap-3 p-4 hover:bg-white/5 hover:text-brand-gold transition-colors text-white text-left">
                            <Settings size={18} /> Preferences
                        </button>
                        <button className="flex items-center gap-3 p-4 hover:bg-brand-red/10 text-brand-red transition-colors text-left" onClick={logout}>
                            <LogOut size={18} /> Logout Session
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <div className="glass-panel p-8 rounded-2xl h-full border border-white/5">
                        <h3 className="font-bebas text-3xl tracking-widest mb-6 flex items-center gap-3">
                            <Package className="text-brand-gold" /> Dream Garage
                        </h3>
                        
                        <p className="text-brand-muted font-dsans mb-8 border-b border-white/10 pb-4">
                            Cycles you have saved for future reference.
                        </p>
                        
                        {loading ? (
                            <div className="animate-pulse bg-white/5 h-64 rounded-xl w-full"></div>
                        ) : savedCycles.length === 0 ? (
                            <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-xl bg-black/20">
                                <p className="text-brand-muted font-dsans mb-4">Your garage is currently empty.</p>
                                <button onClick={() => navigate('/encyclopedia')} className="btn-outline">Browse Encyclopedia</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {savedCycles.map(cycle => (
                                    <CycleCard key={cycle.id || cycle._id} cycle={cycle} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
