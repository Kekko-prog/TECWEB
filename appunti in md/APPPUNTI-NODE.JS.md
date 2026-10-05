# Node.js - JavaScript fuori dal Browser

---

## 1. Cos'è Node.js

Fino ad ora JavaScript è sempre stato qualcosa che vive _dentro_ la pagina HTML: lo scriviamo, il browser lo scarica e il suo motore lo esegue. Node.js ribalta questa prospettiva. **Node.js è un ambiente di esecuzione (_runtime_) che permette di eseguire JavaScript al di fuori del browser**, direttamente sulla macchina, dalla riga di comando.

Il punto è che JavaScript, come linguaggio, non è legato al browser: è un linguaggio con una sintassi e delle regole, e qualcuno deve solo fornirgli un contenitore in cui girare. Nel browser quel contenitore è il motore del browser (_V8_ in Chrome, _SpiderMonkey_ in Firefox, _JavaScriptCore_ in Safari). Node.js prende **il motore V8 di Chrome** e lo incapsula in un programma che gira sul sistema operativo, aggiungendoci le API che servono per fare cose da server: leggere file, aprire connessioni di rete, parlare con un database.

```text
        BROWSER                             NODE.JS
+-----------------------+          +-----------------------+
|  JavaScript (tuo code)|          |  JavaScript (tuo code)|
+-----------------------+          +-----------------------+
|   Codice DOM / window |          |  API di sistema (fs,  |
|   fetch, alert, eventi|          |  http, path, process) |
+-----------------------+          +-----------------------+
|      Motore JS        |          |      Motore JS        |
|        (V8)           |          |      (V8)             |
+-----------------------+          +-----------------------+
|    Sistema operativo  |          |    Sistema operativo  |
+-----------------------+          +-----------------------+
```

Il vantaggio pratico è enorme: **un solo linguaggio per tutto lo stack**. Il JavaScript che scrivi per il front-end è lo stesso linguaggio che scrivi per il back-end. Non devi imparare PHP, Java o Python per il server.

### Perché Node.js è famoso: il modello non-blocking

La caratteristica che ha reso Node.js popolare non è "JavaScript sul server" in sé, ma **come** gestisce le operazioni lente (letture su disco, richieste di rete, query al database).

In un server tradizionale, ogni richiesta occupa un _thread_: il server resta fermo ad aspettare che quel thread finisca prima di passare oltre. Se arriva una query lenta, quel thread è bloccato e non può servire altre richieste. Con molti utenti servono molti thread, e i thread costano memoria.

Node.js usa un **unico thread** con un **Event Loop** e I/O **non-blocking**: le operazioni lente vengono delegate al sistema operativo, e Node continua a servire altre richieste mentre aspetta il risultato. Quando l'operazione è pronta, una _callback_ (o la ripresa di una `Promise`) viene messa in coda e eseguita. Il risultato è un server molto leggero, capace di reggere tantissime connessioni contemporanee con poca memoria.

```text
Richieste in arrivo
       |
       v
+--------------+     operazione lenta (query DB, file...)
|  Event Loop  | -------------------------------------> [ Sistema Operativo ]
+--------------+ <-------------------------------------        |
       |              callback / Promise risolta               |
       v                                                        |
  risposta al client  <-----------------------------------------+
```

> [!IMPORTANT]
> Node.js è **single-threaded** per il codice JavaScript. Questo significa che una computazione pesante e sincrona (un ciclo lunghissimo, un calcolo enorme) blocca l'intero server per tutti gli utenti. Le operazioni di I/O invece sono asincrone e non bloccano. Per questo Node è ideale per applicazioni **I/O-bound** (API, gestione di database, streaming), meno per applicazioni **CPU-bound** (elaborazione video, crittografia massiccia).

---

## 2. Da browser a server: cosa cambia

Il linguaggio è lo stesso, ma l'ambiente offre cose diverse. Chi arriva dal front-end va incontro a un paio di sorprese.

| Aspetto               | Nel browser                              | In Node.js                                        |
| :-------------------- | :--------------------------------------- | :------------------------------------------------ |
| Oggetto globale       | `window` (o `self`)                      | `global`                                          |
| DOM                   | `document`, `document.querySelector()`, eventi | **Non esiste** — non c'è pagina HTML da manipolare |
| `alert`, `prompt`     | Disponibili                              | **Non esistono** (servono per il browser)         |
| Accesso al file system| Vietato per sicurezza                    | Disponibile tramite il modulo `fs`                |
| Rete                  | `fetch`, `XMLHttpRequest`                | Modulo `http`/`https`, e `fetch` (dalle versioni recenti) |
| Sistema operativo     | Non accessibile                          | `process`, `os`, variabili d'ambiente             |
| Moduli                | `<script>`, ES Modules                   | CommonJS (`require`) ed ES Modules (`import`)     |
| Uso tipico            | Presentazione e interazione              | Back-end, API, database, tool da riga di comando  |

- **`global`**: è l'equivalente di `window`. Un assegnamento del tipo `global.miaVar = 5` crea una variabile visibile ovunque. Va usata con parsimonia.
- **`process`**: oggetto fondamentale che rappresenta il processo in esecuzione. Da qui leggiamo gli argomenti della riga di comando (`process.argv`), le variabili d'ambiente (`process.env`), e controlliamo la chiusura (`process.exit()`).
- **`__dirname`** e **`__filename`**: due variabili "magiche" con il percorso assoluto della cartella e del file correnti. Servono continuamente per costruire percorsi in modo affidabile (come vedremo nel `server.js`).

---

## 3. Installare Node.js e npm

Node.js si installa dal sito ufficiale o dal gestore di pacchetti del sistema. Insieme a Node arriva **npm** (_Node Package Manager_), lo strumento che scarica e gestisce le librerie scritte da altri.

```bash
node --version    # es. v22.11.0
npm --version     # es. 10.9.0
```

Con Node moderno esiste anche `npm`, ma per avviare un file non serve npm: basta Node.

```bash
node server.js    # esegue il file
node              # apre la REPL (console interattiva), come il terminale del browser
```

> [!NOTE]
> `node` da solo, senza argomenti, apre una **REPL** (_Read-Eval-Print Loop_): una console interattiva dove puoi scrivere JavaScript e vederne subito il risultato, un po' come la console degli sviluppatori del browser. Utile per provare piccoli frammenti di codice.

### `package.json`: la carta d'identità del progetto

Ogni progetto Node serio ha nella cartella principale un file **`package.json`**. È un file JSON che descrive il progetto: nome, versione, script avviabili e **dipendenze** (le librerie usate).

```json
{
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^5.2.1",
    "sqlite": "^5.1.1",
    "sqlite3": "^6.0.1"
  }
}
```

- **`scripts`**: comandi personalizzati richiamabili con `npm run <nome>`. Lo script `start` è speciale: si avvia anche solo con `npm start`.
- **`dependencies`**: le librerie necessarie al funzionamento. Il numero è una versione, e il simbolo `^` indica "questa versione o una successiva compatibile".

Il file si crea con:

```bash
npm init          # guidato, fa delle domande
npm init -y       # accetta tutte le risposte di default
```

### Installare un pacchetto

```bash
npm install express        # scarica express e la aggiunge alle dependencies
npm install                 # installa tutte le dipendenze elencate nel package.json
```

Quando esegui `npm install`, npm crea (o aggiorna) due cose:

- **`node_modules/`**: la cartella che contiene fisicamente il codice di tutte le librerie scaricate, comprese le loro dipendenze. Può diventare enorme e **non va mai committata su git** (si aggiunge al `.gitignore`).
- **`package-lock.json`**: registra le versioni **esatte** di ogni pacchetto installato, per garantire che chiunque, altrove, ottenga le stesse identiche versioni eseguendo `npm install`.

```text
progetto/
├── package.json          -> descrive il progetto e le dipendenze
├── package-lock.json     -> blocca le versioni esatte (generato da npm)
├── node_modules/         -> il codice delle librerie (NON committare)
│   ├── express/
│   └── sqlite3/
└── server.js             -> il tuo codice
```

---

## 4. I moduli

Node.js organizza il codice in **moduli**: ogni file è un modulo a sé stante, con il proprio scope. Per riusare codice scritto altrove bisogna importarlo ed esportarlo. Node supporta due sistemi.

### CommonJS (`require` / `module.exports`)

È il sistema storico di Node, quello che si trova nella maggior parte dei progetti e nei tutorial.

```js
// modulo.js — cosa esportare
const saluta = (nome) => `Ciao, ${nome}!`;

module.exports = { saluta };
```

```js
// main.js — cosa importare
const { saluta } = require('./modulo.js');

console.log(saluta('Mondo'));
```

- `require('./modulo.js')` cerca un file **relativo**. Il percorso è obbligatorio per i file locali (`./` o `../`).
- `require('express')` cerca invece un **pacchetto** dentro `node_modules/` — niente `./`.
- `module.exports` è l'oggetto che il modulo rende disponibile agli altri.

### ES Modules (`import` / `export`)

È il sistema moderno, lo stesso che si usa nei `<script type="module">` del browser.

```js
// modulo.mjs
export const saluta = (nome) => `Ciao, ${nome}!`;
export default function sconosciuto() { /* ... */ }
```

```js
// main.mjs
import sconosciuto, { saluta } from './modulo.mjs';
```

> [!NOTE]
> Node decide quale sistema usare in base all'estensione (`.mjs` per ESM, `.cjs` per CommonJS) o al campo `"type"` nel `package.json` (`"type": "module"` attiva ESM per tutti i `.js`). **Non si possono mescolare** `require` e `import` nello stesso file. Nei progetti misti con Express e `sqlite3` conviene restare su CommonJS, come nel `server.js` di questo progetto.

### Moduli core (inclusi in Node)

Alcuni moduli sono già dentro Node, non vanno installati. Si importano direttamente con il loro nome:

| Modulo     | A cosa serve                                             |
| :--------- | :------------------------------------------------------- |
| `path`     | Costruire e manipolare percorsi di file in modo portabile |
| `fs`       | Leggere e scrivere file (`fs.readFile`, `fs.writeFile`)  |
| `http`     | Creare un server HTTP senza librerie esterne             |
| `os`       | Informazioni sul sistema operativo                       |
| `url`      | Analizzare e costruire URL                               |

```js
const path = require('path'); // gestione dei percorsi
const fs = require('fs');     // accesso al file system
```

---

## 5. Un server HTTP senza Express

Il modulo `http`, incluso in Node, permette di costruire un server web con niente di esterno.

```js
const http = require('http');

const server = http.createServer((req, res) => {
  // req = la richiesta in arrivo (metodo, URL, header...)
  // res = la risposta che stiamo per inviare

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Ciao dal mio server Node!');
});

server.listen(3000, () => {
  console.log('Server su http://localhost:3000');
});
```

Qui si vede già il ciclo **Request/Response**: `req` è la richiesta del browser (con `req.method`, `req.url`, `req.headers`), `res` è la risposta (con `res.writeHead()` per gli header e `res.end()` per il corpo). Il `listen(3000)` mette il server in ascolto sulla porta 3000.

Il problema è che con il solo `http` bisogna gestire a mano **tutto**: routing, tipi di contenuto, parsing del body, file statici. Diventa presto impraticabile. Da qui nasce **Express**.

---

## 6. Express.js

**Express** è il framework web più diffuso per Node.js. È una libreria minimale che si costruisce sopra `http` e fornisce gli strumenti per gestire le richieste in modo ordinato.

```bash
npm install express
```

```js
const express = require('express');
const app = express();          // crea l'applicazione
const port = 3000;

app.get('/', (req, res) => {    // quando qualcuno fa GET su "/"
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server su http://localhost:${port}`);
});
```

### Le route

Una **route** associa un **metodo HTTP** e un **percorso** a una funzione. I metodi corrispondono ai verbi HTTP visti per le richieste:

```js
app.get('/prodotti', (req, res) => { /* ... */ });    // leggere
app.post('/prodotti', (req, res) => { /* ... */ });   // creare
app.put('/prodotti/:id', (req, res) => { /* ... */ });  // aggiornare
app.delete('/prodotti/:id', (req, res) => { /* ... */ }); // eliminare
```

La funzione riceve sempre `(req, res)`:

- **`req`** (_request_): contiene tutto ciò che arriva dal client.
  - `req.params` — i parametri di percorso, es. `:id` in `/prodotti/:id`;
  - `req.query` — i parametri nella query string, es. `?categoria=gpu`;
  - `req.body` — i dati del corpo (per POST/PUT, richiede un middleware di parsing);
- **`res`** (_response_): serve a inviare la risposta.
  - `res.send()` — invia testo o HTML;
  - `res.json()` — invia un oggetto come JSON;
  - `res.status(404)` — imposta il codice di stato;
  - `res.sendFile()` — invia un file.

```js
app.get('/utente/:id', (req, res) => {
  const id = req.params.id;          // es. /utente/42  ->  "42"
  const categoria = req.query.cat;   // es. ?cat=gpu
  res.json({ id, categoria });       // risposta in formato JSON
});
```

### Il middleware

Un **middleware** è una funzione che sta "in mezzo" tra la richiesta e la route finale e che può leggere, modificare o bloccare il flusso. Ha la forma `(req, res, next)`; chiamando `next()` passa il controllo al middleware successivo.

```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);  // log di ogni richiesta
  next();                                    // passa al prossimo
});
```

Middleware fondamentali:

```js
app.use(express.json());          // interpreta il body JSON delle richieste
app.use(express.urlencoded({ extended: true })); // interpreta i form HTML
app.use(express.static(percorso)); // serve i file statici di una cartella
```

> [!NOTE]
> L'ordine di registrazione dei middleware è l'ordine in cui vengono eseguiti. Un `app.use()` scritto prima delle route le intercetta tutte.

---

## 7. Servire file statici: il `server.js` di questo progetto

HTML, CSS, JavaScript, immagini: sono **file statici**, cioè file che il server deve semplicemente consegnare al browser così come sono. `express.static()` fa esattamente questo: gli si passa una cartella e Express rende accessibile tutto il suo contenuto.

Ecco il `server.js` del progetto, annotato riga per riga:

```js
const express = require('express'); // import della libreria express
const path = require('path'); // strumento di node.js che serve a gestire i percorsi delle cartelle
const app = express(); // creazione e accesso del server web
const port = 3000; // la porta (il "citofono") a cui il sito risponderà in locale

// Diciamo ad Express di usare la cartella del tuo progetto come fonte per i file statici
// In questo modo, quando andrai su localhost:3000, cercherà lì dentro l'index.html

const publicPath = path.join(__dirname, 'ex/progetto prova 3 anno'); // Calcola il percorso esatto della cartella con i tuoi file
app.use(express.static(publicPath)); // Prende tutti i file in quella cartella e li rende visibili sul web

// Avvia il server
app.listen(port, () => { // Mette il server in attesa di visite sulla porta 3000
  console.log(`Server Node.js in esecuzione!`); // Stampa un messaggio nel terminale per avvisarti
  console.log(`Vai sul tuo browser a: http://localhost:${port}`); // Ti ricorda il link da aprire
});
```

### Perché `path.join(__dirname, ...)`

`__dirname` è la cartella del file `server.js`. `path.join()` concatena i pezzi usando il separatore del sistema operativo (`/` su Linux e macOS, `\` su Windows).

> [!IMPORTANT]
> Non scrivere mai percorsi a mano concatenando stringhe con `+`, e non usare percorsi relativi come `'./ex/...'`. I percorsi relativi vengono risolti rispetto alla **cartella da cui lanci il comando**, non rispetto al file: lanciando `node server.js` da un'altra cartella il server non troverebbe più i file. `path.join(__dirname, ...)` è invece sempre corretto, perché `__dirname` è il percorso assoluto del file.

### Come funziona `express.static`

`express.static(publicPath)` registra un middleware che, per ogni richiesta, prova a trovare il file richiesto dentro `publicPath` e, se lo trova, lo invia con il giusto `Content-Type`. Con la cartella `ex/progetto prova 3 anno`:

| Richiesta browser             | File servito                              |
| :---------------------------- | :---------------------------------------- |
| `GET /`                       | `.../index.html` (file di indice)         |
| `GET /shop.html`              | `.../shop.html`                           |
| `GET /index.css`              | `.../index.css`                           |
| `GET /img/CPU/amd-rx-7600.webp` | l'immagine nella cartella `img`         |

Il browser, scaricato l'HTML, emette automaticamente le **ulteriori richieste GET** per CSS, JS e immagini che il documento referenzia — tutte servite dallo stesso middleware.

### Avviare il server

```bash
node server.js     # avvio diretto
npm start          # avvio tramite lo script "start" del package.json
```

Poi si apre il browser su `http://localhost:3000`. Per fermare il server: `Ctrl+C` nel terminale.

> [!NOTE]
> Sulla porta 3000 girano i server di sviluppo di moltissimi progetti. Se ricevi un errore `EADDRINUSE: address already in use :::3000`, la porta è già occupata: cambia `port` oppure individua il processo con `lsof -i :3000` e terminarlo.

---

## 8. Asincronia: callback, Promise, `async`/`await`

L'asincronia è il concetto più importante — e più insidioso — di Node. Quasi tutte le operazioni utili (leggere un file, interrogare un database, fare una richiesta HTTP) sono **asincrone**: non restituiscono subito il risultato, ma lo consegnano più tardi.

### Callback

È il meccanismo più vecchio: si passa una funzione che verrà chiamata quando l'operazione è conclusa. La convenzione di Node è **error-first**: il primo argomento della callback è l'errore, il secondo il risultato.

```js
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, dati) => {
  if (err) {                     // prima si controlla l'errore
    console.error('Errore di lettura', err);
    return;
  }
  console.log(dati);             // poi si usa il risultato
});

console.log('Questa riga appare prima!'); // l'operazione è asincrona
```

L'ultima riga viene stampata **prima** del contenuto del file: Node non aspetta. Annidare molte callback porta al famigerato _callback hell_, difficile da leggere e da gestire.

### Promise

Una **Promise** è un oggetto che rappresenta un valore che sarà disponibile in futuro. Ha tre stati: _pending_ (in attesa), _fulfilled_ (risolta), _rejected_ (respinta).

```js
const fs = require('fs/promises');

fs.readFile('file.txt', 'utf8')
  .then(dati => console.log(dati))     // se risolta
  .catch(err => console.error(err));   // se respinta
```

### `async` / `await`

È la sintassi moderna che rende il codice asincrono leggibile come se fosse sincrono. Una funzione `async` restituisce sempre una Promise; `await` sospende l'esecuzione **di quella funzione** (non dell'intero server) finché la Promise non si risolve.

```js
async function leggi() {
  try {
    const dati = await fs.readFile('file.txt', 'utf8');
    console.log(dati);
  } catch (err) {
    console.error('Errore', err);
  }
}

leggi();
```

> [!IMPORTANT]
> `await` può essere usato **solo dentro una funzione `async`**. Il codice che segue un `await` viene eseguito solo quando la Promise si risolve, ma nel frattempo il resto del programma e il server continuano a girare normalmente. È questa la magia: il codice sembra sincrono, ma non blocca nulla.

Nelle sezioni successive vedremo come questo si applica al database: `sqlite3` usa le callback, il wrapper `sqlite` le trasforma in Promise per permettere `await`.

---

## 9. Il ciclo di vita del processo

Node esegue il file dall'alto verso il basso, ma **non termina finché ci sono operazioni in attesa**. Un server che resta in ascolto con `app.listen()` è esattamente un'operazione che tiene vivo il processo: senza di essa, Node terminerebbe immediatamente dopo l'ultima riga di codice.

```text
node server.js
      |
      v
 esecuzione del file
      |
      v
 app.listen(3000)  ---> il processo resta vivo, in attesa di richieste
      |
      v
  (Ctrl+C)  ---> il processo si chiude
```

Da qui si capisce anche perché, se lanci un file che non ha un `listen` né altre operazioni pendenti, il programma finisce subito e sembra "non fare niente".

---

## 10. Riferimenti

- **Node.js — Documentazione ufficiale** — <https://nodejs.org/docs/latest/api/>. In particolare i moduli `path`, `fs`, `http`, e la guida _Introduction to Node.js_.
- **npm Docs** — <https://docs.npmjs.com/>. Per `package.json`, gli script e la gestione delle dipendenze.
- **Express.js — Documentazione ufficiale** — <https://expressjs.com/>. Utile la sezione _Routing_ e _Serving static files_.
- **MDN — Asynchronous JavaScript** — <https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous>. Callback, Promise e `async`/`await` spiegati dal browser-web-docs, ma del tutto applicabili a Node.
- **The Modern JavaScript Tutorial — Promises, async/await** — <https://javascript.info/async>.
