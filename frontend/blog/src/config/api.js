// src/config/api.js

/* eslint-disable no-undef */
// Vite varsa: import.meta.env.*  |  CRA/Webpack varsa: process.env.REACT_APP_*
const VITE_ENV = import.meta?.env ?? {};

export const API_BASE =
  VITE_ENV.VITE_API_BASE || process.env.REACT_APP_API_BASE || 'http://localhost:4444';

export const IMAGE_BASE = VITE_ENV.VITE_IMAGE_BASE || process.env.REACT_APP_IMAGE_BASE || API_BASE;

export const ENDPOINTS = {
  LOGIN: '/auth/api/v1.0.0/login',
  REGISTER_CREATE: (rolesId = 1) => `/register/api/v1.0.0/create/${rolesId}`,
  ME: '/auth/api/v1.0.0/me',
  BLOG_CATEGORIES: '/blog/api/v1.0.0/categories',
};
