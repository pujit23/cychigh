import axios from 'axios'
import { supabase } from '../supabase/config'

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
})

API.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }
  return config
})

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await supabase.auth.signOut()
      window.location.href = '/auth'
    }
    return Promise.reject(error)
  }
)

// CYCLES
export const getCycles = (params) =>
  API.get('/cycles', { params })
export const getCycleById = (id) =>
  API.get(`/cycles/${id}`)
export const searchCycles = (q) =>
  API.get('/cycles/search', { params: { q } })
export const compareCycles = (ids) =>
  API.get('/cycles/compare', { params: { ids: ids.join(',') } })
export const addCycle = (data) =>
  API.post('/cycles', data)
export const updateCycle = (id, data) =>
  API.put(`/cycles/${id}`, data)
export const deleteCycle = (id) =>
  API.delete(`/cycles/${id}`)
export const bulkImport = (data) =>
  API.post('/cycles/bulk-import', data)

// USERS
export const getUserById = (id) =>
  API.get(`/users/${id}`)
export const saveCycle = (userId, cycleId) =>
  API.post(`/users/${userId}/save/${cycleId}`)

// POSTS
export const getPosts = (params) =>
  API.get('/posts', { params })
export const createPost = (data) =>
  API.post('/posts', data)
export const upvotePost = (id) =>
  API.post(`/posts/${id}/upvote`)
export const getComments = (id) =>
  API.get(`/posts/${id}/comments`)
export const addComment = (id, data) =>
  API.post(`/posts/${id}/comments`, data)

// RIDES
export const getRides = () =>
  API.get('/rides')
export const addRide = (data) =>
  API.post('/rides', data)
export const deleteRide = (id) =>
  API.delete(`/rides/${id}`)

// BUILDS
export const getBuilds = () =>
  API.get('/builds')
export const createBuild = (data) =>
  API.post('/builds', data)
export const deleteBuild = (id) =>
  API.delete(`/builds/${id}`)

// ALERTS
export const getAlerts = () =>
  API.get('/alerts')
export const deleteAlert = (id) =>
  API.delete(`/alerts/${id}`)

// ADMIN
export const getAdminStats = () =>
  API.get('/admin/stats')
export const getAllUsers = () =>
  API.get('/admin/users')
export const banUser = (id) =>
  API.put(`/admin/users/${id}/ban`)

export default API
