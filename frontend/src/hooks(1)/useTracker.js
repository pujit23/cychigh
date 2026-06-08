import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const useTracker = () => {
    const { user } = useAuth();
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRides = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('/api/rides', config);
            setRides(data);
        } catch (error) {
            toast.error('Failed to fetch rides');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRides();
    }, [user]);

    const logRide = async (rideData) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('/api/rides', rideData, config);
            toast.success('Ride logged successfully');
            fetchRides();
            return true;
        } catch (error) {
            toast.error('Failed to log ride');
            return false;
        }
    };

    const deleteRide = async (id) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`/api/rides/${id}`, config);
            toast.success('Ride deleted');
            fetchRides();
        } catch (error) {
            toast.error('Failed to delete ride');
        }
    }

    return { rides, loading, logRide, deleteRide, refresh: fetchRides };
};

export default useTracker;
