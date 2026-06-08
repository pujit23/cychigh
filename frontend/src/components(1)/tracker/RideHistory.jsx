import React from 'react';
import { useTracker } from '../../hooks/useTracker';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Trash2 } from 'lucide-react';
import EmptyState from '../ui/EmptyState';

const RideHistory = () => {
    const { rides, loading, deleteRide } = useTracker();

    if (loading) return <div className="animate-pulse h-64 bg-white/5 rounded-xl"></div>;
    if (!rides || rides.length === 0) return <EmptyState message="No rides recorded" subMessage="Log your first ride to see stats." />;

    // Prepare chart data (chronological)
    const chartData = [...rides].reverse().slice(0, 10).map(r => ({
        date: new Date(r.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        distance: r.distance
    }));

    // Stats
    const totalDistance = rides.reduce((acc, r) => acc + r.distance, 0);
    const totalElevation = rides.reduce((acc, r) => acc + (r.elevation || 0), 0);
    const maxDistance = rides.length > 0 ? Math.max(...rides.map(r => r.distance)) : 0;

    return (
        <div className="flex flex-col gap-8 h-full">
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-black/40 border border-white/5 p-4 rounded-xl text-center">
                    <span className="text-[10px] text-brand-muted uppercase tracking-widest font-dmono block mb-1">Total Distance</span>
                    <span className="font-bebas text-3xl text-brand-gold">{totalDistance.toFixed(1)}<span className="text-xl text-brand-gold/50 ml-1">km</span></span>
                </div>
                <div className="bg-black/40 border border-white/5 p-4 rounded-xl text-center">
                    <span className="text-[10px] text-brand-muted uppercase tracking-widest font-dmono block mb-1">Total Elevation</span>
                    <span className="font-bebas text-3xl text-white">{totalElevation}<span className="text-xl text-white/50 ml-1">m</span></span>
                </div>
                <div className="bg-black/40 border border-white/5 p-4 rounded-xl text-center">
                    <span className="text-[10px] text-brand-muted uppercase tracking-widest font-dmono block mb-1">Longest Ride</span>
                    <span className="font-bebas text-3xl text-brand-red">{maxDistance.toFixed(1)}<span className="text-xl text-brand-red/50 ml-1">km</span></span>
                </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/10 h-[300px]">
                <h4 className="font-bebas text-xl text-white tracking-widest mb-4">Activity Trend</h4>
                <div className="w-full h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorDist" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} width={30} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '6px' }}
                                itemStyle={{ color: '#FFD700', fontFamily: 'Bebas Neue', fontSize: '18px' }}
                            />
                            <Area type="monotone" dataKey="distance" stroke="#FFD700" fillOpacity={1} fill="url(#colorDist)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="flex-1">
                <h4 className="font-bebas text-xl text-white tracking-widest mb-4">Recent Rides</h4>
                <div className="space-y-3">
                    {rides.slice(0, 5).map(ride => (
                        <div key={ride._id} className="bg-white/5 hover:bg-white/10 p-4 rounded-lg flex justify-between items-center transition-colors group">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="font-bebas text-xl tracking-widest text-white">{ride.distance} km</span>
                                    <span className="text-xs font-dmono text-white/40">{new Date(ride.date).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm font-dsans text-brand-muted line-clamp-1">{ride.notes || 'No notes'}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <span className="text-xs font-dmono text-brand-gold block">{Math.floor(ride.duration/60)}h {ride.duration%60}m</span>
                                    {ride.elevation > 0 && <span className="text-xs font-dsans text-brand-muted block">{ride.elevation}m climb</span>}
                                </div>
                                <button onClick={() => deleteRide(ride._id)} className="text-brand-red opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-brand-red/20 rounded">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RideHistory;
