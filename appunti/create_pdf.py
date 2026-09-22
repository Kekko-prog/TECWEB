import os
import markdown
from xhtml2pdf import pisa

css = """
@page {
    size: a4 portrait;
    margin: 1.5cm 1.5cm 1.5cm 1.5cm;
}

body {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 9.5pt;
    line-height: 1.45;
    color: #222222;
}

h1 {
    font-size: 17pt;
    color: #0b3d91;
    border-bottom: 1.5pt solid #0b3d91;
    padding-bottom: 3pt;
    margin-top: 16pt;
    margin-bottom: 8pt;
}

h2 {
    font-size: 13pt;
    color: #1e3a8a;
    border-bottom: 0.8pt solid #cbd5e1;
    padding-bottom: 2pt;
    margin-top: 14pt;
    margin-bottom: 6pt;
}

h3 {
    font-size: 11pt;
    color: #1e293b;
    margin-top: 10pt;
    margin-bottom: 4pt;
}

p {
    margin-top: 0;
    margin-bottom: 8pt;
}

ul, ol {
    margin-top: 0;
    margin-bottom: 8pt;
    padding-left: 18pt;
}

li {
    margin-bottom: 3pt;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 6pt;
    margin-bottom: 10pt;
}

th, td {
    border: 0.5pt solid #cbd5e1;
    padding: 4.5pt 6pt;
    font-size: 8.5pt;
    text-align: left;
}

th {
    background-color: #f1f5f9;
    color: #0f172a;
    font-weight: bold;
}

pre {
    background-color: #f8fafc;
    border: 0.6pt solid #e2e8f0;
    padding: 6pt 8pt;
    margin-top: 4pt;
    margin-bottom: 8pt;
    font-family: Courier, monospace;
    font-size: 8pt;
    line-height: 1.35;
}

code {
    font-family: Courier, monospace;
    font-size: 8pt;
    background-color: #f1f5f9;
    padding: 1pt 2pt;
}

blockquote {
    border-left: 2.5pt solid #0284c7;
    background-color: #f0f9ff;
    padding: 4pt 8pt;
    margin-top: 4pt;
    margin-bottom: 8pt;
    font-size: 8.5pt;
}

hr {
    border: 0;
    border-top: 0.5pt solid #e2e8f0;
    margin: 12pt 0;
}
"""

def md_to_pdf(md_file, pdf_file, doc_title):
    with open(md_file, "r", encoding="utf-8") as f:
        md_text = f.read()

    # Pre-elaborazione pulizia Markdown
    body_html = markdown.markdown(md_text, extensions=['tables', 'fenced_code'])

    full_html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>{doc_title}</title>
<style>
{css}
</style>
</head>
<body>
{body_html}
</body>
</html>"""

    with open(pdf_file, "wb") as f_out:
        pisa_status = pisa.CreatePDF(full_html, dest=f_out, encoding="utf-8")

    if pisa_status.err:
        print(f"Errore nella generazione di {pdf_file}")
    else:
        print(f"PDF generato con successo: {pdf_file}")

base_dir = r"c:\Users\franc\Desktop\univeristà\3 anno\TECWEB\appunti"
md_to_pdf(os.path.join(base_dir, "APPUNTI-HTML.md"), os.path.join(base_dir, "APPUNTI-HTML.pdf"), "Tecnologie Web - HTML")
md_to_pdf(os.path.join(base_dir, "APPUNTI-CSS.md"), os.path.join(base_dir, "APPUNTI-CSS.pdf"), "Tecnologie Web - CSS")
