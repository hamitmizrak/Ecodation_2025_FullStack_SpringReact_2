// src/routes/AdminRoute.jsx
import React from 'react';
import ProtectedRoute from './ProtectedRoute';

export default function AdminRoute() {
  return <ProtectedRoute roles={['ADMIN']} />;
}
