# -*- coding: utf-8 -*-
"""MOZAIKKENT GAZETESİ — GitHub yedeği (depo kur, it, Pages aç, doğrula)
Kullanım: python github-yedek.py [depo-adi]
"""
import base64, json, os, pathlib, subprocess, sys, time, urllib.request, urllib.error

S = pathlib.Path(__file__).resolve().parent
DEPO = (sys.argv[1] if len(sys.argv) > 1 else "mozaikkent-gazetesi").strip()
KULLANICI = "kenankuzucu"
ACIKLAMA = ("MOZAİKKENT GAZETESİ — kent gazetesi sitesi (statik, çevrimdışı çalışır): "
            "26 haber · 12 bölüm · 8 tema · canlı TV + radyo · cPanel'e hazır yükleme paketi")


def token():
    env = pathlib.Path.home() / "AppData/Local/hermes/.env"
    for s in env.read_text(encoding="utf-8", errors="replace").split("\n"):
        if s.strip().startswith("GITHUB_TOKEN"):
            return s.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit("GITHUB_TOKEN bulunamadı")


TOK = token()


def api(yol, veri=None, yontem="GET"):
    r = urllib.request.Request("https://api.github.com" + yol,
        data=json.dumps(veri).encode() if veri is not None else None, method=yontem,
        headers={"Authorization": "token " + TOK, "Accept": "application/vnd.github+json",
                 "User-Agent": "ustad-yedek", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(r, timeout=90) as y:
            return json.loads(y.read() or b"{}")
    except urllib.error.HTTPError as e:
        return {"_hata": e.code, "_govde": e.read().decode("utf-8", "replace")[:300]}


# 1) yerel depo
if not (S / ".git").exists():
    subprocess.run(["git", "init", "-b", "main"], cwd=S, check=True, capture_output=True)
gitignore = S / ".gitignore"
if not gitignore.exists():
    gitignore.write_text("_tema-*.png\n~$*\nThumbs.db\ndesktop.ini\n", encoding="utf-8")
subprocess.run(["git", "add", "-A"], cwd=S, check=True, capture_output=True)
subprocess.run(["git", "-c", "user.name=Yasar Elma", "-c", "user.email=haber@mozaikkentgazetesi.com",
                "commit", "-q", "-m",
                "MOZAİKKENT GAZETESİ — kaynak yedek + ekran görüntüleri + yükleme paketi"],
               cwd=S, check=True, capture_output=True)
print("yerel commit tamam")

# 2) uzak depo
mevcut = api("/repos/%s/%s" % (KULLANICI, DEPO))
if mevcut.get("_hata") == 404:
    olusan = api("/user/repos", {"name": DEPO, "description": ACIKLAMA, "private": False,
                                 "has_issues": True, "has_wiki": False, "auto_init": False}, "POST")
    print("depo oluşturuldu:", olusan.get("full_name") or olusan)
else:
    print("depo zaten var:", mevcut.get("full_name"))

uzak = "https://%s@github.com/%s/%s.git" % (TOK, KULLANICI, DEPO)
subprocess.run(["git", "remote", "remove", "origin"], cwd=S, capture_output=True)
subprocess.run(["git", "remote", "add", "origin", uzak], cwd=S, check=True, capture_output=True)
it = subprocess.run(["git", "push", "-u", "origin", "main", "--force"], cwd=S, capture_output=True, text=True, timeout=900)
print("push çıkış:", it.returncode)
if it.returncode != 0:
    print((it.stderr or it.stdout)[-600:])

# 3) GitHub Pages (main / kök)
sayfa = api("/repos/%s/%s/pages" % (KULLANICI, DEPO))
if sayfa.get("_hata") == 404:
    sayfa = api("/repos/%s/%s/pages" % (KULLANICI, DEPO),
                {"source": {"branch": "main", "path": "/"}}, "POST")
print("Pages:", sayfa.get("html_url") or sayfa)

# 4) doğrulama
time.sleep(6)
ham = "https://raw.githubusercontent.com/%s/%s/main/README.md" % (KULLANICI, DEPO)
try:
    r = urllib.request.Request(ham, headers={"User-Agent": "Mozilla/5.0", "Cache-Control": "no-cache"})
    with urllib.request.urlopen(r, timeout=60) as y:
        ic = y.read().decode("utf-8", "replace")
    print("README canlı:", len(ic), "bayt · kapak bağlantısı var mı:", "ekranlar/00-kapak.png" in ic)
except Exception as e:
    print("README okunamadı:", e)

print("\nDepo  : https://github.com/%s/%s" % (KULLANICI, DEPO))
print("Site  : https://%s.github.io/%s/" % (KULLANICI, DEPO))
print("Kapak : https://raw.githubusercontent.com/%s/%s/main/ekranlar/00-kapak.png" % (KULLANICI, DEPO))
