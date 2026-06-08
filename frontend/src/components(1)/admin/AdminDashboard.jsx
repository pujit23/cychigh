import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ users: 0, cycles: 0, posts: 0, rides: 0 });
    const [loading, setLoading] = useState(false);

    const loadStats = async () => {
        try {
            setLoading(true);
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('/api/admin/stats', config);
            setStats(data);
        } catch (error) {
            toast.error("Failed to load admin stats");
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if(user?.isAdmin) {
            loadStats();
        }
    }, [user]);

    if (!user?.isAdmin) return <div className="text-center p-12 glass-panel text-brand-red font-bebas text-3xl tracking-widest">ACCESS DENIED</div>;

    return (
        <div className="p-6">
            <h2 className="heading-md mb-6">System Overview</h2>
            {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[X,X,X,X].map((_,i) => <div key={i} className="h-32 bg-white/5 animate-pulse rounded-xl"></div>)}
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="glass-panel p-6 rounded-xl border-t-4 border-brand-gold text-center">
                        <span className="text-xs font-dmono uppercase tracking-widest text-brand-muted block mb-2">Total Cycles</span>
                        <span className="font-bebas text-5xl text-white">{stats.cycles}</span>
                    </div>
                    <div className="glass-panel p-6 rounded-xl border-t-4 border-white text-center">
                        <span className="text-xs font-dmono uppercase tracking-widest text-brand-muted block mb-2">Registered Users</span>
                        <span className="font-bebas text-5xl text-white">{stats.users}</span>
                    </div>
                    <div className="glass-panel p-6 rounded-xl border-t-4 border-brand-red text-center">
                        <span className="text-xs font-dmono uppercase tracking-widest text-brand-muted block mb-2">Posts & Topics</span>
                        <span className="font-bebas text-5xl text-brand-red">{stats.posts}</span>
                    </div>
                    <div className="glass-panel p-6 rounded-xl border-t-4 border-brand-gold text-center">
                        <span className="text-xs font-dmono uppercase tracking-widest text-brand-muted block mb-2">Rides Logged</span>
                        <span className="font-bebas text-5xl text-brand-gold">{stats.rides}</span>
                    </div>
                </div>
            )}
            
            <div className="mt-12 glass-panel p-8 rounded-xl bg-gradient-to-br from-black to-brand-bg text-center">
                <h3 className="font-bebas text-3xl text-brand-gold tracking-widest mb-2">CYCHIGH PLATFORM</h3>
                <p className="text-brand-muted font-dmono text-sm max-w-sm mx-auto">Database is running perfectly. All systems optimal. Seed generation complete for 120 cycles.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
