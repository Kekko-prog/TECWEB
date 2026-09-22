# HTML - Architettura Web e HyperText Markup Language

---

## 1. Architettura del Web & Protocollo HTTP

### Internet vs World Wide Web (WWW)

Spesso usati come sinonimi nel linguaggio comune, **Internet** e **Web** rappresentano due concetti distinti:

- **Internet**: Rete globale di computer e dispositivi interconnessi che comunicano attraverso la suite di protocolli Internet (**TCP/IP**). Le sue origini risalgono al progetto **ARPANET** del 1969. Su Internet poggiano numerosi servizi (Web, posta elettronica, trasferimento file, streaming, ecc.).
- **World Wide Web (WWW)**: Un sottoinsieme di Internet, ideato nei primi anni '90 da **Sir Tim Berners-Lee** al CERN. Si tratta di un sistema informativo composto da documenti ipertestuali interconnessi tra loro tramite collegamenti (**hyperlinks**).
- I due componenti fondamentali del Web sono:
  - **HTTP** (*HyperText Transfer Protocol*): Il protocollo di comunicazione per trasferire risorse.
  - **HTML** (*HyperText Markup Language*): Il formato standard con cui sono scritti e strutturati i documenti ipertestuali.

```text
+--------------------------------------------------------+
|                      INTERNET                          |
|  (Infrastruttura globale di rete TCP/IP - dal 1969)    |
|                                                        |
|   +-----------------------+     +------------------+   |
|   |  World Wide Web (WWW) |     |  Altri Servizi   |   |
|   |  - HTTP / HTTPS       |     |  - Email (SMTP)  |   |
|   |  - HTML Documents     |     |  - SSH / FTP     |   |
|   +-----------------------+     +------------------+   |
+--------------------------------------------------------+
```

### Documenti Ipertestuali (Hypertexts)

A differenza dei testi tradizionali (sequenze lineari di caratteri), gli **ipertesti** contengono puntatori interattivi (**link** o collegamenti ipertestuali) verso altre risorse (altri ipertesti, documenti multimediali, file binari). La navigazione non è rigidamente sequenziale, ma reticolare.

---

### Architettura di una Full-Stack Web Application

Una moderna applicazione web è basata sul modello **Client-Server**:

```text
[ Web Browser ]  <======== (mostly) HTTP ========>  [ Web Server(s) ]
  (Front-End)                                          (Back-End)
```

- **Front-End (Client)**: Ciò che viene eseguito all'interno del browser dell'utente. Si occupa della presentazione, dell'interfaccia utente (UI) e dell'interazione diretta.
  - *Tecnologie principali*: HTML5, CSS3, JavaScript (TypeScript), framework/librerie (React, Angular, Vue, Bootstrap, Vite, Sass).
- **Back-End (Server)**: L'ambiente server in cui risiedono la logica di business, l'accesso ai database, l'autenticazione e la gestione delle richieste.
  - *Tecnologie principali*: Node.js, Express, Spring, Python (Django, Flask), PHP, Web Server HTTP (Nginx, Apache).

---

### Il Protocollo HTTP (HyperText Transfer Protocol)

HTTP è un **protocollo di livello applicativo** che poggia sullo stack **TCP/IP**. È il canale portante del World Wide Web.

#### Caratteristiche Fondamentali:
1. **Modello Request/Response**: Il client (es. browser) apre una connessione ed invia una richiesta HTTP; il server elabora e restituisce una risposta HTTP.
2. **Statelessness (Assenza di stato)**: Ogni richiesta è completamente autonoma e indipendente dalle precedenti. Il server non memorizza alcuna informazione sulle richieste passate del client. Per implementare sessioni o mantenere l'autenticazione si usano meccanismi aggiuntivi come i **cookie**, i **token JWT** o il local storage.

#### Struttura dei Messaggi HTTP:

```text
               MESSAGGIO HTTP REQUEST
+------------------------------------------------------+
|  Verb (Metodo)  |  URI (Percorso)  |  HTTP Version   |  <- Request Line
+------------------------------------------------------+
|  Request Headers (coppie Nome: Valore)               |
+------------------------------------------------------+
|  [Riga Vuota / Blank Line]                           |
+------------------------------------------------------+
|  Request Body (opzionale, es. dati form / payload)   |
+------------------------------------------------------+

               MESSAGGIO HTTP RESPONSE
+------------------------------------------------------+
|  HTTP Version   |  Status Code   |   Status Message  |  <- Status Line
+------------------------------------------------------+
|  Response Headers (coppie Nome: Valore)              |
+------------------------------------------------------+
|  [Riga Vuota / Blank Line]                           |
+------------------------------------------------------+
|  Response Body (il contenuto restituito: HTML, JSON) |
+------------------------------------------------------+
```

#### Esempio di Richiesta HTTP (Request):
```http
GET /wisdom/grain.txt HTTP/1.1
Host: bookofprogramming.com
User-Agent: Mozilla/5.0
Accept: text/plain
Accept-Language: en-us
Connection: keep-alive
```

#### Esempio di Risposta HTTP (Response):
```http
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 153

Fu-Tzu said: 'When you cut against the grain of the wood, much strength is needed. When you program against the grain of a problem, much code is needed.'
```

#### Metodi (Verbi) HTTP Principali:
- **`GET`**: Richiede una rappresentazione della risorsa specificata (non deve modificare lo stato del server).
- **`POST`**: Invia dati alla risorsa specificata per crearla o elaborarla.
- **`PUT`**: Sostituisce interamente la risorsa bersaglio con il payload inviato.
- **`DELETE`**: Rimuove la risorsa specificata.

#### Classi dei Codici di Stato HTTP (Response Status Codes):
| Intervallo | Categoria | Descrizione ed Esempi |
| :--- | :--- | :--- |
| **`100-199`** | **Informational** | Richiesta ricevuta, elaborazione in corso (`100 Continue`). |
| **`200-299`** | **Success** | Azione completata con successo (`200 OK`, `201 Created`). |
| **`300-399`** | **Redirection** | Ulteriori azioni richieste per completare la richiesta (`301 Moved Permanently`). |
| **`400-499`** | **Client Error** | Errore causato dal client (`400 Bad Request`, `403 Forbidden`, `404 Not Found`). |
| **`500-599`** | **Server Error** | Il server ha riscontrato un errore interno (`500 Internal Server Error`, `503 Service Unavailable`). |

---

### Ciclo di Navigazione Web: Cosa succede digitando un URL?

Quando un utente inserisce un indirizzo nel browser (es. `http://example.com/dir/file.txt`):

```text
Browser                           Server DNS                     Server HTTP
   |                                  |                               |
   | 1. Risoluzione: example.com?     |                               |
   |--------------------------------->|                               |
   | 2. Risposta IP: 93.184.216.34    |                               |
   |<---------------------------------|                               |
   |                                                                  |
   | 3. Apertura connessione TCP (handshake sulla porta 80 o 443)     |
   |----------------------------------------------------------------->|
   | 4. Invio HTTP Request: GET /dir/file.txt                         |
   |----------------------------------------------------------------->|
   | 5. Ricezione HTTP Response: 200 OK (con dati / HTML)             |
   |<-----------------------------------------------------------------|
   | 6. Parsing del documento e rendering a schermo                   |
```

---

### Anatomia Completa di un URL (Uniform Resource Locator)

Un URL identifica in modo univoco una risorsa disponibile su una rete.

```text
https://www.informatica.it:4242/corsi/tecweb.html?key1=val1&key2=val2#some-id
\___/   \________________/\___/\________________/\__________________/\______/
  |             |           |          |                  |              |
Schema     Domain Name    Porta     Percorso       Query Parameters    Anchor
(Protocol)   (Host)                  (Path)                           (Frammento)
```

1. **Schema (Protocollo)**: Specifica il protocollo per accedere alla risorsa. I più comuni sono `http` e `https`.
   - **HTTPS** (*HTTP Secure*): HTTP cifrato tramite **TLS** (*Transport Layer Security*), fondamentale per impedire intercettazioni (man-in-the-middle) e manomissioni.
2. **Domain Name (Nome di Dominio)**: L'indirizzo logico del server che ospita la risorsa. È gerarchico e si legge da destra verso sinistra:
   - **TLD** (*Top Level Domain*): estensione primaria (`.it`, `.com`, `.org`), gestita da **IANA**.
   - **SLD** (*Secondary Level Domain*): nome dell'organizzazione o servizio (es. `informatica`).
   - **Subdomains**: prefissi opzionali per organizzare sezioni del dominio (es. `www.`, `blog.mozilla.org`, `informatica.dieti.unina.it`).
3. **Porta (Port)**: Porta TCP di destinazione sul server. Può essere omessa se standard:
   - Porta di default per HTTP: **`80`**
   - Porta di default per HTTPS: **`443`**
   - Se il server ascolta su una porta non convenzionale (es. `:3000`, `:4242`), va esplicitata.
4. **Path (Percorso)**: Percorso logico del file all'interno del filesystem del server, calcolato rispetto alla **Document Root** (`web root`).
   - Il server isola i file accessibili solo dentro la Document Root (es. `/var/www/html`) per questioni di sicurezza, impedendo l'accesso ad altre cartelle di sistema.
5. **Query Parameters**: Parametri addizionali inviati al server (dopo il punto interrogativo `?`).
6. **URL Anchor (Frammento)**: Riferimento a una sezione interna della pagina (preceduto da `#`).

#### Cartelle e `index.html`
Cosa succede se l'URL termina con una cartella anziché un file specifico (es. `http://example.com/corsi/`)?
- Il web server cerca ed eroga automaticamente il file predefinito della cartella: solitamente **`index.html`** (o `home.html`, `default.html`).
- Se nessun file di indice è presente, a seconda della configurazione il server restituirà un errore (`403 Forbidden` / `404 Not Found`) oppure mostrerà un elenco dei file presenti nella directory (*Directory Indexing*).

---

## 2. Introduzione ad HTML (HyperText Markup Language)

### Cos'è HTML?

HTML è il linguaggio di marcatura standard del World Wide Web. Non è un linguaggio di programmazione procedurale o orientato agli oggetti, ma un **linguaggio di marcatura dichiarativo**.
Attraverso un insieme di **annotazioni** (chiamate **tag**), HTML descrive:
- La **struttura** gerarchica del documento.
- Il **ruolo semantico** delle varie componenti (titoli, paragrafi, tabelle, form, link, sezioni).
- Le **relazioni** tra le parti del contenuto.

#### Evoluzione dello Standard:
- HTML 1.0 (1993) $\rightarrow$ HTML 2 (1995) $\rightarrow$ HTML 3 (1997) $\rightarrow$ HTML 4 (1999) $\rightarrow$ HTML 5 (2014).
- Dal 2019 lo sviluppo è governato dal **WHATWG** sotto il nome di **HTML Living Standard** (uno standard vivente e in costante aggiornamento, non più rigidamente suddiviso in versioni monolitiche).

---

### Anatomia di un Elemento HTML

I tag sono delimitati da parentesi angolari `< >`. Un elemento HTML standard è costituito da:

```html
<tagName attribute1="value1" attribute2> Testo o contenuto </tagName>
\______/ \____________________________/ \________________/ \________/
    |                   |                       |               |
Tag di apertura    Attributi                Contenuto      Tag di chiusura
```

- **Tag di apertura**: include il nome del tag e gli eventuali attributi (coppie `chiave="valore"` o flag booleani).
- **Contenuto**: il testo o altri tag annidati all'interno dell'elemento.
- **Tag di chiusura**: uguale al tag di apertura ma preceduto da uno slash `/`.
- **Elementi Void (Self-closing)**: Elementi che per definizione non possono contenere figli o testo. Non richiedono un tag di chiusura separato (es. `<br>`, `<img>`, `<input>`, `<meta>`).

---

### Struttura Base di un Documento HTML5

Ogni file HTML valido presenta la seguente impalcatura minima:

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Titolo della Scheda</title>
  </head>
  <body>
    <!-- Questo è un commento: viene ignorato dal browser -->
    <h1>Benvenuti su HTML</h1>
    <p>Questo è il corpo visibile della pagina.</p>
  </body>
</html>
```

#### Componenti Chiave:
1. `<!DOCTYPE html>`: Dichiarazione preliminare obbligatoria. Non è un tag HTML, ma un'istruzione che comunica al browser di eseguire il rendering del documento secondo lo standard moderno **HTML5** (evitando la modalità retrocompatibile nota come *quirks mode*).
2. `<html lang="it">`: L'elemento radice che racchiude l'intero documento. L'attributo `lang` è fondamentale per i motori di ricerca, i sintetizzatori vocali (screen reader) e l'accessibilità.
3. `<head>`: Contenitore dei **metadati** (dati che descrivono il documento). Non vengono mostrati all'interno della pagina web, ma sono usati da browser, motori di ricerca e social network.
   - `<title>`: Elemento obbligatorio; definisce il titolo visualizzato sulla scheda del browser e nei risultati di ricerca.
   - `<meta charset="UTF-8">`: Specifica la codifica dei caratteri Unicode (supporta accenti, simboli ed emoji).
   - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Imposta la larghezza del viewport pari a quella del dispositivo, disattivando lo zoom artificiale su mobile (requisito base del Responsive Web Design).
   - `<meta name="description" content="...">`: Breve estratto usato dai motori di ricerca come snippet nei risultati (SEO).
   - `<meta name="keywords" content="...">`: Parole chiave relative al contenuto.
   - `<meta name="author" content="...">`: Autore del documento.
   - `<meta http-equiv="refresh" content="30">`: Ordina al browser di ricaricare automaticamente la pagina ogni 30 secondi.
4. `<body>`: Contiene l'intero contenuto informativo visibile all'utente a schermo (testi, immagini, layout, pulsanti).
5. **Commenti**: Delimitati da `<!--` e `-->`. Vengono ignorati durante il rendering e servono per documentare il codice o disattivare temporaneamente porzioni di pagina.

---

### Il Documento HTML come Albero (DOM Tree)

Un documento HTML non è un semplice file di testo piatto: il browser analizza la gerarchia dei tag e crea in memoria una struttura ad albero ad oggetti nota come **DOM (Document Object Model)**:

```text
                 +--------+
                 |  html  |
                 +----+---+
                      |
        +-------------+-------------+
        |                           |
    +---+----+                  +---+----+
    |  head  |                  |  body  |
    +---+----+                  +---+----+
        |                           |
  +-----+-----+               +-----+-----+
  |           |               |           |
+---+---+   +----+----+     +---+---+   +----+----+
| title |   |  meta   |     | main  |   | footer  |
+-------+   +---------+     +---+---+   +----+----+
                                |            |
                            +---+----+     +---+---+
                            |article |     |   p   |
                            +---+----+     +-------+
                                |
                          +-----+-----+
                          |           |
                        +---+---+   +---+---+
                        |  h1   |   |   p   |
                        +-------+   +-------+
```

Ogni nodo dell'albero rappresenta un elemento HTML, con relazioni di parentela ben definite (*genitore*, *figlio*, *fratelli*).

---

## 3. Testo, Intestazioni e Semantica Inline

### Intestazioni (Headings)

HTML mette a disposizione 6 livelli di intestazione, da `<h1>` a `<h6>`:

```html
<h1>Intestazione di primo livello (Titolo principale)</h1>
<h2>Intestazione di secondo livello (Sezione)</h2>
<h3>Intestazione di terzo livello (Sottosezione)</h3>
<h4>Intestazione di quarto livello</h4>
<h5>Intestazione di quinto livello</h5>
<h6>Intestazione di sesto livello</h6>
```

> [!IMPORTANT]
> Non usare le intestazioni per ingrandire il testo: per quello si usa il CSS. Le intestazioni hanno un valore **semantico e gerarchico**. Una pagina dovrebbe contenere un solo `<h1>` principale per favorire l'indicizzazione nei motori di ricerca (SEO) e la navigazione assistita.

---

### Paragrafi (`<p>`)

Il tag `<p>` rappresenta un paragrafo di testo. Nel rendering predefinito del browser, gli elementi `<p>` sono di tipo **block-level**: iniziano sempre su una nuova riga e lasciano un margine verticale sopra e sotto.

```html
<p>Questo è il primo paragrafo del testo.</p>
<p>Questo è il secondo paragrafo, separato dal precedente.</p>
```

---

### Formattazione Semantica del Testo (Inline Elements)

HTML distingue tra la formattazione puramente visiva e la formattazione **semantica**, che arricchisce il significato del testo:

- **`<em>`** (*Emphasis*): Esprime un'enfasi sul contenuto (rende solitamente il testo in corsivo).
- **`<strong>`** (*Strong Importance*): Esprime una rilevanza, serietà o urgenza notevole (rende solitamente il testo in grassetto).
- **`<br />`** (*Line Break*): Spezza la riga e forza l'andata a capo senza creare un nuovo paragrafo logico. È un tag void.
- **`<abbr title="...">`**: Definisce una sigla, acronimo o abbreviazione. L'attributo `title` contiene l'espansione testuale, visibile come tooltip posizionando il cursore sopra la sigla.
- **`<del>`** (*Deleted Text*): Indica testo rimosso dal documento (visualizzato barrato).
- **`<ins>`** (*Inserted Text*): Indica testo inserito in una revisione successiva (visualizzato sottolineato).

```html
<p>
  Il linguaggio <abbr title="HyperText Markup Language">HTML</abbr> 
  fornisce semantica a livello di testo.<br />
  Possiamo esprimere <strong>forte importanza</strong> oppure 
  <em>enfatizzare parole chiave</em>.
  Inoltre possiamo marcare testo <del>eliminato</del> e testo <ins>aggiunto</ins>.
</p>
```

---

### Caratteri Riservati ed Entità HTML (Character References)

Alcuni caratteri hanno un significato sintattico speciale in HTML (ad esempio `<` e `>` per i tag, o `&` per le entità). Se si provasse a scrivere direttamente:

```html
<!-- ERRORE: il browser confonde <x con l'inizio di un tag non valido -->
<p>Se 3 < x e y > 6 allora procedi</p>
```

Per visualizzare questi caratteri in sicurezza occorre ricorrere alle **Entità HTML** (o *Character References*), che possono essere definite per nome (`&nome;`) o per codice numerico (`&#numero;`):

| Simbolo | Descrizione | Entità per Nome | Entità Numerica |
| :---: | :--- | :--- | :--- |
| ` ` | Spazio non separabile (*Non-breaking space*) | `&nbsp;` | `&#160;` |
| `<` | Minore di (*Less than*) | `&lt;` | `&#60;` |
| `>` | Maggiore di (*Greater than*) | `&gt;` | `&#62;` |
| `&` | E commerciale (*Ampersand*) | `&amp;` | `&#38;` |
| `"` | Virgolette doppie (*Double quote*) | `&quot;` | `&#34;` |
| `'` | Apostrofo / Virgoletta singola (*Apostrophe*) | `&apos;` | `&#39;` |
| `©` | Simbolo del Copyright | `&copy;` | `&#169;` |

#### Esempio Corretto:
```html
<p>Se 3 &lt; x e y &gt; 6 allora procedi &amp; stampa il risultato.</p>
```

---

## 4. Collegamenti Ipertestuali (Hyperlinks) & URL

### Il Tag di Ancoraggio `<a>` e l'Attributo `href`

I link sono il meccanismo fondante del Web. Si definiscono tramite il tag `<a>` (*anchor*) e l'attributo principale `href` (*Hypertext Reference*), che specifica la destinazione:

```html
<a href="https://www.unina.it">Visita il sito di Ateneo</a>
```

---

### URL Assoluti vs URL Relativi

Quando si specifica il valore dell'attributo `href`, si possono usare due tipologie di percorsi:

1. **URL Assoluti**: Contengono lo schema (`http://` o `https://`) e l'hostname del server. Includono tutte le informazioni necessarie per raggiungere la risorsa da qualsiasi posizione.
   - Da preferire obbligatoriamente quando si collegano **risorse esterne** al proprio sito web.
   ```html
   <a href="https://developer.mozilla.org/en-US/">MDN Web Docs</a>
   ```

2. **URL Relativi**: Non specificano né protocollo né dominio; il percorso viene calcolato dal browser a partire dalla posizione del documento corrente.
   - Da preferire per collegare pagine **interne alla stessa applicazione web**: se l'applicazione viene spostata su un altro dominio o porta (es. da `localhost:3000` a `produzione.com`), tutti i link rimangono perfettamente funzionanti.

---

### Risoluzione dei Percorsi Relativi: Regole ed Esempi

La risoluzione dei percorsi relativi segue regole precise a seconda del primo carattere:

- **Se inizia con `/` (Root-relative)**: Il percorso è relativo alla radice del server (`Document Root`). Sostituisce l'intero path precedente.
- **Se NON inizia con `/` (Document-relative)**: Il percorso è relativo alla cartella in cui si trova il file corrente; sostituisce solo l'ultimo segmento del percorso.
- **Segmento `.` (punto singolo)**: Rappresenta la cartella corrente.
- **Segmento `..` (doppio punto)**: Rappresenta la cartella genitore (sale di un livello nell'albero delle directory).

#### Esempio Pratico:
Supponiamo che la pagina corrente abbia l'URL:
`http://bookofprogramming.com/a/b/c/hello.html`

| Valore dell'attributo `href` | Risultato Calcolato dal Browser | Spiegazione |
| :--- | :--- | :--- |
| `page.html` | `http://bookofprogramming.com/a/b/c/page.html` | Sostituisce solo `hello.html` nella stessa cartella. |
| `/index.html` | `http://bookofprogramming.com/index.html` | Inizia con `/`: riparte dalla radice del dominio. |
| `./index.html` | `http://bookofprogramming.com/a/b/c/index.html` | `.` indica la cartella corrente `c/`. |
| `../foo.html` | `http://bookofprogramming.com/a/b/foo.html` | Sale di un livello: esce da `c/` ed entra in `b/`. |
| `../../pic.jpg` | `http://bookofprogramming.com/a/pic.jpg` | Sale di due livelli: esce da `c/` e da `b/`, arrivando in `a/`. |
| `./../../pic.jpg` | `http://bookofprogramming.com/a/pic.jpg` | Equivalente al precedente. |

---

### L'Attributo `target`

L'attributo `target` indica dove visualizzare il documento collegato:

- **`target="_self"`** *(default)*: Apre la pagina collegata nella **stessa** scheda o finestra del browser.
- **`target="_blank"`**: Apre la pagina collegata in una **nuova scheda** (o nuova finestra).

```html
<a href="guida.html" target="_self">Apri guida nella stessa scheda</a>
<a href="https://google.com" target="_blank">Apri motore di ricerca in una nuova scheda</a>
```

---

### Segnalibri Interni: Attributo `id` e Frammenti URL (`#anchor`)

L'attributo globale `id` assegna un identificatore univoco ad un elemento HTML. È possibile creare collegamenti che scorrono la pagina direttamente fino all'elemento bersaglio aggiungendo `#id` all'URL:

```html
<!-- Elemento bersaglio posizionato in basso nella pagina -->
<h2 id="capitolo-3">Capitolo 3: I Form</h2>
<p>Contenuto approfondito del capitolo...</p>

<!-- Link per saltare direttamente al capitolo (segnalibro interno) -->
<a href="#capitolo-3">Vai al Capitolo 3</a>

<!-- Link da un'altra pagina esterna verso lo specifico paragrafo -->
<a href="https://miosito.it/guida.html#capitolo-3">Vedi Capitolo 3 nella Guida</a>
```

---

## 5. Tabelle

Le tabelle HTML vengono utilizzate per organizzare dati bidimensionali in righe e colonne.

### Tag Fondamentali:
- **`<table>`**: Contenitore generale della tabella.
- **`<caption>`**: Didascalia o titolo descrittivo della tabella (opzionale ma consigliato per l'accessibilità).
- **`<tr>`** (*Table Row*): Definisce una riga della tabella.
- **`<th>`** (*Table Header*): Cella di intestazione (il testo appare centrato e in grassetto per default).
- **`<td>`** (*Table Data*): Cella standard contenente i dati.

#### Esempio:
```html
<table>
  <caption>Riepilogo Esami Universitari</caption>
  <tr>
    <th>Materia</th>
    <th>Crediti (CFU)</th>
    <th>Voto</th>
  </tr>
  <tr>
    <td>Tecnologie Web</td>
    <td>9</td>
    <td>30</td>
  </tr>
  <tr>
    <td>Ingegneria del Software</td>
    <td>9</td>
    <td>28</td>
  </tr>
</table>
```

---

## 6. Liste

HTML definisce tre distinte tipologie di liste in base allo scopo semantico:

### 1. Liste Ordinate (`<ol>`)
Usate quando l'ordine degli elementi è significativo (elenchi numerati, sequenze temporali, passaggi di un algoritmo). Gli elementi interni sono racchiusi nel tag `<li>` (*List Item*).

```html
<ol>
  <li>Scarica l'ambiente di sviluppo</li>
  <li>Installa Node.js</li>
  <li>Esegui il server di sviluppo</li>
</ol>
```

### 2. Liste Non Ordinate (`<ul>`)
Usate per elenchi puntati in cui l'ordine degli elementi non altera il significato del contenuto.

```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
```

### 3. Liste di Descrizione (`<dl>`)
Ideali per glossari, dizionari o coppie chiave-descrizione.
- **`<dt>`** (*Description Term*): Il termine o concetto da definire.
- **`<dd>`** (*Description Details*): La spiegazione o descrizione associata al termine.

```html
<dl>
  <dt>Data</dt>
  <dd>Insieme di bit strutturati che assumono forme complesse.</dd>

  <dt>Control</dt>
  <dd>Flusso di semplici istruzioni che governano l'elaborazione dei dati.</dd>
</dl>
```

---

## 7. Elementi Multimediali: Immagini

### Il Tag `<img>` e i suoi Attributi

Il tag `<img>` è utilizzato per incorporare immagini all'interno di un documento HTML. È un **void element** (non ha tag di chiusura né contenuto testuale al suo interno).

```html
<img src="avatar.jpg" alt="Ritratto del Maestro Fu-Tzu" width="300" height="200" />
```

- **`src`** (*Source*): L'attributo obbligatorio che specifica l'URL (assoluto o relativo) dell'immagine da includere.
- **`alt`** (*Alternative Text*): Testo alternativo mostrato nel caso in cui l'immagine non possa essere caricata, ed essenziale per i software di sintesi vocale (accessibilità per non vedenti) e per l'indicizzazione dei motori di ricerca.
- **`width`** e **`height`**: Specificano le dimensioni grafiche dell'immagine (in pixel).

---

### Dietro le Quinte: Come il Browser Carica le Immagini

I file HTML non incorporano fisicamente i file grafici o multimediali al loro interno: contengono unicamente dei riferimenti URL.

```text
Browser                                                          Server Web
   |                                                                  |
   | 1. Richiesta HTTP GET /pagina.html                               |
   |----------------------------------------------------------------->|
   | 2. Risposta HTTP 200 OK (invia il codice sorgente HTML)          |
   |<-----------------------------------------------------------------|
   |                                                                  |
   | 3. Il browser esegue il parsing del documento dall'alto al basso |
   |    ... incontra il tag <img src="pic.jpg"> ...                   |
   |                                                                  |
   | 4. Richiesta HTTP GET /pic.jpg (richiesta separata!)             |
   |----------------------------------------------------------------->|
   | 5. Risposta HTTP 200 OK (invia i byte binari dell'immagine)       |
   |<-----------------------------------------------------------------|
   | 6. Rendering finale della pagina completa di grafica              |
```

> [!NOTE]
> Ogni risorsa esterna linkata nel codice HTML (immagini, fogli di stile CSS, file JavaScript, font) comporta l'emissione di ulteriori **richieste HTTP GET** verso il server da parte del browser.

---

## 8. Attributi Globali HTML

Mentre alcuni attributi sono specifici di determinati elementi (es. `href` per i link o `src` per le immagini), gli **attributi globali** possono essere applicati a **qualsiasi** elemento HTML:

| Attributo | Funzione | Esempio |
| :--- | :--- | :--- |
| **`id`** | Identificatore **univoco** all'interno dell'intero documento. Usato per collegamenti interni (`#`), selettori CSS e manipolazione JavaScript. | `<div id="navbar">` |
| **`class`** | Assegna una o più classi CSS (separate da spazio) per categorizzare e applicare stili agli elementi. | `<button class="btn btn-primary">` |
| **`style`** | Specifica stili CSS direttamente in linea sull'elemento. | `<p style="color: blue;">` |
| **`lang`** | Specifica la lingua utilizzata nel contenuto dell'elemento (sovrascrive quella globale definita in `<html>`). | `<span lang="en">Hello</span>` |
| **`title`** | Fornisce un testo di chiarimento visualizzato come tooltip al passaggio del cursore. | `<abbr title="World Wide Web">WWW</abbr>` |

---

## 9. Form & Raccolta Dati

I form (o moduli) costituiscono il principale strumento con cui un'applicazione web acquisisce input e interazioni dall'utente per inviarli al server.

### Il Tag `<form>`

L'elemento `<form>` fa da contenitore per tutti i controlli interattivi (campi di testo, pulsanti, checkbox, ecc.).

```html
<form action="/login-handler.html" method="POST">
  <!-- controlli del form -->
  <input type="submit" value="Invia" />
</form>
```

- **`action`**: L'URL dello script o del servizio server incaricato di elaborare i dati inviati. Se omesso, i dati vengono reinviati alla pagina corrente.
- **`method`**: Il metodo HTTP da impiegare per la sottomissione. I due valori principali sono **`GET`** e **`POST`**.

---

### Meccanismo di Sottomissione: Nome e Valore (`name=value`)

```text
name1=value1 & name2=value2 & ... & nameN=valueN
```

- **`name`**: L'attributo assegnato all'elemento di input (diventa la **chiave**). Se un controllo non possiede l'attributo `name`, il suo valore **non** verrà incluso nell'invio!
- **`value`**: Il contenuto digitato o selezionato dall'utente all'atto della sottomissione.

---

### Metodi di Invio a Confronto: `GET` vs `POST`

#### 1. Sottomissione con `GET` (Default)
Con il metodo `GET`, le coppie chiave-valore vengono serializzate ed **appese direttamente all'URL** dell'action, separate dal carattere `?`:

```text
/handler.html?msg=Hello&num=42
```

- **Richiesta generata**:
  ```http
  GET /handler.html?msg=Hello&num=42 HTTP/1.1
  Host: 127.0.0.1:3000
  User-Agent: Mozilla/5.0
  ```
- **Caratteristiche**:
  - I dati sono visibili in chiaro nella barra degli indirizzi del browser.
  - La richiesta può essere memorizzata nei segnalibri (bookmark) e nella cronologia del browser.
  - Può essere memorizzata nella cache del browser o dei proxy.
  - Non è adatta per trasmettere dati sensibili (come le password) né per payload voluminosi (gli URL hanno limiti massimi di lunghezza).
  - Ideale per operazioni di **ricerca** e **filtraggio**.

#### 2. Sottomissione con `POST`
Con il metodo `POST`, i dati non vengono inseriti nell'URL, ma nel **corpo della richiesta HTTP** (*Request Body*):

- **Richiesta generata**:
  ```http
  POST /handler.html HTTP/1.1
  Host: 127.0.0.1:3000
  User-Agent: Mozilla/5.0
  Content-Type: application/x-www-form-urlencoded

  msg=Hello&num=42
  ```
- **Caratteristiche**:
  - L'URL rimane pulito (`/handler.html`).
  - I dati non compaiono nella cronologia né nei preferiti del browser.
  - Supporta grandi quantità di dati (upload di file, immagini, testi estesi).
  - Obbligatorio per dati sensibili (credenziali di accesso) o azioni che alterano lo stato del server (creazione di record, pagamenti).

---

### URL Encoding (Percent-Encoding)

Gli URL ammettono unicamente un sottoinsieme ristretto di caratteri ASCII. Caratteri speciali (spazi, simboli di controllo o delimitatori come `&`, `=`, `?`) devono essere codificati secondo il formato **`%XX`**, dove `XX` è il valore esadecimale del codice ASCII del carattere.
Lo spazio viene comunemente convertito nel simbolo `+` o nella tripletta `%20`.

#### Esempio:
Se l'utente scrive nel campo `msg` il valore `Tom & Jerry`, la serializzazione prodotta sarà:
```text
msg=Tom+%26+Jerry
```
*(poiché `&` corrisponde all'esadecimale `26`)*.

#### Tabella dei Codici ASCII Comuni per URL Encoding:
| Carattere | Decimale | Esadecimale (Codifica URL) | Descrizione |
| :---: | :---: | :---: | :--- |
| ` ` *(spazio)* | 32 | `%20` oppure `+` | Space |
| `!` | 33 | `%21` | Punto esclamativo |
| `"` | 34 | `%22` | Doppie virgolette |
| `#` | 35 | `%23` | Cancelletto (*Hash*) |
| `$` | 36 | `%24` | Simbolo del dollaro |
| `%` | 37 | `%25` | Simbolo percentuale |
| `&` | 38 | `%26` | E commerciale (*Ampersand*) |
| `'` | 39 | `%27` | Apostrofo |
| `(` / `)` | 40 / 41 | `%28` / `%29` | Parentesi tonde aperta / chiusa |
| `*` | 42 | `%2A` | Asterisco |
| `+` | 43 | `%2B` | Simbolo più |
| `,` | 44 | `%2C` | Virgola |
| `-` | 45 | `%2D` | Trattino (*Minus*) |
| `.` | 46 | `%2E` | Punto fermo |
| `/` | 47 | `%2F` | Barra slash |
| `[` / `]` | 91 / 93 | `%5B` / `%5D` | Parentesi quadre aperta / chiusa |
| `\` | 92 | `%5C` | Barra inversa (*Backslash*) |

---

### Controlli di Input: Tipi di `<input>`

Il tag `<input>` è l'elemento più versatile dei form. La sua veste grafica e la logica di inserimento sono determinate dall'attributo **`type`**:

```html
<!-- Testo a riga singola -->
<input type="text" name="username" placeholder="Inserisci il tuo nome" />

<!-- Password: i caratteri inseriti vengono mascherati con pallini o asterischi -->
<input type="password" name="pwd" />

<!-- Valore numerico (fornisce controlli di incremento/decremento) -->
<input type="number" name="age" min="18" max="99" />

<!-- Indirizzo email con validazione automatica del formato -->
<input type="email" name="user_email" />

<!-- Date e orari con selettori grafici nativi del browser -->
<input type="date" name="birthdate" />
<input type="time" name="appointment" />
<input type="datetime-local" name="meeting" />
<input type="week" name="work_week" />
<input type="month" name="expiry_month" />

<!-- Selettore grafico di colore -->
<input type="color" name="fav_color" />

<!-- Caricamento di file dal dispositivo -->
<input type="file" name="attachment" />

<!-- Cursore per intervalli numerici -->
<input type="range" name="volume" min="0" max="100" />

<!-- Pulsante di sottomissione predefinito -->
<input type="submit" value="Invia Modulo" />

<!-- Pulsante generico per interazione con JavaScript -->
<input type="button" value="Cliccami" />
```

---

### Checkbox vs Radio Buttons

Entrambi consentono di selezionare opzioni, ma rispondono a logiche differenti:

#### 1. Checkbox (`type="checkbox"`)
Permette la selezione **multipla** (0, 1 o più scelte indipendenti).
- Se una casella non viene selezionata, non invia nulla.
- Se più caselle con lo stesso `name` vengono spuntate, il browser accoda ciascuna selezione.

```html
<form>
  <p>Quali esami intendi sostenere?</p>
  <input type="checkbox" name="exams" value="web" id="cb_web" />
  <label for="cb_web">Tecnologie Web</label><br />

  <input type="checkbox" name="exams" value="pl2" id="cb_pl2" />
  <label for="cb_pl2">Linguaggi di Programmazione II</label><br />

  <input type="submit" value="Invia" />
</form>
```
- **Se entrambe le caselle sono selezionate**, la stringa inviata sarà:  
  `exams=web&exams=pl2`
- **Se nessuna è selezionata**: la stringa inviata sarà vuota (`""`).

#### 2. Radio Button (`type="radio"`)
Permette la scelta **esclusiva** di **una sola opzione** all'interno di un gruppo prestabilito.
- Per raggruppare i pulsanti radio e renderli mutualmente esclusivi, **devono condividere lo stesso attributo `name`**.

```html
<form>
  <p>Qual è il tuo corso preferito?</p>
  <input type="radio" name="fav" value="web" id="r_web" checked />
  <label for="r_web">Tecnologie Web</label><br />

  <input type="radio" name="fav" value="net" id="r_net" />
  <label for="r_net">Reti di Calcolatori</label><br />

  <input type="radio" name="fav" value="se" id="r_se" />
  <label for="r_se">Ingegneria del Software</label><br />

  <input type="submit" value="Conferma Scelta" />
</form>
```
- La sottomissione invierà un solo valore: ad esempio `fav=web`.

---

### Etichette Accessibili: Il Tag `<label>` e l'Attributo `for`

L'uso di `<label>` è essenziale per l'usabilità e l'accessibilità del sito:
- Consente agli screen reader di leggere correttamente cosa richiede ciascun campo.
- Aumenta l'area di interazione: cliccare sull'etichetta testuale attiva o porta automaticamente il focus sull'input associato.
- L'attributo **`for`** della label deve essere identico all'**`id`** dell'elemento `<input>` corrispondente:

```html
<label for="usr_id">Nome Utente:</label>
<input type="text" name="user" id="usr_id" />
```

---

### Altri Controlli del Form

#### Menu a Tendina (`<select>` e `<option>`)
Definisce un menu di scelta a discesa. Con l'attributo `multiple`, l'utente può selezionare più voci contemporaneamente.

```html
<label for="dest">Scegli la destinazione:</label>
<select name="destination" id="dest">
  <option value="Roma">Roma</option>
  <option value="Napoli" selected>Napoli</option>
  <option value="Parigi">Parigi</option>
</select>
```

#### Area di Testo Multilinea (`<textarea>`)
A differenza di `<input type="text">`, consente all'utente di digitare blocchi estesi di testo su più righe:

```html
<label for="msg">Lascia un messaggio:</label>
<textarea id="msg" name="message" rows="4" cols="50">Scrivi qui...</textarea>
```

#### Raggruppamento Logico: `<fieldset>` e `<legend>`
Permette di suddividere visivamente e concettualmente i form complessi in sezioni coerenti:

```html
<form>
  <fieldset>
    <legend>Dati Anagrafici</legend>
    <label for="fname">Nome:</label>
    <input type="text" id="fname" name="fname" /><br />
    <label for="lname">Cognome:</label>
    <input type="text" id="lname" name="lname" />
  </fieldset>

  <fieldset>
    <legend>Iscrizione Esame</legend>
    <label for="voto">Voto atteso:</label>
    <input type="number" id="voto" name="grade" /><br />
    <label for="data">Data esame:</label>
    <input type="date" id="data" name="date" />
  </fieldset>

  <input type="submit" value="Registra" />
</form>
```
*Sottomissione risultante*: `fname=Mario&lname=Rossi&grade=30&date=2026-06-15`

---

## 10. Organizzazione della Pagina & Tag Semantici (HTML5)

Nelle vecchie versioni di HTML, la suddivisione della pagina veniva affidata unicamente all'elemento generico **`<div>`** (*division*), privo di valore semantico intrinseco. Con HTML5 sono stati introdotti tag semantici strutturali specifici, capaci di esplicitare il significato del layout sia ai motori di ricerca che agli screen reader.

### Tag Semantici Strutturali:
- **`<header>`**: Intestazione di una pagina o di una sezione; ospita titoli, loghi e recapiti.
- **`<nav>`**: Raggruppa i blocchi di navigazione primaria (link a sezioni interne o esterne).
- **`<main>`**: Rappresenta il **contenuto principale** ed esclusivo del documento (non può essere duplicato all'interno della stessa pagina).
- **`<article>`**: Un blocco di contenuto autonomo, autoconsistente e riutilizzabile in altri contesti (un articolo di blog, un post su un forum, una notizia di giornale).
- **`<section>`**: Una sezione tematica del documento, generalmente introdotta da un'intestazione (`<h2>`-`<h6>`).
- **`<aside>`**: Contenuto marginale o correlato indirettamente al contenuto principale (sidebar laterali, banner, elenchi di link consigliati).
- **`<footer>`**: Piè di pagina del documento o di una sezione (note di copyright, link a informative legali, contatti).

```text
+--------------------------------------------------------------+
|                           <header>                           |
|       +----------------------------------------------+       |
|       |                    <nav>                     |       |
|       +----------------------------------------------+       |
+--------------------------------------------------------------+
|                                              |               |
|                    <main>                    |    <aside>    |
|   +--------------------------------------+   |  (Sidebar /   |
|   |              <article>               |   |   Contenuti   |
|   |  +--------------------------------+  |   |   Correlati)  |
|   |  |           <section>            |  |   |               |
|   |  +--------------------------------+  |   |               |
|   |  |           <section>            |  |   |               |
|   |  +--------------------------------+  |   |               |
|   +--------------------------------------+   |               |
|                                              |               |
+--------------------------------------------------------------+
|                           <footer>                           |
+--------------------------------------------------------------+
```

#### Esempio di Struttura Semantica Completa:
```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <title>Corso di Tecnologie Web</title>
</head>
<body>
  <header>
    <h1>Web Technologies Portal</h1>
    <p>Guida completa allo sviluppo full stack.</p>
    <nav>
      <a href="#html">HTML</a> | 
      <a href="#css">CSS</a> | 
      <a href="#js">JavaScript</a>
    </nav>
  </header>

  <main>
    <article id="html">
      <h2>Elementi Semantici</h2>
      <p>I tag semantici arricchiscono la comprensione della struttura.</p>
      
      <section>
        <h3>Vantaggi</h3>
        <p>Migliorano l'accessibilità, il posizionamento SEO e la leggibilità del codice.</p>
      </section>

      <section>
        <h3>Svantaggi</h3>
        <p>Nessuno svantaggio documentato: sono lo standard dell'HTML moderno.</p>
      </section>
    </article>
  </main>

  <aside>
    <h4>Link Utili</h4>
    <ul>
      <li><a href="https://developer.mozilla.org">Documentazione MDN</a></li>
      <li><a href="https://whatwg.org">WHATWG Living Standard</a></li>
    </ul>
  </aside>

  <footer>
    <p>&copy; 2026 Corso di Tecnologie Web - Tutti i diritti riservati.</p>
  </footer>
</body>
</html>
```

---

## 11. Browser Developer Tools (F12)

Tutti i moderni browser (Firefox, Chrome, Edge, Safari) integrano strumenti avanzati dedicati allo sviluppo e al debugging (*DevTools*), richiamabili premendo il tasto **`F12`** (o `Ctrl+Shift+I` / `Cmd+Option+I`).

### Pannelli Principali:
1. **Inspector / Analisi Pagina (DOM Tree)**:
   - Permette di esplorare l'albero DOM in tempo reale.
   - Consente di modificare al volo elementi HTML, attributi e stili CSS per testare cambiamenti grafici senza ricaricare il server.
2. **Network (Rete)**:
   - Registra ogni richiesta e risposta HTTP emessa dal browser (file HTML, fogli di stile, immagini, chiamate API).
   - Mostra metodo HTTP, codice di stato, intestazioni (Headers), payload inviati e tempi di caricamento (profilazione delle performance).
3. **Console**:
   - Visualizza messaggi di sistema, errori di caricamento, avvisi di sicurezza e log generati con JavaScript (`console.log`).
   - Fornisce una riga di comando interattiva per eseguire istruzioni JavaScript nel contesto della pagina.
4. **Debugger / Sorgenti**:
   - Consente di inserire breakpoint, monitorare variabili e tracciare l'esecuzione del codice client passo dopo passo.
