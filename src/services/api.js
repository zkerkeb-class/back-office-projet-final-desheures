/* eslint-disable comma-dangle */
import axios from 'axios';
import { authService } from './auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const artistsApi = {
  getAll: () => api.get('/artist'),
  getById: (id) => api.get(`/artist/${id}`),
  create: (data) => api.post('/artist', data),
  update: (id, data) => api.put(`/artist/${id}`, data),
  delete: (id) => api.delete(`/artist/${id}`),
};

export const albumsApi = {
  getAll: () => api.get('/album'),
  getById: (id) => api.get(`/album/${id}`),
  create: (data) => api.post('/album', data),
  update: (id, data) => api.put(`/album/${id}`, data),
  delete: (id) => api.delete(`/album/${id}`),
};

export const audioApi = {
  getAll: () => api.get('/audio'),
  getById: (id) => api.get(`/audio/${id}`),
  create: (data) => api.post('/audio', data),
  update: (id, data) => api.put(`/audio/${id}`, data),
  delete: (id) => api.delete(`/audio/${id}`),
};

export default api;
