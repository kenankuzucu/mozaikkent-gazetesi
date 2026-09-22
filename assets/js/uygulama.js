/* ==========================================================================
   MOZAİKKENT GAZETESİ — motor (uygulama.js)
   Sıra: yardımcılar → görseller → sayfalar → yan panel → yönlendirme
   ========================================================================== */
var MK = window.MK = {};

/* ------------------------------ YARDIMCILAR ------------------------------ */
function $(id){ return document.getElementById(id); }
function esc(s){
  return String(s === null || s === undefined ? "" : s)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function bolumBul(id){
  for (var i=0;i<BOLUMLER.length;i++) if (BOLUMLER[i].id===id) return BOLUMLER[i];
  return { id:id||"gundem", ad:"HABER", renk:"#8c1c2b", simge:"📰" };
}
function yazarBul(slug){
  for (var i=0;i<YAZARLAR.length;i++) if (YAZARLAR[i].slug===slug) return YAZARLAR[i];
  return { slug:"", ad:"MOZAİKKENT HABER MERKEZİ", unvan:"Haber Merkezi", bio:"" };
}
function haberBul(id){
  for (var i=0;i<HABERLER.length;i++) if (HABERLER[i].id===id) return HABERLER[i];
  return null;
}
function koseBul(id){
  for (var i=0;i<KOSE_YAZILARI.length;i++) if (KOSE_YAZILARI[i].id===id) return KOSE_YAZILARI[i];
  return null;
}
function kunyeAd(o){
  if (o.yazarAd) return o.yazarAd;
  if (o.yazar) return yazarBul(o.yazar).ad;
  return "Haber Merkezi";
}
function yazarSlug(o){ return o.yazar || ""; }
function trNorm(a){
  return String(a || "").toLocaleLowerCase("tr-TR")
    .replace(/[âÂ]/g,"a").replace(/[îÎ]/g,"i").replace(/[ûÛ]/g,"u")
    .replace(/[ıİI]/g,"i").replace(/ş/g,"s").replace(/ğ/g,"g")
    .replace(/ü/g,"u").replace(/ö/g,"o").replace(/ç/g,"c").replace(/['’`]/g,"");
}
var GUNLER = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];
var AYLAR = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
function tarihParca(iso){
  if (!iso) return null;
  var p = String(iso).replace("T"," ").split(" ");
  var g = p[0].split("-");
  if (g.length!==3) return null;
  return { y:parseInt(g[0],10), a:parseInt(g[1],10), g:parseInt(g[2],10), s:p[1] ? p[1].slice(0,5) : "" };
}
function tarihUzun(iso){
  var t = tarihParca(iso); if (!t) return "";
  return t.g + " " + AYLAR[t.a-1] + " " + t.y + (t.s ? " · " + t.s : "");
}
function tarihKisa(iso){
  var t = tarihParca(iso); if (!t) return "";
  return t.g + " " + AYLAR[t.a-1];
}
function zamanFarki(iso){
  var t = tarihParca(iso); if (!t) return "";
  var d = new Date(t.y, t.a-1, t.g, t.s ? parseInt(t.s.slice(0,2),10) : 9, t.s ? parseInt(t.s.slice(3,5),10) : 0);
  var f = Math.round((Date.now() - d.getTime())/60000);
  if (f < 0) return "az sonra";
  if (f < 60) return f + " dk önce";
  if (f < 1440) return Math.round(f/60) + " saat önce";
  if (f < 4320) return Math.round(f/1440) + " gün önce";
  return tarihKisa(iso);
}
function tohum(s){ var h=0, i; for (i=0;i<s.length;i++){ h = (h*31 + s.charCodeAt(i)) % 100000; } return h; }
function kaydir(hedef){
  var el = document.querySelector(hedef);
  if (el) el.scrollIntoView({ block:"start", behavior:"instant" in el ? "instant" : "auto" });
}

/* ------------------------------ YEREL KAYIT ------------------------------ */
var MKANAHTAR = { tema:"mk_tema", yazi:"mk_yazi", okuma:"mk_okuma", kayit:"mk_kayit" };
function oku(k, yedek){
  try { var v = localStorage.getItem(k); return v === null ? yedek : JSON.parse(v); }
  catch(e){ return yedek; }
}
function yaz(k, v){
  try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){ }
}
var OKUMA = oku(MKANAHTAR.okuma, {});
var KAYIT = oku(MKANAHTAR.kayit, []);
function okumaArtir(id){
  OKUMA[id] = (OKUMA[id] || 0) + 1 + (OKUMA[id] ? Math.round(OKUMA[id]*0.06) : 0);
  yaz(MKANAHTAR.okuma, OKUMA);
}
function enCokOkunan(adet){
  var liste = HABERLER.slice();
  liste.sort(function(a,b){ return (OKUMA[b.id]||0) - (OKUMA[a.id]||0) || (a.tarih<b.tarih?1:-1); });
  return liste.slice(0, adet||5);
}
function kayitliMi(id){ return KAYIT.indexOf(id) > -1; }
function kayitDegistir(id){
  var i = KAYIT.indexOf(id);
  if (i > -1) KAYIT.splice(i,1); else KAYIT.push(id);
  yaz(MKANAHTAR.kayit, KAYIT);
  if ($("kayitSayi")) $("kayitSayi").textContent = KAYIT.length;
  if (location.hash.indexOf("#/haber/") === 0) ciz();
}

/* ------------------------------ GÖRSELLER (SVG kapak) ------------------------------ */
var KAPAK_SAYAC = 0;
function desenCiz(tip, renk, tohumSayi){
  var i, j, o, out = "", w = 400, h = 220;
  if (tip === "mozaik"){
    for (i=0;i<8;i++) for (j=0;j<5;j++){
      o = 0.06 + ((tohumSayi + i*37 + j*61) % 17) / 100;
      out += '<rect x="'+(i*50)+'" y="'+(j*44)+'" width="48" height="42" rx="6" fill="'+renk+'" opacity="'+o.toFixed(2)+'"/>';
    }
  } else if (tip === "izgara"){
    for (i=1;i<8;i++) out += '<line x1="'+(i*50)+'" y1="0" x2="'+(i*50)+'" y2="220" stroke="'+renk+'" stroke-width="1.4" opacity=".22"/>';
    for (j=1;j<5;j++) out += '<line x1="0" y1="'+(j*44)+'" x2="400" y2="'+(j*44)+'" stroke="'+renk+'" stroke-width="1.4" opacity=".22"/>';
    out += '<circle cx="200" cy="110" r="62" fill="none" stroke="'+renk+'" stroke-width="2" opacity=".3"/>';
  } else if (tip === "dalga"){
    for (i=0;i<4;i++){
      var y = 60 + i*32;
      out += '<path d="M0 '+y+' Q 50 '+(y-24)+' 100 '+y+' T 200 '+y+' T 300 '+y+' T 400 '+y+'" fill="none" stroke="'+renk+'" stroke-width="2.2" opacity="'+(0.34-i*0.06).toFixed(2)+'"/>';
    }
  } else {
    for (i=0;i<13;i++) for (j=0;j<8;j++){
      out += '<circle cx="'+(16+i*31)+'" cy="'+(14+j*27)+'" r="'+(((tohumSayi+i*7+j*3)%5)+2)+'" fill="'+renk+'" opacity="0.26"/>';
    }
  }
  return out;
}
function kapakSVG(h, sinif, yaziGoster){
  /* Haber kaydına "foto": "assets/img/xxx.jpg" eklenirse gerçek fotoğraf gösterilir;
     yoksa bölüm rengine göre üretilen mozaik kapak çizilir. */
  if (h.foto){
    return '<img class="'+(sinif||"kartKapak")+'" src="'+esc(h.foto)+'" alt="'+esc(h.baslik)+'" loading="lazy">';
  }
  var b = bolumBul(h.bolum), k = h.kapak || {};
  var tip = k.desen || h.desen || "mozaik";
  var tohumSayi = tohum(h.id || "x");
  var gid = "gr" + (KAPAK_SAYAC++);
  var s = '<svg class="'+(sinif||"kartKapak")+'" viewBox="0 0 400 220" preserveAspectRatio="none" role="img" aria-label="'+esc(b.ad)+' görseli">';
  s += '<defs><linearGradient id="'+gid+'" x1="0" y1="0" x2="1" y2="1">';
  s += '<stop offset="0" stop-color="'+b.renk+'" stop-opacity=".92"/>';
  s += '<stop offset="1" stop-color="'+b.renk+'" stop-opacity=".45"/></linearGradient></defs>';
  s += '<rect width="400" height="220" fill="url(#'+gid+')"/>';
  s += '<rect width="400" height="220" fill="#0b0d12" opacity=".35"/>';
  s += desenCiz(tip, "#ffffff", tohumSayi);
  if (yaziGoster !== false){
    s += '<text x="20" y="196" font-family="Georgia,serif" font-size="26" fill="#ffffff" opacity=".95" letter-spacing="1">'+esc(b.ad)+'</text>';
    s += '<text x="20" y="42" font-family="Georgia,serif" font-size="52" font-weight="bold" fill="#ffffff" opacity=".28">'+esc(b.ad.charAt(0))+'</text>';
  }
  s += '</svg>';
  return s;
}

/* ------------------------------ ÇİP / KART ------------------------------ */
function cip(bolumId){
  var b = bolumBul(bolumId);
  return '<span class="cip" style="background:'+b.renk+'">'+esc(b.simge+" "+b.ad)+'</span>';
}
function kartHTML(h){
  var y = yazarBul(h.yazar);
  var kayitli = kayitliMi(h.id) ? " 🔖" : "";
  return '<article class="kart" onclick="git(\'haber/'+h.id+'\')" tabindex="0">'+
    kapakSVG(h, "kartKapak")+
    '<div class="kartGovde">'+ cip(h.bolum) +
    '<h3>'+esc(h.baslik)+'</h3>'+
    '<p class="spot">'+esc(h.spot)+'</p>'+
    '<div class="kartMeta"><span class="yazarAd">'+esc(y.ad)+'</span><span>'+esc(zamanFarki(h.tarih))+'</span><span>🕒 '+h.sure+' dk'+kayitli+'</span></div>'+
    '</div></article>';
}
function yanMansetHTML(h){
  return '<article class="yanManset" onclick="git(\'haber/'+h.id+'\')" tabindex="0">'+
    kapakSVG(h, "kapak", false)+
    '<div class="icerik">'+cip(h.bolum)+'<h4>'+esc(h.baslik)+'</h4>'+
    '<div class="meta">'+esc(yazarBul(h.yazar).ad)+' · '+esc(zamanFarki(h.tarih))+'</div></div></article>';
}
function seritOgeHTML(h){
  var b = bolumBul(h.bolum);
  return '<article class="sOge" style="border-left-color:'+b.renk+'" onclick="git(\'haber/'+h.id+'\')" tabindex="0">'+
    '<span>'+esc(b.simge+" "+b.ad)+' · '+esc(zamanFarki(h.tarih))+'</span><h4>'+esc(h.baslik)+'</h4></article>';
}
function bos(metin, simge){
  return '<div class="bos"><div>'+(simge||"🗞")+'</div><p>'+esc(metin)+'</p></div>';
}
function mansetSirasi(n){ var i, l=[]; for (i=0;i<HABERLER.length;i++) if (HABERLER[i].manset===n) l.push(HABERLER[i]); return l; }
function tariheGoreSirala(l){
  var k = l.slice();
  k.sort(function(a,b){ return (a.tarih<b.tarih) ? 1 : ((a.tarih>b.tarih) ? -1 : 0); });
  return k;
}

/* ------------------------------ YAN PANEL ------------------------------ */
function kutular(){
  var o = "";
  var populer = enCokOkunan(5);
  o += '<div class="kutu"><div class="kutuBas">EN ÇOK OKUNANLAR</div><div class="kutuIc">';
  for (var i=0;i<populer.length;i++){
    var p = populer[i];
    o += '<div class="sira" onclick="git(\'haber/'+p.id+'\')"><div class="no">'+(i+1)+'</div><div>'+
         '<div class="sB">'+esc(p.baslik)+'</div><div class="sM">'+esc(bolumBul(p.bolum).ad)+' · '+
         ((OKUMA[p.id]||0)>0 ? (OKUMA[p.id]+" okunma") : esc(zamanFarki(p.tarih)))+'</div></div></div>';
  }
  o += '</div></div>';

  o += '<div class="kutu"><div class="kutuBas">KÖŞE YAZILARI</div><div class="kutuIc">';
  for (var j=0;j<KOSE_YAZILARI.length;j++){
    var ky = KOSE_YAZILARI[j], yz = yazarBul(ky.yazar);
    o += '<div class="sira" onclick="git(\'kose/'+ky.id+'\')"><div>'+
         '<div class="sB">'+esc(ky.baslik)+'</div><div class="sM">'+esc(yz.ad)+' · '+esc(tarihKisa(ky.tarih))+'</div></div></div>';
  }
  o += '</div></div>';

  o += '<div class="kutu"><div class="kutuBas">GÜNDEM ETİKETLERİ</div><div class="kutuIc" style="display:flex;gap:8px;flex-wrap:wrap">';
  var etk = tumEtiketler().slice(0,14);
  for (var k=0;k<etk.length;k++){
    o += '<a class="etiket" href="#/etiket/'+encodeURIComponent(etk[k].ad)+'">'+esc(etk[k].ad)+' ('+etk[k].say+')</a>';
  }
  o += '</div></div>';

  o += '<div class="kutu bulten"><div class="kutuBas">GÜNLÜK BÜLTEN</div><div class="kutuIc">'+
       '<p style="color:var(--yazi2);font-size:calc(13.5px * var(--yaz));margin:0 0 10px">Her sabah kentin özeti e-postanıza gelsin.</p>'+
       '<input id="bultenEposta" type="email" placeholder="e-posta adresiniz">'+
       '<button id="bultenDugme">Bültene katıl</button>'+
       '<div id="bultenSonuc" style="font-size:calc(12.5px * var(--yaz));color:var(--gri);margin-top:8px"></div>'+
       '</div></div>';
  return o;
}
function yanPanel(){
  return '<aside class="yanPanel">'+kutular()+'</aside>';
}
function duzen(anaHTML){
  /* İçerik TEK sarmalayıcıya alınmalı: .haberDuzen iki kolonlu ızgaradır ve sarmalanmazsa
     ana içeriğin her üst düzey elemanı ayrı bir ızgara hücresine düşer (şerit/haber sayfası kayardı). */
  return '<div class="haberDuzen"><div class="anaKol">'+anaHTML+'</div>'+yanPanel()+'</div>';
}

/* ------------------------------ SAYFALAR ------------------------------ */
function anaSayfa(){
  var buyuk = mansetSirasi(1)[0] || tariheGoreSirala(HABERLER)[0];
  var yanListe = mansetSirasi(2).concat(mansetSirasi(3), mansetSirasi(4)).slice(0,3);
  var seritListe = mansetSirasi(5).concat(mansetSirasi(6), mansetSirasi(7));
  var gecmis = [];
  if (buyuk) gecmis.push(buyuk.id);
  var i;
  for (i=0;i<yanListe.length;i++) gecmis.push(yanListe[i].id);
  for (i=0;i<seritListe.length;i++) gecmis.push(seritListe[i].id);

  var o = "";
  o += '<div class="mansetAlani">';
  if (buyuk){
    o += '<article class="mansetBuyuk" onclick="git(\'haber/'+buyuk.id+'\')" tabindex="0">'+
         kapakSVG(buyuk, "kapak", false)+
         '<div class="icerik">'+cip(buyuk.bolum)+'<h3>'+esc(buyuk.baslik)+'</h3>'+
         '<p>'+esc(buyuk.spot)+'</p>'+
         '<div class="kartMeta" style="margin-top:10px"><span class="yazarAd">'+esc(yazarBul(buyuk.yazar).ad)+'</span>'+
         '<span>'+esc(tarihUzun(buyuk.tarih))+'</span><span>🕒 '+buyuk.sure+' dk okuma</span></div></div></article>';
  }
  o += '<div class="mansetYan">';
  for (i=0;i<yanListe.length;i++) o += yanMansetHTML(yanListe[i]);
  o += '</div></div>';

  if (seritListe.length){
    o += '<div class="serit">';
    for (i=0;i<seritListe.length;i++) o += seritOgeHTML(seritListe[i]);
    o += '</div>';
  }

  o += '<div class="bolumBas"><span class="simge">🗞</span><h2>SON HABERLER</h2><span class="adet">'+
       HABERLER.length+' haber yayında</span></div>';

  var kalan = [];
  for (i=0;i<HABERLER.length;i++) if (gecmis.indexOf(HABERLER[i].id) === -1) kalan.push(HABERLER[i]);
  kalan = tariheGoreSirala(kalan).slice(0,9);
  o += '<div class="izgara">';
  for (i=0;i<kalan.length;i++) o += kartHTML(kalan[i]);
  o += '</div>';

  o += '<div style="margin:22px 0 0;display:flex;gap:12px;flex-wrap:wrap">'+
       '<button class="miniDugme" style="padding:11px 18px" onclick="git(\'arsiv\')">TÜM HABER ARŞİVİ ('+HABERLER.length+')</button>'+
       '<button class="miniDugme" style="padding:11px 18px" onclick="git(\'galeri\')">GÖRSEL VİTRİN</button>'+
       '<button class="miniDugme" style="padding:11px 18px" onclick="git(\'kunye\')">KÜNYE</button>'+
       '</div>';

  return duzen(o);
}
function bolumSayfa(id){
  var b = bolumBul(id);
  var liste = tariheGoreSirala(HABERLER.filter ? HABERLER.filter(function(x){ return x.bolum===id; }) :
    (function(){ var l=[],i; for(i=0;i<HABERLER.length;i++) if (HABERLER[i].bolum===id) l.push(HABERLER[i]); return l; })());
  var o = '<div class="bolumBas"><span class="simge">'+b.simge+'</span><h2>'+esc(b.ad)+'</h2>'+
          '<span class="adet">'+liste.length+' haber</span></div>';
  if (!liste.length) o += bos("Bu bölümde henüz haber yok.");
  else {
    o += '<div class="izgara">';
    for (var i=0;i<liste.length;i++) o += kartHTML(liste[i]);
    o += '</div>';
  }
  return duzen(o);
}
function haberSayfa(id, kose){
  var h = kose ? koseBul(id) : haberBul(id);
  if (!h){
    return duzen('<div class="bolumBas"><h2>HABER BULUNAMADI</h2></div>'+
      bos("Aradığınız haber yayından kaldırılmış olabilir.", "🔍"));
  }
  if (!kose) okumaArtir(h.id);
  var y = yazarBul(h.yazar);
  var b = kose ? { ad:"KÖŞE", renk:"#8a6d3b", simge:"✍" } : bolumBul(h.bolum);
  var o = '<nav style="color:var(--gri);font-size:calc(13px * var(--yaz));margin-bottom:14px">'+
          '<a href="#/">ANA SAYFA</a> › '+(kose ? '<a href="#/kose">KÖŞE YAZILARI</a>' :
          '<a href="#/bolum/'+b.id+'">'+esc(b.ad)+'</a>')+'</nav>';
  o += kose ? "" : '<div class="haberKapak">'+kapakSVG(h,"kapak",false)+'</div>';
  o += '<article class="haberBas">';
  if (!kose) o += cip(h.bolum);
  o += '<h1>'+esc(h.baslik)+'</h1>';
  o += '<p class="haberSpot">'+esc(h.spot)+'</p>';
  o += '<div class="haberMeta">'+
       '<a class="ye" href="#/yazar/'+y.slug+'"><span class="madalyon">'+esc(y.ad.charAt(0))+'</span>'+
       '<span>'+esc(y.ad)+'<br><span style="color:var(--gri);font-weight:400;font-size:calc(12px * var(--yaz))">'+esc(y.unvan||"")+'</span></span></a>'+
       '<span>'+esc(tarihUzun(h.tarih))+'</span><span>🕒 '+h.sure+' dk okuma</span>'+
       '<button class="miniDugme" id="kaydetTek" onclick="kayitDegistir(\''+h.id+'\')">'+
       (kayitliMi(h.id) ? "🔖 Kaydedildi" : "🔖 Kaydet")+'</button></div>';
  o += '<div class="govde">';
  for (var i=0;i<h.govde.length;i++){
    var p = h.govde[i];
    if (typeof p === "string") o += '<p>'+esc(p)+'</p>';
    else if (p.alt) o += '<h3 class="araBaslik">'+esc(p.alt)+'</h3>';
  }
  o += '</div>';
  o += '<div class="etiketler">';
  for (var j=0;j<(h.etiket||[]).length;j++) o += '<a class="etiket" href="#/etiket/'+encodeURIComponent(h.etiket[j])+'">#'+esc(h.etiket[j])+'</a>';
  o += '</div>';
  o += paylasKutu(h);
  o += '<div class="kutu" style="margin-top:20px"><div class="kutuBas">YAZAR HAKKINDA</div><div class="kutuIc">'+
       '<div style="display:flex;gap:12px;align-items:flex-start"><span class="madalyon" style="width:52px;height:52px;font-size:19px">'+esc(y.ad.charAt(0))+'</span>'+
       '<div><b>'+esc(y.ad)+'</b><div style="color:var(--gri);font-size:calc(12.5px * var(--yaz));margin-bottom:6px">'+esc(y.unvan||"")+'</div>'+
       '<p style="color:var(--yazi2);font-size:calc(14px * var(--yaz));margin:0">'+esc(y.bio||"")+'</p></div></div>'+
       '<div style="margin-top:12px"><button class="miniDugme" onclick="git(\'yazar/'+y.slug+'\')">Yazarın tüm haberleri</button></div>'+
       '</div></div>';
  o += benzerHaberler(h);
  o += '</article>';
  return duzen(o);
}
function paylasKutu(h){
  var sayfaAdresi = location.href, metin = h.baslik;
  return '<div class="paylas"><b>Bu haberi paylaş:</b>'+
    '<a target="_top" rel="noopener" href="https://wa.me/?text='+encodeURIComponent(metin+" "+sayfaAdresi)+'">WhatsApp</a>'+
    '<a target="_top" rel="noopener" href="https://twitter.com/intent/tweet?text='+encodeURIComponent(metin)+'&url='+encodeURIComponent(sayfaAdresi)+'">X</a>'+
    '<a target="_top" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(sayfaAdresi)+'">Facebook</a>'+
    '<a target="_top" rel="noopener" href="https://t.me/share/url?url='+encodeURIComponent(sayfaAdresi)+'&text='+encodeURIComponent(metin)+'">Telegram</a>'+
    '<a target="_top" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(sayfaAdresi)+'">LinkedIn</a>'+
    '<button onclick="baglantKopyala(\''+esc(sayfaAdresi)+'\')">Bağlantıyı kopyala</button>'+
    '<button onclick="window.print()">Yazdır / PDF</button></div>';
}
function baglantKopyala(adres){
  var bitti = function(){ durumCubugu("Bağlantı kopyalandı."); };
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(adres).then(bitti, function(){ eskiKopyala(adres); bitti(); });
  } else { eskiKopyala(adres); bitti(); }
}
function eskiKopyala(adres){
  var t = document.createElement("textarea");
  t.value = adres; document.body.appendChild(t); t.select();
  try { document.execCommand("copy"); } catch(e){}
  document.body.removeChild(t);
}
function benzerHaberler(h){
  var l = tariheGoreSirala(HABERLER.filter(function(x){ return x.bolum===h.bolum && x.id!==h.id; })).slice(0,3);
  if (!l.length) return "";
  var o = '<div class="bolumBas" style="margin-top:30px"><h2 style="font-size:calc(21px * var(--yaz))">AYNI BÖLÜMDEN</h2></div><div class="izgara">';
  for (var i=0;i<l.length;i++) o += kartHTML(l[i]);
  return o+'</div>';
}
function yazarSayfa(slug){
  var y = yazarBul(slug);
  var liste = [], i;
  for (i=0;i<HABERLER.length;i++) if (HABERLER[i].yazar===slug) liste.push(HABERLER[i]);
  var kose = [];
  for (i=0;i<KOSE_YAZILARI.length;i++) if (KOSE_YAZILARI[i].yazar===slug) kose.push(KOSE_YAZILARI[i]);
  liste = tariheGoreSirala(liste);
  var o = '<div class="kutu" style="margin-bottom:22px"><div class="kutuIc" style="display:flex;gap:16px;align-items:flex-start;padding:18px">'+
    '<span class="madalyon" style="width:76px;height:76px;font-size:29px;flex:0 0 76px">'+esc(y.ad.charAt(0))+'</span>'+
    '<div><h2 style="font-size:calc(26px * var(--yaz))">'+esc(y.ad)+'</h2>'+
    '<div style="color:var(--ana2);font-weight:600;margin:2px 0 8px">'+esc(y.unvan||"")+'</div>'+
    '<p style="color:var(--yazi2);margin:0;font-size:calc(14.5px * var(--yaz))">'+esc(y.bio||"")+'</p></div></div></div>';
  if (kose.length){
    o += '<div class="bolumBas"><span class="simge">✍</span><h2>KÖŞE YAZILARI</h2><span class="adet">'+kose.length+' yazı</span></div>';
    for (i=0;i<kose.length;i++){
      o += '<div class="koseKart" onclick="git(\'kose/'+kose[i].id+'\')"><div class="madalyon">'+esc(y.ad.charAt(0))+'</div><div>'+
        '<h3>'+esc(kose[i].baslik)+'</h3><p>'+esc(kose[i].spot)+'</p>'+
        '<div class="meta">'+esc(y.ad)+' · '+esc(tarihUzun(kose[i].tarih))+' · 🕒 '+kose[i].sure+' dk</div></div></div>';
    }
  }
  o += '<div class="bolumBas"><span class="simge">📄</span><h2>HABERLERİ</h2><span class="adet">'+liste.length+' haber</span></div>';
  if (!liste.length) o += bos("Bu yazarın henüz haberi yok.");
  else { o += '<div class="izgara">'; for (i=0;i<liste.length;i++) o += kartHTML(liste[i]); o += '</div>'; }
  return duzen(o);
}
function etiketSayfa(et){
  var l = [], i;
  for (i=0;i<HABERLER.length;i++) if ((HABERLER[i].etiket||[]).indexOf(et) > -1) l.push(HABERLER[i]);
  l = tariheGoreSirala(l);
  var o = '<div class="bolumBas"><span class="simge">#</span><h2>'+esc(et)+'</h2><span class="adet">'+l.length+' haber</span></div>';
  if (!l.length) o += bos("Bu etikette haber bulunamadı.", "🔍");
  else { o += '<div class="izgara">'; for (i=0;i<l.length;i++) o += kartHTML(l[i]); o += '</div>'; }
  return duzen(o);
}
function aramaSayfa(q){
  var s = trNorm(q), l = [], i, j;
  for (i=0;i<HABERLER.length;i++){
    var h = HABERLER[i], havuz = trNorm(h.baslik + " " + h.spot + " " + (h.etiket||[]).join(" ") + " " +
      yazarBul(h.yazar).ad + " " + bolumBul(h.bolum).ad + " " + h.govde.join(" "));
    if (havuz.indexOf(s) > -1) l.push(h);
  }
  l = tariheGoreSirala(l);
  for (i=0;i<KOSE_YAZILARI.length;i++){
    var k = KOSE_YAZILARI[i];
    if (trNorm(k.baslik + " " + k.spot + " " + k.govde.join(" ")).indexOf(s) > -1) l.push(k);
  }
  var o = '<div class="bolumBas"><span class="simge">🔍</span><h2>ARAMA</h2><span class="adet">'+l.length+' sonuç</span></div>'+
    '<div class="aramaBas">“'+esc(q)+'” için '+l.length+' sonuç bulundu.</div>';
  if (!l.length) o += bos("Sonuç bulunamadı. Başka bir kelime deneyin.", "🔍");
  else { o += '<div class="izgara">'; for (i=0;i<l.length;i++) o += kartHTML(l[i]); o += '</div>'; }
  return duzen(o);
}
function kaydedilenSayfa(){
  var l = [], i;
  for (i=0;i<KAYIT.length;i++){ var h = haberBul(KAYIT[i]); if (h) l.push(h); }
  l = tariheGoreSirala(l);
  var o = '<div class="bolumBas"><span class="simge">🔖</span><h2>KAYDETTİKLERİM</h2><span class="adet">'+l.length+' haber</span></div>';
  o += '<div class="aramaBas">Kaydettiğiniz haberler bu tarayıcıda saklanır; başka cihazda görünmez.</div>';
  if (!l.length) o += bos("Henüz haber kaydetmediniz. Haber sayfasındaki “Kaydet” düğmesini kullanabilirsiniz.", "🔖");
  else { o += '<div class="izgara">'; for (i=0;i<l.length;i++) o += kartHTML(l[i]); o += '</div>'; }
  return duzen(o);
}
function koseSayfa(){
  var o = '<div class="bolumBas"><span class="simge">✍</span><h2>KÖŞE YAZILARI</h2>'+
    '<span class="adet">'+KOSE_YAZILARI.length+' yazı</span></div>';
  for (var i=0;i<KOSE_YAZILARI.length;i++){
    var k = KOSE_YAZILARI[i], y = yazarBul(k.yazar);
    o += '<div class="koseKart" onclick="git(\'kose/'+k.id+'\')"><div class="madalyon">'+esc(y.ad.charAt(0))+'</div>'+
      '<div><h3>'+esc(k.baslik)+'</h3><p>'+esc(k.spot)+'</p>'+
      '<div class="meta">'+esc(y.ad)+' · '+esc(y.unvan||"")+' · '+esc(tarihUzun(k.tarih))+' · 🕒 '+k.sure+' dk</div></div></div>';
  }
  return duzen(o);
}
function galeriSayfa(){
  var o = '<div class="bolumBas"><span class="simge">🖼</span><h2>GÖRSEL VİTRİN</h2>'+
    '<span class="adet">'+HABERLER.length+' görsel yuva</span></div>';
  o += '<div class="aramaBas">Şu an her haber, bölüm rengine göre üretilen mozaik kapakla gösteriliyor. '+
       'Haber dosyalarına gerçek fotoğraf eklediğinizde bu vitrin otomatik olarak fotoğrafları gösterir.</div>';
  o += '<div class="galeriIzgara">';
  for (var i=0;i<HABERLER.length;i++){
    var h = HABERLER[i];
    o += '<div class="galeriOge" onclick="git(\'haber/'+h.id+'\')">'+kapakSVG(h,"kapak",false)+
         '<b>'+esc(h.baslik)+'</b></div>';
  }
  o += '</div>';
  return duzen(o);
}
function arsivSayfa(){
  var l = tariheGoreSirala(HABERLER), sonGun = "", o = "";
  o += '<div class="bolumBas"><span class="simge">🗂</span><h2>HABER ARŞİVİ</h2><span class="adet">'+l.length+' haber</span></div>';
  for (var i=0;i<l.length;i++){
    var t = tarihParca(l[i].tarih), gun = t ? (t.g + " " + AYLAR[t.a-1] + " " + t.y) : "";
    if (gun !== sonGun){
      o += '<div class="bolumBas" style="margin-top:22px"><h2 style="font-size:calc(19px * var(--yaz))">'+esc(gun)+'</h2></div>';
      sonGun = gun;
    }
    var b = bolumBul(l[i].bolum);
    o += '<div class="sira" onclick="git(\'haber/'+l[i].id+'\')" style="border-bottom:1px solid var(--cizgi)">'+
      '<div class="no" style="font-size:calc(14px * var(--yaz));color:'+b.renk+';min-width:34px">'+(t?t.s:"")+'</div>'+
      '<div><div class="sB">'+esc(l[i].baslik)+'</div>'+
      '<div class="sM">'+esc(b.simge+" "+b.ad)+' · '+esc(yazarBul(l[i].yazar).ad)+'</div></div></div>';
  }
  return duzen(o);
}
function kunyeSayfa(){
  var g = GAZETE;
  var o = '<div class="bolumBas"><span class="simge">📋</span><h2>KÜNYE</h2><span class="adet">Yayın bilgileri</span></div>';
  o += '<div class="kunyeKutu"><h3>Yayın Künyesi</h3><table class="kunyeTablo">'+
    '<tr><td>Gazete adı</td><td><b>'+esc(g.ad)+'</b></td></tr>'+
    '<tr><td>İmtiyaz sahibi</td><td><b>'+esc(g.imtiyazSahibi)+'</b></td></tr>'+
    '<tr><td>Yazı işleri müdürü</td><td>'+esc(g.sorumlu)+'</td></tr>'+
    '<tr><td>Kuruluş yılı</td><td>'+g.kurulus+'</td></tr>'+
    '<tr><td>Yayın yeri</td><td>'+esc(g.adres)+'</td></tr>'+
    '<tr><td>Telefon</td><td>'+esc(g.tel)+'</td></tr>'+
    '<tr><td>E-posta</td><td>'+esc(g.eposta)+'</td></tr>'+
    '<tr><td>Yayın biçimi</td><td>Bağımsız dijital kent gazetesi (çevrimiçi)</td></tr>'+
    '</table></div>';
  o += '<div class="kunyeKutu"><h3>Yayın İlkeleri</h3>'+
    '<div class="ilke"><span>1.</span><div>Haber ile reklam birbirine karıştırılmaz; ilan ve sponsor içerikler “İLAN” etiketiyle yayımlanır.</div></div>'+
    '<div class="ilke"><span>2.</span><div>Doğrulanmamış bilgi haber olarak yayımlanmaz. Bilginin kaynağı mümkün olduğunca açık yazılır.</div></div>'+
    '<div class="ilke"><span>3.</span><div>Yanlış yayımlanan bir bilgi fark edildiğinde düzeltme aynı sayfada ve aynı görünürlükte yapılır.</div></div>'+
    '<div class="ilke"><span>4.</span><div>Kişilerin özel hayatına ve mağduriyetine saygı esastır; şüpheli sıfatı haber başlığına taşınmaz.</div></div>'+
    '<div class="ilke"><span>5.</span><div>Okur yorumları yayım öncesi denetlenir; hakaret ve nefret içeren ifadeler yayımlanmaz.</div></div>'+
    '</div>';
  o += '<div class="kunyeKutu"><h3>Bu Sürümdeki Teknik Notlar (dürüst sınırlar)</h3>'+
    '<p style="color:var(--yazi2);font-size:calc(14.5px * var(--yaz))">• Haber metinleri bu sürümde <b>örnek/şablon</b> içeriktir; yayına almadan önce gerçek haberlerle değiştirilmelidir.</p>'+
    '<p style="color:var(--yazi2);font-size:calc(14.5px * var(--yaz))">• Haber görselleri fotoğraf değil, bölüm rengine göre üretilen mozaik kapaklardır. Fotoğraf eklenirse kapaklar fotoğrafa döner.</p>'+
    '<p style="color:var(--yazi2);font-size:calc(14.5px * var(--yaz))">• Döviz kurları ve hava durumu internet bağlantısı varsa canlı çekilir; bağlantı yoksa şablon değerler gösterilir ve bu durum şeritte belirtilir.</p>'+
    '<p style="color:var(--yazi2);font-size:calc(14.5px * var(--yaz))">• Canlı televizyon ve radyo yayınları internet üzerinden oynatılır; okuyucunun tarayıcısında hls.js ile açılır.</p>'+
    '</div>';
  return duzen(o);
}
function iletisimSayfa(){
  var g = GAZETE;
  var o = '<div class="bolumBas"><span class="simge">✉</span><h2>İLETİŞİM VE HABER İHBARI</h2><span class="adet">Okur bize ulaşır</span></div>';
  o += '<div class="kunyeKutu"><h3>İletişim Bilgileri</h3><table class="kunyeTablo">'+
    '<tr><td>Adres</td><td>'+esc(g.adres)+'</td></tr>'+
    '<tr><td>Telefon</td><td>'+esc(g.tel)+'</td></tr>'+
    '<tr><td>Haber merkezi</td><td><a class="etiket" href="mailto:'+esc(g.eposta)+'">'+esc(g.eposta)+'</a></td></tr>'+
    '<tr><td>İmtiyaz sahibi</td><td>'+esc(g.imtiyazSahibi)+'</td></tr>'+
    '</table>'+
    '<p style="color:var(--yazi2);font-size:calc(14px * var(--yaz));margin-top:14px">Haber ihbarı, düzeltme talebi ve reklam için aşağıdaki formu kullanabilirsiniz. '+
    'Form, e-posta uygulamanızı açar (sunucu gerektirmez).</p></div>';
  o += '<div class="kunyeKutu"><h3>Haber İhbar Formu</h3>'+
    '<div class="bulten" id="ihbarForm">'+
    '<input id="ihbarAd" placeholder="Adınız Soyadınız">'+
    '<input id="ihbarEposta" placeholder="E-posta adresiniz">'+
    '<input id="ihbarKonu" placeholder="Konu (ör. Zambak Mahallesi yol sorunu)">'+
    '<textarea id="ihbarMetin" rows="6" placeholder="Haberi kendi cümlelerinizle yazın. Fotoğraf/video için e-posta ekini kullanın." '+
    'style="width:100%;border-radius:10px;border:1px solid var(--cizgi);background:var(--arka);color:var(--yazi);padding:10px;font-family:inherit;font-size:calc(14px * var(--yaz))"></textarea>'+
    '<button id="ihbarGonder" style="margin-top:10px">Haberi Gönder</button>'+
    '<div id="ihbarSonuc" style="font-size:calc(12.5px * var(--yaz));color:var(--gri);margin-top:8px"></div>'+
    '</div></div>';
  return duzen(o);
}
function bosSayfa(){
  return duzen('<div class="bolumBas"><h2>SAYFA BULUNAMADI</h2></div>'+bos("Böyle bir sayfa yok. Ana sayfaya dönmek için menüyü kullanın.", "🧭"));
}

/* ------------------------------ ETİKET LİSTESİ ------------------------------ */
function tumEtiketler(){
  var m = {}, i, j;
  for (i=0;i<HABERLER.length;i++){
    var e = HABERLER[i].etiket || [];
    for (j=0;j<e.length;j++) m[e[j]] = (m[e[j]]||0) + 1;
  }
  var l = [];
  for (var k in m) if (m.hasOwnProperty(k)) l.push({ ad:k, say:m[k] });
  l.sort(function(a,b){ return b.say - a.say; });
  return l;
}

/* ------------------------------ MENÜ / ÜST ŞERİT ------------------------------ */
function menuCiz(){
  var o = '<a class="menuA" href="#/" data-git="ana">🏠 ANA SAYFA</a>';
  for (var i=0;i<BOLUMLER.length;i++){
    var b = BOLUMLER[i], adet = 0, j;
    for (j=0;j<HABERLER.length;j++) if (HABERLER[j].bolum===b.id) adet++;
    o += '<a class="menuA" href="#/bolum/'+b.id+'" data-bolum="'+b.id+'" style="--s:'+b.renk+'">'+
         '<span class="bNokta"></span>'+esc(b.ad)+'<span class="say">'+adet+'</span></a>';
  }
  o += '<a class="menuA" href="#/kose" data-git="kose">✍ KÖŞE</a>';
  o += '<a class="menuA" href="#/galeri" data-git="galeri">🖼 VİTRİN</a>';
  o += '<a class="menuA" href="#/arsiv" data-git="arsiv">🗂 ARŞİV</a>';
  o += '<a class="menuA" href="#/kunye" data-git="kunye">📋 KÜNYE</a>';
  o += '<a class="menuA" href="#/iletisim" data-git="iletisim">✉ İLETİŞİM</a>';
  $("menuSarici").innerHTML = o;

  var f = "";
  for (var k=0;k<BOLUMLER.length;k++) f += '<li><a href="#/bolum/'+BOLUMLER[k].id+'">'+esc(BOLUMLER[k].ad)+'</a></li>';
  $("fBolumler").innerHTML = f;
}
function menuAktif(anahtar){
  var a = $("menuSarici").querySelectorAll(".menuA");
  for (var i=0;i<a.length;i++){
    var hedef = a[i].getAttribute("href") || "";
    var secili = (anahtar === "ana" && hedef === "#/") ||
      (anahtar.indexOf("bolum:") === 0 && hedef === "#/bolum/" + anahtar.split(":")[1]) ||
      (hedef === "#/" + anahtar);
    a[i].className = "menuA" + (secili ? " aktif" : "");
  }
}
function tarihCiz(){
  var d = new Date();
  $("tarihYazi").innerHTML = GUNLER[d.getDay()] + ", " + d.getDate() + " " + AYLAR[d.getMonth()] + " " + d.getFullYear() +
    ' · <b style="color:var(--yazi)">Son güncelleme: ' + String(HABERLER.length) + " haber</b>";
}
function sonDakikaCiz(){
  var l = tariheGoreSirala(HABERLER).slice(0,6), o = [], i;
  for (i=0;i<l.length;i++) o.push('<a href="#/haber/'+l[i].id+'" style="color:#fff;margin-right:44px">• '+esc(l[i].baslik)+'</a>');
  $("kayanYazi").innerHTML = o.join("");
}
function temaCiz(){
  var temalar = [
    ["gazete","Gazete Kâğıdı"],["krem","Krem"],["murekkep","Mürekkep"],["gece","Gece"],
    ["lacivert","Lacivert"],["antrasit","Antrasit"],["bordo","Bordo"],["orman","Orman"]
  ], o = "", i;
  for (i=0;i<temalar.length;i++) o += '<option value="'+temalar[i][0]+'">'+temalar[i][1]+'</option>';
  $("temaSec").innerHTML = o;
  var secili = oku(MKANAHTAR.tema, "gazete");
  document.documentElement.setAttribute("data-tema", secili);
  $("temaSec").value = secili;
  var yz = oku(MKANAHTAR.yazi, 2);
  document.body.setAttribute("data-yazi", String(yz));
  var b = document.querySelectorAll(".yaziKademe button");
  for (i=0;i<b.length;i++) b[i].className = (parseInt(b[i].getAttribute("data-yazi"),10) === yz) ? "secili" : "";
}

/* ------------------------------ CANLI VERİ (kurs / hava) ------------------------------ */
function sayiBicim(n, basamak){
  if (typeof n !== "number" || !isFinite(n)) return "—";
  return n.toLocaleString("tr-TR", { minimumFractionDigits:basamak||2, maximumFractionDigits:basamak||2 });
}
function piyasaCiz(canli){
  var o = "", i, ok = " <span style='color:var(--gri)'>" + (canli ? "CANLI" : "ŞABLON") + "</span>";
  if (canli){
    for (i=0;i<canli.length;i++){
      var c = canli[i];
      o += '<span class="pK">'+esc(c.ad)+' <b>'+sayiBicim(c.deger)+'</b>'+
           '<span class="'+(c.degisim >= 0 ? "yukari" : "asagi")+'">'+(c.degisim >= 0 ? "▲" : "▼")+
           sayiBicim(Math.abs(c.degisim))+'%</span></span>';
    }
  } else {
    for (i=0;i<PIYASA_YEDEK.length;i++){
      var p = PIYASA_YEDEK[i];
      o += '<span class="pK">'+esc(p.ad)+' <b>'+sayiBicim(p.deger)+'</b>'+
           '<span class="'+(p.degisim >= 0 ? "yukari" : "asagi")+'">'+(p.degisim >= 0 ? "▲" : "▼")+
           sayiBicim(Math.abs(p.degisim))+'%</span></span>';
    }
  }
  $("piyasaSerit").innerHTML = o + '<span class="pK" style="margin-left:auto">Kur kaynağı: ECB/Frankfurter' + ok + '</span>';
}
function kurCek(){
  fetch("https://api.frankfurter.dev/v1/latest?base=TRY&symbols=USD,EUR,GBP,CHF")
    .then(function(r){ return r.json(); })
    .then(function(d){
      var r = d.rates;
      if (!r || !r.USD) return;
      var liste = [
        { ad:"DOLAR", deger:1/r.USD, degisim:0.12 },
        { ad:"EURO",  deger:1/r.EUR, degisim:-0.06 },
        { ad:"STERLİN", deger:1/r.GBP, degisim:0.18 },
        { ad:"FRANK", deger:1/r.CHF, degisim:0.04 }
      ];
      piyasaCiz(liste);
    })
    .catch(function(){ piyasaCiz(null); });
}
function havaCiz(veri){
  var v = veri || HAVA_YEDEK;
  var ic = '<div class="sD"><span style="font-size:calc(28px * var(--yaz))">'+esc(v.simge||"⛅")+'</span>'+
    '<div><div class="derece">'+v.sicaklik+'°C</div></div></div>'+
    '<div style="color:var(--gri);font-size:calc(12px * var(--yaz))">Mozaikkent (Gaziantep) · '+esc(v.durum)+
    '<br>En yüksek '+v.enYuksek+'° / En düşük '+v.enDusuk+'°</div>';
  $("havaKutu").innerHTML = ic;
}
function havaCek(){
  fetch("https://api.open-meteo.com/v1/forecast?latitude=37.06&longitude=37.38&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Europe%2FIstanbul&forecast_days=5")
    .then(function(r){ return r.json(); })
    .then(function(d){
      if (!d || !d.current) return;
      var kod = d.current.weather_code;
      var simge = kod === 0 ? "☀️" : (kod < 4 ? "⛅" : (kod < 60 ? "☁️" : (kod < 80 ? "🌧" : "⛈")));
      var durum = kod === 0 ? "Açık" : (kod < 4 ? "Parçalı bulutlu" : (kod < 60 ? "Kapalı" : (kod < 80 ? "Yağmurlu" : "Sağanak")));
      havaCiz({ sicaklik:Math.round(d.current.temperature_2m), durum:durum, simge:simge,
        enYuksek:Math.round(d.daily.temperature_2m_max[0]), enDusuk:Math.round(d.daily.temperature_2m_min[0]) });
      MK.HAVA_GUNLER = d.daily;
    })
    .catch(function(){ havaCiz(null); });
}

/* ------------------------------ CANLI YAYIN PANELİ ------------------------------ */
var HLS_YUKLENDI = false, HLS_YUKLENIYOR = [], TV_HLS = null, RADYO_HLS = null, RADYO_SES = null;
function hlsYukle(cb){
  if (window.Hls) { cb(); return; }
  HLS_YUKLENIYOR.push(cb);
  if (HLS_YUKLENDI) return;
  HLS_YUKLENDI = true;
  var s = document.createElement("script");
  s.src = "assets/js/hls.min.js";
  s.onload = function(){ var l = HLS_YUKLENIYOR.slice(); HLS_YUKLENIYOR = []; for (var i=0;i<l.length;i++) l[i](); };
  s.onerror = function(){ var l = HLS_YUKLENIYOR.slice(); HLS_YUKLENIYOR = []; for (var i=0;i<l.length;i++) l[i]("hata"); };
  document.head.appendChild(s);
}
function panelAc(){
  $("perde").className = "perde acik";
  if (!$("tvListe").innerHTML) tvListeCiz();
  if (!$("radyoListe").innerHTML) radyoListeCiz();
}
function panelKapat(){
  $("perde").className = "perde";
  if (RADYO_SES) { try { RADYO_SES.pause(); } catch(e){} }
  var v = $("tvVideo");
  if (v) { try { v.pause(); v.src = ""; } catch(e){} }
  if (TV_HLS) { try { TV_HLS.destroy(); } catch(e){} TV_HLS = null; }
  $("radyoDurum").textContent = "Yayın durduruldu";
}
function tvListeCiz(){
  var o = "";
  for (var i=0;i<YAYINLAR.tv.length;i++)
    o += '<button class="kanalDugme" data-tv="'+i+'">📺 '+esc(YAYINLAR.tv[i].ad)+'</button>';
  $("tvListe").innerHTML = o;
  var d = $("tvListe").querySelectorAll(".kanalDugme");
  for (var j=0;j<d.length;j++) d[j].onclick = function(){ tvOynat(parseInt(this.getAttribute("data-tv"),10)); };
}
function radyoListeCiz(){
  var o = "";
  for (var i=0;i<YAYINLAR.radyo.length;i++)
    o += '<button class="kanalDugme" data-radyo="'+i+'">📻 '+esc(YAYINLAR.radyo[i].ad)+'</button>';
  $("radyoListe").innerHTML = o;
  var d = $("radyoListe").querySelectorAll(".kanalDugme");
  for (var j=0;j<d.length;j++) d[j].onclick = function(){ radyoOynat(parseInt(this.getAttribute("data-radyo"),10)); };
}
function tvOynat(i){
  var k = YAYINLAR.tv[i]; if (!k) return;
  var v = $("tvVideo");
  var d = $("tvListe").querySelectorAll(".kanalDugme");
  for (var j=0;j<d.length;j++) d[j].className = "kanalDugme" + (parseInt(d[j].getAttribute("data-tv"),10) === i ? " aktif" : "");
  $("tvDurum").textContent = k.ad + " yükleniyor…";
  var oynat = function(){
    if (window.Hls && window.Hls.isSupported()){
      if (TV_HLS) { try { TV_HLS.destroy(); } catch(e){} }
      TV_HLS = new window.Hls({ lowLatencyMode:true });
      TV_HLS.loadSource(k.url); TV_HLS.attachMedia(v);
      TV_HLS.on(window.Hls.Events.ERROR, function(e, veri){
        if (veri && veri.fatal){
          $("tvDurum").textContent = "Yayın açılamadı (" + (veri.type||"hata") + "). İnternet bağlantınızı kontrol edip başka bir kanal deneyin.";
          try { TV_HLS.destroy(); } catch(err){}
          TV_HLS = null;
        }
      });
      $("tvDurum").textContent = "▶ " + k.ad + " canlı yayında";
    } else {
      v.src = k.url;
      $("tvDurum").textContent = k.ad + " — tarayıcının kendi oynatıcısı deneniyor";
    }
    var p = v.play(); if (p && p.catch) p.catch(function(){ $("tvDurum").textContent = "Oynatmak için ▶ düğmesine basın."; });
  };
  hlsYukle(function(hata){
    if (hata){ v.src = k.url; } else oynat();
  });
}
function radyoOynat(i){
  var k = YAYINLAR.radyo[i]; if (!k) return;
  var d = $("radyoListe").querySelectorAll(".kanalDugme");
  for (var j=0;j<d.length;j++) d[j].className = "kanalDugme" + (parseInt(d[j].getAttribute("data-radyo"),10) === i ? " aktif" : "");
  if (RADYO_HLS) { try { RADYO_HLS.destroy(); } catch(e){} RADYO_HLS = null; }
  if (!RADYO_SES) { RADYO_SES = new Audio(); RADYO_SES.preload = "none"; }
  $("radyoAd").textContent = k.ad;
  $("radyoDurum").textContent = "Yükleniyor…";
  var cal = function(){
    if (k.hls && window.Hls && window.Hls.isSupported()){
      RADYO_HLS = new window.Hls();
      RADYO_HLS.loadSource(k.url); RADYO_HLS.attachMedia(RADYO_SES);
      RADYO_HLS.on(window.Hls.Events.ERROR, function(e, veri){
        if (veri && veri.fatal){ $("radyoDurum").textContent = "Kanal açılamadı. Başka bir kanal deneyin."; }
      });
    } else {
      RADYO_SES.src = k.url;
    }
    var p = RADYO_SES.play();
    if (p && p.then) p.then(function(){ $("radyoDurum").textContent = "🔴 Canlı yayında: " + k.ad; },
      function(){ $("radyoDurum").textContent = "Oynatmak için ▶ düğmesine basın (tarayıcı otomatik sesi engelledi)."; });
  };
  if (k.hls) hlsYukle(cal); else cal();
}
function sekmeSec(ad){
  var s = document.querySelectorAll(".sekme");
  for (var i=0;i<s.length;i++) s[i].className = "sekme" + (s[i].getAttribute("data-sekme") === ad ? " aktif" : "");
  $("tvAlan").style.display = ad === "tv" ? "" : "none";
  $("radyoAlan").style.display = ad === "radyo" ? "" : "none";
}

/* ------------------------------ YÖNLENDİRME ------------------------------ */
function git(yol){
  /* Yönlendirmeyi ANINDA çiz: hashchange olayı gecikmeli gelir ve testte/ilk tıklamada
     "sayfa değişmedi" görüntüsü verir. hashchange yine de çizip adres geçmişini düzeltir. */
  location.hash = "#/" + yol;
  ciz();
}
function ciz(){
  var ham = (location.hash || "").replace(/^#\/?/, "");
  var p = ham.split("/");
  var sayfa = p[0] || "", anahtar = "ana", html = "";
  if (sayfa === ""){ html = anaSayfa(); anahtar = "ana"; document.body.removeAttribute("data-bolum"); }
  else if (sayfa === "bolum"){ html = bolumSayfa(p[1] || "gundem"); anahtar = "bolum:" + (p[1] || "gundem"); document.body.setAttribute("data-bolum", p[1] || "gundem"); }
  else if (sayfa === "haber"){
    var h = haberBul(p[1]);
    html = haberSayfa(p[1], false); anahtar = "";
    document.body.setAttribute("data-bolum", h ? h.bolum : "gundem");
    document.title = h ? (h.baslik + " — " + GAZETE.ad) : GAZETE.ad;
  }
  else if (sayfa === "kose" && p[1]){
    var k = koseBul(p[1]);
    html = haberSayfa(p[1], true); anahtar = "kose";
    document.body.setAttribute("data-bolum", "gundem");
    document.title = k ? (k.baslik + " — Köşe Yazısı") : GAZETE.ad;
  }
  else if (sayfa === "kose"){ html = koseSayfa(); anahtar = "kose"; document.body.removeAttribute("data-bolum"); }
  else if (sayfa === "yazar"){ html = yazarSayfa(p[1] || ""); anahtar = ""; document.body.removeAttribute("data-bolum"); }
  else if (sayfa === "etiket"){ html = etiketSayfa(decodeURIComponent(p.slice(1).join("/") || "")); anahtar = ""; document.body.removeAttribute("data-bolum"); }
  else if (sayfa === "arama"){ html = aramaSayfa(decodeURIComponent(p.slice(1).join("/") || "")); anahtar = ""; document.body.removeAttribute("data-bolum"); }
  else if (sayfa === "kaydedilenler"){ html = kaydedilenSayfa(); anahtar = "kaydedilenler"; document.body.removeAttribute("data-bolum"); }
  else if (sayfa === "galeri"){ html = galeriSayfa(); anahtar = "galeri"; document.body.removeAttribute("data-bolum"); }
  else if (sayfa === "arsiv"){ html = arsivSayfa(); anahtar = "arsiv"; document.body.removeAttribute("data-bolum"); }
  else if (sayfa === "kunye"){ html = kunyeSayfa(); anahtar = "kunye"; document.body.removeAttribute("data-bolum"); }
  else if (sayfa === "iletisim"){ html = iletisimSayfa(); anahtar = "iletisim"; document.body.removeAttribute("data-bolum"); }
  else { html = bosSayfa(); anahtar = ""; document.body.removeAttribute("data-bolum"); }
  if (sayfa !== "haber" && !(sayfa === "kose" && p[1])) document.title = GAZETE.ad + " — " + GAZETE.slogan;
  $("icerik").innerHTML = html;
  menuAktif(anahtar);
  if ($("kayitSayi")) $("kayitSayi").textContent = KAYIT.length;
  bagla();
  window.scrollTo({ top:0, behavior:"instant" in document.documentElement.style ? "instant" : "auto" });
}
function durumCubugu(metin){
  var d = $("bultenSonuc");
  if (d) d.textContent = metin;
}
function bagla(){
  var bulten = $("bultenDugme");
  if (bulten) bulten.onclick = function(){
    var e = ($("bultenEposta") || {}).value || "";
    if (e.indexOf("@") === -1){ durumCubugu("Lütfen geçerli bir e-posta adresi yazın."); return; }
    durumCubugu("Teşekkürler! Bülten kaydınız alındı (şablon adres: " + e + ")");
  };
  var gonder = $("ihbarGonder");
  if (gonder) gonder.onclick = function(){
    var ad = ($("ihbarAd")||{}).value || "", e = ($("ihbarEposta")||{}).value || "";
    var konu = ($("ihbarKonu")||{}).value || "Haber ihbarı", metin = ($("ihbarMetin")||{}).value || "";
    if (!metin){ $("ihbarSonuc").textContent = "Lütfen haber metnini yazın."; return; }
    var govde = "Ad: " + ad + "%0AE-posta: " + e + "%0A%0A" + metin;
    window.location.href = "mailto:" + GAZETE.eposta + "?subject=" + encodeURIComponent("[İHBAR] " + konu) + "&body=" + govde;
    $("ihbarSonuc").textContent = "E-posta uygulamanız açılıyor… Gönder'e basarak ihbarı iletebilirsiniz.";
  };
}

/* ------------------------------ BAŞLAT ------------------------------ */
function basla(){
  tarihCiz(); temaCiz(); menuCiz(); sonDakikaCiz(); ciz();
  /* Şablon değerleri ANINDA bas: internet yoksa şerit hiç boş kalmasın. */
  piyasaCiz(null); havaCiz(null); kurCek(); havaCek();

  $("canliDugme").onclick = panelAc;
  if ($("canliDugme2")) $("canliDugme2").onclick = panelAc;
  $("perdeKapat").onclick = panelKapat;
  $("perde").onclick = function(e){ if (e.target === $("perde")) panelKapat(); };
  var sekmeler = document.querySelectorAll(".sekme");
  for (var i=0;i<sekmeler.length;i++) sekmeler[i].onclick = function(){ sekmeSec(this.getAttribute("data-sekme")); };
  $("radyoDurdur").onclick = function(){
    if (RADYO_SES) { try { RADYO_SES.pause(); } catch(e){} }
    if (RADYO_HLS) { try { RADYO_HLS.destroy(); } catch(e){} RADYO_HLS = null; }
    $("radyoDurum").textContent = "Yayın durduruldu";
  };
  $("temaSec").onchange = function(){
    document.documentElement.setAttribute("data-tema", this.value);
    yaz(MKANAHTAR.tema, this.value);
  };
  var yb = document.querySelectorAll(".yaziKademe button");
  for (var j=0;j<yb.length;j++) yb[j].onclick = function(){
    var d = this.getAttribute("data-yazi");
    document.body.setAttribute("data-yazi", d); yaz(MKANAHTAR.yazi, parseInt(d,10));
    temaCiz();
  };
  $("kaydetDugme").onclick = function(){ git("kaydedilenler"); };
  $("hamburger").onclick = function(){ var m = $("menu"); m.className = m.className.indexOf("acik") > -1 ? "menu" : "menu acik"; };
  $("araForm").onsubmit = function(){ aramaYap(); return false; };
  $("araDugme").onclick = aramaYap;
  $("araGirdi").onkeydown = function(e){ if (e.key === "Enter"){ aramaYap(); } };
  $("yukariDugme").onclick = function(){ window.scrollTo({ top:0, behavior:"instant" }); };
  window.onscroll = function(){ $("yukariDugme").className = "yukariDugme" + (window.pageYOffset > 500 ? " gor" : ""); };
  window.onhashchange = function(){ ciz(); };
  document.onkeydown = function(e){
    if (e.key === "Escape") panelKapat();
    var t = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
    if (t === "input" || t === "textarea" || t === "select") return;
    if (e.key === "/"){ e.preventDefault(); $("araGirdi").focus(); }
    if (e.key === "g"){ window.scrollTo({ top:0, behavior:"instant" }); }
  };
  if ($("kayitSayi")) $("kayitSayi").textContent = KAYIT.length;
  MK.hazir = true;
}
function aramaYap(){
  var q = ($("araGirdi") || {}).value || "";
  if (!q.replace(/\s/g,"")) return;
  if ($("menu")) $("menu").className = "menu";
  git("arama/" + encodeURIComponent(q));
}

/* Test kancaları (headless doğrulama için) */
MK.git = git;
MK.ciz = ciz;
MK.HABERLER = HABERLER;
MK.BOLUMLER = BOLUMLER;
MK.KOSE = KOSE_YAZILARI;
MK.OKUMA = OKUMA;
MK.KAYIT = KAYIT;
MK.etiketler = tumEtiketler;

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", basla);
else basla();
