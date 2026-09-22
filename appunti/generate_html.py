import markdown
import os

css_styles = """
:root {
  --bg-color: #ffffff;
  --text-color: #24292f;
  --heading-color: #1f2328;
  --border-color: #d0d7de;
  --code-bg: #f6f8fa;
  --accent-color: #0969da;
}

* {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: var(--text-color);
  background-color: #f6f8fa;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

.top-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #24292e;
  color: white;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
}

.top-bar h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.print-btn {
  background: #2ea44f;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s, transform 0.1s;
}

.print-btn:hover {
  background: #2c974b;
  transform: translateY(-1px);
}

.tips-box {
  background: #fff8c5;
  color: #573a08;
  border-left: 5px solid #d4a72c;
  padding: 14px 20px;
  font-size: 14px;
  margin: 20px auto;
  max-width: 900px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.document-container {
  max-width: 900px;
  margin: 20px auto 60px auto;
  background: white;
  padding: 50px 60px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

h1, h2, h3, h4, h5, h6 {
  color: var(--heading-color);
  font-weight: 600;
  margin-top: 1.6em;
  margin-bottom: 0.6em;
  line-height: 1.3;
}

h1 {
  font-size: 2.2em;
  padding-bottom: 0.3em;
  border-bottom: 2px solid var(--border-color);
  margin-top: 0;
}

h2 {
  font-size: 1.6em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid var(--border-color);
}

h3 {
  font-size: 1.3em;
}

p {
  margin-top: 0;
  margin-bottom: 16px;
}

hr {
  height: 2px;
  background-color: var(--border-color);
  border: none;
  margin: 28px 0;
}

code {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
  font-size: 0.9em;
  background: var(--code-bg);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  border: 1px solid #e1e4e8;
}

pre {
  background: var(--code-bg);
  padding: 16px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  overflow-x: auto;
  font-size: 13.5px;
  line-height: 1.45;
  margin-bottom: 18px;
}

pre code {
  background: none;
  padding: 0;
  border: none;
  font-size: inherit;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
  display: table;
}

th, td {
  border: 1px solid var(--border-color);
  padding: 10px 14px;
  text-align: left;
}

th {
  background-color: #f6f8fa;
  font-weight: 600;
}

tr:nth-child(even) td {
  background-color: #fafbfc;
}

blockquote {
  border-left: 4px solid #0969da;
  padding: 10px 18px;
  margin: 18px 0;
  background: #f0f7ff;
  color: #1f2328;
  border-radius: 0 6px 6px 0;
}

ul, ol {
  padding-left: 28px;
  margin-bottom: 18px;
}

li {
  margin-bottom: 6px;
}

/* Stili Ottimizzati per Stampa & PDF */
@media print {
  @page {
    size: A4;
    margin: 15mm 15mm 15mm 15mm;
  }

  body {
    background: #ffffff !important;
    color: #000000 !important;
    font-size: 10.5pt;
    line-height: 1.45;
  }

  .no-print {
    display: none !important;
  }

  .document-container {
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
  }

  /* Evita che i titoli rimangano orfani a fine pagina */
  h1, h2, h3, h4, h5, h6 {
    page-break-after: avoid;
    break-after: avoid;
    color: #000000 !important;
  }

  /* Evita tagli a metà per tabelle, blocchi di codice, liste e citazioni */
  pre, code, table, blockquote, tr, ul, ol, dl {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  pre {
    border: 1px solid #d0d7de !important;
    background: #f6f8fa !important;
    color: #000 !important;
    white-space: pre-wrap;
    word-break: break-all;
  }

  th {
    background-color: #f0f2f5 !important;
    color: #000 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  blockquote {
    border-left: 4px solid #0969da !important;
    background: #f0f7ff !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  a {
    color: #000 !important;
    text-decoration: underline;
  }
}
"""

def convert(md_path, html_path, title):
    with open(md_path, 'r', encoding='utf-8') as f:
        md_text = f.read()

    html_body = markdown.markdown(md_text, extensions=['tables', 'fenced_code'])

    full_html = f"""<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <style>{css_styles}</style>
</head>
<body>
  <div class="top-bar no-print">
    <h2>{title}</h2>
    <button class="print-btn" onclick="window.print()">🖨️ Stampa / Salva in PDF</button>
  </div>
  
  <div class="tips-box no-print">
    <strong>💡 Per una stampa perfetta (senza scritte o tagli strani):</strong><br>
    Nella schermata di stampa del browser:
    <br>• <strong>Deseleziona</strong> <em>"Intestazioni e piè di pagina"</em> (toglie la data, il link del file e il percorso dai bordi).
    <br>• <strong>Seleziona</strong> <em>"Grafica di sfondo"</em> (mantiene i colori e i box formattati).
  </div>

  <main class="document-container">
    {html_body}
  </main>
</body>
</html>"""

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(full_html)
    print(f"File generato con successo: {html_path}")

base_dir = r"c:\Users\franc\Desktop\univeristà\3 anno\TECWEB\appunti"
convert(os.path.join(base_dir, "APPUNTI-HTML.md"), os.path.join(base_dir, "APPUNTI-HTML.html"), "Appunti Tecnologie Web - HTML")
convert(os.path.join(base_dir, "APPUNTI-CSS.md"), os.path.join(base_dir, "APPUNTI-CSS.html"), "Appunti Tecnologie Web - CSS")
