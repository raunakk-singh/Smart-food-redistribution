import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data)
}

export const donationAPI = {
  create: (data) => api.post('/donations', data),
  nearby: (params) => api.get('/donations/nearby', { params })
}

export const volunteerAPI = {
  tasks: (params) => api.get('/volunteer/tasks', { params }),
  accept: (id) => api.post(`/volunteer/tasks/${id}/accept`),
  pickup: (id) => api.post(`/volunteer/deliveries/${id}/pickup`),
  deliver: (id) => api.post(`/volunteer/deliveries/${id}/deliver`),
  history: () => api.get('/volunteer/history'),
  stats: () => api.get('/volunteer/stats')
}

export default api

