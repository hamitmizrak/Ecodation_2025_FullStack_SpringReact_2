HTML5 formatter (biçimlendirici), HTML kodlarını okunabilir ve standartlara uygun şekilde **girintili**, **temiz**, **hiyerarşik** ve **tutarlı** hale getiren bir sistemdir.

Aşağıda üç farklı seviyede açıklayacağım:

---

## ✅ 1. **HTML5 Formatter Ne Yapar?**

- Kod içindeki gereksiz boşlukları temizler
- Girintileme (indentation) yapar (örneğin 2 veya 4 boşluk ya da tab karakteri ile)
- Etiketlerin açılış ve kapanış düzenlerini hizalar
- Bozuk veya iç içe geçmiş yanlış yapıları düzeltir
- Kod okunabilirliğini artırır

---

## 🧱 2. **Basit HTML5 Formatter Python Script Örneği**

Bu örnek, bir HTML dosyasını alır ve girintili hale getirir. (Python'da `html.parser` + `BeautifulSoup` ile)

```python
from bs4 import BeautifulSoup

# Düzenlemek istediğiniz HTML içeriği (örnek)
html_content = """
<html><head><title>Başlık</title></head><body><h1>Merhaba</h1><p>HTML5 formatter örneği</p></body></html>
"""

# BeautifulSoup ile biçimlendirme
soup = BeautifulSoup(html_content, 'html.parser')
formatted_html = soup.prettify()

# Biçimlendirilmiş HTML çıktısı
print(formatted_html)
```

**Çıktısı:**

```html
<html>
  <head>
    <title>Başlık</title>
  </head>
  <body>
    <h1>Merhaba</h1>
    <p>HTML5 formatter örneği</p>
  </body>
</html>
```

---

## 🔧 3. **Online HTML5 Formatter Araçları**

Hiçbir kod yazmadan kullanabileceğiniz bazı ücretsiz online araçlar:

| Araç                                                                                                   | Açıklama                                      |
| ------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| [https://codebeautify.org/htmlviewer/](https://codebeautify.org/htmlviewer/)                           | Gelişmiş HTML formatter ve viewer             |
| [https://www.freeformatter.com/html-formatter.html](https://www.freeformatter.com/html-formatter.html) | Seçilebilir indent seviyesi ile biçimlendirir |
| [https://htmlformatter.com/](https://htmlformatter.com/)                                               | Sade ve temiz arayüz                          |
| [https://jsonformatter.org/html-formatter](https://jsonformatter.org/html-formatter)                   | HTML, XML, JSON destekli biçimlendirme        |

---

## 💡 4. **Formatter Kullanımında Dikkat Edilmesi Gerekenler**

- **Boşluk politikası**: 2 boşluk, 4 boşluk ya da tab karakter kullanımı
- **Satır uzunluğu**: Genellikle 80–120 karakter arası satır sınırı tercih edilir
- **Inline CSS/JS** varsa dikkatli olunmalı, bazen dışarı çıkarılması gerekebilir
- `<pre>`, `<code>`, `<textarea>` gibi etiketler içindeki içerik biçimlendirilmemelidir

---

## 📁 5. **VS Code için Formatter Eklentileri**

Kendi editörünüzde formatter kullanmak isterseniz:

- **VS Code**:

  - Eklenti: “Prettier – Code Formatter”
  - Ayarlar: `settings.json` dosyasında şu şekilde yapılabilir:

    ```json
    "editor.formatOnSave": true,
    "prettier.singleQuote": true,
    "prettier.tabWidth": 2,
    "prettier.htmlWhitespaceSensitivity": "ignore"
    ```

    # Vs Code Prettier Code

    Aşağıda, **Visual Studio Code (VSCode)** editöründe **Prettier** kullanarak HTML5 (ve diğer diller) için biçimlendirme yapmanızı sağlayan `settings.json` dosyasına eklenecek ayarları **açıklamalarıyla birlikte** verdim.

---

## ✅ VSCode `settings.json` dosyasına eklenmesi gereken Prettier ayarları

```jsonc
{
  // Kaydettiğinizde dosyayı otomatik olarak biçimlendirir
  "editor.formatOnSave": true,

  // Biçimlendirici olarak Prettier'ı kullan
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // HTML etiketlerinde tek tırnak (' ') kullan
  "prettier.singleQuote": true,

  // Her girinti için 2 boşluk kullan
  "prettier.tabWidth": 2,

  // Tab yerine boşluk kullan
  "prettier.useTabs": false,

  // HTML dosyalarında boşluk hassasiyetini azaltır (örneğin `<div>  </div>`)
  "prettier.htmlWhitespaceSensitivity": "ignore",

  // Satır uzunluğu en fazla 100 karakter olsun
  "prettier.printWidth": 100,

  // Sonunda noktalı virgül eklensin mi? (JS/TS için)
  "prettier.semi": true,

  // Objelerde son elemandan sonra da virgül koyulsun mu? (JS/TS için)
  "prettier.trailingComma": "es5",

  // JSX (React) gibi yapılarda > işareti bir sonraki satıra alınsın mı?
  "prettier.jsxBracketSameLine": false,

  // Ok fonksiyonlarında parantez her zaman zorunlu mu? (JS için)
  "prettier.arrowParens": "always"
}
```

---

## 📂 `settings.json` dosyasına nasıl ulaşılır?

1. VSCode içinde `Ctrl + Shift + P` tuşlarına basın.
2. Açılan palete **"Preferences: Open Settings (JSON)"** yazın ve seçin.
3. Açılan `settings.json` dosyasına yukarıdaki ayarları yapıştırın ve kaydedin.

---

## 💡 Notlar ve İpuçları

- `"editor.formatOnSave": true` ayarı sayesinde dosyayı her **kaydettiğinizde otomatik** olarak Prettier devreye girer.
- `"editor.defaultFormatter": "esbenp.prettier-vscode"`: Prettier uzantısının ID'sidir. Yüklü olması gerekir.
- Eğer birden fazla formatter varsa, `.html` dosyaları için özel tanımlama yapabilirsiniz:

```jsonc
"[html]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## 📦 Prettier VSCode eklentisi nasıl kurulur?

1. **Sol yan menüden Extensions (Eklentiler)** bölümüne tıklayın.
2. "Prettier - Code formatter" aratın.
3. Yayımlayıcı: **Esben Petersen** olan eklentiyi yükleyin.
4. Gerekirse VSCode'u yeniden başlatın.

---
