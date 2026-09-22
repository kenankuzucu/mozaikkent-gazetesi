# -*- coding: utf-8 -*-
"""MOZAİKKENT GAZETESİ — ekran görüntüsü üretici (Chrome headless + CDP)
Kullanım: python ekran-cek.py [cikti-klasoru]
Üretir: 00-kapak.png, 01..07 ekranlar + 08-temalar.png (8 tema vitrini)
"""
import asyncio, base64, json, os, subprocess, sys, tempfile, time, urllib.request
import websockets
from PIL import Image, ImageDraw, ImageFont

S = os.path.dirname(os.path.abspath(__file__))
CIKTI = sys.argv[1] if len(sys.argv) > 1 else os.path.join(S, "ekranlar")
CH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
SAYFA = "file:///" + os.path.join(S, "index.html").replace("\\", "/")

# (ad, rota, genişlik, yükseklik, tam sayfa?, tema)
CEKIMLER = [
    ("01-ana-sayfa", "", 1600, 1000, True, None),
    ("02-haber-sayfasi", "haber/meclis-butce", 1600, 1000, True, None),
    ("03-bolum-sayfasi", "bolum/spor", 1600, 1000, True, None),
    ("04-kose-yazisi", "kose/hafiza", 1600, 1000, True, None),
    ("05-kunye", "kunye", 1600, 1000, True, None),
    ("06-canli-yayin", "bolum/video", 1600, 1000, True, None),
    ("07-mobil-ana-sayfa", "", 430, 932, True, None),
    ("09-arsiv", "arsiv", 1600, 1000, True, None),
    ("10-gorunum-masaustu", "", 1600, 1000, False, None),
    ("11-gorunum-mobil", "", 430, 932, False, None),
]
TEMALAR = ["gazete", "krem", "gece", "lacivert", "bordo", "antrasit", "orman", "murekkep"]
RENK = {"gazete": "1A1A1A", "krem": "8A6A2A", "gece": "1E2A44", "lacivert": "1F3A6E",
        "bordo": "7A1F2E", "antrasit": "3A3A3A", "orman": "1E5A2A", "murekkep": "2A2A4A"}


async def main():
    os.makedirs(CIKTI, exist_ok=True)
    port = 9600 + (os.getpid() % 200)
    profil = os.path.join(tempfile.gettempdir(), "mozaik%d" % time.time())
    p = subprocess.Popen([CH, "--headless=new", "--remote-debugging-port=%d" % port,
        "--user-data-dir=" + profil, "--window-size=1600,1000", "--no-first-run",
        "--allow-file-access-from-files", "--force-device-scale-factor=1",
        "--hide-scrollbars", "--disable-features=Translate", SAYFA],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    u = None
    for _ in range(90):
        try:
            for t in json.load(urllib.request.urlopen("http://127.0.0.1:%d/json" % port, timeout=2)):
                if t.get("type") == "page" and t.get("webSocketDebuggerUrl"):
                    u = t["webSocketDebuggerUrl"]
            if u:
                break
        except Exception:
            pass
        time.sleep(0.4)
    if not u:
        print("HATA: sekme bulunamadi"); p.terminate(); return
    uretilen = []
    try:
        async with websockets.connect(u, max_size=200 * 1024 * 1024) as ws:
            n = [0]
            async def cmd(m, **k):
                n[0] += 1
                await ws.send(json.dumps({"id": n[0], "method": m, "params": k}))
                while True:
                    r = json.loads(await ws.recv())
                    if r.get("id") == n[0]:
                        return r

            async def boyut(en, boy):
                await cmd("Emulation.setDeviceMetricsOverride", width=en, height=boy,
                          deviceScaleFactor=1, mobile=(en < 600))

            await cmd("Runtime.enable"); await cmd("Page.enable")
            await asyncio.sleep(3.0)
            for ad, rota, en, boy, tam, tema in CEKIMLER:
                await boyut(en, boy)
                await cmd("Page.navigate", url=SAYFA + "#/" + rota)
                await asyncio.sleep(2.2)
                if tema:
                    await cmd("Runtime.evaluate", expression='document.documentElement.setAttribute("data-tema","%s")' % tema)
                    await asyncio.sleep(0.4)
                s = await cmd("Page.captureScreenshot", format="png", captureBeyondViewport=tam)
                yol = os.path.join(CIKTI, ad + ".png")
                open(yol, "wb").write(base64.b64decode(s["result"]["data"]))
                im = Image.open(yol)
                uretilen.append((ad, yol, im.size, os.path.getsize(yol)))
                print("%-22s %s  %s bayt" % (ad, im.size, os.path.getsize(yol)))

            # 8 tema vitrini (ana sayfa, kısa görünüm)
            await boyut(1100, 760)
            parcalar = []
            for tema in TEMALAR:
                await cmd("Page.navigate", url=SAYFA + "#/")
                await asyncio.sleep(1.6)
                await cmd("Runtime.evaluate", expression='document.documentElement.setAttribute("data-tema","%s")' % tema)
                await asyncio.sleep(0.6)
                s = await cmd("Page.captureScreenshot", format="png")
                yol = os.path.join(CIKTI, "_tema-" + tema + ".png")
                open(yol, "wb").write(base64.b64decode(s["result"]["data"]))
                parcalar.append((tema, yol))
            print("temalar çekildi:", len(parcalar))
    finally:
        p.terminate()

    # --- 8 tema vitrini (2x4 ızgara + şerit başlık) ---
    kucuk = []
    for tema, yol in parcalar:
        im = Image.open(yol).convert("RGB")
        kucuk.append((tema, im.resize((520, 360), Image.LANCZOS)))
    VEN, VBOY = 520 * 4 + 20 * 5, 360 * 2 + 20 * 3 + 70
    v = Image.new("RGB", (VEN, VBOY), (12, 12, 14))
    dv = ImageDraw.Draw(v)
    try:
        fb = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 30)
        fk = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 20)
    except Exception:
        fb = fk = ImageFont.load_default()
    dv.text((24, 18), "MOZAİKKENT GAZETESİ · 8 TEMA", font=fb, fill=(232, 210, 150))
    dv.text((VEN - 330, 26), "aynı sayfa · 8 renk düzeni", font=ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 18), fill=(160, 160, 160))
    for i, (tema, im) in enumerate(kucuk):
        x = 20 + (i % 4) * (520 + 20)
        y = 70 + (i // 4) * (360 + 20)
        v.paste(im, (x, y))
        dv.rectangle([x, y, x + 520, y + 360], outline=(70, 62, 40), width=2)
        et = tema.upper()
        w = dv.textlength(et, font=fk)
        dv.rectangle([x + 12, y + 12, x + 24 + w, y + 46], fill=(10, 10, 12))
        dv.text((x + 18, y + 18), et, font=fk, fill=(232, 210, 150))
    v.save(os.path.join(CIKTI, "08-temalar.png"))
    print("08-temalar.png", v.size)

    # --- kapak: başlık şeridi + masaüstü görünüm + mobil + özellik paneli ---
    ana = Image.open(os.path.join(CIKTI, "10-gorunum-masaustu.png")).convert("RGB")
    mob = Image.open(os.path.join(CIKTI, "11-gorunum-mobil.png")).convert("RGB")
    G, Y = 1920, 1080
    k = Image.new("RGB", (G, Y), (10, 10, 12))
    dk = ImageDraw.Draw(k)
    for i in range(180):
        a = int(60 - i * 0.33)
        if a <= 0:
            break
        dk.line([(i * 12, 152), (i * 12 + 12, 152)], fill=(a + 30, a + 20, 10), width=4)
    dk.rectangle([0, 0, G - 1, Y - 1], outline=(70, 60, 34), width=3)
    fbuyuk = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 58)
    fort = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 24)
    fkt = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 18)
    fkb = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 20)
    dk.text((56, 30), "MOZAİKKENT GAZETESİ", font=fbuyuk, fill=(240, 223, 168))
    dk.text((60, 100), "Kentin nabzı — çok renkli, çok sesli   ·   26 haber · 4 köşe yazısı · 12 bölüm · 8 tema · canlı TV + radyo",
            font=fort, fill=(190, 182, 164))
    ga = ana.copy(); ga.thumbnail((950, 660), Image.LANCZOS)
    k.paste(ga, (56, 178))
    dk.rectangle([56, 178, 56 + ga.width, 178 + ga.height], outline=(96, 84, 48), width=3)
    gm = mob.copy(); gm.thumbnail((238, 660), Image.LANCZOS)
    gx = 56 + ga.width + 26
    k.paste(gm, (gx, 178))
    dk.rectangle([gx, 178, gx + gm.width, 178 + gm.height], outline=(96, 84, 48), width=3)
    # sağ panel: özellikler
    px = gx + gm.width + 30
    dk.rounded_rectangle([px, 178, G - 56, 178 + ga.height], radius=14, fill=(20, 20, 24), outline=(58, 52, 34), width=2)
    dk.text((px + 24, 200), "NELER VAR?", font=fkb, fill=(240, 223, 168))
    dk.line([(px + 24, 234), (G - 80, 234)], fill=(58, 52, 34), width=1)
    ozellikler = [
        ("26 haber", "manşet · son dakika · bölüm sayfaları"),
        ("4 köşe yazısı", "yazar sayfaları + etiketler"),
        ("12 bölüm", "her bölümün kendi rengi"),
        ("8 renk teması", "gazete · gece · bordo · orman…"),
        ("5 yazı boyutu", "A- / A / A+ / A++ / A+++"),
        ("Canlı yayın", "TV (hls.js) + radyo kanalları"),
        ("Döviz + hava", "canlı, internet yoksa şablon"),
        ("Arama · arşiv", "etiket, kaydedilenler, galeri"),
        ("Mozaik kapak", "fotoğrafsız habere özel kapak"),
        ("Tek dosya içerik", "veri.js düzenle, bitti"),
        ("Çevrimdışı", "internet olmadan da açılır"),
        ("cPanel paketi", "ZIP + .htaccess hazır"),
    ]
    yy = 250
    for a, b in ozellikler:
        dk.text((px + 24, yy), "•", font=fkb, fill=(216, 180, 92))
        dk.text((px + 44, yy), a, font=fkb, fill=(238, 232, 216))
        w = dk.textlength(a, font=fkb)
        dk.text((px + 50 + w, yy + 1), "— " + b, font=fkt, fill=(168, 160, 146))
        yy += 34
    dk.text((56, Y - 44), "Tek klasörde · internetsiz çalışır · cPanel'e yüklemeye hazır ZIP · İmtiyaz Sahibi: Yaşar Elma",
            font=fkt, fill=(170, 162, 146))
    dk.text((G - 430, Y - 44), "© 2026 MOZAIKKENT GAZETESİ", font=fkt, fill=(150, 142, 126))
    k.save(os.path.join(CIKTI, "00-kapak.png"))
    print("00-kapak.png üretildi")

    print("\n=== ÜRETİLENLER ===")
    for dosya in sorted(os.listdir(CIKTI)):
        if dosya.startswith("_tema-"):
            continue
        y = os.path.join(CIKTI, dosya)
        im = Image.open(y)
        print("%-24s %-12s %9d bayt" % (dosya, "%dx%d" % im.size, os.path.getsize(y)))

asyncio.run(main())
