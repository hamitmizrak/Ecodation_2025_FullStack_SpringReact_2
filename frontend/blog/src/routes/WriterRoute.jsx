// src/routes/WriterRoute.jsx
import React from 'react';
import ProtectedRoute from './ProtectedRoute';

// Sadece WRITER (istersen ADMIN de ekleyebilirsin: roles={['WRITER','ADMIN']})
export default function WriterRoute() {
  // return <ProtectedRoute roles={['WRITER']} />;
  return <ProtectedRoute roles={['WRITER','ADMIN']} />;
}
