

## 1. HTML5 Nedir?

**HTML5**, web sayfalarını ve uygulamalarını oluşturmak için kullanılan **en son HTML sürümüdür**. W3C (World Wide Web Consortium) ve WHATWG (Web Hypertext Application Technology Working Group) iş birliğiyle geliştirilmiştir.

### Temel Amaçları:

* Mobil ve masaüstü için **platform bağımsızlık** sağlamak
* Multimedya (video, ses) desteğini **ekstra eklenti olmadan** sunmak (Flash vb. ihtiyacını kaldırmak)
* Daha **anlamlı içerik** yapısı sağlamak (semantic tags)
* Web uygulamaları için **yerel depolama** (localStorage) gibi yeni API’ler sağlamak

---

## 2. HTML5 ile Gelen Yenilikler

### 2.1. Semantik Etiketler (Semantic Tags)

HTML4'te `<div>` ve `<span>` gibi anlamsız kapsayıcılar yerine artık daha anlamlı elementler var:

* `<header>`: Sayfanın başlığı veya bölüm başlığı
* `<nav>`: Navigasyon menüsü
* `<section>`: Bağımsız içerik bölümleri
* `<article>`: Bağımsız, taşınabilir içerik (örneğin bir blog yazısı)
* `<aside>`: Yan içerik veya reklamlar
* `<footer>`: Alt bilgi kısmı

**Faydaları:**

* Erişilebilirlik (screen reader için anlamlı olur)
* SEO açısından daha iyi yapı
* Kodun okunabilirliği artar

---

### 2.2. Form Geliştirmeleri

HTML5 ile birlikte gelen yeni form input türleri sayesinde form doğrulama ve kullanıcı deneyimi arttı.

#### Yeni `<input>` Türleri:

* `email`
* `url`
* `tel`
* `date`
* `time`
* `number`
* `range`
* `color`

#### Yeni Form Özellikleri:

* `required`
* `pattern`
* `autocomplete`
* `placeholder`
* `min` / `max`

**Örnek:**

```html
<input type="email" required placeholder="E-posta adresiniz">
```

---

### 2.3. Video ve Ses Desteği

Eklenti (Flash vs.) olmadan medya oynatımı sağlar:

```html
<video src="video.mp4" controls></video>
<audio src="ses.mp3" controls></audio>
```

* Format desteği tarayıcıya göre değişir (MP4, WebM, Ogg).
* JavaScript API’si ile medya kontrolü mümkündür.

---

### 2.4. Canvas ve SVG

#### Canvas

Piksel tabanlı 2D grafik çizimi sağlar. Oyunlar, görselleştirme vs. için uygundur.

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
<script>
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.fillStyle = "red";
  ctx.fillRect(10, 10, 150, 75);
</script>
```

#### SVG

Vektör tabanlı grafikler için kullanılır. Responsive’dir ve yüksek çözünürlükte bozulmaz.

```html
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>
```

---

### 2.5. Web Storage API

Tarayıcıda veri saklamak için kullanılır. Cookie’ye göre daha güvenli ve performanslıdır.

#### localStorage:

Veri kalıcıdır (tarayıcı kapanınca silinmez)

```javascript
localStorage.setItem("name", "Ahmet");
var name = localStorage.getItem("name");
```

#### sessionStorage:

Tarayıcı oturumu boyunca geçerlidir

```javascript
sessionStorage.setItem("age", "30");
```

---

### 2.6. Geolocation API

Kullanıcının konumunu almanıza olanak sağlar.

```javascript
navigator.geolocation.getCurrentPosition(function(position) {
  console.log("Latitude: " + position.coords.latitude);
});
```

---

### 2.7. Drag & Drop API

HTML5 ile sürükle bırak işlemleri desteklenir.

```html
<div id="dragMe" draggable="true">Beni Sürükle</div>
```

---

### 2.8. Web Workers

JavaScript işlemlerini arka planda çalıştırarak ana thread'i bloklamaz.

```javascript
// worker.js
onmessage = function(e) {
  postMessage("Gelen veri: " + e.data);
};
```

---

### 2.9. WebSocket

Tarayıcı ile sunucu arasında çift yönlü, kalıcı bağlantı sağlar. Chat uygulamaları için idealdir.

---

## 3. HTML5 ve Tarayıcı Desteği

HTML5’in büyük kısmı modern tarayıcılar tarafından desteklenir:

* Chrome
* Firefox
* Edge
* Safari
* Opera

**Eski tarayıcılar** (IE 8 ve öncesi) desteklemez. Bu nedenle bazı HTML5 etiketleri için polyfill kullanmak gerekir.

---

## 4. HTML5 ve SEO

* Semantik etiketler sayesinde arama motorları içeriği daha iyi anlar.
* `<article>`, `<section>`, `<header>` gibi etiketler sayfanın anlamlı bölümlere ayrılmasını sağlar.

---

## 5. HTML5 ile Geliştirilen Web Uygulamaları

* Progressive Web Apps (PWA)
* Mobil uyumlu sayfalar
* SPA'ler (HTML5 + JS Framework’ler ile)

---

## 6. HTML5’in Eksiklikleri veya Eleştiriler

* Güvenlik açıklarına daha açık hale gelebilir (örneğin Web Storage yanlış kullanıldığında)
* Video/ses formatı standardizasyonu yavaş gelişti
* Eski tarayıcılarla uyumluluk sorunları

---

## 7. HTML5 ile İlgili Gelişmiş Konular (İsteğe Bağlı Anlatabilirim)

* Shadow DOM ve Custom Elements (Web Components mimarisi)
* Service Worker (offline çalışma)
* Manifest.json ile mobil uygulama gibi davranış
* Responsive tasarımda HTML5’in yeri
* ARIA rol ve erişilebilirlik konuları

