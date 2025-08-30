// src/routes/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initFromStorage, selectAuth } from '../features/auth/authSlice';

export default function ProtectedRoute({ roles }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, roles: myRoles, loading, token } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(initFromStorage());
  }, [dispatch]);

  const tokenInStorage = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // Init sürerken token varsa bekle
  if (loading && (token || tokenInStorage)) {
    return <div className="container py-5">Yükleniyor...</div>;
  }

  // Projede ayrı /login sayfası yok; login modal kullanılıyor => anasayfaya dön
  if (!isAuthenticated && !tokenInStorage) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Rol kontrolü (normalize: ROLE_ prefix'i at, büyük harf)
  if (roles && roles.length) {
    const norm = (arr) =>
      (arr || []).map((r) => String(r).toUpperCase().trim()).map((r) => r.replace(/^ROLE_/, ''));
    const have = norm(myRoles);
    const need = norm(roles);
    const ok = have.some((r) => need.includes(r));
    if (!ok) return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
