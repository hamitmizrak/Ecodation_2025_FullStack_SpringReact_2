// src/Router.jsx

// REACT
import React from 'react';

// I18N
import { withTranslation } from 'react-i18next';

// ROUTER
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';

// HEADER MAIN FOOTER
import ProjectHeader from '../pages/ProjectHeader';
import ProjectFooter from '../pages/ProjectFooter';
import ProjectMain from '../pages/ProjectMain';

// AUTH
import Forbidden403 from '../pages/Forbidden403';

// ROUTERS
import ProtectedRoute from '../routes/ProtectedRoute';
import WriterRoute from '../routes/WriterRoute';

// Admin sayfaları

import AdminRoute from '../routes/AdminRoute';
import AdminLayout from '../areas/admin/AdminLayout';
import AdminHome from '../areas/admin/AdminHome';
import BlogApi from '../areas/writer/BlogApi';
import BlogCategory from '../areas/admin/BlogCategory';

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

// FUNCTION COMPONENT
function Router() {
  return (
    <Routes>
      {/* PUBLIC: Header/Footer görünsün */}
      <Route element={<PublicLayout />}>
        {/*Anasayfa*/}
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
          <Route path="/writer/blog-api" element={<BlogApi />} />+{' '}
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

// I18N => EXPORT
// export default
export default withTranslation()(Router);
