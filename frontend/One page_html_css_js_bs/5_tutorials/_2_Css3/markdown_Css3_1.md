CSS3 (Cascading Style Sheets Level 3), web sayfalarının görsel sunumunu tanımlamak için kullanılan stil sayfalarının üçüncü ve en güncel büyük sürümüdür. CSS3, HTML5 ile birlikte web standartlarının temel yapı taşlarından biridir ve modern, kullanıcı dostu, görsel olarak zengin web uygulamalarının oluşturulmasında merkezi bir rol oynar.

Bu açıklamada CSS3'ü **kolaydan zora doğru**, **detaylı ve kapsamlı şekilde** ele alacağım:

---

## 1. **CSS3 Nedir? (Temel Tanım)**

CSS3, HTML belgelerinin stilini (görünümünü) tanımlamak için kullanılır. Renkler, yazı tipleri, boşluklar, hizalamalar, kenarlıklar, kutular, geçişler, animasyonlar, düzenler ve daha fazlası bu stil dosyası ile tanımlanır. CSS’in amacı, HTML'den yapıyı ayırarak sunum katmanını yönetmektir.

> Örnek:

```css
body {
  background-color: lightgray;
  color: black;
  font-family: Arial, sans-serif;
}
```

---

## 2. **CSS2 ve CSS3 Arasındaki Fark**

| Özellik          | CSS2            | CSS3                                             |
| ---------------- | --------------- | ------------------------------------------------ |
| Yapı             | Tek büyük belge | Modüler yapı                                     |
| Tarayıcı Desteği | Daha sınırlı    | Geniş çapta destek                               |
| Yeni özellikler  | Sınırlı         | Animasyon, geçiş, flexbox, grid, medya sorguları |
| Performans       | Daha yavaş      | Daha hızlı ve optimize                           |

CSS3, modüler yapısıyla **daha hızlı geliştirme**, **daha fazla görsel özellik**, **mobil uyum** gibi birçok avantaj sunar.

---

## 3. **Kolaydan Zora CSS3 Özellikleri**

### A. **Temel Stiller (Basit ve Giriş Seviyesi)**

#### 1. **Renk Tanımlama**

```css
h1 {
  color: red; /* renk adı */
  color: #ff0000; /* hex kodu */
  color: rgb(255, 0, 0); /* rgb */
}
```

#### 2. **Yazı Tipi Ayarları**

```css
p {
  font-family: 'Verdana', sans-serif;
  font-size: 16px;
  font-weight: bold;
  font-style: italic;
}
```

#### 3. **Kenarlık ve Dolgu (Margin / Padding / Border)**

```css
div {
  margin: 20px;
  padding: 10px;
  border: 2px solid black;
}
```

#### 4. **Arka Planlar**

```css
body {
  background-color: #e0e0e0;
  background-image: url('resim.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
```

---

### B. **Orta Seviye Özellikler**

#### 5. **Kutu Modeli (Box Model)**

Tüm HTML öğeleri kutu gibi davranır: içerik + padding + border + margin

#### 6. **Gölgelendirme (Shadow)**

```css
h2 {
  text-shadow: 2px 2px 5px gray;
}

.box {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
```

#### 7. **Yuvarlak Köşeler (Border Radius)**

```css
div {
  border-radius: 10px;
}
```

#### 8. **Opaklık (Opacity)**

```css
img {
  opacity: 0.5;
}
```

#### 9. **RGBA ve HSLA Renkler**

```css
background-color: rgba(255, 0, 0, 0.5);
```

#### 10. **Medya Sorguları (Responsive Design)**

```css
@media screen and (max-width: 768px) {
  body {
    background-color: lightblue;
  }
}
```

---

### C. **İleri Seviye CSS3 Özellikleri**

#### 11. **Geçiş Efektleri (Transitions)**

```css
a {
  transition: color 0.5s ease-in-out;
}
a:hover {
  color: red;
}
```

#### 12. **Animasyonlar (Keyframes ile)**

```css
@keyframes example {
  from {
    background-color: red;
  }
  to {
    background-color: yellow;
  }
}

div {
  animation-name: example;
  animation-duration: 2s;
}
```

#### 13. **Dönüşümler (Transformations)**

```css
div:hover {
  transform: rotate(15deg) scale(1.2);
}
```

#### 14. **Esnek Kutu (Flexbox)**

Modern düzenleme yöntemi:

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

#### 15. **Grid Sistemi (CSS Grid)**

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
```

#### 16. **Özelleştirilmiş Scrollbar (Webkit)**

```css
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: darkgray;
  border-radius: 10px;
}
```

---

### D. **Profesyonel Seviye Özellikler**

#### 17. **Custom Properties (CSS Değişkenleri)**

```css
:root {
  --main-color: #4caf50;
}
button {
  background-color: var(--main-color);
}
```

#### 18. **Clamp ve min/max fonksiyonları (Responsive font-size gibi)**

```css
h1 {
  font-size: clamp(1rem, 2.5vw, 3rem);
}
```

#### 19. **Container Queries (2023 sonrası desteklenmeye başladı)**

Bu özellik, bir öğenin kendi kapsayıcısına göre stil almasını sağlar:

```css
@container (min-width: 600px) {
  .box {
    padding: 20px;
  }
}
```

---

## 4. **CSS3'ün Avantajları**

- HTML’den sunum ayrımı sağlar
- Mobil uyumlu tasarımlara imkân verir
- Tarayıcı bağımsız ve esnektir
- Kod tekrarını azaltır (değişkenler, modülerlik)
- Daha hızlı yüklenen ve daha modern siteler üretir

---

## 5. **Tarayıcı Uyumluluğu**

CSS3 özellikleri modern tarayıcılar tarafından büyük oranda desteklenir. Ancak bazı özellikler (örn. `container queries`) hâlâ eski tarayıcılarda tam çalışmayabilir. Bunun için:

- [Can I Use](https://caniuse.com/)
- [MDN Docs](https://developer.mozilla.org/) siteleri kontrol edilmelidir.

---

## 6. **Sonuç**

CSS3, web tasarımının görsel temelidir. Temel stillerden başlayarak animasyonlar, düzen sistemleri, responsive teknikler, geçişler, grid/flex yapılar gibi gelişmiş özelliklere kadar web tasarımında profesyonel kontrol sağlar.

---
