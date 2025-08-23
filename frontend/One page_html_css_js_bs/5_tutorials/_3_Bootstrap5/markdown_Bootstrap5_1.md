Bootstrap 5, **modern web arayüzleri** (UI) oluşturmak için kullanılan, **HTML, CSS ve JavaScript** temelli açık kaynaklı bir **frontend framework**’tür. Twitter tarafından geliştirilmiş, günümüzde tüm dünyada yaygın olarak kullanılan en popüler UI kütüphanelerinden biridir. **Bootstrap 5**, önceki sürümlerine göre daha modern, daha esnek ve bağımlılıkları azaltılmış bir yapıya sahiptir (örneğin jQuery kaldırılmıştır).

Bu açıklamada Bootstrap 5’i **kolaydan zora doğru**, **çok detaylı ve derinlemesine** ele alacağım.

---

## 1. GİRİŞ: Bootstrap 5 Nedir?

Bootstrap 5, web geliştiricilerin:

* Mobil uyumlu (responsive),
* Şık,
* Hızlı tasarımlar yapabilmelerini sağlar.

Temel bileşenler:

* **Grid Sistemi** (12 kolon düzeni),
* **Hazır Bileşenler** (kartlar, butonlar, navbar, modallar vb.),
* **Yardımcı Sınıflar** (margin, padding, renkler, hizalama vb.),
* **Formlar, ikonlar, uyarılar** gibi zengin içerik desteği sunar.

> Bootstrap 5 ile tarayıcı uyumlu, mobil öncelikli, modern UI’ler kısa sürede geliştirilebilir.

---

## 2. Bootstrap 5 Kurulumu

### A. CDN ile Kullanım (Hızlı Başlangıç)

```html
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
```

### B. NPM ile Yükleme

```bash
npm install bootstrap
```

### C. Manuel Kullanım

Bootstrap dosyalarını indirerek projene dahil edebilirsin.

---

## 3. TEMEL KAVRAMLAR (Kolay Seviye)

### A. Mobil Öncelikli Tasarım

Bootstrap, "mobile-first" yaklaşımı benimser. Küçük ekranlar önceliklidir, geniş ekranlara göre tasarım genişletilir.

### B. Grid Sistemi (12 Kolon)

```html
<div class="container">
  <div class="row">
    <div class="col-6">Sol</div>
    <div class="col-6">Sağ</div>
  </div>
</div>
```

* `container`: İçeriği hizalamak için kullanılır.
* `row`: Satır oluşturur.
* `col`: Sütun oluşturur (toplam 12 sütun).

### C. Renk Sınıfları

```html
<p class="text-primary">Mavi yazı</p>
<p class="bg-success text-white">Yeşil zemin, beyaz yazı</p>
```

### D. Margin ve Padding

```html
<div class="mt-3 mb-4 ps-2 pe-2">Boşluklar</div>
```

* `m`: margin, `p`: padding
* `t`: top, `b`: bottom, `s`: start (sol), `e`: end (sağ)

---

## 4. ORTA SEVİYE KULLANIM

### A. Butonlar

```html
<button class="btn btn-primary">Kaydet</button>
<button class="btn btn-outline-danger">Sil</button>
```

### B. Navbar (Gezinme Menüsü)

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Logo</a>
    <button class="navbar-toggler" ... ></button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link active" href="#">Ana Sayfa</a></li>
      </ul>
    </div>
  </div>
</nav>
```

### C. Kartlar (Card)

```html
<div class="card" style="width: 18rem;">
  <img src="resim.jpg" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">Başlık</h5>
    <p class="card-text">Açıklama.</p>
    <a href="#" class="btn btn-primary">Git</a>
  </div>
</div>
```

### D. Modal (Popup)

```html
<!-- Buton -->
<button data-bs-toggle="modal" data-bs-target="#ornekModal">Aç</button>

<!-- Modal -->
<div class="modal fade" id="ornekModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">...</div>
      <div class="modal-body">İçerik</div>
      <div class="modal-footer">...</div>
    </div>
  </div>
</div>
```

### E. Tablo (Table)

```html
<table class="table table-striped table-hover">
  <thead><tr><th>Ad</th><th>Soyad</th></tr></thead>
  <tbody><tr><td>Ali</td><td>Kaya</td></tr></tbody>
</table>
```

---

## 5. GELİŞMİŞ KULLANIMLAR (Zor Seviye)

### A. Breakpoint’ler ile Duyarlı Tasarım

```html
<div class="col-12 col-sm-6 col-lg-4">Responsive içerik</div>
```

* `col-sm-*`: 576px ve üzeri
* `col-md-*`: 768px ve üzeri
* `col-lg-*`: 992px ve üzeri
* `col-xl-*`: 1200px ve üzeri

### B. Collapse (Açılır/Kapanır Alanlar)

```html
<button data-bs-toggle="collapse" data-bs-target="#acilir">Detay</button>
<div class="collapse" id="acilir">Gizli içerik</div>
```

### C. Toast (Bildirim)

```html
<div class="toast show">
  <div class="toast-header">Başlık</div>
  <div class="toast-body">Mesaj</div>
</div>
```

### D. Carousel (Slider)

```html
<div id="slider" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active"><img src="1.jpg" class="d-block w-100"></div>
    <div class="carousel-item"><img src="2.jpg" class="d-block w-100"></div>
  </div>
  <button class="carousel-control-prev" ...></button>
  <button class="carousel-control-next" ...></button>
</div>
```

### E. Tooltip & Popover

```html
<button data-bs-toggle="tooltip" title="İpucu">Bilgi</button>
<button data-bs-toggle="popover" title="Başlık" data-bs-content="Detay">Popover</button>
```

### F. Form Doğrulama

```html
<form class="needs-validation" novalidate>
  <input type="text" class="form-control" required>
  <div class="invalid-feedback">Zorunlu alan</div>
</form>
```

---

## 6. Bootstrap 5 Yenilikleri (Bootstrap 4'e Göre)

| Özellik                | Bootstrap 4          | Bootstrap 5                               |
| ---------------------- | -------------------- | ----------------------------------------- |
| jQuery bağımlılığı     | Vardı                | **Kaldırıldı**                            |
| RTL (sağdan sola yazı) | Yoktu                | **Varsayılan destek**                     |
| Gelişmiş Grid sistemi  | Sınırlı              | **Yeni `xxl` boyut, container sınıfları** |
| API tabanlı JS         | Karmaşık             | **Data API + ES6 desteği**                |
| Yardımcı sınıflar      | Daha az              | **Genişletildi ve özelleştirildi**        |
| Özelleştirme           | SASS değişkenleriyle | Daha kapsamlı temalar destekleniyor       |

---

## 7. Bootstrap 5 ile Proje Geliştirme Yaklaşımı

* Hızlı prototipleme için idealdir.
* UI/UX için zaman kazandırır.
* CSS yazmadan bile birçok UI bileşeni hazırdır.
* JavaScript bileşenleri (modal, tooltip, collapse) jQuery olmadan çalışır.
* React, Angular gibi frameworklerle birlikte kullanılabilir (özellikle Bootstrap 5 bileşen kütüphaneleri ile).

---

## 8. Bootstrap Alternatifleri

Bootstrap dışında popüler frontend framework’leri:

* **Tailwind CSS** (utility-first yaklaşım),
* **Foundation (Zurb)**
* **Bulma**
* **Material UI** (Google'ın Material Design’ına uygun)

Her biri farklı felsefeye sahip olsa da Bootstrap, hâlâ en çok tercih edilen framework’tür.

---

## 9. Bootstrap 5 Öğrenme Önerileri

1. Grid sistemini çok iyi öğren.
2. Her bileşeni belgelerden ([https://getbootstrap.com/](https://getbootstrap.com/)) incele ve dene.
3. Hazır temaları inceleyip düzenlemeler yap.
4. Formlar ve validasyon sistemlerini projelerde kullan.
5. JavaScript bileşenleriyle dinamik deneyimler oluştur.

---

## 10. SONUÇ

Bootstrap 5, modern, duyarlı ve etkileşimli web arayüzleri oluşturmak için güçlü bir araçtır. Kolay kullanımı ve geniş bileşen yelpazesi sayesinde hem yeni başlayanlar hem de profesyoneller için uygundur. Gelişmiş projelerde sadeleştirme ve zaman kazandırma avantajı sağlar. jQuery’siz yapısı ve modern tarayıcı uyumluluğuyla geleceğe dönük bir çözümdür.

---

