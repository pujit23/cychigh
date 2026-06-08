import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: add JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('cychigh_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: handle 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('cychigh_token');
            if (window.location.pathname !== '/admin/login') {
                window.location.href = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);

// Cycle Endpoints
export const getAllCycles = (params) => api.get('/cycles', { params });
export const getCycleById = (id) => api.get(`/cycles/${id}`);
export const getCyclesByBrand = (brand) => api.get(`/cycles/brand/${brand}`);
export const getCyclesByCategory = (category) => api.get(`/cycles/category/${category}`);
export const searchCycles = (query) => api.get(`/cycles/search?q=${query}`);
export const compareCycles = (id1, id2) => api.get(`/cycles/compare?ids=${id1},${id2}`);

// Admin Cycle Endpoints
export const addCycle = (data) => api.post('/cycles', data);
export const updateCycle = (id, data) => api.put(`/cycles/${id}`, data);
export const deleteCycle = (id) => api.delete(`/cycles/${id}`);
export const bulkImport = (fileContent) => api.post('/cycles/bulk-import', fileContent);

// Auth Endpoints
export const loginAdmin = (credentials) => api.post('/auth/login', credentials);
export const logoutAdmin = () => api.post('/auth/logout');

export default api;
