import axios from 'axios';

// Ensure baseURL always points to the API root (ends with /api)
const rawBase = (import.meta as any)?.env?.VITE_API_BASE || window.location.origin || 'http://localhost:5000';
const normalizedBase = String(rawBase).replace(/\/+$/, ''); // trim trailing slashes
const baseURL = normalizedBase.endsWith('/api') ? normalizedBase : `${normalizedBase}/api`;

const api = axios.create({
  baseURL,
});

if (import.meta && (import.meta as any).env) {
  console.log('API Base URL:', baseURL);
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
