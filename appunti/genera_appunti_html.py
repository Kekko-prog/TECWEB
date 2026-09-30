"""Genera gli appunti in HTML stampabile, riusando il template di generate_html.py.

Il CSS viene estratto da generate_html.py via AST, cosi' il template resta
definito in un solo posto e non viene duplicato qui.

Uso:
    python genera_appunti_html.py            # genera solo APPUNTI-JS.html
    python genera_appunti_html.py --tutti    # genera HTML, CSS e JS
"""

import ast
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROGETTO = os.path.dirname(BASE_DIR)
SORGENTI = os.path.join(PROGETTO, "appunti in md")
DESTINAZIONE = os.path.join(SORGENTI, "appunti a pdf")

DOCUMENTI = {
    "HTML": "Appunti Tecnologie Web - HTML",
    "CSS": "Appunti Tecnologie Web - CSS",
    "JS": "Appunti Tecnologie Web - JavaScript",
}


def leggi_css():
    """Estrae la costante css_styles da generate_html.py senza eseguirlo."""
    percorso = os.path.join(BASE_DIR, "generate_html.py")
    with open(percorso, "r", encoding="utf-8") as fh:
        albero = ast.parse(fh.read())
    for nodo in albero.body:
        if isinstance(nodo, ast.Assign):
            for target in nodo.targets:
                if isinstance(target, ast.Name) and target.id == "css_styles":
                    return ast.literal_eval(nodo.value)
    raise RuntimeError("css_styles non trovato in generate_html.py")


def converti(chiave, css_styles):
    import markdown

    titolo = DOCUMENTI[chiave]
    md_path = os.path.join(SORGENTI, "APPUNTI-%s.md" % chiave)
    html_path = os.path.join(DESTINAZIONE, "APPUNTI-%s.html" % chiave)

    if not os.path.exists(md_path):
        print("SALTATO (sorgente mancante): %s" % md_path)
        return False

    with open(md_path, "r", encoding="utf-8") as fh:
        md_text = fh.read()

    html_body = markdown.markdown(md_text, extensions=["tables", "fenced_code"])

    full_html = """<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{titolo}</title>
  <style>{css}</style>
</head>
<body>
  <div class="top-bar no-print">
    <h2>{titolo}</h2>
    <button class="print-btn" onclick="window.print()">&#128424;&#65039; Stampa / Salva in PDF</button>
  </div>

  <div class="tips-box no-print">
    <strong>&#128161; Per una stampa perfetta (senza scritte o tagli strani):</strong><br>
    Nella schermata di stampa del browser:
    <br>&bull; <strong>Deseleziona</strong> <em>"Intestazioni e pi&egrave; di pagina"</em> (toglie la data, il link del file e il percorso dai bordi).
    <br>&bull; <strong>Seleziona</strong> <em>"Grafica di sfondo"</em> (mantiene i colori e i box formattati).
  </div>

  <main class="document-container">
    {corpo}
  </main>
</body>
</html>""".format(titolo=titolo, css=css_styles, corpo=html_body)

    os.makedirs(DESTINAZIONE, exist_ok=True)
    with open(html_path, "w", encoding="utf-8") as fh:
        fh.write(full_html)

    print("Generato: %s" % html_path)
    return True


def main():
    try:
        import markdown  # noqa: F401
    except ImportError:
        print("Manca il modulo 'markdown'. Installalo con: pip install markdown")
        return 1

    css_styles = leggi_css()
    chiavi = list(DOCUMENTI) if "--tutti" in sys.argv else ["JS"]
    for chiave in chiavi:
        converti(chiave, css_styles)
    return 0


if __name__ == "__main__":
    sys.exit(main())
