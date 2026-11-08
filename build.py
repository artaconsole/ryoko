#!/usr/bin/env python3
"""Build the single offline index.html from src/.

    python3 build.py

Inlines src/engine.css (with the Vazirmatn woff2 subsets as base64),
every src/content/*.js in name order, then src/engine.js.
"""
import base64
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "src"


def b64(name):
    return base64.b64encode((SRC / "fonts" / name).read_bytes()).decode()


css = (SRC / "engine.css").read_text(encoding="utf-8")
css = css.replace("@@FONT_REGULAR@@", b64("vazir-Regular.woff2"))
css = css.replace("@@FONT_BOLD@@", b64("vazir-Bold.woff2"))

parts = sorted((SRC / "content").glob("*.js"))
content = "\n".join(p.read_text(encoding="utf-8") for p in parts)
engine = (SRC / "engine.js").read_text(encoding="utf-8")
shell = (SRC / "shell.html").read_text(encoding="utf-8")

# keep "</script" sequences in data from closing the inline script early
content = content.replace("</script", "<\\/script")

out = (shell.replace("/*@@CSS@@*/", css)
            .replace("/*@@CONTENT@@*/", content)
            .replace("/*@@ENGINE@@*/", engine))
(ROOT / "index.html").write_text(out, encoding="utf-8")
print(f"index.html: {len(out.encode('utf-8')) / 1024:.0f} KiB from {len(parts)} content files")
