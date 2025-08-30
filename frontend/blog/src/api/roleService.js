// src/api/roleService.js
import { axiosClient } from './axiosClient';
import { ENDPOINTS } from '../config/api';

// Roller listesi: [{id: 1, name: 'USER'}, ...] gibi bir şey beklenir.
// Backend’inizin döndürdüğü şemaya göre map’leyebilirsiniz.
export function listRoles(params = {}) {
  if (!ENDPOINTS?.ROLES?.LIST) {
    // endpoint tanımlı değilse promise rejection yerine boş dizi dönelim
    return Promise.resolve({ data: [] });
  }
  return axiosClient.get(ENDPOINTS.ROLES.LIST, { params });
}
