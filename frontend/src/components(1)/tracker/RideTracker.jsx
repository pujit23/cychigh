import React, { useState } from 'react';
import { useTracker } from '../../hooks/useTracker';
import { Activity, Clock, Map, Gauge } from 'lucide-react';
import toast from 'react-hot-toast';

const RideTracker = () => {
    const { logRide } = useTracker();
    const [formData, setFormData] = useState({
        distance: '',
        durationHours: '0',
        durationMinutes: '0',
        elevation: '',
        avgSpeed: '',
        notes: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.distance) {
            toast.error("Distance is required");
            return;
        }

        const totalMinutes = (parseInt(formData.durationHours || 0) * 60) + parseInt(formData.durationMinutes || 0);
        
        if (totalMinutes === 0) {
            toast.error("Duration cannot be zero");
            return;
        }

        setIsSubmitting(true);
        const success = await logRide({
            distance: Number(formData.distance),
            duration: totalMinutes,
            elevation: formData.elevation ? Number(formData.elevation) : 0,
            avgSpeed: formData.avgSpeed ? Number(formData.avgSpeed) : 0,
            notes: formData.notes
        });

        if (success) {
            setFormData({ distance: '', durationHours: '0', durationMinutes: '0', elevation: '', avgSpeed: '', notes: '' });
        }
        setIsSubmitting(false);
    };

    return (
        <div className="glass-panel p-6 rounded-2xl h-full border border-white/10 hover:border-brand-gold/30 transition-colors">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-brand-gold/10 rounded-lg">
                    <Activity size={24} className="text-brand-gold" />
                </div>
                <h3 className="heading-md m-0">Log a Ride</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="text-brand-muted text-xs font-dmono uppercase flex items-center gap-2 mb-2">
                            <Map size={14} className="text-brand-gold" /> Distance (km) *
                        </label>
                        <input 
                            type="number" step="0.1" required
                            value={formData.distance} onChange={(e) => setFormData({...formData, distance: e.target.value})}
                            className="input-field font-bebas text-xl h-12" placeholder="0.0"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="text-brand-muted text-xs font-dmono uppercase flex items-center gap-2 mb-2">
                            <Clock size={14} className="text-brand-gold" /> Hours
                        </label>
                        <input 
                            type="number" min="0" max="24"
                            value={formData.durationHours} onChange={(e) => setFormData({...formData, durationHours: e.target.value})}
                            className="input-field font-bebas text-xl h-12" placeholder="0"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-brand-muted text-xs font-dmono uppercase mb-2 block">
                            Minutes
                        </label>
                        <input 
                            type="number" min="0" max="59"
                            value={formData.durationMinutes} onChange={(e) => setFormData({...formData, durationMinutes: e.target.value})}
                            className="input-field font-bebas text-xl h-12" placeholder="0"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="text-brand-muted text-xs font-dmono uppercase flex items-center gap-2 mb-2">
                            <Activity size={14} className="text-white" /> Elevation (m)
                        </label>
                        <input 
                            type="number" 
                            value={formData.elevation} onChange={(e) => setFormData({...formData, elevation: e.target.value})}
                            className="input-field font-bebas text-xl h-12" placeholder="0"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-brand-muted text-xs font-dmono uppercase flex items-center gap-2 mb-2">
                            <Gauge size={14} className="text-brand-red" /> Avg Speed
                        </label>
                        <input 
                            type="number" step="0.1"
                            value={formData.avgSpeed} onChange={(e) => setFormData({...formData, avgSpeed: e.target.value})}
                            className="input-field font-bebas text-xl h-12" placeholder="km/h"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-brand-muted text-xs font-dmono uppercase mb-2 block">Ride Notes (Optional)</label>
                    <textarea 
                        rows="3" 
                        value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        className="input-field resize-y font-dsans text-sm" placeholder="How was the ride? Route info?"
                    ></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-gold w-full py-4 mt-2">
                    {isSubmitting ? 'Logging...' : 'Save Ride'}
                </button>
            </form>
        </div>
    );
};

export default RideTracker;
