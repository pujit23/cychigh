import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCycles } from '../context/CycleContext';
import { getAdminStats, getAllUsers, deleteCycle } from '../services/api';
import PageLayout from '../components/layout/PageLayout';
import { MOCK_CYCLES } from '../utils/constants';
import toast from 'react-hot-toast';

const AdminPage = () => {
  const { user, isAdmin, logout } = useAuth();
  const { cycles, fetchCycles } = useCycles();
  const [activeTab, setActiveTab] = useState('CYCLES');
  const [stats, setStats] = useState({ cycles: 0, users: 0, posts: 0 });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (!isAdmin) {
      toast.error('Access denied. Admin privileges required.');
      navigate('/');
      return;
    }

    // Load admin data
    const loadAdminData = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          getAdminStats(),
          getAllUsers()
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error('Failed to load admin data:', err);
        // Use mock data as fallback
        setStats({ cycles: MOCK_CYCLES.length, users: 42, posts: 128 });
      }
    };

    loadAdminData();
  }, [user, isAdmin, navigate]);

  const handleDeleteCycle = async (cycleId) => {
    if (!confirm('Are you sure you want to delete this cycle?')) return;
    
    try {
      await deleteCycle(cycleId);
      toast.success('Cycle deleted successfully');
      fetchCycles(); // Refresh cycles list
    } catch (err) {
      toast.error('Failed to delete cycle');
      console.error(err);
    }
  };

  if (!user || !isAdmin) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#020202]">
          <div className="w-full max-w-[400px] bg-[#0C0C0C] border border-[#1F1F1F] p-8 rounded-lg">
            <div className="text-center mb-8">
              <span className="font-display text-[48px] text-[#FFD700] leading-none block mb-2">CYCSECURE</span>
              <span className="font-body text-[10px] text-[#777] uppercase tracking-[3px]">Admin Authentication</span>
            </div>
            <div className="space-y-4 text-center">
              <p className="font-body text-[12px] text-[#555]">
                Email: admin@cychigh.com
              </p>
              <p className="font-body text-[12px] text-[#555]">
                Password: Admin@2024
              </p>
              <button 
                onClick={() => navigate('/auth')}
                className="w-full bg-[#FFD700] text-[#000] py-3 font-display text-[14px] tracking-[3px] uppercase hover:bg-[#FFE033] transition-colors"
              >
                Login as Admin
              </button>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-[1200px] mx-auto w-full px-6 py-12 min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="font-display text-[56px] text-[#F0F0F0] leading-none mb-2">ADMIN DASHBOARD</h1>
            <p className="font-body text-[13px] text-[#555] tracking-[2px] uppercase text-[#DC2626]">System Access Level: Maximum</p>
          </div>
          <button onClick={logout} className="text-[#777] hover:text-[#DC2626] font-body text-[12px] uppercase tracking-[2px] transition-colors">
            End Session
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#080808] border border-[#141414] p-6 rounded">
            <h3 className="font-body text-[10px] text-[#555] uppercase tracking-[2px] mb-2">Total Cycles</h3>
            <p className="font-display text-[32px] text-[#FFD700]">{stats.cycles}</p>
          </div>
          <div className="bg-[#080808] border border-[#141414] p-6 rounded">
            <h3 className="font-body text-[10px] text-[#555] uppercase tracking-[2px] mb-2">Total Users</h3>
            <p className="font-display text-[32px] text-[#FFD700]">{stats.users}</p>
          </div>
          <div className="bg-[#080808] border border-[#141414] p-6 rounded">
            <h3 className="font-body text-[10px] text-[#555] uppercase tracking-[2px] mb-2">Total Posts</h3>
            <p className="font-display text-[32px] text-[#FFD700]">{stats.posts}</p>
          </div>
        </div>

        <div className="flex gap-2 border-b border-[#141414] mb-8 overflow-x-auto">
          {['CYCLES', 'USERS', 'POSTS', 'ANALYTICS'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-6 font-body text-[11px] uppercase tracking-[2px] border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-[#FFD700] text-[#FFD700]' : 'border-transparent text-[#555] hover:text-[#AAAAAA]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'CYCLES' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center bg-[#080808] p-6 border border-[#141414] rounded">
              <div>
                <h3 className="font-display text-[24px] text-[#F0F0F0]">BULK DATABASE IMPORT</h3>
                 <p className="font-body text-[12px] text-[#777]">Upload JSON to update or insert multiple cycles</p>
              </div>
              <button className="bg-[#111] border border-[#333] hover:border-[#FFD700] hover:text-[#FFD700] text-[#AAAAAA] px-6 py-3 font-body text-[11px] uppercase tracking-[2px] rounded transition-colors">
                CHOOSE FILE
              </button>
            </div>

            <div className="bg-[#0C0C0C] border border-[#141414] rounded overflow-hidden">
              <div className="p-4 border-b border-[#141414] flex justify-between items-center bg-[#0A0A0A]">
                <h3 className="font-display text-[20px] text-[#F0F0F0]">CYCLE REGISTRY ({cycles.length})</h3>
                <input type="text" placeholder="Filter..." className="bg-[#050505] border border-[#1F1F1F] rounded px-3 py-1 font-body text-[12px] focus:outline-none focus:border-[#FFD700] text-[#F0F0F0]" />
              </div>
              <div className="overflow-x-auto max-h-[600px] custom-scrollbar">
                <table className="w-full text-left font-body text-[12px]">
                  <thead className="sticky top-0 bg-[#111] border-b border-[#1F1F1F] text-[#777] uppercase tracking-[1px] text-[10px]">
                    <tr>
                      <th className="p-4 py-3 font-normal">ID</th>
                      <th className="p-4 py-3 font-normal">Name</th>
                      <th className="p-4 py-3 font-normal">Brand</th>
                      <th className="p-4 py-3 font-normal">Category</th>
                      <th className="p-4 py-3 font-normal font-mono text-right">Price (INR)</th>
                      <th className="p-4 py-3 font-normal text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cycles.slice(0, 50).map((c, i) => (
                      <tr key={c.id} className="border-b border-[#0D0D0D] hover:bg-[#080808] transition-colors">
                        <td className="p-4 text-[#555] font-mono">{c.id}</td>
                        <td className="p-4 text-[#F0F0F0] font-bold">{c.name || c.fullName}</td>
                        <td className="p-4 text-[#AAAAAA]">{c.brand}</td>
                        <td className="p-4 text-[#555] uppercase">{c.category}</td>
                        <td className="p-4 font-mono text-[#FFD700] text-right">{c.price_inr}</td>
                        <td className="p-4 text-right space-x-4">
                          <button className="text-[#FFD700] hover:text-[#FFE033] uppercase tracking-[1px] text-[10px]">Edit</button>
                          <button 
                            onClick={() => handleDeleteCycle(c.id)}
                            className="text-[#DC2626] hover:text-[#F87171] uppercase tracking-[1px] text-[10px]"
                          >
                            Del
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'USERS' && (
          <div className="bg-[#0C0C0C] border border-[#141414] rounded overflow-hidden">
            <div className="p-4 border-b border-[#141414] bg-[#0A0A0A]">
              <h3 className="font-display text-[20px] text-[#F0F0F0]">USER REGISTRY ({users.length})</h3>
            </div>
            <div className="overflow-x-auto max-h-[600px] custom-scrollbar">
              <table className="w-full text-left font-body text-[12px]">
                <thead className="sticky top-0 bg-[#111] border-b border-[#1F1F1F] text-[#777] uppercase tracking-[1px] text-[10px]">
                  <tr>
                    <th className="p-4 py-3 font-normal">ID</th>
                    <th className="p-4 py-3 font-normal">Username</th>
                    <th className="p-4 py-3 font-normal">Email</th>
                    <th className="p-4 py-3 font-normal">Role</th>
                    <th className="p-4 py-3 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 50).map((u, i) => (
                    <tr key={u.id} className="border-b border-[#0D0D0D] hover:bg-[#080808] transition-colors">
                      <td className="p-4 text-[#555] font-mono">{u.id}</td>
                      <td className="p-4 text-[#F0F0F0] font-bold">{u.username}</td>
                      <td className="p-4 text-[#AAAAAA]">{u.email}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-[10px] uppercase rounded ${u.isAdmin ? 'bg-[#FFD700]/20 text-[#FFD700]' : 'bg-[#333] text-[#777]'}`}>
                          {u.isAdmin ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-4">
                        <button className="text-[#FFD700] hover:text-[#FFE033] uppercase tracking-[1px] text-[10px]">Edit</button>
                        <button className="text-[#DC2626] hover:text-[#F87171] uppercase tracking-[1px] text-[10px]">Ban</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default AdminPage;
