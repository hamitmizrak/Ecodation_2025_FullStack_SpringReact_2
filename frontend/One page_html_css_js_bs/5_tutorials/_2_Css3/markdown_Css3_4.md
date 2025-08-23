CSS3 ile öğrendiğimiz tüm bu ileri düzey teknikleri gerçek dünyada nasıl kullanacağımızı göstermek için **uygulamalı mini projeler** yapacağız. Bu projeler hem temel bilgileri pekiştirecek hem de yeni detaylar öğretecek. Bu bölümde 3 farklı mini proje yapacağız:

---

## ✅ **Bölüm 3: Uygulamalı CSS3 Mini Projeler**

---

### 🔷 **Proje 1: Animasyonlu Hover Butonu**

#### Hedef:

Hover olduğunda renk geçişi, büyüme ve gölge efekti ile tepki veren şık bir buton.

#### HTML:

```html
<button class="btn-animated">Gönder</button>
```

#### CSS:

```css
.btn-animated {
  background-color: #3498db;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
}

.btn-animated:hover {
  background-color: #2980b9;
  transform: scale(1.05);
  box-shadow: 0 8px 12px rgba(0,0,0,0.3);
}
```

---

### 🔷 **Proje 2: Flexbox ile Kart Listesi**

#### Hedef:

Duyarlı (responsive), 3 sütunlu kart yapısı. Mobilde tek satır olur.

#### HTML:

```html
<div class="card-container">
  <div class="card">Kart 1</div>
  <div class="card">Kart 2</div>
  <div class="card">Kart 3</div>
</div>
```

#### CSS:

```css
.card-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  background: #fff;
  padding: 20px;
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}

/* Responsive */
@media screen and (max-width: 768px) {
  .card {
    width: 90%;
  }
}
```

---

### 🔷 **Proje 3: Sadece CSS ile Modal Kutusu**

#### Hedef:

Javascript kullanmadan, sadece CSS ve HTML ile açılıp kapanabilen modal (açılır pencere) yapmak.

#### HTML:

```html
<label for="modal-toggle" class="btn-open">Modal Aç</label>
<input type="checkbox" id="modal-toggle" hidden>

<div class="modal">
  <label for="modal-toggle" class="overlay"></label>
  <div class="modal-box">
    <h2>Başlık</h2>
    <p>Bu sadece CSS ile yapılmış bir modal örneğidir.</p>
    <label for="modal-toggle" class="btn-close">Kapat</label>
  </div>
</div>
```

#### CSS:

```css
.btn-open {
  background: #2ecc71;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  display: none;
  align-items: center;
  justify-content: center;
}

#modal-toggle:checked ~ .modal {
  display: flex;
}

.overlay {
  position: absolute;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.6);
  cursor: pointer;
}

.modal-box {
  background: white;
  padding: 30px;
  z-index: 10;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  text-align: center;
}

.btn-close {
  margin-top: 20px;
  display: inline-block;
  background: #e74c3c;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}
```

---

## 🧠 Bu Projelerde Ne Öğrendik?

* `transition`, `transform`, `box-shadow`, `hover`, `flex-wrap`, `media queries`, `:checked`, `~` gibi güçlü CSS3 teknikleri,
* Mobil uyumlu düzen kurma (responsive),
* CSS ile interaktif bileşen tasarımı,
* Sadece CSS ile kontrol mekanizmaları (örneğin modal aç/kapat).

---

