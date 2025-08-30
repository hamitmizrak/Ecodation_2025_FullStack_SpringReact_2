// src/api/authService.js
import { axiosClient } from './axiosClient';
import { ENDPOINTS } from '../config/api';

export async function loginApi(email, password) {
  // backend’ine göre alan isimleri farklıysa burada eşleştir
  return axiosClient.post(ENDPOINTS.LOGIN, { email, password });
}

export function fetchMe() {
  return axiosClient.get(ENDPOINTS.ME);
}
