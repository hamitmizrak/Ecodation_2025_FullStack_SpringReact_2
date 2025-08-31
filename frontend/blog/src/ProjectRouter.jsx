// rfce  ==> TAB
// REACT
import React from 'react';

// I18N
import { withTranslation } from 'react-i18next';

// HEADER,MAIN,FOOTER

// ROUTER
import { Navigate, Route, Routes } from 'react-router-dom';
import ProjectHeader from './components/ProjectHeader';
import ProjectMain from './components/ProjectMain';
import ProjectFooter from './components/ProjectFooter';

// CLASS COMPONENT BlogRouter
function ProjectRouter() {
  // RETURN
  return (
    <React.Fragment>
      {/* Blog Header */}
      <ProjectHeader logo="fa-solid fa-blog"></ProjectHeader>

      {/* Blog Main */}
      {/* Dark Mode için: App-header yazmalısınız*/}
      <div class="container">
        <Routes>
          {/* Root Path */}
          <Route path={'/'} element={<ProjectMain />} />
          <Route path={'/index'} element={<ProjectMain />} />

          {/* Blog Categories */}
          {/* <Route path={'/blog/list'} element={<BlogList />} />
          <Route path={'/blog/create'} element={<BlogCreate />} />
          <Route path={'/blog/view/:id'} element={<BlogView />} />
          <Route path={'/blog/update/:id'} element={<BlogUpdate />} /> */}

          {/* Blog Categories */}
          {/* <Route path={'/blog/category/list'} element={<BlogCategoryList />} />
          <Route path={'/blog/category/create'} element={<BlogCategoryCreate />} />
          <Route path={'/blog/category/view/:id'} element={<BlogCategoryView />} />
          <Route path={'/blog/category/update/:id'} element={<BlogCategoryUpdate />} /> */}

          {/* Blog */}
          {/* Register */}
          {/* Login */}
          {/* Email */}
          {/* Rol */}

          {/* Bad Request */}
          {/* <Route path={"*"} element={<h1>404</h1>} /> */}
          <Route path={'*'} element={<Navigate to={'/'} />} />
          {/* 
                            <Route path="/blog/:slug" element={<BlogDetail />} />
                            <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>

      <ProjectFooter copy="&copy; Bütün Haklar Saklıdır."></ProjectFooter>
    </React.Fragment>
  ); //end Return
} //end BlogRouter

// I18N => EXPORT
// export default withTranslation()(BlogRouter);
export default withTranslation()(ProjectRouter);
