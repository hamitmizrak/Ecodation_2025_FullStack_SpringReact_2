// rfce

import React from 'react';

// pictures
import Main1 from '../assets/images/main1.jpg';
import Main2 from '../assets/images/main2.jpg';
import Main3 from '../assets/images/main3.jpg';
import Main4 from '../assets/images/main4.jpg';
import Main5 from '../assets/images/main5.jpg';
import Main6 from '../assets/images/main6.jpg';
import About from '../assets/images/about.jpg';

function ProjectMain() {
  return (
    <React.Fragment>
      <>
        {/* start  Main */}
        <main id="main_id">
          {/* Çalışmalar: Bootstrap özellikler */}
          <section
            id="scroll_spy_works"
            className="wow animate__animated animate__zoomIn"
            data-wow-delay="1.2s"
          >
            <div className="container">
              <div className="row justify-content-center g-4">
                <h3
                  className="customize_heading wow animate__animated animate__zoomIn"
                  data-wow-delay="1s"
                >
                  Çalışmalarımız
                </h3>
                {/* 1.icon */}
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 text-center mt-4 mb-4 shadow-lg p-4">
                  <i className="fa-solid fa-cart-shopping fa-4x text-primary" />
                  <h4 className="text-warning text-uppercase fw-bolder mt-4 mb-2">E-Ticaret</h4>
                  <p className="line-clamp4 text-capitalize">
                    E-Ticaret Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum at,
                    fugit aliquam in similique quas, numquam odio et optio repudiandae quo dolore.
                    Eos, temporibus esse error atque animi ad unde! ti ratione magni eos beatae
                    cumque ut neque tenetur fugit iusto maiores. Labore, enim eaque!
                  </p>
                </div>
                {/* 2.icon */}
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 text-center mt-4 mb-4 shadow-lg p-4">
                  <i className="fa-solid fa-barcode fa-4x text-danger" />
                  <h4 className="text-warning text-uppercase fw-bolder mt-4 mb-2">Yazılım</h4>
                  <p className="line-clamp4 text-capitalize">
                    E-Ticaret Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum at,
                    fugit aliquam in similique quas, numquam odio et optio repudiandae quo dolore.
                    Eos, temporibus esse error atque animi ad unde! ti ratione magni eos beatae
                    cumque ut neque tenetur fugit iusto maiores. Labore, enim eaque!
                  </p>
                </div>
                {/* 3.icon */}
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 text-center mt-4 mb-4 shadow-lg p-4">
                  <i className="fa-solid fa-gears fa-4x text-success" />
                  <h4 className="text-warning text-uppercase fw-bolder mt-4 mb-2">Danışmanlık</h4>
                  <p className="line-clamp4 text-capitalize">
                    E-Ticaret Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum at,
                    fugit aliquam in similique quas, numquam odio et optio repudiandae quo dolore.
                    Eos, temporibus esse error atque animi ad unde! ti ratione magni eos beatae
                    cumque ut neque tenetur fugit iusto maiores. Labore, enim eaque!
                  </p>
                </div>
                {/* 4.icon */}
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 text-center mt-4 mb-4 shadow-lg p-4">
                  <i className="fa-solid fa-earth-americas fa-4x text-secondary" />
                  <h4 className="text-warning text-uppercase fw-bolder mt-4 mb-2">Web tasarım</h4>
                  <p className="line-clamp4 text-capitalize">
                    E-Ticaret Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum at,
                    fugit aliquam in similique quas, numquam odio et optio repudiandae quo dolore.
                    Eos, temporibus esse error atque animi ad unde! ti ratione magni eos beatae
                    cumque ut neque tenetur fugit iusto maiores. Labore, enim eaque!
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* Başarılar (success_rate) */}
          {/* start section Başarılar */}
          <section
            id="success_rate"
            className="wow44 animate__animated animate__fadeIn"
            data-wow-delay="0.3s"
          >
            <div className="container">
              <div className="row">
                <h3
                  id="scroll_spy_success_rate"
                  className="customize_heading wow animate__animated animate__zoomIn"
                  data-wow-delay="1s"
                >
                  Başarılarımız
                </h3>
                {/* 1 */}
                <div className="col-md-4 col-lg-4 text-center">
                  <i className="fa-solid fa-check performance_icon text-warning fa-3x mb-3" />
                  <span className="counter text-white">250</span>
                  <p className="text-center">Çalışma Saati</p>
                </div>
                {/* 2 */}
                <div className="col-md-4 col-lg-4 text-center">
                  <i className="fa-solid fa-person-chalkboard performance_icon text-warning fa-3x mb-3" />
                  <span className="counter text-white">150</span>
                  <p className="text-center">Ekip Sayısı</p>
                </div>
                {/* 3 */}
                <div className="col-md-4 col-lg-4 text-center">
                  <i className="fa-brands fa-intercom performance_icon text-warning fa-3x mb-3" />
                  <span className="counter text-white">110</span>
                  <p className="text-center">Müşteri Sayısı</p>
                </div>
              </div>
            </div>
          </section>
          {/* Haberler  Start*/}
          <section
            id="scroll_spy_newspaper"
            className="wow animate__animated animate__fadeInLeft"
            data-wow-delay="1.4s"
          >
            <div className="container">
              <div className="row">
                <h3
                  className="customize_heading wow animate__animated animate__zoomIn"
                  data-wow-delay="1s"
                >
                  Yeni Haberler
                </h3>
                <p className="display-6 text-center">En Son Haber</p>
                <p className="line-clamp25">
                  Yeni Haberler Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio
                  similique beatae quis cupiditate voluptates, rerum explicabo! Distinctio amet,
                  nobis, vel eum fugit dolorem, incidunt sit id minus blanditiis odio doloribus.
                  Iusto ex reiciendis aliquam officiis officia voluptate optio harum, consectetur,
                  sint eos quam illum vel porro facilis! Ad quos veritatis eveniet. Quis odio ex
                  amet animi nesciunt quod nam itaque! Quae dolore reiciendis consequatur animi, nam
                  necessitatibus a eveniet beatae sequi deleniti eligendi, ipsum tempore, veritatis
                  blanditiis esse deserunt. Magnam minima sequi ad impedit quae enim necessitatibus
                  rerum magni numquam? Iusto pariatur iste optio impedit voluptatum, nisi, eius
                  maxime odit corporis ipsam, nulla sunt nemo laboriosam autem? Magni iusto corrupti
                  reiciendis explicabo, cum itaque illo vitae nisi? Ut, quos explicabo? Ratione hic
                  dicta consequuntur. Esse doloremque quisquam omnis quis error praesentium ullam
                  sunt, iste, sapiente voluptas laboriosam iure optio eum repellat tenetur nulla ea
                  eius? Placeat voluptatibus delectus consequatur perspiciatis! Repellat velit illum
                  natus ipsum minus, inventore asperiores nulla doloremque enim voluptate odio quis
                  sequi laborum? Debitis provident similique perferendis asperiores voluptatum
                  laudantium? Velit nisi delectus voluptatem tenetur alias voluptates? Obcaecati
                  odit ea placeat maxime. Facilis amet optio possimus est deserunt incidunt
                  voluptatem nobis fugit earum debitis quo ut cum, reprehenderit praesentium neque
                  temporibus delectus! Sunt praesentium distinctio vitae nostrum. Dolores quisquam
                  unde, laborum corrupti fuga expedita architecto optio eaque harum quos quibusdam
                  debitis aspernatur, excepturi, temporibus qui aliquam. Porro natus asperiores
                  officia adipisci iste eos provident culpa ab sed? Ab neque molestias nisi id?
                  Atque, iste nisi! Deserunt fugit eaque odio dicta laudantium natus animi sit
                  voluptatum dolor iure cumque aut consequuntur recusandae praesentium unde, nostrum
                  nisi eos! Ex? Fugiat ratione harum ea praesentium ipsa? Dolor voluptatum id amet
                  delectus! Deleniti atque ex necessitatibus illo accusantium voluptate beatae, eius
                  tempore, magnam consequatur, quos libero nostrum porro similique modi. Eveniet.
                  Aliquam, vel, pariatur quis minima, expedita officiis cumque neque tenetur placeat
                  autem unde dignissimos. Rem repellat in numquam quasi consequuntur fugiat ex sint
                  explicabo quas totam officiis, iure id commodi! Optio, quis incidunt provident
                  modi exercitationem perferendis numquam quia, libero cum quod consectetur
                  voluptatibus, non eligendi ipsa. Modi error perspiciatis adipisci obcaecati
                  tempora. Sint illum laudantium est in, velit aut. Rem molestiae tempore unde, iure
                  officiis accusamus alias voluptate vel! Eum debitis ea praesentium totam eius
                  atque, molestias veritatis vitae aut sequi, adipisci nam fuga? Dolore omnis earum
                  esse nostrum? Deserunt modi pariatur itaque doloribus magnam minus quod tempora
                  architecto, odio velit laboriosam possimus voluptates cupiditate expedita
                  praesentium numquam sunt officia fuga, sed dignissimos dolore porro. Modi ipsum
                  totam a. Architecto iusto voluptatum modi non recusandae praesentium, consequuntur
                  cumque fugiat soluta deleniti? Molestiae beatae officia, minima dolorum expedita
                  magnam reprehenderit fugit, libero impedit qui ipsum quod iusto amet! Provident,
                  commodi. Ipsa expedita neque tempore reprehenderit, laboriosam sapiente quod quis
                  praesentium! Blanditiis, velit odit. Quidem voluptatem error reprehenderit alias
                  magni consequatur labore nostrum dolores omnis aut praesentium vitae maiores, eos
                  vel! Id fugit itaque veniam vel praesentium sint maxime doloribus aspernatur in
                  aperiam, voluptas consectetur delectus harum nisi repellendus nihil totam
                  quibusdam incidunt odio quasi vitae cupiditate voluptatibus explicabo asperiores.
                  Unde! Qui laborum nulla labore, officia sint maiores minus illo tempora alias
                  incidunt amet nihil dolorum vitae tenetur excepturi veniam ad! Animi et doloremque
                  error nulla explicabo harum dicta, fuga consequatur. Laudantium dolores
                  perspiciatis hic voluptatem vero nesciunt, reiciendis sequi accusamus nam ea, quod
                  vel dolor facilis officia non eum corporis suscipit minus cumque numquam. Id non
                  quae porro eos! In! Debitis fugit corporis minima reiciendis, sunt nobis deleniti
                  officia rerum, sit atque nemo laborum beatae asperiores minus illo quas. Laborum
                  aspernatur aut debitis est quae minima animi earum fugit incidunt!
                </p>
              </div>
            </div>
          </section>
          {/* Haberler  End*/}
          {/* Hakkımızda  Start*/}
          {/* Hakkımızda  Start*/}
          <section
            id="scroll_spy_about"
            className="wow animate__animated animate__fadeInRight"
            data-wow-delay="1.6s"
          >
            <div className="about-overlay" />
            {/* Arka plan karartma efekti */}
            <div className="container position-relative">
              <div className="row align-items-center">
                <h3
                  className="customize_heading wow animate__animated animate__zoomIn"
                  data-wow-delay="1s"
                >
                  Hakkımızda
                </h3>
                {/* Sol: Görsel */}
                <div className="col-12 col-lg-6 mb-4 text-center">
                  <img
                    id="about_picture"
                    src={About}
                    alt="Şirketimiz Hakkında"
                    loading="lazy"
                    className="img-glare"
                  />
                  <p className="mt-3 text-light small">
                    Yenilikçi teknoloji çözümleri ile sektörde öncü
                  </p>
                </div>
                {/* Sağ: Yazı */}
                <div className="col-12 col-lg-6">
                  <div className="about-text p-5">
                    <p>
                      Kurumumuz; yazılım, teknoloji ve danışmanlık alanlarında uzman kadrosu ile
                      yenilikçi projeler üretmektedir. Eğitimden danışmanlığa, yazılım geliştirmeden
                      Ar-Ge projelerine kadar geniş bir yelpazede hizmet sunuyoruz.
                    </p>
                    <p>
                      <strong>Misyonumuz:</strong>
                      Dijital dönüşüm süreçlerinde kurumlara uçtan uca çözümler sağlayarak iş
                      süreçlerini hızlandırmak, güvenli ve ölçeklenebilir yazılım projeleri
                      geliştirmek.
                    </p>
                    <p>
                      <strong>Vizyonumuz:</strong>
                      Sürdürülebilir, yenilikçi ve teknoloji odaklı çözümler geliştirerek geleceğe
                      katkı sağlamak. Müşteri odaklı yaklaşımımız ile, yazılım dünyasında sürekli
                      yenilik peşindeyiz.
                    </p>
                    <ul>
                      <li>Özel yazılım geliştirme ve entegrasyon çözümleri</li>
                      <li>Kurumsal eğitim ve danışmanlık hizmetleri</li>
                      <li>Ar-Ge odaklı teknoloji projeleri</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* About End*/}
          {/* About End*/}
          {/* Blog  Start*/}
          {/* start section blog */}
          <h3
            id="scroll_spy_blog"
            className="customize_heading wow animate__animated animate__zoomIn"
            data-wow-delay="1s"
          >
            Blog
          </h3>
          <p className="display-6 text-center">Yeni Blog</p>
          <section id="blog" className="wow fadeIn ">
            <div className="container ">
              <div className="row">
                {/* 1.blog */}
                <div className="col-md-3 img-glare">
                  <div className="card">
                    <a href="#!">
                      <img className="card-img-top" src={Main1} alt="Title" />
                    </a>
                    <div className="card-body">
                      <h4 className="card-title">Blog-1</h4>
                      <p className="card-text line-clamp6">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil facere dicta
                        quae, placeat ducimus aliquam, qui, expedita neque porro temporibus
                        dignissimos quasi magnam aperiam ab libero iste. Non, tenetur temporibus.
                        Animi libero, consectetur nam repellendus distinctio temporibus perferendis
                        sed excepturi a exercitationem doloribus, quod laboriosam dolorem facere
                        iste sequi. Consequatur, tenetur quasi? Magnam rerum itaque repudiandae
                        voluptatem voluptate, sapiente ratione.
                      </p>
                      <span className="blog_date">01/06/2023</span>
                    </div>
                  </div>
                </div>
                {/* 1.blog */}
                <div className="col-md-3 img-glare">
                  <div className="card ">
                    <a href="#!">
                      <img className="card-img-top" src={Main2} alt="Title" />
                    </a>
                    <div className="card-body">
                      <h4 className="card-title">Blog-2</h4>
                      <p className="card-text line-clamp6">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil facere dicta
                        quae, placeat ducimus aliquam, qui, expedita neque porro temporibus
                        dignissimos quasi magnam aperiam ab libero iste. Non, tenetur temporibus.
                        Animi libero, consectetur nam repellendus distinctio temporibus perferendis
                        sed excepturi a exercitationem doloribus, quod laboriosam dolorem facere
                        iste sequi. Consequatur, tenetur quasi? Magnam rerum itaque repudiandae
                        voluptatem voluptate, sapiente ratione.
                      </p>
                      <span className="blog_date">01/06/2023</span>
                    </div>
                  </div>
                </div>
                {/* 1.blog */}
                <div className="col-md-3 img-glare">
                  <div className="card">
                    <a href="#!">
                      <img className="card-img-top" src={Main3} alt="Title" />
                    </a>
                    <div className="card-body">
                      <h4 className="card-title">Blog-3</h4>
                      <p className="card-text line-clamp6">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil facere dicta
                        quae, placeat ducimus aliquam, qui, expedita neque porro temporibus
                        dignissimos quasi magnam aperiam ab libero iste. Non, tenetur temporibus.
                        Animi libero, consectetur nam repellendus distinctio temporibus perferendis
                        sed excepturi a exercitationem doloribus, quod laboriosam dolorem facere
                        iste sequi. Consequatur, tenetur quasi? Magnam rerum itaque repudiandae
                        voluptatem voluptate, sapiente ratione.
                      </p>
                      <span className="blog_date">01/06/2023</span>
                    </div>
                  </div>
                </div>
                {/* 1.blog */}
                <div className="col-md-3 img-glare">
                  <div className="card">
                    <a href="#!">
                      <img className="card-img-top" src={Main4} alt="Title" />
                    </a>
                    <div className="card-body">
                      <h4 className="card-title">Blog-4</h4>
                      <p className="card-text line-clamp6">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil facere dicta
                        quae, placeat ducimus aliquam, qui, expedita neque porro temporibus
                        dignissimos quasi magnam aperiam ab libero iste. Non, tenetur temporibus.
                        Animi libero, consectetur nam repellendus distinctio temporibus perferendis
                        sed excepturi a exercitationem doloribus, quod laboriosam dolorem facere
                        iste sequi. Consequatur, tenetur quasi? Magnam rerum itaque repudiandae
                        voluptatem voluptate, sapiente ratione.
                      </p>
                      <span className="blog_date">01/06/2023</span>
                    </div>
                  </div>
                </div>
                {/* 1.blog */}
                <div className="col-md-3 img-glare">
                  <div className="card">
                    <a href="#!">
                      <img className="card-img-top" src={Main5} alt="Title" />
                    </a>
                    <div className="card-body">
                      <h4 className="card-title">Blog-5</h4>
                      <p className="card-text line-clamp6">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil facere dicta
                        quae, placeat ducimus aliquam, qui, expedita neque porro temporibus
                        dignissimos quasi magnam aperiam ab libero iste. Non, tenetur temporibus.
                        Animi libero, consectetur nam repellendus distinctio temporibus perferendis
                        sed excepturi a exercitationem doloribus, quod laboriosam dolorem facere
                        iste sequi. Consequatur, tenetur quasi? Magnam rerum itaque repudiandae
                        voluptatem voluptate, sapiente ratione.
                      </p>
                      <span className="blog_date">01/06/2023</span>
                    </div>
                  </div>
                </div>
                {/* 1.blog */}
                <div className="col-md-3 img-glare">
                  <div className="card">
                    <a href="#!">
                      <img className="card-img-top" src={Main6} alt="Title" />
                    </a>
                    <div className="card-body">
                      <h4 className="card-title">Blog-6</h4>
                      <p className="card-text line-clamp6">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil facere dicta
                        quae, placeat ducimus aliquam, qui, expedita neque porro temporibus
                        dignissimos quasi magnam aperiam ab libero iste. Non, tenetur temporibus.
                        Animi libero, consectetur nam repellendus distinctio temporibus perferendis
                        sed excepturi a exercitationem doloribus, quod laboriosam dolorem facere
                        iste sequi. Consequatur, tenetur quasi? Magnam rerum itaque repudiandae
                        voluptatem voluptate, sapiente ratione.
                      </p>
                      <span className="blog_date">01/06/2023</span>
                    </div>
                  </div>
                </div>
                {/* 1.blog */}
                <div className="col-md-3 img-glare">
                  <div className="card">
                    <a href="#!">
                      <img className="card-img-top" src={Main1} alt="Title" />
                    </a>
                    <div className="card-body">
                      <h4 className="card-title">Blog-7</h4>
                      <p className="card-text line-clamp6">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil facere dicta
                        quae, placeat ducimus aliquam, qui, expedita neque porro temporibus
                        dignissimos quasi magnam aperiam ab libero iste. Non, tenetur temporibus.
                        Animi libero, consectetur nam repellendus distinctio temporibus perferendis
                        sed excepturi a exercitationem doloribus, quod laboriosam dolorem facere
                        iste sequi. Consequatur, tenetur quasi? Magnam rerum itaque repudiandae
                        voluptatem voluptate, sapiente ratione.
                      </p>
                      <span className="blog_date">01/06/2023</span>
                    </div>
                  </div>
                </div>
                {/* 1.blog */}
                <div className="col-md-3 img-glare">
                  <div className="card">
                    <a href="#!">
                      <img className="card-img-top" src={Main2} alt="Title" />
                    </a>
                    <div className="card-body">
                      <h4 className="card-title">Blog-8</h4>
                      <p className="card-text line-clamp6">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil facere dicta
                        quae, placeat ducimus aliquam, qui, expedita neque porro temporibus
                        dignissimos quasi magnam aperiam ab libero iste. Non, tenetur temporibus.
                        Animi libero, consectetur nam repellendus distinctio temporibus perferendis
                        sed excepturi a exercitationem doloribus, quod laboriosam dolorem facere
                        iste sequi. Consequatur, tenetur quasi? Magnam rerum itaque repudiandae
                        voluptatem voluptate, sapiente ratione.
                      </p>
                      <span className="blog_date">01/06/2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* end section blog */}
          {/* İletişim  Start*/}
          {/* start section maps */}
          <section id="maps" className="wow fadeIn">
            <h3
              id="scroll_spy_blog"
              className="customize_heading wow animate__animated animate__zoomIn"
              data-wow-delay="1s"
            >
              Maps
            </h3>
            {/* https://www.embedmap.net/ */}
            <iframe
              frameBorder={0}
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              id="gmap_canvas"
              src="https://maps.google.com/maps?width=985&height=551&hl=en&q=%20malatya+()&t=&z=12&ie=UTF8&iwloc=B&output=embed"
            />
          </section>
          {/* end section contact */}
        </main>
        {/* end  Main */}
      </>
    </React.Fragment>
  );
}

export default ProjectMain;
