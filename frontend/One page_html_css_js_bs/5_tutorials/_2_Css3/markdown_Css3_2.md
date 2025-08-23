CSS3'ün her bir özelliğini **tek tek**, **örneklerle**, **açıklamalı** ve **kolaydan zora doğru** olacak şekilde anlatayım. Çok kapsamlı olduğundan bunu **bölümler halinde** yapacağım. İlk bölümde şu başlıkları ele alacağım:

---

## ✅ **Bölüm 1: Temel CSS3 Özellikleri**

### 1. **Renk Tanımlama Yöntemleri**

CSS3, renklendirme için çok çeşitli formatlar sunar:

#### a) Renk İsimleri

```css
h1 {
  color: red;
}
```

#### b) Hexadecimal Kodlar

```css
h1 {
  color: #ff0000; /* Kırmızı */
}
```

#### c) RGB

```css
h1 {
  color: rgb(255, 0, 0);
}
```

#### d) RGBA (A: Opaklık – 0.0 ile 1.0 arası)

```css
h1 {
  color: rgba(255, 0, 0, 0.5); /* %50 saydam kırmızı */
}
```

#### e) HSL / HSLA

```css
h1 {
  color: hsl(0, 100%, 50%);
}
```

---

### 2. **Yazı Tipi (Font) Özellikleri**

#### a) font-family

```css
p {
  font-family: 'Arial', sans-serif;
}
```

#### b) font-size

```css
p {
  font-size: 16px;     /* sabit boyut */
  font-size: 1.2em;     /* göreceli */
  font-size: 120%;      /* yüzdelik */
}
```

#### c) font-weight

```css
h1 {
  font-weight: bold;     /* veya 400, 700 gibi sayısal değer */
}
```

#### d) font-style

```css
p {
  font-style: italic;
}
```

---

### 3. **Arka Plan (Background) Özellikleri**

#### a) background-color

```css
div {
  background-color: lightblue;
}
```

#### b) background-image

```css
div {
  background-image: url('image.jpg');
}
```

#### c) background-repeat

```css
div {
  background-repeat: no-repeat;
}
```

#### d) background-position

```css
div {
  background-position: center top;
}
```

#### e) background-size

```css
div {
  background-size: cover;
}
```

#### f) background shorthand

```css
div {
  background: url('image.jpg') no-repeat center center / cover;
}
```

---

### 4. **Kenarlıklar (Borders)**

#### a) border-style

```css
div {
  border-style: solid;
}
```

#### b) border-width

```css
div {
  border-width: 2px;
}
```

#### c) border-color

```css
div {
  border-color: blue;
}
```

#### d) border shorthand

```css
div {
  border: 2px dashed red;
}
```

#### e) border-radius (Köşe yuvarlatma)

```css
div {
  border-radius: 10px;
}
```

---

### 5. **Kutu Modeli (Box Model)**

Her HTML öğesi şu katmanlardan oluşur:

```
Margin -> Border -> Padding -> Content
```

#### a) margin

```css
div {
  margin: 20px;
}
```

#### b) padding

```css
div {
  padding: 15px;
}
```

#### c) box-sizing

```css
div {
  box-sizing: border-box; /* padding ve border dahil toplam genişlik */
}
```

---

### 6. **Gölgelendirme (Shadow)**

#### a) Text Shadow

```css
h2 {
  text-shadow: 2px 2px 5px gray;
}
```

#### b) Box Shadow

```css
div {
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}
```

---

### 7. **Opaklık (opacity)**

```css
img {
  opacity: 0.5; /* %50 saydam */
}
```

---

Bu sadece **ilk bölüm**. Diğer bölümlerde şunları detaylıca ele alacağım:

---

## 📘 **Bir Sonraki Bölümde Anlatılacaklar (İleri Seviye CSS3)**

1. **Geçişler (Transitions)**
2. **Animasyonlar (Keyframes)**
3. **Transform (rotate, scale, translate)**
4. **Flexbox**
5. **Grid Layout**
6. **Responsive Design (Media Queries)**
7. **CSS Değişkenleri (Custom Properties)**
8. **Yeni ölçü birimleri: `vw`, `vh`, `clamp()`**
9. **Filter, backdrop-filter**
10. **calc(), min(), max() gibi fonksiyonlar**

---

