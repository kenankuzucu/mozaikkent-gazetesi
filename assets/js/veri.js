/* ============================================================
   MOZAİKKENT GAZETESİ — İÇERİK DOSYASI (veri.js)
   Bu dosyayı düzenleyerek siteyi tamamen yenileyebilirsiniz.
   Not: Tüm metinler çift tırnak içindedir. Haber eklemek için
   HABERLER listesine aynı alanlarla yeni bir kayıt ekleyin.
   ============================================================ */

var GAZETE = {
  ad: "MOZAİKKENT GAZETESİ",
  kisaAd: "MOZAİKKENT",
  slogan: "Kentin nabzı — çok renkli, çok sesli",
  altSlogan: "Bağımsız kent gazetesi · 2019'dan beri",
  imtiyazSahibi: "YAŞAR ELMA",
  genelYayinYonmeni: "Yaşar Elma",
  sorumlu: "Yazı İşleri Müdürü: Yaşar Elma",
  kurulus: 2019,
  tel: "0342 000 00 00",
  eposta: "haber@mozaikkentgazetesi.com",
  adres: "Mozaikkent / Zambak Mahallesi, Basın Caddesi No: 19",
  surum: "1.0"
};

var BOLUMLER = [
  { id: "gundem",    ad: "GÜNDEM",            renk: "#e11d48", simge: "📰" },
  { id: "yerel",     ad: "KENT",              renk: "#0ea5e9", simge: "🏙" },
  { id: "ekonomi",   ad: "EKONOMİ",           renk: "#16a34a", simge: "📈" },
  { id: "spor",      ad: "SPOR",              renk: "#f97316", simge: "⚽" },
  { id: "kultur",    ad: "KÜLTÜR & SANAT",    renk: "#a855f7", simge: "🎭" },
  { id: "teknoloji", ad: "TEKNOLOJİ",         renk: "#06b6d4", simge: "💻" },
  { id: "yasam",     ad: "YAŞAM",             renk: "#ec4899", simge: "☕" },
  { id: "egitim",    ad: "EĞİTİM",            renk: "#6366f1", simge: "🎓" },
  { id: "saglik",    ad: "SAĞLIK",            renk: "#14b8a6", simge: "🩺" },
  { id: "cevre",     ad: "ÇEVRE",             renk: "#65a30d", simge: "🌿" },
  { id: "roportaj",  ad: "RÖPORTAJ",          renk: "#d97706", simge: "🎙" },
  { id: "video",     ad: "VİDEO & CANLI",     renk: "#dc2626", simge: "🎬" }
];

/* Canlı yayınlar — adresler gerçek istek ile doğrulandı (HTTP 200 + #EXTM3U). */
var YAYINLAR = {
  tv: [
    { ad: "TRT Haber", url: "https://tv-trthaber.medya.trt.com.tr/master.m3u8" },
    { ad: "TRT Türk",  url: "https://tv-trtturk.medya.trt.com.tr/master.m3u8" },
    { ad: "TRT 1",     url: "https://tv-trt1.medya.trt.com.tr/master.m3u8" },
    { ad: "TRT Müzik", url: "https://tv-trtmuzik.medya.trt.com.tr/master.m3u8" },
    { ad: "TRT 2",     url: "https://tv-trt2.medya.trt.com.tr/master.m3u8" }
  ],
  radyo: [
    { ad: "TRT Radyo Haber", url: "https://rd-trtradyohaber.medya.trt.com.tr/master.m3u8", hls: true },
    { ad: "TRT FM",          url: "https://rd-trtfm.medya.trt.com.tr/master_128.m3u8",     hls: true },
    { ad: "Metro FM",        url: "https://playerservices.streamtheworld.com/api/livestream-redirect/METRO_FM_SC?/" },
    { ad: "Süper FM",        url: "https://playerservices.streamtheworld.com/api/livestream-redirect/SUPER_FM_SC?/" },
    { ad: "Alem FM",         url: "https://turkmedya.radyotvonline.net/alemfmaac" },
    { ad: "PowerTürk",       url: "https://listen.powerapp.com.tr/powerturk/mpeg/icecast.audio" }
  ]
};

/* Piyasa şeridi — çevrimiçi olduğunda canlı kur çekilir, olmazsa bu yedek değerler gösterilir. */
var PIYASA_YEDEK = [
  { ad: "DOLAR", deger: 42.61, degisim: 0.14 },
  { ad: "EURO",  deger: 46.12, degisim: -0.08 },
  { ad: "STERLİN", deger: 53.44, degisim: 0.21 },
  { ad: "GRAM ALTIN", deger: 5840, degisim: 0.35 }
];

/* Hava durumu — çevrimiçi olduğunda Mozaikkent konumu için canlı çekilir. */
var HAVA_YEDEK = { sicaklik: 27, durum: "Parçalı bulutlu", enYuksek: 29, enDusuk: 16 };

var YAZARLAR = [
  {
    slug: "yasar-elma", ad: "YAŞAR ELMA", unvan: "İmtiyaz Sahibi / Başyazar",
    bio: "Mozaikkent Gazetesi'nin kurucusu ve imtiyaz sahibi. 1998'den bu yana kent gazeteciliği yapıyor; yerel yönetim, kentsel dönüşüm ve basın özgürlüğü üzerine yazıyor.",
    rutbe: "Kurucu"
  },
  {
    slug: "selin-aksoy", ad: "SELİN AKSOY", unvan: "Kent Muhabiri",
    bio: "Mahalle mahalle dolaşıp kentin gündelik hayatını yazıyor. Yerel yönetim ve kentsel yaşam alanında 11 yıllık saha deneyimi var.",
    rutbe: "Muhabir"
  },
  {
    slug: "mert-kayabas", ad: "MERT KAYABAŞ", unvan: "Ekonomi Editörü",
    bio: "Esnaf, sanayi ve istihdam haberciliği yapıyor. Ticaret Odası ve kooperatiflerin verilerini takip ediyor.",
    rutbe: "Editör"
  },
  {
    slug: "nur-aydemir", ad: "NUR AYDEMİR", unvan: "Spor Yazarı",
    bio: "Amatör küme kadrolarını ve kent sporunu izliyor. Maç raporlarının yanı sıra sporcu sağlığı üzerine yazıyor.",
    rutbe: "Yazar"
  },
  {
    slug: "elif-duran", ad: "ELİF DURAN", unvan: "Kültür & Sanat Editörü",
    bio: "Kent tiyatrosu, sergiler ve festival takvimi onun kaleminden geçiyor. Sahne sanatları ve edebiyat eleştirileri yazıyor.",
    rutbe: "Editör"
  }
];

var HABERLER = [
  {
    id: "meclis-butce",
    bolum: "gundem",
    manset: 1,
    baslik: "Mozaikkent Meclisi 2027 bütçesini 4 saatlik oturumda kabul etti",
    spot: "Büyükşehir Meclisi, 18 milyar liralık 2027 bütçesini oy çokluğuyla onayladı. Bütçenin en büyük payı ulaşım ve altyapıya ayrıldı; muhalefet, sosyal yardım kaleminin yetersiz olduğu görüşünde.",
    yazar: "selin-aksoy",
    tarih: "2026-09-22 09:15",
    sure: 5,
    etiket: ["büyükşehir", "bütçe", "meclis", "ulaşım"],
    desen: "mozaik",
    govde: [
      "Mozaikkent Büyükşehir Belediye Meclisi, kentin 2027 mali yılı bütçesini dün akşam yapılan oturumda kabul etti. Toplam 18 milyar liralık bütçe, meclis üyelerinin oy çokluğuyla geçti. Oturum yaklaşık dört saat sürdü.",
      { alt: "Ulaşıma 4,1 milyar lira" },
      "Bütçe tablosuna göre en büyük pay 4,1 milyar lirayla ulaşım yatırımlarına ayrıldı. Kent içi hatların yenilenmesi, raylı sistem etüt çalışmaları ve yeni aktarma merkezleri bu kalemde yer alıyor. Altyapı yatırımlarına 3,4 milyar lira, çevre ve yeşil alan düzenlemelerine ise 1,2 milyar lira ayrıldı.",
      "Sosyal yardım ve destek kalemi ise 680 milyon lira olarak belirlendi. Bazı meclis üyeleri bu tutarın kentteki ihtiyaç sahibi sayısına oranla düşük kaldığını savundu; komisyon başkanı ise yardım programlarının ayrıca fonlanacağını bildirdi.",
      { alt: "Bütçe neleri kapsıyor?" },
      "Onaylanan bütçede eğitim destekleri, kadın ve gençlik merkezleri, kırsal mahalle yolları ile dere ıslahı projeleri yer alıyor. Belediye yetkilileri, bütçenin üç aylık dönemlerde gözden geçirileceğini ve yatırım kalemlerinin halka açık panodan izlenebileceğini duyurdu.",
      "Bütçe metni, kabulün ardından belediyenin resmî ilan panosunda ve meclis arşivinde yayımlandı."
    ]
  },
  {
    id: "meydan-yaya",
    bolum: "gundem",
    manset: 2,
    baslik: "Kent Meydanı'nda yaya düzenlemesi: 12 bin metrekare araç trafiğine kapatılıyor",
    spot: "Meydan çevresindeki üç cadde, ekim ayından itibaren kademeli olarak araç trafiğine kapatılacak. Esnafın bir bölümü tedirgin, belediye ise yaya yoğunluğunun ticaret hacmini artıracağını savunuyor.",
    yazar: "selin-aksoy",
    tarih: "2026-09-22 08:05",
    sure: 4,
    etiket: ["meydan", "yaya", "trafik", "esnaf"],
    desen: "izgara",
    govde: [
      "Kent Meydanı çevresindeki üç caddede yaya düzenlemesi çalışması başlıyor. Belediyenin duyurusuna göre toplam 12 bin metrekarelik alan ekim ayından itibaren kademeli olarak araç trafiğine kapatılacak.",
      "Çalışma kapsamında zemin yenilemesi, tabela ve aydınlatma standartlaşması, bisiklet park alanları ve gölgelikli oturma bölgeleri yapılacak. Belediye, düzenlemenin yüzde 40'ının yaya alanına ayrılacağını bildirdi.",
      { alt: "Esnaf ne diyor?" },
      "Düzenlemenin uygulanacağı caddede yıllardır esnaflık yapan bazı işletme sahipleri, yükleme saatlerinin netleşmemesinden endişeli. Belediye yetkilileri, her caddede sabah 06.00-09.00 arasında yükleme izni verileceğini açıkladı.",
      "Ulaşım Dairesi, düzenleme sonrası üç otobüs hattının güzergâhının değişeceğini, yeni durakların meydanın 150 metre uzağında konumlanacağını duyurdu."
    ]
  },
  {
    id: "su-kesintisi",
    bolum: "gundem",
    baslik: "Gültepe ve Şafaktepe'de su kesintisi: 23-24 Eylül arası 9 saat",
    spot: "Ana isale hattındaki vana yenilemesi nedeniyle iki mahallede çarşamba ve perşembe günü 09.00-18.00 arasında su verilemeyecek.",
    yazar: "selin-aksoy",
    tarih: "2026-09-21 17:40",
    sure: 2,
    etiket: ["su", "kesinti", "Gültepe", "Şafaktepe"],
    desen: "dalga",
    govde: [
      "İçme suyu ana isale hattında planlanan vana yenilemesi nedeniyle Gültepe ve Şafaktepe mahallelerinde iki gün boyunca su kesintisi uygulanacak.",
      "Kesinti, 23 ve 24 Eylül tarihlerinde 09.00-18.00 saatleri arasında geçerli olacak. Belediye, hastane, okul ve sağlık ocaklarına tankerle su takviyesi yapılacağını bildirdi.",
      "Vatandaşların kesinti öncesinde depo ve kaplarını doldurmaları, çamaşır-bulaşık gibi su yoğun işlerini kesinti dışı saatlere almaları öneriliyor."
    ]
  },
  {
    id: "otobus-hatti",
    bolum: "gundem",
    baslik: "Gece otobüsü hattı üç güzergâhta başlıyor",
    spot: "Üniversite, Devlet Hastanesi ve Terminal hattında gece 23.30-04.30 arası otobüs çalışacak. İlk iki hafta ücretsiz.",
    yazar: "selin-aksoy",
    tarih: "2026-09-20 19:10",
    sure: 3,
    etiket: ["otobüs", "ulaşım", "gece", "üniversite"],
    desen: "nokta",
    govde: [
      "Kent içi ulaşımda gece saatleri için üç güzergâhta yeni hat açılıyor. Otobüsler 23.30-04.30 arasında 40 dakikalık aralıklarla çalışacak.",
      "Hatlar Üniversite Kampüsü, Devlet Hastanesi ve Şehirlerarası Terminal arasında ring yapacak. İlk iki hafta yolculuklar ücretsiz olacak; ardından gece tarifesi uygulanacak.",
      "Belediye, gece hatlarının hastane nöbeti tutan sağlık çalışanları ve gece vardiyasında çalışanlar için planlandığını açıkladı."
    ]
  },
  {
    id: "narlibahce-pazar",
    bolum: "yerel",
    manset: 3,
    baslik: "Narlıbahçe'de kapalı pazar yeri için ilk kazma vuruldu",
    spot: "Yıllardır açık alanda kurulan semt pazarı, 6 bin metrekarelik kapalı alana taşınıyor. İnşaatın 2027 ilkbaharında bitmesi hedefleniyor.",
    yazar: "selin-aksoy",
    tarih: "2026-09-22 07:30",
    sure: 3,
    etiket: ["pazar", "Narlıbahçe", "yapı", "esnaf"],
    desen: "mozaik",
    govde: [
      "Narlıbahçe Mahallesi'nde yıllardır açık alanda kurulan semt pazarı için kapalı pazar yeri inşaatı başladı. Temel atma törenine mahalle sakinleri yoğun ilgi gösterdi.",
      "6 bin metrekarelik alanda 148 satış tezgâhı, soğuk hava deposu, bebek bakım odası ve engelli erişimi bulunan tuvaletler yer alacak. Çatıya yağmur suyu toplama sistemi kurulacak.",
      "Pazar esnafı, kapalı alana geçişin ardından kira bedellerinin nasıl belirleneceğini soruyor. Belediye, mevcut esnafa iki yıl boyunca indirimli tarife uygulanacağını açıkladı."
    ]
  },
  {
    id: "cesme-restorasyon",
    bolum: "yerel",
    baslik: "180 yıllık çeşme restorasyonu tamamlandı, su yeniden akıyor",
    spot: "Zambak Mahallesi'ndeki tarihi çeşmenin taşları tek tek elden geçirildi, kitabesi gün yüzüne çıkarıldı.",
    yazar: "selin-aksoy",
    tarih: "2026-09-20 11:20",
    sure: 3,
    etiket: ["tarih", "restorasyon", "Zambak", "kültür mirası"],
    desen: "izgara",
    govde: [
      "Zambak Mahallesi'nde 180 yıllık olduğu belirlenen çeşmenin restorasyonu tamamlandı. Çeşme, düzenlenen küçük bir törenle yeniden hizmete açıldı.",
      "Restorasyon sırasında yapı üzerindeki sıva kaldırılırken orijinal kitabe ortaya çıktı. Kitabe, Kültür Varlıkları Kurulu'nun onayıyla yerinde korunuyor.",
      "Çalışmada kullanılan taşlar bölgedeki ocaklardan temin edildi; derzler geleneksel horasan harcıyla yenilendi."
    ]
  },
  {
    id: "kent-konseyi",
    bolum: "yerel",
    baslik: "Kent Konseyi yeni dönem toplantısında 7 öneriyi oyladı",
    spot: "Öneriler arasında mahalle meclislerinin güçlendirilmesi, sokak hayvanları için mama noktaları ve yaya güvenliği var.",
    yazar: "selin-aksoy",
    tarih: "2026-09-19 16:00",
    sure: 3,
    etiket: ["Kent Konseyi", "katılım", "öneri"],
    desen: "nokta",
    govde: [
      "Kent Konseyi yeni dönemin ilk toplantısını geniş katılımla yaptı. Toplantıda sivil toplum kuruluşları, muhtarlar ve meslek odalarından gelen 7 öneri oylandı.",
      "Öneriler arasında mahalle meclislerinin bütçe sürecine katılması, sokak hayvanları için mama ve su noktalarının çoğaltılması, okul çevrelerinde hız kesici uygulaması yer aldı.",
      "Oylanarak kabul edilen öneriler belediyeye resmî yazıyla iletilecek; yanıtlar bir sonraki toplantıda görüşülecek."
    ]
  },
  {
    id: "ihracat-artis",
    bolum: "ekonomi",
    manset: 4,
    baslik: "Kent sanayisinde ihracat yüzde 8 arttı: mobilya ve gıda başı çekiyor",
    spot: "Mozaik Ticaret Odası verilerine göre ilk sekiz aylık ihracat 1,9 milyar doları geçti. En güçlü artış yüzde 21 ile mobilya ve orman ürünlerinde.",
    yazar: "mert-kayabas",
    tarih: "2026-09-22 10:40",
    sure: 4,
    etiket: ["ihracat", "sanayi", "istihdam", "ticaret odası"],
    desen: "mozaik",
    govde: [
      "Mozaik Ticaret Odası'nın açıkladığı verilere göre kentin ilk sekiz aylık ihracatı geçen yılın aynı dönemine göre yüzde 8 arttı ve 1,9 milyar doları aştı.",
      "Sektör bazında en hızlı büyüme yüzde 21 ile mobilya ve orman ürünlerinde görüldü. Gıda ve tarım ürünleri yüzde 12, makine aksamı yüzde 6 artışla onu izledi.",
      { alt: "İstihdam tablosu" },
      "Oda kayıtlarına göre yılın ilk yarısında sanayi bölgesinde 2 bin 100 yeni istihdam oluştu. İşveren temsilcileri, kalifiye ara eleman bulmakta zorlandıklarını dile getiriyor.",
      "Oda başkanı, yıl sonu ihracat beklentisinin 2,9 milyar dolar olduğunu, bunun için lojistik maliyetlerinin düşürülmesi gerektiğini söyledi."
    ]
  },
  {
    id: "esnaf-destek",
    bolum: "ekonomi",
    baslik: "Küçük esnafa faizsiz kredi başvuruları 1 Ekim'de açılıyor",
    spot: "Esnaf Sanatkârlar Odası ile belediye işbirliğindeki programda 150 bin liraya kadar 18 ay vadeli destek verilecek.",
    yazar: "mert-kayabas",
    tarih: "2026-09-21 13:25",
    sure: 3,
    etiket: ["esnaf", "kredi", "destek", "ticaret"],
    desen: "izgara",
    govde: [
      "Esnaf Sanatkârlar Odası ile belediyenin ortak yürüttüğü destek programında başvurular 1 Ekim'de açılıyor. Programa göre esnafa 150 bin liraya kadar faizsiz kredi sağlanacak.",
      "Kredinin vadesi 18 ay olacak, ilk üç ay geri ödemesiz sayılacak. Başvurular oda kayıt numarası ve vergi levhasıyla yapılacak.",
      "Program kapsamında ayrıca küçük işletmelere dijital vitrin, karekodla ödeme ve muhasebe eğitimi desteği verilecek."
    ]
  },
  {
    id: "konut-kiralar",
    bolum: "ekonomi",
    baslik: "Kiralık konut arzı arttı, ortalama kira ilk kez geriledi",
    spot: "Emlakçılar Odası verilerine göre yeni tamamlanan 3 bin 400 konutla birlikte kirada yüzde 4'lük düşüş kaydedildi.",
    yazar: "mert-kayabas",
    tarih: "2026-09-19 09:00",
    sure: 3,
    etiket: ["konut", "kira", "emlak", "arz"],
    desen: "dalga",
    govde: [
      "Kente son bir yılda kazandırılan 3 bin 400 yeni konutun etkisiyle kiralık daire arzı arttı. Emlakçılar Odası, ortalama kira bedelinin yüzde 4 gerilediğini bildirdi.",
      "Düşüşün en belirgin olduğu bölge, yeni yerleşim alanlarının açıldığı Şafaktepe çevresi oldu. Merkez mahallelerde ise fiyatlar yatay seyrediyor.",
      "Oda temsilcileri, arz artışının sürmesi hâlinde yıl sonuna kadar kira artış hızının enflasyonun altında kalabileceğini öngörüyor."
    ]
  },
  {
    id: "mozaikkentspor",
    bolum: "spor",
    manset: 5,
    baslik: "Mozaikkentspor deplasmanda 2-1 kazandı, üst üste dördüncü galibiyet",
    spot: "Ligin 6. haftasında konuk olduğu maçtan 2-1 galip ayrılan temsilcimiz, puanını 16'ya çıkardı ve ikinciliğe yükseldi.",
    yazar: "nur-aydemir",
    tarih: "2026-09-21 22:15",
    sure: 3,
    etiket: ["futbol", "Mozaikkentspor", "lig", "galibiyet"],
    desen: "mozaik",
    govde: [
      "Mozaikkentspor, ligin 6. haftasında deplasmanda oynadığı maçı 2-1 kazandı. Temsilcimiz böylece üst üste dördüncü galibiyetini aldı.",
      "Gollerin ikisi de ikinci yarıda geldi. Teknik direktör, maç sonu açıklamasında orta saha baskısının sonucu belirlediğini söyledi.",
      "Bu sonuçla puanını 16'ya çıkaran Mozaikkentspor, haftayı ikinci sırada tamamladı. Takım gelecek hafta evinde oynayacak."
    ]
  },
  {
    id: "amator-lig",
    bolum: "spor",
    baslik: "Amatör kümede sezon başlıyor: 14 takım, 26 hafta",
    spot: "Yeni sezonda ilk hafta maçları cumartesi oynanacak. Kura çekimi tamamlandı, fikstür açıklandı.",
    yazar: "nur-aydemir",
    tarih: "2026-09-18 14:00",
    sure: 2,
    etiket: ["amatör lig", "fikstür", "futbol"],
    desen: "nokta",
    govde: [
      "Amatör kümede yeni sezon bu hafta sonu başlıyor. 14 takımın mücadele edeceği ligde 26 hafta oynanacak.",
      "Kura çekimi tamamlandı ve fikstür kulüplere gönderildi. İlk hafta maçları cumartesi günü kent stadı ve iki sentetik sahada oynanacak.",
      "Kulüpler, maç saatlerinin öğrenci sporcular için uygun hâle getirilmesini talep ediyor."
    ]
  },
  {
    id: "film-gunleri",
    bolum: "kultur",
    manset: 6,
    baslik: "Mozaik Film Günleri 1 Ekim'de başlıyor: 38 film, 5 salon",
    spot: "Festivalin açılışı yerli bir belgeselle yapılacak. Gösterimlerin yarısı ücretsiz, biletler kent gişelerinden alınacak.",
    yazar: "elif-duran",
    tarih: "2026-09-22 11:05",
    sure: 4,
    etiket: ["sinema", "festival", "film günleri", "kültür"],
    desen: "mozaik",
    govde: [
      "Bu yıl yedincisi düzenlenen Mozaik Film Günleri, 1 Ekim'de başlıyor. Festival kapsamında 38 film, kentteki 5 salonda gösterilecek.",
      "Programda yerli belgeseller, kısa film seçkisi, çocuk kuşağı ve yönetmen söyleşileri var. Açılış, kentin su kaynaklarını konu alan bir belgeselle yapılacak.",
      { alt: "Biletler ve ücretsiz gösterimler" },
      "Gösterimlerin yarısı ücretsiz olacak; ücretli etkinliklerin biletleri kent gişelerinden ve festival noktasından temin edilebilecek.",
      "Festival kapsamında ayrıca kısa film atölyesi düzenlenecek. Atölyeye katılım için ön kayıt gerekiyor."
    ]
  },
  {
    id: "sergi-cam",
    bolum: "kultur",
    baslik: "Zambak Sanat Galerisi'nde 'Cam ve Işık' sergisi açıldı",
    spot: "32 sanatçının cam heykel ve ışık yerleştirmelerinden oluşan sergi, 30 Kasım'a kadar gezilebilecek.",
    yazar: "elif-duran",
    tarih: "2026-09-20 18:30",
    sure: 3,
    etiket: ["sergi", "sanat", "galeri", "cam"],
    desen: "izgara",
    govde: [
      "Zambak Sanat Galerisi, yeni sezonu 'Cam ve Işık' sergisiyle açtı. Sergide 32 sanatçının cam heykel ve ışık yerleştirmeleri yer alıyor.",
      "Küratör, serginin kentin cam atölyeleriyle kurduğu bağı anlatmak üzere tasarlandığını belirtti. Bazı eserler atölye atıklarından üretildi.",
      "Sergi hafta sonları 21.00'e kadar açık olacak; giriş öğrenciler için ücretsiz."
    ]
  },
  {
    id: "tiyatro-sezon",
    bolum: "kultur",
    baslik: "Kent Tiyatrosu yeni sezonda 6 oyunla perde açıyor",
    spot: "Sezonun ilk prömiyeri 3 Ekim'de yapılacak. Oyunlardan ikisi ilk kez sahnelenecek.",
    yazar: "elif-duran",
    tarih: "2026-09-17 10:45",
    sure: 2,
    etiket: ["tiyatro", "sahne", "sezon"],
    desen: "dalga",
    govde: [
      "Kent Tiyatrosu yeni sezon programını açıkladı. Sezonda 6 oyun sahnelenecek, bunlardan ikisi dünya prömiyeri olacak.",
      "Sezonun ilk gösterimi 3 Ekim'de yapılacak. Biletler gişe ve çevrimiçi satış noktalarından temin edilebilecek.",
      "Tiyatro yönetimi, öğrenci grupları için hafta içi matine gösterimleri planladıklarını duyurdu."
    ]
  },
  {
    id: "acik-veri",
    bolum: "teknoloji",
    baslik: "Belediyeden açık veri portalı: 112 veri seti erişime açıldı",
    spot: "Ulaşım, çevre ve imar verileri ücretsiz olarak indirilebilecek. Portal, geliştiriciler için örnek kodlar da sunuyor.",
    yazar: "mert-kayabas",
    tarih: "2026-09-21 09:50",
    sure: 4,
    etiket: ["açık veri", "portal", "teknoloji", "belediye"],
    desen: "nokta",
    govde: [
      "Mozaikkent Büyükşehir Belediyesi açık veri portalını hizmete açtı. Portalda 112 veri seti ücretsiz erişime sunuldu.",
      "Veriler ulaşım, çevre, imar, sosyal hizmetler ve bütçe başlıklarında toplandı. Setler CSV ve JSON biçiminde indirilebiliyor.",
      { alt: "Geliştiriciler için ne var?" },
      "Portalda uygulama geliştiricileri için örnek sorgular, harita katmanı ve kullanım koşulları yayımlandı. Belediye, üç ayda bir yeni set ekleneceğini bildirdi.",
      "Veri setlerinin büyük bölümü aylık olarak güncellenecek. Eski sürümler arşivde tutulacak."
    ]
  },
  {
    id: "akilli-durak",
    bolum: "teknoloji",
    baslik: "Akıllı duraklar 40 noktada devrede: otobüs nerede, kaç dakika?",
    spot: "Ekranlı duraklar otobüsün konumunu ve tahmini varış süresini gösteriyor. Sistem kademeli olarak 120 durağa yayılacak.",
    yazar: "mert-kayabas",
    tarih: "2026-09-19 08:20",
    sure: 3,
    etiket: ["akıllı durak", "ulaşım", "teknoloji", "otobüs"],
    desen: "mozaik",
    govde: [
      "Kentte 40 noktaya kurulan akıllı duraklar devreye girdi. Duraklardaki ekranlar, yaklaşan otobüsün konumunu ve tahmini varış süresini gösteriyor.",
      "Sistem, araçlardaki konum birimlerinden gelen veriyi kullanıyor. Yoğun saatlerde tahminin 1-2 dakika içinde güncellendiği bildirildi.",
      "Projenin yıl sonuna kadar 120 durağa yayılması planlanıyor. Ekranlarda ayrıca duraktan geçen hatlar ve aktarma seçenekleri yer alacak."
    ]
  },
  {
    id: "pazar-fiyatlari",
    bolum: "yasam",
    baslik: "Semt pazarında tezgâh turu: sebzede fiyatlar geriledi, ette yatay",
    spot: "Muhabirimiz üç semt pazarını gezdi. Domates ve biberde yüzde 15'e varan düşüş var; kırmızı et fiyatları ise değişmedi.",
    yazar: "selin-aksoy",
    tarih: "2026-09-22 12:30",
    sure: 4,
    etiket: ["pazar", "fiyat", "sebze", "mutfak"],
    desen: "izgara",
    govde: [
      "Muhabirimiz kentin üç semt pazarını gezerek tezgâh fiyatlarını karşılaştırdı. Sebzede hasat bolluğuna bağlı düşüş dikkat çekiyor.",
      "Domates 28 liradan 23 liraya, yeşil biber 32 liradan 27 liraya geriledi. Patates ve soğanda fiyat değişmedi.",
      { alt: "Et ve süt ürünleri" },
      "Kırmızı et fiyatları geçen haftaya göre yatay seyrediyor. Peynir çeşitlerinde ise 5-8 lira arası artış görüldü.",
      "Pazarcı esnafı, önümüzdeki hafta hava sıcaklıklarının düşmesiyle sera ürünlerinde fiyat hareketliliği bekliyor."
    ]
  },
  {
    id: "gastronomi",
    bolum: "yasam",
    baslik: "Mozaik Lezzet Günleri'nde 60 stant, 3 gün boyunca açık kalacak",
    spot: "Yerel üretici ve mutfak ustalarını buluşturan festival bu yıl meydanda yapılacak; giriş serbest.",
    yazar: "elif-duran",
    tarih: "2026-09-20 13:15",
    sure: 3,
    etiket: ["gastronomi", "festival", "lezzet", "yerel üretici"],
    desen: "dalga",
    govde: [
      "Mozaik Lezzet Günleri bu yıl Kent Meydanı'nda yapılacak. Üç gün sürecek etkinlikte 60 stant kurulacak.",
      "Festivalde yerel üreticilerin ürünlerinin yanı sıra yöresel yemek atölyeleri, çocuklar için mutfak oyun alanı ve sokak müzisyenleri yer alacak.",
      "Etkinlik girişi ücretsiz olacak. Organizasyon komitesi, tek kullanımlık plastik yerine dönüştürülebilir kaplar kullanılacağını duyurdu."
    ]
  },
  {
    id: "egitim-kayit",
    bolum: "egitim",
    baslik: "Meslek liselerine kayıtta yeni dönem: 9 Ekim'e kadar başvuru",
    spot: "Alan tanıtım günleri kapsamında 14 okul kapılarını açacak. Öğrenciler atölyeleri gezerek bölüm seçebilecek.",
    yazar: "selin-aksoy",
    tarih: "2026-09-21 15:35",
    sure: 3,
    etiket: ["meslek lisesi", "kayıt", "eğitim", "atölye"],
    desen: "nokta",
    govde: [
      "Meslek liselerine kayıt dönemi için başvurular 9 Ekim'e kadar sürecek. İl Millî Eğitim Müdürlüğü, alan tanıtım günleri düzenliyor.",
      "Etkinlikte 14 okul atölyelerini ve laboratuvarlarını öğrenci ve velilere açacak. Bilişim, elektrik-elektronik, mobilya, gıda ve sağlık alanları tanıtılacak.",
      "Müdürlük, meslek liselerinden mezun olan öğrencilerin son üç yılda işe yerleşme oranının yüzde 68 olduğunu açıkladı."
    ]
  },
  {
    id: "universite-lab",
    bolum: "egitim",
    baslik: "Üniversiteye 12 milyon liralık araştırma laboratuvarı kuruluyor",
    spot: "Malzeme ve çevre analizleri yapabilecek laboratuvar, sanayi kuruluşlarına da test hizmeti verecek.",
    yazar: "mert-kayabas",
    tarih: "2026-09-18 09:40",
    sure: 3,
    etiket: ["üniversite", "laboratuvar", "araştırma", "sanayi"],
    desen: "mozaik",
    govde: [
      "Mozaikkent Üniversitesi bünyesinde 12 milyon lira bütçeli araştırma laboratuvarı kuruluyor. Laboratuvarın gelecek yıl ilk yarısında açılması hedefleniyor.",
      "Merkezde malzeme dayanım testleri, su ve toprak analizleri ile çevre ölçümleri yapılacak. Sanayi kuruluşları da ücretli test hizmeti alabilecek.",
      "Rektörlük, laboratuvarın lisansüstü araştırmalara ve ortak projelere açık olacağını bildirdi."
    ]
  },
  {
    id: "aile-hekimligi",
    bolum: "saglik",
    baslik: "Aile hekimliğinde randevu saatleri uzatıldı: akşam 19.00'a kadar",
    spot: "On iki aile sağlığı merkezinde pilot uygulama başladı. Meme ve kan basıncı taramaları da ücretsiz yapılıyor.",
    yazar: "selin-aksoy",
    tarih: "2026-09-22 08:50",
    sure: 3,
    etiket: ["aile hekimliği", "randevu", "sağlık", "tarama"],
    desen: "izgara",
    govde: [
      "Kentte 12 aile sağlığı merkezinde randevu saatleri uzatıldı. Pilot uygulamayla merkezler akşam 19.00'a kadar hizmet verecek.",
      "İl Sağlık Müdürlüğü, uygulamanın çalışanların mesai dışı erişimini kolaylaştırmak için başlatıldığını bildirdi. Randevu sistemi üzerinden gün içinde kayıt yapılabiliyor.",
      "Ayrıca merkezlerde 40 yaş üstü vatandaşlar için kan basıncı ve şeker taraması, kadınlar için meme muayenesi yönlendirmesi ücretsiz sürüyor."
    ]
  },
  {
    id: "dere-islahi",
    bolum: "cevre",
    baslik: "Narlıbahçe Deresi ıslahında son etaba girildi",
    spot: "Koku ve taşkın şikâyetlerine çözüm için 4,2 kilometrelik hatta taban temizliği ve korkuluk çalışması yapılıyor.",
    yazar: "selin-aksoy",
    tarih: "2026-09-21 11:10",
    sure: 3,
    etiket: ["dere", "ıslah", "çevre", "taşkın"],
    desen: "dalga",
    govde: [
      "Narlıbahçe Deresi ıslah çalışmasında son etaba girildi. Proje kapsamında 4,2 kilometrelik hatta taban temizliği ve korkuluk yenilemesi yapılıyor.",
      "Çalışma tamamlandığında dere çevresinde yürüyüş yolu ve ağaçlandırma düzenlemesi yapılacak. Belediye, taşkın riskinin azalmasını bekliyor.",
      "Mahalle sakinleri, yaz aylarında yaşanan koku şikâyetinin ilk etapta azaldığını belirtiyor."
    ]
  },
  {
    id: "geri-donusum",
    bolum: "cevre",
    baslik: "Geri dönüşümde yeni sistem: 60 noktaya atık getirme merkezi",
    spot: "Cam, kâğıt, plastik ve elektronik atık ayrı toplanacak. Toplama noktaları mahalle haritasından görülebilecek.",
    yazar: "selin-aksoy",
    tarih: "2026-09-17 16:20",
    sure: 2,
    etiket: ["geri dönüşüm", "atık", "çevre", "sıfır atık"],
    desen: "nokta",
    govde: [
      "Kente 60 yeni atık getirme merkezi kuruluyor. Merkezlerde cam, kâğıt, plastik, metal ve elektronik atık ayrı toplanacak.",
      "Toplama noktaları belediyenin çevrimiçi haritasından görülebilecek. Vatandaşlar en yakın merkezi adres tarifiyle bulabilecek.",
      "Belediye, sistemin devreye girmesiyle yıllık 4 bin ton atığın geri kazanılmasını hedefliyor."
    ]
  },
  {
    id: "roportaj-yasar-elma",
    bolum: "roportaj",
    manset: 7,
    baslik: "Yaşar Elma: “Gazetecilik kentin hafızasıdır, hafızasız kent yönünü bulamaz”",
    spot: "Mozaikkent Gazetesi'nin imtiyaz sahibi Yaşar Elma ile kent gazeteciliğini, yerel basının ekonomik zorluklarını ve dijitalleşmeyi konuştuk.",
    yazar: "elif-duran",
    tarih: "2026-09-22 13:00",
    sure: 6,
    etiket: ["röportaj", "basın", "yerel medya", "Yaşar Elma"],
    desen: "mozaik",
    govde: [
      "Mozaikkent Gazetesi yedi yıldır kentin sokaklarını, meclis salonlarını ve mahalle kahvelerini takip ediyor. Gazetenin imtiyaz sahibi Yaşar Elma ile haber odasında konuştuk.",
      { alt: "“Haber, kapıyı çalmakla başlar”" },
      "“Gazetecilik kentin hafızasıdır; hafızasız bir kent yönünü bulamaz” diyen Elma, kendi çalışma yöntemini şöyle anlatıyor: “Bizim haberimiz masada değil sokakta başlar. Kapıyı çalarsın, esnafın derdini dinlersin, kayıt alırsın, sonra yazarsın. Kimseye ‘acaba doğru mu’ diye sormana gerek kalmaz; çünkü sen orada bulunmuşsundur.”",
      { alt: "“Reklam değil, okur gücü”" },
      "Yerel basının en büyük sorununun reklam baskısı olduğunu belirten Elma, haber ile ilan arasına kalın bir çizgi çektiklerini söylüyor: “Bir işletmenin ilanı ile o işletme hakkındaki haber aynı sayfada bile aynı üslupla yazılmaz. Bunu yazı işleri kurallarımıza koyduk.”",
      "Dijitalleşme konusunda ise temkinli: “Telefonla herkes haber çekiyor ama doğrulanmamış bilgi haber değildir, dedikodudur. En zor iş doğrulamak; biz onu yapmaya devam edeceğiz.”",
      { alt: "Genç gazetecilere önerisi" },
      "Elma, genç muhabirlere şu üç cümleyi miras bırakıyor: “Not al, kaydet, doğrula. Kimseye borçlu olduğun tek şey okurdur. Yanılırsan düzeltmesini aynı sayfada yaz.”"
    ]
  },
  {
    id: "canli-yayin-acildi",
    bolum: "video",
    baslik: "MOZAİKKENT TV canlı yayında: haber bülteni ve radyo aynı panelde",
    spot: "Sitenin üst şeridindeki “CANLI” düğmesinden televizyon ve radyo yayınlarına doğrudan ulaşabiliyorsunuz.",
    yazar: "yasar-elma",
    tarih: "2026-09-22 14:00",
    sure: 2,
    etiket: ["canlı yayın", "video", "radyo", "televizyon"],
    desen: "dalga",
    govde: [
      "Mozaikkent Gazetesi'nin dijital yayınına canlı yayın paneli eklendi. Üst şeritteki CANLI düğmesine basıldığında televizyon ve radyo kanalları aynı panelde açılıyor.",
      "Panelde haber kanallarının yanı sıra müzik ve kültür kanalları da bulunuyor. Yayın seçildikten sonra oynatma tarayıcı üzerinden başlıyor.",
      "Canlı yayınlar internet bağlantısı gerektirir; bağlantı kesildiğinde panelde uyarı görünür ve başka bir kanal seçilebilir."
    ]
  }
];

var KOSE_YAZILARI = [
  {
    id: "hafiza",
    yazar: "yasar-elma",
    baslik: "Bir kentin hafızası sokak isimlerinde saklıdır",
    tarih: "2026-09-22 07:00",
    sure: 4,
    etiket: ["başyazı", "kent", "hafıza"],
    spot: "Sokak adları değiştiğinde kaybolan yalnızca bir tabela değildir; orada yaşamış insanların hatırası da yer değiştirir.",
    govde: [
      "Kentin eski sakinleriyle konuştuğunuzda ilk anlattıkları şey binalar değil, sokak adları oluyor. “Şurada fırın vardı, adı da o sokaktandı” diye başlıyorlar söze. Ad, mekânı hatırlamanın anahtarı.",
      "Bu yüzden sokak ismi değişikliklerini yalnızca bir yönetim işlemi olarak görmemek gerekiyor. Değişiklik yapılacaksa eski adın yaşatılması, en azından kayda geçmesi gerekir.",
      "Gazete olarak bu konuda basit bir öneri sunuyoruz: her isim değişikliğinde kısa bir gerekçe yayımlansın, eski ad tabelanın altında küçük puntoyla yer alsın. Bu, kentin hafızasına saygının en ucuz yoludur.",
      "Unutmayalım: Bir kent, kendisini hatırlayan insanların sayısı kadar büyüktür."
    ]
  },
  {
    id: "esnaf",
    yazar: "mert-kayabas",
    baslik: "Esnafın en büyük gideri artık kira değil, belirsizlik",
    tarih: "2026-09-21 09:00",
    sure: 3,
    etiket: ["ekonomi", "esnaf", "köşe yazısı"],
    spot: "Tezgâh başında yaptığımız sohbetlerde aynı cümle tekrarlanıyor: “Yarın ne olacağını bilmiyorum.”",
    govde: [
      "Kentte üç ayrı çarşıda esnafla konuştum. Sorduğum soru şuydu: “Son bir yılda sizi en çok ne zorladı?” Beklediğim cevap kira ya da elektrik faturasıydı; aldığım cevap belirsizlik oldu.",
      "Belirsizlik, yatırım kararını da durduruyor. Yeni tezgâh açmayan esnaf, yeni eleman almıyor; almayınca istihdam da yerinde sayıyor.",
      "Çözüm karmaşık değil: kuralların önceden ve yazılı olması. Hangi belge, hangi süre, hangi ücret — açık yazılırsa esnaf önünü görebilir.",
      "Ekonomi haberciliğinin işi de burada başlıyor: rakamı yazmakla kalmayıp o rakamın tezgâhtaki karşılığını göstermek."
    ]
  },
  {
    id: "amatort",
    yazar: "nur-aydemir",
    baslik: "Amatör kümede asıl mesele kale değil, ulaşım",
    tarih: "2026-09-19 12:00",
    sure: 3,
    etiket: ["spor", "amatör lig", "köşe yazısı"],
    spot: "Genç sporcuların en çok zorlandığı şey rakip takım değil, deplasmana gitmek için bulunacak servis.",
    govde: [
      "Hafta sonu oynanan amatör maçlara giden gençlerin çoğu kendi imkânlarıyla ulaşım sağlıyor. Bazı kulüpler minibüs parasını velilerden topluyor.",
      "Yeteneğin keşfedilmesi için önce sahaya çıkabilmek gerekiyor. Ulaşım, forma ve saha tahsisi gibi temel ihtiyaçlar çözülmeden altyapıdan bahsetmek zor.",
      "Belediyenin servis desteği ve saha saatlerinin okul çıkışına göre düzenlenmesi, bu işin en ucuz ve en etkili adımı olur.",
      "Kent sporunun geleceği, en pahalı transferde değil en genç oyuncunun sahaya ulaşabildiği serviste saklı."
    ]
  },
  {
    id: "kutuphane",
    yazar: "elif-duran",
    baslik: "Kütüphane akşamları: sessizliğin en kalabalık hâli",
    tarih: "2026-09-18 19:00",
    sure: 3,
    etiket: ["kültür", "kütüphane", "köşe yazısı"],
    spot: "Kent kütüphanesinin akşam saatlerinde masalar doluyor; sınav hazırlığı yapan gençlerin ortak şikâyeti ise tek bir priz.",
    govde: [
      "Kent kütüphanesinin akşam kuşağında masaların tamamı dolu. Öğrenciler, çoğunlukla kendi dizüstü bilgisayarlarıyla geliyor.",
      "Sorun basit ama etkili: masa başına bir priz yetmiyor. Prizi olmayan masalarda çalışan öğrenciler, telefon şarjı için sıra bekliyor.",
      "Bu, bütçesi küçük bir düzenleme; etkisi ise büyük. Birkaç uzatma kablosu ve sessiz çalışma odası ayrımı, onlarca gencin verimini artırır.",
      "Kütüphaneler kentin en ucuz eğitim yatırımıdır; bu yatırımı akşam saatlerinde de çalıştırmak gerekir."
    ]
  }
];
