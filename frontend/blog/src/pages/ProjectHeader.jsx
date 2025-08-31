// rfce
import React from 'react';

// pictures
import TrFlag from '../../assets/images/flag/tr.png';
import EnFlag from '../../assets/images/flag/en.png';

function ProjectHeader() {
  return (
    <React.Fragment>
      <>
        {/* backtotop */}
        <span id="back_top_span" />
        {/* start code */}
        {/* for animation */}
        {/* 
    wow 
    animate__animated 

    animate__fadeInDown 
    animate__bounceIn
    animate__fadeInUp
    animate__zoomIn
    animate__fadeInLeft
    animate__fadeInRight
    animate__fadeInUp
    animate__fadeIn 
    */}
        {/* NAVBAR FIRST */}
        {/* nav#navbar_first>div.container>div.row>div#navbar_first_left.col-8+#navbar_first_right.col-4.mx-auto */}
        <nav
          id="navbar_first"
          className="navbar navbar-expand wow44 animate__animated animate__fadeInDown"
          data-wow-delay="0.2s"
        >
          <div className="container">
            {/* container-fluid yerine container */}
            <div className="d-flex justify-content-between w-100">
              {/* Sol taraf */}
              <ul className="nav">
                <li className="nav-item me-3">
                  <a
                    href="#"
                    className="nav-link text-white small"
                    data-bs-toggle="modal"
                    data-bs-target="#registerId"
                  >
                    <i className="fa-solid fa-address-card text-danger me-1" />
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    className="nav-link text-white small"
                    data-bs-toggle="modal"
                    data-bs-target="#loginId"
                  >
                    <i className="fa-solid fa-user-secret text-primary me-1" />
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white small">
                    <span>
                      <img className="flag" src={TrFlag} />
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white small">
                    <span>
                      <img className="flag" src={EnFlag} />
                    </span>
                  </a>
                </li>
                {/* Admin Panel */}
                <li className="nav-item">
                  <a
                    id="adminLink"
                    className="nav-link"
                    href="admin/admin.html"
                    style={{ display: 'none' }}
                  >
                    <i className="fa fa-user-shield" />
                    Admin Paneli
                  </a>
                </li>
                {/* Admin Panel */}
                <li className="nav-item">
                  <a id="logoutLink" className="nav-link" href="#" style={{ display: 'none' }}>
                    <i className="fa fa-sign-out-alt" />
                    Çıkış
                  </a>
                </li>
              </ul>
              {/* Sağ taraf */}
              <ul className="nav">
                <li className="nav-item">
                  <a href="#" className="nav-link text-white">
                    <i className="fa-brands fa-linkedin" />
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white">
                    <i className="fa-brands fa-github" />
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white">
                    <i className="fa-brands fa-facebook" />
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white">
                    <i className="fa-brands fa-instagram text-warning" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* END NAVBAR FIRST */}
        {/* REGİSTER */}
        {/* if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard */}
        <div
          className="modal fade"
          id="registerId"
          tabIndex={-1}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="registerModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="registerModalLabel">
                  Kayıt Ol
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              {/* Modal Body */}
              <div className="modal-body">
                <form id="registerForm" noValidate="">
                  <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      placeholder="Adınızı ve soyadınızı girin"
                    />
                    {/* Hata mesajı burada görünecek */}
                    <div className="invalid-feedback" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="ornek@mail.com"
                    />
                    <div className="invalid-feedback" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Şifre
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Şifrenizi girin"
                    />
                    <div className="invalid-feedback" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Şifre Tekrar
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Şifrenizi tekrar girin"
                    />
                    <div className="invalid-feedback" />
                  </div>
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" id="terms" />
                    <label className="form-check-label" htmlFor="terms">
                      Kullanım koşullarını kabul ediyorum
                    </label>
                    <div className="invalid-feedback" />
                  </div>
                </form>
              </div>
              {/* Modal Footer */}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Kapat
                </button>
                <button type="submit" form="registerForm" className="btn btn-primary">
                  Kayıt Ol
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* LOGIN Trigger Modal */}
        <div
          className="modal fade"
          id="loginId"
          tabIndex={-1}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="loginModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="loginModalLabel">
                  Giriş Yap
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              {/* Modal Body */}
              {/* Modal Body */}
              <div className="modal-body">
                <form id="loginForm" noValidate="">
                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="loginEmail"
                      placeholder="ornek@mail.com"
                      required=""
                    />
                    <div className="invalid-feedback" />
                  </div>
                  {/* Şifre */}
                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">
                      Şifre
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      placeholder="Şifrenizi girin"
                      required=""
                    />
                    <div className="invalid-feedback" />
                  </div>
                  {/* Beni Hatırla */}
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Beni hatırla
                    </label>
                  </div>
                </form>
              </div>
              {/* Modal Footer */}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Kapat
                </button>
                <button type="submit" form="loginForm" className="btn btn-primary">
                  Giriş Yap
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* end navbar First */}
        {/* NAVBAR SECOND */}
        <nav
          id="navbar_second"
          className="navbar navbar-expand-md navbar-dark wow44 animate__animated animate__fadeInDown"
          data-wow-delay="0.4s"
        >
          <div className="container">
            {/* Logo */}
            <a className="navbar-brand" href="/frontend/blog/public">
              <img id="logo_id" src={TrFlag} alt="Logo" />
            </a>
            {/* Hamburger Menü */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarMenu"
              aria-controls="navbarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            {/* Menü */}
            <div className="collapse navbar-collapse" id="navbarMenu">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link active" href="/frontend/blog/public">
                    <i className="fa-solid fa-house" />
                    Anasayfa
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#scroll_spy_works">
                    <i className="fa-solid fa-briefcase" />
                    Çalışmalar
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#scroll_spy_success_rate">
                    <i className="fa-solid fa-chart-column" />
                    Başarılar
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#scroll_spy_newspaper">
                    <i className="fa-solid fa-newspaper" />
                    Haberler
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#scroll_spy_about">
                    <i className="fa-solid fa-bullhorn" />
                    Hakkımızda
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#scroll_spy_blog"
                    id="dropdownId"
                    data-bs-toggle="dropdown"
                  >
                    <i className="fa-solid fa-blog" />
                    Blog
                  </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#scroll_spy_blog">
                      Yazılım
                    </a>
                    <a className="dropdown-item" href="#scroll_spy_blog">
                      Sağlık
                    </a>
                    <a className="dropdown-item" href="#scroll_spy_blog">
                      Yaşam
                    </a>
                    <a className="dropdown-item" href="#scroll_spy_blog">
                      Spor
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#maps">
                    <i className="fa-solid fa-map-location-dot" />
                    İletişim
                  </a>
                </li>
              </ul>
              {/* Sağ taraf: Dark Mode + Arama */}
              <div className="nav-actions">
                {/* Dark Mode Butonu */}
                <button id="dark_mode" className="dark-mode-btn">
                  <i className="fa-solid fa-moon" />
                </button>
                {/* Arama kutusu */}
                <form className="search-form">
                  <div className="search-container">
                    <input
                      id="search_id"
                      type="text"
                      className="form-control"
                      placeholder="Site içi ara..."
                    />
                    <button className="search-button" type="submit">
                      Ara
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </nav>
        {/* END NAVBAR SECOND */}
        {/* 
    wow 
    animate__animated 
    
    animate__fadeInDown 
    animate__bounceIn
    animate__fadeInUp
    animate__zoomIn
    animate__fadeInLeft
    animate__fadeInRight
    animate__fadeInUp
    animate__fadeIn

     data-wow-delay="1s"
    */}
        {/* start Header */}
        {/* header#header_id>div.jumbotron>div.container>div.row>div.p-5.text-center>h1.text-uppercase{Full Stack Developer Eğitimine Hoşgeldiniz}+h4.text-center{Frontend & Backend & DB & Devops}+a.btn.btn-primary{Linkedin}+a.btn.btn-danger{Youtube} */}
        {/* HEADER */}
        <header id="header_id">
          <div className="header-overlay img-glare" />
          {/* Karartma efekti */}
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-12 text-center my-auto">
                <h1
                  className="display-3 text-uppercase shadow wow animate__zoomIn"
                  data-wow-delay="0.6s"
                >
                  Full Stack Developer Eğitimine Hoşgeldiniz
                </h1>
                <h4 className="wow animate__zoomIn" data-wow-delay="0.8s">
                  Frontend &amp; Backend &amp; DB &amp; Devops
                </h4>
                {/* Sosyal ve link butonları */}
                <div className="header-links mt-4">
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    className="header-link wow animate__fadeInUp"
                    data-wow-delay="0.9s"
                  >
                    <i className="fa-brands fa-linkedin" />
                    <span />
                  </a>
                  <a
                    href="https://www.youtube.com"
                    target="_blank"
                    className="header-link wow animate__fadeInUp"
                    data-wow-delay="1s"
                  >
                    <i className="fa-brands fa-youtube" />
                    <span />
                  </a>
                  <a
                    href="#blog"
                    className="header-link wow animate__fadeInUp"
                    data-wow-delay="1.1s"
                  >
                    <i className="fa-solid fa-blog" />
                    <span />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    className="header-link wow animate__fadeInUp"
                    data-wow-delay="1.2s"
                  >
                    <i className="fa-brands fa-github" />
                    <span />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* end Header */}
        {/* 
    wow 
    animate__animated 
    
    animate__fadeInDown 
    animate__bounceIn
    animate__fadeInUp
    animate__zoomIn
    animate__fadeInLeft
    animate__fadeInRight
    animate__fadeInUp
    animate__fadeIn

     data-wow-delay="1s"
    */}
        {/* Social medya right*/}
        {/* Sosyal Medya Sabit Bar */}
        <div className="social-bar-fixed text-primary">
          <a
            href="https://linkedin.com/"
            target="_blank"
            className="social-link linkedin"
            title="LinkedIn"
          >
            <i className="fab fa-linkedin-in" />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            className="social-link github"
            title="GitHub"
          >
            <i className="fab fa-github" />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            className="social-link instagram"
            title="Instagram"
          >
            <i className="fab fa-instagram" />
          </a>
          <a
            href="mailto:info@aihexa.com"
            target="_blank"
            className="social-link mail"
            title="Mail"
          >
            <i className="fa fa-envelope" />
          </a>
        </div>
      </>
    </React.Fragment>
  );
}

export default ProjectHeader;
