// src/config/api.js
export const API_BASE =
  import.meta?.env?.VITE_API_BASE || process.env.REACT_APP_API_BASE || 'http://localhost:4444';

export const IMAGE_BASE =
  import.meta?.env?.VITE_IMAGE_BASE || process.env.REACT_APP_IMAGE_BASE || API_BASE;

export const ENDPOINTS = {
  LOGIN: '/auth/api/v1.0.0/login',
  REGISTER_CREATE: (rolesId = 1) => `/register/api/v1.0.0/create/${rolesId}`,
  ME: '/auth/api/v1.0.0/me',

  // Roles (opsiyonel — backend’inizde varsa)
  ROLES: {
    LIST: '/roles/api/v1.0.0', // ÖRNEK: kendi controller path’inizle değiştirin
  },

  BLOG_CATEGORY: {
    LIST: '/blog/category/api/v1.0.0',
    CREATE: '/blog/category/api/v1.0.0',
    UPDATE: (id) => `/blog/category/api/v1.0.0/${id}`,
    DELETE: (id) => `/blog/category/api/v1.0.0/${id}`,
  },
  BLOG: {
    LIST: '/blog/api/v1.0.0',
    CREATE: '/blog/api/v1.0.0',
    UPDATE: (id) => `/blog/api/v1.0.0/${id}`,
    DELETE: (id) => `/blog/api/v1.0.0/${id}`,
  },
};
