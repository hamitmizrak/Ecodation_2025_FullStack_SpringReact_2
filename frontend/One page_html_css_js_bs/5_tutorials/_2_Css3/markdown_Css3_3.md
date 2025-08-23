CSS3’ün ileri düzey özelliklerine geçiyoruz. Bu bölümde CSS3’ün gerçek gücünü ortaya koyan **etkileşimli ve dinamik** yeteneklerini detaylıca, örneklerle açıklayacağım.

---

## ✅ **Bölüm 2: CSS3 İleri Düzey Özellikler**

---

## 1. **Geçişler (Transitions)**

Geçişler, bir CSS özelliğinin değişiminin **yumuşak bir şekilde** gerçekleşmesini sağlar.

### Temel Kullanım:

```css
a {
  color: blue;
  transition: color 0.5s ease-in-out;
}

a:hover {
  color: red;
}
```

### Açıklama:

* `transition`: hangi özellik, ne kadar sürede, hangi hız eğrisiyle geçsin?
* `ease-in-out`: yavaş başlar, hızlanır, tekrar yavaşlar

### Tüm özellikleri geçişli yapmak:

```css
div {
  transition: all 0.3s ease;
}
```

---

## 2. **Animasyonlar (Animations)**

Geçiş tek seferliktir, animasyonlar ise **tekrar edebilir**, **daha karmaşık hareketler** tanımlar.

### a) @keyframes ile tanım:

```css
@keyframes hareket {
  0%   { transform: translateX(0); }
  100% { transform: translateX(200px); }
}
```

### b) Uygulama:

```css
.box {
  width: 100px;
  height: 100px;
  background: red;
  animation: hareket 2s infinite alternate;
}
```

* `2s`: süresi
* `infinite`: sonsuz tekrar
* `alternate`: ileri-geri çalışır

---

## 3. **Dönüşümler (Transformations)**

CSS3 ile bir öğeyi **döndürebilir**, **ölçeklendirebilir**, **kaydırabilir** veya **yansıtabilirsin**.

### a) Döndürme:

```css
.box {
  transform: rotate(45deg);
}
```

### b) Ölçekleme:

```css
.box:hover {
  transform: scale(1.2);
}
```

### c) Kaydırma:

```css
.box {
  transform: translateX(100px);
}
```

### d) Birden fazla transform:

```css
.box {
  transform: rotate(15deg) scale(1.2) translateY(10px);
}
```

---

## 4. **Flexbox**

Modern, responsive düzenler için **satır/sütun yapısını kolayca yönetir.**

### a) Temel yapı:

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### b) Ana kavramlar:

| Özellik           | Açıklama                  |
| ----------------- | ------------------------- |
| `flex-direction`  | Satır mı sütun mu?        |
| `justify-content` | Ana eksende hizalama      |
| `align-items`     | Çapraz eksende hizalama   |
| `flex-wrap`       | Taşarsa satıra geçsin mi? |
| `gap`             | Elemanlar arası boşluk    |

### c) Örnek:

```css
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
```

---

## 5. **CSS Grid Layout**

CSS Grid, iki boyutlu yerleşim sağlar (hem satır hem sütun).

### a) Temel kullanım:

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

### b) Elemanların konumlandırılması:

```css
.item1 {
  grid-column: 1 / span 2;
  grid-row: 1;
}
```

### Grid Özellikleri:

| Özellik                        | Anlamı                |
| ------------------------------ | --------------------- |
| `grid-template-rows/columns`   | Satır ve sütun yapısı |
| `gap`                          | Aralık                |
| `grid-area`                    | Alan adı              |
| `place-items`, `place-content` | Kapsamlı hizalama     |

---

## 6. **Medya Sorguları (Responsive Design)**

Farklı ekran boyutlarına göre CSS yazmanı sağlar.

```css
@media screen and (max-width: 768px) {
  body {
    background-color: lightgray;
  }

  .container {
    flex-direction: column;
  }
}
```

---

## 7. **CSS Değişkenleri (Custom Properties)**

### Tanımlama:

```css
:root {
  --ana-renk: #ff5722;
  --kenar-bosluk: 20px;
}
```

### Kullanım:

```css
button {
  background-color: var(--ana-renk);
  padding: var(--kenar-bosluk);
}
```

### Avantaj:

* Temaya göre anında değişim
* Kod tekrarı azaltılır

---

## 8. **Yeni Ölçü Birimleri**

### a) `vw`, `vh`

```css
div {
  width: 50vw; /* ekranın %50'si */
  height: 100vh; /* tüm ekran yüksekliği */
}
```

### b) `clamp(min, ideal, max)`

```css
h1 {
  font-size: clamp(1rem, 2.5vw, 3rem);
}
```

Bu, duyarlı yazı boyutu oluşturur.

---

## 9. **Fonksiyonlar**

### a) calc()

```css
width: calc(100% - 50px);
```

### b) min(), max()

```css
width: min(500px, 80%);
```

---

## 10. **Filter & Backdrop-Filter**

### a) Görsel filtreleme:

```css
img {
  filter: grayscale(100%) blur(2px);
}
```

### b) Arka plan bulanıklığı:

```css
.overlay {
  backdrop-filter: blur(10px);
}
```

> Not: `backdrop-filter` özelliği bazı tarayıcılarda özel destek gerektirir.

---

## ✔️ Özet

Bu bölümde CSS3'ün güçlü ve modern özelliklerini detaylarıyla gördük. Artık:

* Karmaşık grid yapıları,
* Yumuşak animasyonlar,
* Duyarlı tasarımlar,
* Temaya uygun değişken sistemleri,
* ve etkileşimli görsel filtreleme

---

