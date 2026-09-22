# MOZAİKKENT GAZETESİ — OKU BENİ

İmtiyaz Sahibi: **YAŞAR ELMA**
Sürüm: 1.0 · 22 Eylül 2026

---

## 1) Siteyi açmak

Tarayıcıda açmak için klasördeki **index.html** dosyasına çift tıklayın.
İnternet olmasa da açılır; döviz kuru, hava durumu ve canlı yayın için internet gerekir.

Klasör düzeni:

    MOZAIKKENT-GAZETESI/
      index.html            → sitenin iskeleti (başlık, menü, alt bilgi)
      assets/css/stil.css   → renkler, temalar, düzen
      assets/js/veri.js     → HABERLER, KÖŞE YAZILARI, bölümler, canlı yayın listesi
      assets/js/uygulama.js → motor (sayfa çizimi, arama, tema, canlı yayın)
      assets/js/hls.min.js  → canlı televizyon yayınlarını oynatan hazır kütüphane
      assets/img/           → haber fotoğraflarınızı buraya koyacaksınız
      OKU-BENI.md           → bu dosya

---

## 2) Haber eklemek / düzenlemek

Tek dosyayı düzenlersiniz: **assets/js/veri.js**.
Not defteri (Notepad) veya Notepad++ ile açabilirsiniz. Dosya UTF-8 olarak kaydedilmeli.

`HABERLER = [ ... ]` listesinin içine, virgülle ayrılmış yeni bir kayıt ekleyin:

    {
      id: "zambak-yol",                     ← her habere özel kısa ad (Türkçe harf ve boşluk kullanmayın)
      bolum: "yerel",                       ← BOLUMLER listesindeki id
      baslik: "Zambak Mahallesi'nde yol yenileme başladı",
      spot: "Kısa özet cümlesi buraya gelir.",
      yazar: "selin-aksoy",                 ← YAZARLAR listesindeki slug
      tarih: "2026-09-23 10:30",            ← YYYY-AA-GG SS:DD
      sure: 3,                              ← tahmini okuma süresi (dakika)
      etiket: ["yol", "Zambak", "belediye"],
      desen: "mozaik",                      ← mozaik | izgara | dalga | nokta
      manset: 8,                            ← (isteğe bağlı) ana sayfa manşet sırası
      foto: "assets/img/zambak-yol.jpg",    ← (isteğe bağlı) fotoğraf yolu
      govde: [
        "Birinci paragraf.",
        { alt: "Ara başlık" },
        "İkinci paragraf."
      ]
    },

Kurallar:
- Her paragraf tırnak içinde ve sonunda **virgül** olur; son paragraftan sonra virgül konmaz.
- Metin içinde kesme işareti kullanmanız gerekiyorsa düz `'` yerine **’** yazın (ör. Zambak’ta).
- Kaydettikten sonra tarayıcıda sayfayı yenileyin (F5).

## 3) Köşe yazısı eklemek

`KOSE_YAZILARI = [ ... ]` listesine aynı biçimde kayıt ekleyin (id, yazar, baslik, tarih, sure, etiket, spot, govde).

## 4) Habere fotoğraf koymak

1. Fotoğrafı `assets/img/` klasörüne kopyalayın (ör. `zambak-yol.jpg`).
2. Haber kaydına `foto: "assets/img/zambak-yol.jpg"` satırını ekleyin.

Fotoğraf eklenmeyen haberlerde, bölüm rengine göre çizilen **mozaik kapak** gösterilir.
Fotoğraf eklenince kapak otomatik olarak fotoğrafa döner (kart, manşet, haber sayfası ve görsel vitrin dâhil).

## 5) Yeni bölüm açmak

`BOLUMLER` listesine kayıt ekleyin:

    { id: "tarim", ad: "TARIM", renk: "#84cc16", simge: "🌾" }

Menü, alt bilgi, rozet sayıları ve bölüm sayfası kendiliğinden oluşur. Bölüm rengi sayfanın vurgu
rengini de belirler (Kenan'ın istediği "renkten nerede olduğunu anlama" düzeni).

## 6) Künye bilgileri (imtiyaz sahibi, telefon, adres)

Dosyanın en başındaki `GAZETE = { ... }` kaydını düzenleyin:
ad, slogan, imtiyazSahibi, tel, eposta, adres alanları hem başlıkta hem künye sayfasında görünür.

## 7) Canlı yayın (televizyon + radyo)

`YAYINLAR` kaydındaki listeleri düzenleyin. Adresler gerçek istekle sınandı (HTTP 200 + #EXTM3U).
Kendi yayın adresinizi eklemek isterseniz:

    { ad: "Kanal Adı", url: "https://.../master.m3u8", hls: true }

`.m3u8` ile biten adreslerde `hls: true` yazın. Düz mp3/aac adreslerinde yazmayın.

## 8) Tema ve yazı boyutu

Üst şeritteki **tema seçme** kutusunda 8 renk teması, yanındaki A-/A/A+/A++/A+++ düğmelerinde
5 yazı boyutu vardır. Seçimler okuyucunun tarayıcısında hatırlanır.

## 9) cPanel'e yükleme (yayına alma)

1. cPanel > Dosya Yöneticisi > hedef klasöre girin.
2. Eski dosyalar varsa önce yedekleyin (sıkıştırıp başka klasöre alın).
3. Bu klasörün **içindeki** dosyaları yükleyin: `index.html`, `assets/` klasörü.
   (ZIP yükleyip "Extract" yapacaksanız ZIP'in içinde ek klasör olmamalı; `index.html` ZIP kökünde olmalı.)
4. SSL/HTTPS yönlendirmesinin açık olduğundan emin olun.
5. Telefondan siteyi açıp menüyü, bir haberi ve CANLI YAYIN düğmesini deneyin.

## 10) Dürüst notlar (şu an olmayanlar)

- Sitedeki 26 haber metni **örnek/şablon** içeriktir; gerçek haberlerinizle değiştirilmelidir.
- Haber fotoğrafları henüz yok; yerlerine bölüm renkli mozaik kapaklar çiziliyor.
- Okuyucu yorumu ve üyelik bölümü yok (sunucu gerektirir).
- İletişim formu, kaydettiğinizde e-posta uygulamanızı açar (sunucu tarafı kod yok).
- Döviz kurları ve hava durumu internet varsa canlı gelir (ECB/Frankfurter, Open-Meteo);
  yoksa şablon değerler gösterilir ve şeritte "ŞABLON" yazar.
