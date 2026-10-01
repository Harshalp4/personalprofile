#!/usr/bin/env python3
"""Build the public site from ~/Personal/output/personal-studio.

Copies only public files, converts large PNGs to WebP, rewrites references,
creates the social share image, and writes robots.txt, sitemap.xml and llms.txt.
Usage: python3 tools/build.py   (run from anywhere)
"""
import datetime, pathlib, re, subprocess
from PIL import Image

SITE = "https://harshal-r-patil.vercel.app"   # change to https://harshalpatil.in once the domain is live
SRC = pathlib.Path.home() / "Personal/output/personal-studio"
OUT = pathlib.Path(__file__).resolve().parent.parent

EXCLUDES = ["*.zip", "*verification*.json", "design-notes.md", "asset-manifest.json", "*-prompt.txt",
            "assets/projects/README.md", "assets/*-preview.png", "assets/profile-v2-*.png",
            "assets/project-gallery-*.png", "assets/project-detail-mobile.png", "assets/digitization-*.png",
            "assets/profile-concept*.png", "assets/personality-assets.md", ".DS_Store"]
KEEP = [".git", ".gitignore", ".vercel", "tools", "README.md", "vercel.json"]

def sync():
    args = ["rsync", "-a", "--delete"] + [f"--exclude={e}" for e in EXCLUDES + KEEP]
    subprocess.run(args + [f"{SRC}/", f"{OUT}/"], check=True)
    subprocess.run(["cp", str(SRC / "assets/cv-preview.png"), str(OUT / "assets/")], check=True)

def to_webp():
    converted = []
    for png in list((OUT / "assets").glob("*.png")) + list((OUT / "assets/projects").glob("*.png")):
        if png.stat().st_size < 150_000:
            continue
        im = Image.open(png)
        if im.width > 1600:
            im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
        im.save(png.with_suffix(".webp"), "WEBP", quality=80, method=6)
        png.unlink()
        converted.append(png.relative_to(OUT).as_posix())
    for f in list(OUT.glob("*.html")) + list(OUT.glob("*.js")) + list(OUT.glob("*.css")):
        t = f.read_text()
        for c in converted:
            t = t.replace(c, c[:-4] + ".webp")
        if all(p.startswith("assets/projects/") for p in converted if "/projects/" in p):
            t = t.replace("'assets/projects/'+p.image+'.png'", "'assets/projects/'+p.image+'.webp'")
        f.write_text(t)
    return converted

def og_image():
    src = SRC / "assets/studio-hero.png"
    im = Image.open(src).convert("RGB")
    w, h = im.size
    target_h = round(w * 630 / 1200)
    top = max(0, (h - target_h) // 2)
    im.crop((0, top, w, top + target_h)).resize((1200, 630), Image.LANCZOS).save(OUT / "assets/og-image.jpg", "JPEG", quality=85, optimize=True)

def seo_files():
    today = datetime.date.today().isoformat()
    (OUT / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n")
    urls = [("/", "1.0"), ("/gallery", "0.8"), ("/assets/harshal-patil-cv.pdf", "0.5")]
    body = "".join(f"  <url><loc>{SITE}{u}</loc><lastmod>{today}</lastmod><priority>{p}</priority></url>\n" for u, p in urls)
    (OUT / "sitemap.xml").write_text(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{body}</urlset>\n')
    (OUT / "llms.txt").write_text(f"""# Harshal Patil

> Freelance .NET, Azure, Angular, Flutter and AI agent developer based in Mumbai, India. Solution engineer and two-time co-founder, building software since 2012.

## Services
- AI agents and automation: LLM agents with tool calling, human approval steps, audit logs and cost tracking, connected to WhatsApp, Meta and Google.
- Product and MVP builds: ASP.NET Core APIs, Angular web apps, Flutter mobile apps, deployed with CI/CD.
- Legacy modernization: .NET Framework and ASP.NET to .NET 8+ and Azure, step by step.
- Performance fixes for slow APIs, SQL Server and EF Core queries.
- Document intelligence with Azure AI Document Intelligence and Azure AI Search.
- Architecture reviews and team extension.

## Selected work
- Revora: multi-tenant AI growth platform for local service businesses (.NET 10, Angular 22, PostgreSQL, LLM agents, WhatsApp). In rollout, 2026.
- Loan application platform: web-based lending workflow for a lending client (.NET, Angular, SQL Server, Azure). In development.
- Presso24: on-demand laundry app in Navi Mumbai (Flutter, .NET, Azure). 150+ orders a month, 80% repeat rate.
- Template authoring platform for a Big Four firm (Angular 19, .NET 8, Redis). About 60% faster large-template loads.
- Also: electronic health records, cloud migration management, event-driven ETL, enterprise search, AI medical scribing, on-device face recognition, edge AI vision, and document management for HAL, Pune Municipal Corporation, MDIndia and EMH Cranes.

## Working together
- Location: Mumbai, India (IST). Overlaps US East Coast mornings and the UK/EU working day.
- Engagements: hourly or fixed milestones; team delivery through Bit2Sky India; US contracting through Bit2Sky Inc. USA.
- Contact: harshalp@bit2sky.com, +91 77100 20095 (WhatsApp)

## Pages
- [Profile]({SITE}/)
- [Project gallery]({SITE}/gallery)
- [CV (PDF)]({SITE}/assets/harshal-patil-cv.pdf)
""")

if __name__ == "__main__":
    sync()
    og_image()
    print("converted:", len(to_webp()))
    seo_files()
    print("built", OUT)
