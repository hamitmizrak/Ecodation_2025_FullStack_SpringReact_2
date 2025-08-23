**Bootstrap 5 kullanılarak oluşturulmuş, tamamen duyarlı (responsive), modern ve sade bir blog teması** hazırlayacağım. Bu tema:

### 🎯 Özellikler:

* Üst menü (navbar)
* Ana sayfada blog kartları (blog listesi)
* Yan menü (sidebar)
* Sayfa düzeni: grid/flex yapısı
* Duyarlı (mobil/tablet/masaüstü uyumlu)
* Bootstrap 5 bileşenleriyle yazılmış
* Ek JavaScript gerekmeden çalışır

---

## ✅ **1. Blog Teması Tam HTML Kodu (Bootstrap 5 ile)**

Aşağıdaki kodu tek bir `index.html` dosyası olarak çalıştırabilirsin:

```html
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Blog Teması - Bootstrap 5</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background-color: #f8f9fa;
    }
    .blog-card {
      transition: all 0.3s ease;
    }
    .blog-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
  <div class="container">
    <a class="navbar-brand" href="#">MyBlog</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarMenu">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link active" href="#">Anasayfa</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Hakkımızda</a></li>
        <li class="nav-item"><a class="nav-link" href="#">İletişim</a></li>
      </ul>
    </div>
  </div>
</nav>

<!-- Ana içerik -->
<div class="container">
  <div class="row">
    <!-- Blog Kartları -->
    <div class="col-lg-8">
      <div class="row g-4">

        <!-- Kart 1 -->
        <div class="col-md-6">
          <div class="card blog-card">
            <img src="https://via.placeholder.com/600x300" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Blog Başlığı 1</h5>
              <p class="card-text">Bu blog yazısında Bootstrap 5 ile neler yapılabileceğini anlatıyoruz.</p>
              <a href="#" class="btn btn-outline-primary btn-sm">Devamını Oku</a>
            </div>
          </div>
        </div>

        <!-- Kart 2 -->
        <div class="col-md-6">
          <div class="card blog-card">
            <img src="https://via.placeholder.com/600x300" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Blog Başlığı 2</h5>
              <p class="card-text">Grid sistemi sayesinde mobil uyumlu bloglar çok kolay.</p>
              <a href="#" class="btn btn-outline-primary btn-sm">Devamını Oku</a>
            </div>
          </div>
        </div>

        <!-- Kart 3 -->
        <div class="col-md-6">
          <div class="card blog-card">
            <img src="https://via.placeholder.com/600x300" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Blog Başlığı 3</h5>
              <p class="card-text">Flexbox ile içerik düzeni nasıl kurulur örneklerle anlatıldı.</p>
              <a href="#" class="btn btn-outline-primary btn-sm">Devamını Oku</a>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Sidebar -->
    <div class="col-lg-4">
      <div class="p-3 bg-white rounded shadow-sm mb-4">
        <h5>Kategoriler</h5>
        <ul class="list-unstyled">
          <li><a href="#">Frontend</a></li>
          <li><a href="#">Backend</a></li>
          <li><a href="#">Yapay Zeka</a></li>
        </ul>
      </div>
      <div class="p-3 bg-white rounded shadow-sm">
        <h5>Popüler Yazılar</h5>
        <ul class="list-unstyled">
          <li><a href="#">CSS vs Tailwind</a></li>
          <li><a href="#">React vs Vue</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Footer -->
<footer class="bg-dark text-white text-center py-3 mt-4">
  <small>© 2025 Tüm Hakları Saklıdır - MyBlog</small>
</footer>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

---

## 🧠 Açıklamalar:

| Alan                                 | Açıklama                                 |
| ------------------------------------ | ---------------------------------------- |
| `.navbar`                            | Bootstrap 5’in hazır navigasyon bileşeni |
| `.card`                              | Blog yazılarını gösteren kutular         |
| `.g-4`                               | Kartlar arasında boşluk                  |
| `.col-md-6`                          | Orta boyutlarda 2’li kolon yapısı        |
| `.col-lg-8 / col-lg-4`               | Geniş ekranlarda içerik - sidebar bölümü |
| `.hover`, `transition`, `box-shadow` | CSS3 ile görsel efektler                 |
| `via.placeholder.com`                | Görsel yerine demo resmi gösterir        |

---

## ➕ Neler Ekleyebilirsin?

* Gerçek blog verileri (API veya JSON ile)
* Pagination (sayfalama)
* Blog detay sayfası
* Karanlık tema desteği (CSS değişkenleriyle)
* Arama çubuğu
* Bootstrap ikonları

---

