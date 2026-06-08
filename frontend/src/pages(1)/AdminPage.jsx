import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';
import { useCycles } from '../context/CycleContext';
import { deleteCycle } from '../services/api';
import toast from 'react-hot-toast';
import BulkImport from '../components/admin/BulkImport';
import AddCycleForm from '../components/admin/AddCycleForm';
import EditCycleForm from '../components/admin/EditCycleForm';

export default function AdminPage() {
    const { allCycles } = useCycles();
    const { logout } = useAdmin();
    const nav = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [isBulkOpen, setIsBulkOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingCycle, setEditingCycle] = useState(null); // id of cycle to edit

    const filteredCycles = allCycles.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (window.confirm('ALERT: Confirm permanent deletion of telemetry record?')) {
            try {
                await deleteCycle(id);
                toast.success(`Record ${id} purged from matrix`);
                // Note: Context refresh omitted to keep logic sync simple
            } catch (err) {
                toast.error('System Error on Delete', {
                    style: { border: '1px solid #DC2626' },
                    iconTheme: { primary: '#DC2626', secondary: '#000' }
                });
            }
        }
    };

    const handleAddSubmit = async (data) => {
        toast.success('Addition processing simulated OK');
        setIsAddOpen(false);
    };

    const handleEditSubmit = async (id, data) => {
        toast.success('Update processing simulated OK');
        setEditingCycle(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-bg-deepest pb-20 pt-8"
        >
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Options */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-border-subtle pb-6">
                    <div>
                        <span className="font-heading text-xl text-danger tracking-widest block mb-2">SYS.OP</span>
                        <h1 className="font-heading text-4xl md:text-5xl text-text-primary uppercase m-0 leading-none">Internal Platform Control</h1>
                        <p className="font-body text-[11px] text-text-muted uppercase tracking-[0.2em] mt-3">
                            RESTRICTED CLEARANCE ONLY
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="font-body text-[11px] text-[#888] hover:text-gold transition-colors focus:outline-none tracking-[0.2em] uppercase"
                        >
                            + ADD MANUAL
                        </button>
                        <div className="w-[1px] h-3 bg-border-mid"></div>
                        <button
                            onClick={() => setIsBulkOpen(true)}
                            className="font-body text-[11px] text-[#888] hover:text-text-primary transition-colors focus:outline-none tracking-[0.2em] uppercase"
                        >
                            [ INJECT JSON ]
                        </button>
                        <div className="w-[1px] h-3 bg-border-mid"></div>
                        <button
                            onClick={logout}
                            className="font-body text-[11px] text-[#888] hover:text-danger transition-colors focus:outline-none tracking-[0.2em] uppercase"
                        >
                            DISCONNECT
                        </button>
                    </div>
                </div>

                {/* Global Toolbar */}
                <div className="w-full bg-[#0C0C0C] border border-[#1F1F1F] p-4 flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <span className="font-mono text-[10px] text-text-muted">TOTAL RECORDS: {allCycles.length}</span>
                    <input
                        type="text"
                        placeholder="SEARCH PLATFORM ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-bg-deepest border border-[#2A2A2A] text-text-primary px-4 py-2 font-mono text-[11px] focus:border-gold outline-none w-full md:w-80 transition-colors uppercase"
                    />
                </div>

                {/* List Grid View */}
                <div className="border border-border-subtle overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#0C0C0C]">
                            <tr>
                                <th className="font-body text-[9px] uppercase tracking-[0.2em] text-[#888] p-4 border-b border-r border-[#1F1F1F]">ID</th>
                                <th className="font-body text-[9px] uppercase tracking-[0.2em] text-[#888] p-4 border-b border-r border-[#1F1F1F]">System Name</th>
                                <th className="font-body text-[9px] uppercase tracking-[0.2em] text-[#888] p-4 border-b border-r border-[#1F1F1F] hidden md:table-cell">Manufacturer</th>
                                <th className="font-body text-[9px] uppercase tracking-[0.2em] text-[#888] p-4 border-b border-[#1F1F1F] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(filteredCycles || []).slice(0, 50).map((cycle) => ( // Render max 50 to prevent massive DOM slow
                                <tr key={cycle._id} className="border-b border-[#0F0F0F] bg-bg-deepest hover:bg-[#0C0C0C] transition-colors group">
                                    <td className="p-4 border-r border-[#0F0F0F] font-mono text-[10px] text-text-muted">{cycle._id}</td>
                                    <td className="p-4 border-r border-[#0F0F0F] font-body text-[13px] text-text-primary group-hover:text-gold transition-colors">{cycle.name}</td>
                                    <td className="p-4 border-r border-[#0F0F0F] font-body text-[11px] text-[#888] hidden md:table-cell uppercase">{cycle.brand}</td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => setEditingCycle(cycle)}
                                            className="font-body text-[10px] tracking-widest uppercase text-[#555] hover:text-text-primary mr-4 focus:outline-none"
                                        >
                                            EDIT
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cycle._id)}
                                            className="font-body text-[10px] tracking-widest uppercase text-[#555] hover:text-danger focus:outline-none"
                                        >
                                            DEL
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredCycles.length > 50 && (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center font-mono text-[9px] text-[#444]">
                                        [ {filteredCycles.length - 50} RECORDS OVERFLOW — REFINE SEARCH TO ACCESS ]
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            {isAddOpen && <AddCycleForm onSubmit={handleAddSubmit} onClose={() => setIsAddOpen(false)} />}
            {editingCycle && <EditCycleForm rowId={editingCycle._id} initialData={editingCycle} onSubmit={handleEditSubmit} onClose={() => setEditingCycle(null)} />}
            {isBulkOpen && <BulkImport onClose={() => setIsBulkOpen(false)} />}

        </motion.div>
    );
}
