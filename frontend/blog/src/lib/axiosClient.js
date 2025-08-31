// src/api/axiosClient.js
import axios from 'axios';
import { API_BASE } from '../config/api';

export const axiosClient = axios.create({
  baseURL: API_BASE,
});

export function setAccessToken(token) {
  if (!token) return clearAccessToken();
  axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
}
export function clearAccessToken() {
  delete axiosClient.defaults.headers.common.Authorization;
}

// Token yoksa localStorage’dakini request’e ekle (fallback)
axiosClient.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    const t = localStorage.getItem('token');
    if (t) config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});
