// src/api/blogCategoryService.js
import { axiosClient } from './axiosClient';
import { ENDPOINTS } from '../config/api';

// Eğer config’te BLOG_CATEGORIES yoksa şu fallback kullanılır:
const BASE = ENDPOINTS?.BLOG_CATEGORIES || '/blog/api/v1.0.0/categories';

// GET /categories?page=&size=&q=
export function fetchCategories({ page = 0, size = 10, q = '' } = {}) {
  return axiosClient.get(BASE, { params: { page, size, q } });
}

// POST /categories
export function createCategory(payload) {
  return axiosClient.post(BASE, payload);
}

// PUT /categories/{id}
export function updateCategory(id, payload) {
  return axiosClient.put(`${BASE}/${id}`, payload);
}

// DELETE /categories/{id}
export function deleteCategory(id) {
  return axiosClient.delete(`${BASE}/${id}`);
}
