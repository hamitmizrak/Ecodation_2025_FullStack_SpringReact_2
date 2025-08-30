// src/ProjectRouter.jsx
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';

import ProjectHeader from './components/ProjectHeader';
import ProjectMain from './components/ProjectMain';
import ProjectFooter from './components/ProjectFooter';

import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';

import Forbidden403 from './pages/Forbidden403';

// Admin sayfaları
import BlogCategory from './admin/BlogCategory';
import AdminLayout from './admin/AdminLayout';
import AdminHome from './admin/AdminHome';
import WriterRoute from './routes/WriterRoute';
import BlogApi from './writer/BlogApi';

/** Public layout: Header + Footer sadece public rotalarda */
function PublicLayout() {
  return (
    <>
      <ProjectHeader logo="fa-solid fa-blog" />
      <div className="container">
        <Outlet />
      </div>
      <ProjectFooter copy="&copy; Bütün Haklar Saklıdır." />
    </>
  );
}

function ProjectRouter() {
  return (
    <Routes>
      {/* PUBLIC: Header/Footer görünsün */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<ProjectMain />} />
        <Route path="/index" element={<ProjectMain />} />
        <Route path="/403" element={<Forbidden403 />} />

        {/* (İsteğe bağlı) sadece login gerektiren public alanlar */}
        <Route element={<ProtectedRoute />}>
          {/* örn: <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>

        {/* Catch-all -> anasayfa */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* PUBLIC layout içinde kalacaksa (Header/Footer ile) */}
      <Route element={<PublicLayout />}>
        {/* ...diğer public rotalar */}+{' '}
        <Route element={<WriterRoute />}>
          + <Route path="/writer/blog-api" element={<BlogApi />} />+{' '}
        </Route>
      </Route>

      {/* ADMIN: Kendi layout’unu (AdminLayout) kullansın, public header/footer YOK */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          {/* <Route index element={<Navigate to="blog-category" replace />} /> */}
          <Route index element={<AdminHome />} />
          <Route path="blog-category" element={<BlogCategory />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default withTranslation()(ProjectRouter);
