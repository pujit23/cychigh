import React, { useState, useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { supabase } from '../supabase/config';
import { useAuth } from '../context/AuthContext';
import { updateLeaderboard } from '../components/Leaderboard';
import toast from 'react-hot-toast';

const TrackerPage = () => {
  const { currentUser } = useAuth();
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [type, setType] = useState('Road Training');
  const [saving, setSaving] = useState(false);
  
  const [recentRides, setRecentRides] = useState([]);
  const [stats, setStats] = useState({
    totalRides: 0,
    totalDistance: 0,
    totalDuration: 0
  });

  const fetchRides = async () => {
    if (!currentUser) return;
    const { data } = await supabase
      .from('ride_logs')
      .select('*')
      .eq('uid', currentUser.id)
      .order('created_at', { ascending: false });

    if (data) {
      setRecentRides(data.slice(0, 5)); // Just take top 5 for recent
      
      const totalDist = data.reduce((acc, r) => acc + (r.distance || 0), 0);
      const totalDur = data.reduce((acc, r) => acc + (r.duration || 0), 0);
      
      setStats({
        totalRides: data.length,
        totalDistance: totalDist,
        totalDuration: totalDur
      });
    }
  };

  useEffect(() => {
    fetchRides();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!distance || !duration || !currentUser) return;

    setSaving(true);
    const distNum = parseFloat(distance);
    const durNum = parseInt(duration);

    try {
      const { error } = await supabase.from('ride_logs').insert({
        uid: currentUser.id,
        distance: distNum,
        duration: durNum,
        ride_type: type
      });

      if (error) throw error;

      await updateLeaderboard(currentUser.id, distNum);
      toast.success('Ride logged successfully!');
      
      setDistance('');
      setDuration('');
      setType('Road Training');
      
      fetchRides(); // Refresh
    } catch (err) {
      console.error(err);
      toast.error('Failed to log ride');
    }
    setSaving(false);
  };

  const avgSpeed = stats.totalDuration > 0 ? (stats.totalDistance / (stats.totalDuration / 60)).toFixed(1) : '0.0';

  return (
    <PageLayout>
      <div className="max-w-[1000px] mx-auto w-full px-6 py-12 min-h-screen">
        <h1 className="font-display text-[56px] text-[#F0F0F0] leading-none mb-8">RIDE TRACKER</h1>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { l: 'Total Rides', v: `${stats.totalRides}` },
            { l: 'Total Distance', v: `${Math.round(stats.totalDistance)} km` },
            { l: 'Total Duration', v: `${Math.floor(stats.totalDuration / 60)}h ${stats.totalDuration % 60}m` },
            { l: 'Avg Speed', v: `${avgSpeed} km/h` }
          ].map(s => (
            <div key={s.l} className="bg-[#0C0C0C] border border-[#141414] rounded p-6">
              <span className="font-body text-[10px] text-[#777] uppercase tracking-[2px] block mb-2">{s.l}</span>
              <span className="font-mono text-[28px] text-[#FFD700] leading-none">{s.v}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Chart Placeholder */}
          <div className="lg:col-span-2 bg-[#050505] border border-[#141414] rounded p-6 h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
             
             {/* Simple visual bar chart simulation */}
             <div className="absolute inset-0 pt-16 pb-8 px-12 flex items-end justify-between">
                {[30, 45, 20, 80, 60, 90, 40].map((h, i) => (
                  <div key={i} className="w-[8%] bg-gradient-to-t from-[#FFD700] to-[rgba(255,215,0,0.1)] rounded-t-sm" style={{ height: `${h}%` }}></div>
                ))}
             </div>
             
             <div className="absolute top-6 left-6 font-body text-[12px] text-[#555] uppercase tracking-[2px]">Distance per week (last 7 weeks)</div>
          </div>

          {/* Manual Entry Form */}
          <div className="bg-[#080808] border border-[#141414] rounded p-6">
            <h3 className="font-display text-[24px] text-[#F0F0F0] mb-6">LOG A RIDE</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block font-body text-[10px] text-[#777] uppercase tracking-[1px] mb-2">Distance (km)</label>
                <input required type="number" step="0.1" min="0" value={distance} onChange={e => setDistance(e.target.value)} className="w-full bg-[#050505] border border-[#1F1F1F] rounded p-3 font-mono text-[#F0F0F0] focus:border-[#FFD700] outline-none" />
              </div>
              <div>
                <label className="block font-body text-[10px] text-[#777] uppercase tracking-[1px] mb-2">Duration (mins)</label>
                <input required type="number" min="1" value={duration} onChange={e => setDuration(e.target.value)} className="w-full bg-[#050505] border border-[#1F1F1F] rounded p-3 font-mono text-[#F0F0F0] focus:border-[#FFD700] outline-none" />
              </div>
              <div>
                <label className="block font-body text-[10px] text-[#777] uppercase tracking-[1px] mb-2">Type</label>
                <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-[#050505] border border-[#1F1F1F] rounded p-3 font-body text-[#F0F0F0] focus:border-[#FFD700] outline-none">
                  <option>Road Training</option>
                  <option>Trail / MTB</option>
                  <option>Commute</option>
                  <option>Indoor Trainer</option>
                </select>
              </div>
              <button disabled={saving} className="w-full bg-[#FFD700] text-[#000] py-3 mt-4 font-display text-[18px] tracking-[2px] transition-colors hover:bg-[#FFE033] rounded">
                {saving ? 'SAVING...' : 'SAVE RIDE'}
              </button>
            </form>
          </div>
        </div>

        {/* Recent History Table */}
        <div>
          <h3 className="font-display text-[32px] text-[#F0F0F0] mb-6">RECENT RIDES</h3>
          <div className="overflow-x-auto border border-[#141414] rounded">
            <table className="w-full text-left font-body text-[13px]">
              <thead className="bg-[#0A0A0A] border-b border-[#141414] text-[10px] text-[#555] uppercase tracking-[1px]">
                <tr>
                  <th className="p-4 font-normal">Date</th>
                  <th className="p-4 font-normal">Type</th>
                  <th className="p-4 font-normal">Distance</th>
                  <th className="p-4 font-normal">Duration</th>
                  <th className="p-4 font-normal">Speed</th>
                </tr>
              </thead>
              <tbody>
                {recentRides.length === 0 && (
                  <tr><td colSpan="5" className="p-4 text-center text-[#555]">No recent rides</td></tr>
                )}
                {recentRides.map((r, i) => {
                  const d = new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  const speed = r.duration > 0 ? (r.distance / (r.duration / 60)).toFixed(1) : '0.0';
                  return (
                  <tr key={i} className="border-b border-[#0D0D0D] hover:bg-[#080808] transition-colors">
                    <td className="p-4 text-[#AAAAAA]">{d}</td>
                    <td className="p-4 text-[#F0F0F0]">{r.ride_type}</td>
                    <td className="p-4 font-mono text-[#FFD700]">{r.distance} km</td>
                    <td className="p-4 font-mono text-[#AAAAAA]">{r.duration >= 60 ? `${Math.floor(r.duration/60)}h ${r.duration%60}m` : `${r.duration}m`}</td>
                    <td className="p-4 font-mono text-[#777]">{speed} km/h</td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </PageLayout>
  );
};

export default TrackerPage;
