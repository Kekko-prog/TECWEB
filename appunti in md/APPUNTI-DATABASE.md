# Database - SQL e SQLite

---

## 1. Cos'è un database

Un **database** (base di dati) è una collezione organizzata di dati, strutturata in modo da poter essere interrogata, aggiornata e gestita in modo efficiente. La differenza con un semplice file di testo o un file JSON non è il contenuto, ma l'**organizzazione**: un database sa cercare tra milioni di righe in millisecondi, mantiene l'integrità dei dati e permette a più utenti di accedervi contemporaneamente.

Il software che gestisce un database si chiama **DBMS** (_Database Management System_). È lui che si occupa di leggere e scrivere su disco, ottimizzare le ricerche, garantire i vincoli e gestire gli accessi concorrenti. Quando diciamo "uso un database", in realtà intendiamo "uso un DBMS".

```text
   Applicazione (Node.js / Express)
            |
            |  query SQL ("SELECT * FROM prodotti")
            v
   +-------------------+
   |       DBMS        |   <- gestisce ricerca, integrità, concorrenza
   +-------------------+
            |
            v
   File su disco (es. database.db per SQLite)
```

### Database relazionali e non

I due grandi modelli sono:

- **Relazionali (SQL)**: i dati vivono in **tabelle** con righe e colonne, tra loro collegate da **relazioni**. Si interrogano con il linguaggio **SQL**. Esempi: MySQL, PostgreSQL, Oracle, SQL Server, **SQLite**.
- **Non relazionali (NoSQL)**: strutture diverse, come documenti JSON (MongoDB), coppie chiave-valore (Redis), grafi. Utili quando lo schema non è rigido o quando servono prestazioni su volumi enormi.

Questi appunti si concentrano sul modello **relazionale**, che è quello usato nel progetto.

---

## 2. Il modello relazionale

Un database relazionale è composto da **tabelle**. Ogni tabella assomiglia a un foglio di calcolo, ma con regole precise.

```text
                   Tabella: prodotti
   +------+------------------+----------+---------+-------+
   |  id  | nome             | marca    | prezzo  | stock |
   +------+------------------+----------+---------+-------+
   |   1  | Ryzen 7 7800X3D  | AMD      | 399.99  |  12   |  <- riga / record
   |   2  | RTX 4070 Super   | NVIDIA   | 599.00  |   8   |
   |   3  | RTX 4090         | NVIDIA   | 1799.00 |   3   |
   +------+------------------+----------+---------+-------+
      ^           ^              ^          ^        ^
   colonna    colonna         colonna    colonna  colonna
  (campo,    / attributo
   inizio tabella)
```

- **Tabella**: l'insieme dei dati di uno stesso tipo (prodotti, utenti, ordini).
- **Riga** (o _record_, _tupla_): una singola voce della tabella.
- **Colonna** (o _campo_, _attributo_): una proprietà. Ogni colonna ha un **tipo** (testo, numero, data...).
- **Schema**: la definizione delle tabelle e delle colonne, stabilita una volta e valida per tutte le righe.

### Chiave primaria (Primary Key)

Ogni riga deve essere identificabile in modo univoco. La **chiave primaria** è una colonna (o un insieme di colonne) i cui valori sono **unici** e **non nulli** per ogni riga.

Nella tabella `prodotti` sopra, la chiave primaria è `id`. In SQLite è comodo usare una colonna `INTEGER PRIMARY KEY`, che si comporta come un contatore automatico: se non la specifichiamo, il DBMS assegna il prossimo numero disponibile.

### Chiave esterna (Foreign Key)

Una **chiave esterna** è una colonna che fa riferimento alla chiave primaria di **un'altra tabella**, realizzando un **collegamento** tra i dati. È il meccanismo che rende "relazionale" un database.

```text
   Tabella: utenti                          Tabella: ordini
   +------+-------------+                   +------+-----------+----------+
   |  id  | nome        |                   |  id  | id_utente | totale   |
   +------+-------------+                   +------+-----------+----------+
   |   1  | Anna        | <-----------------|  10  |     1     |  59.98   |
   |   2  | Marco       | <----.            |  11  |     2     | 399.99   |
   +------+-------------+      |            +------+-----------+----------+
                               |                        ^
                               |                        |
                               +--- FK: id_utente deve esistere in utenti.id
```

La chiave esterna garantisce l'**integrità referenziale**: non può esistere un ordine che rimanda a un utente inesistente.

---

## 3. Il linguaggio SQL

**SQL** (_Structured Query Language_) è il linguaggio standard per interagire con i database relazionali. Si divide in due grandi famiglie di comandi: **DDL** (definizione della struttura) e **DML** (gestione dei dati).

| Categoria | Comandi principali                  | A cosa servono                     |
| :-------- | :---------------------------------- | :--------------------------------- |
| **DDL**   | `CREATE`, `ALTER`, `DROP`           | Definire e modificare la struttura |
| **DML**   | `SELECT`, `INSERT`, `UPDATE`, `DELETE` | Leggere e modificare i dati     |

> [!NOTE]
> SQL non distingue maiuscole e minuscole per le parole chiave (`SELECT` = `select`), ma per convenzione si scrivono in maiuscolo. I valori testuali si scrivono tra **apici singoli**: `'NVIDIA'`, mai doppi apici.

---

## 4. DDL: definire le tabelle

### `CREATE TABLE`

```sql
CREATE TABLE prodotti (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  nome    TEXT    NOT NULL,
  marca   TEXT    NOT NULL,
  prezzo  REAL    NOT NULL,
  stock   INTEGER NOT NULL DEFAULT 0
);
```

- **`INTEGER PRIMARY KEY AUTOINCREMENT`**: contatore automatico, chiave primaria.
- **`NOT NULL`**: il campo è obbligatorio, il database rifiuta righe senza quel valore.
- **`DEFAULT 0`**: se il valore non viene fornito, si usa questo.
- **`UNIQUE`**: impone che i valori non si ripetano (es. l'email di un utente).

### Tipi di dato in SQLite

SQLite è più flessibile degli altri DBMS sui tipi. I cinque tipi base sono:

| Tipo      | Contenuto                                     | Esempio SQL     |
| :-------- | :-------------------------------------------- | :-------------- |
| `INTEGER` | Numeri interi                                 | `42`, `-7`      |
| `REAL`    | Numeri con virgola (a virgola mobile)         | `399.99`        |
| `TEXT`    | Testo, stringhe                               | `'NVIDIA'`      |
| `BLOB`    | Dati binari grezzi (immagini, file)           | —               |
| `NULL`    | Assenza di valore (non un tipo, ma uno stato) | `NULL`          |

> [!IMPORTANT]
> In SQLite una colonna può contenere valori di tipo diverso da quello dichiarato: SQLite applica la _type affinity_, non una tipizzazione rigida. In pratica però **conviene rispettare i tipi dichiarati**, perché è quello che fanno gli altri DBMS e perché mantiene i dati coerenti.

### Modificare o eliminare la struttura

```sql
ALTER TABLE prodotti ADD COLUMN descrizione TEXT;  -- aggiunge una colonna
DROP TABLE prodotti;                                -- elimina tabella e dati
```

---

## 5. DML: leggere e modificare i dati

### `INSERT` — inserire righe

```sql
INSERT INTO prodotti (nome, marca, prezzo, stock)
VALUES ('RTX 4070 Super', 'NVIDIA', 599.00, 8);
```

Non si specifica `id`: lo assegna automaticamente SQLite. Le colonne e i valori devono corrispondere per ordine.

### `SELECT` — leggere dati

```sql
SELECT * FROM prodotti;                       -- tutte le colonne, tutte le righe
SELECT nome, prezzo FROM prodotti;            -- solo alcune colonne
```

I risultati sono **sempre righe di una tabella**, anche quando si selezionano poche colonne.

#### Filtrare con `WHERE`

```sql
SELECT * FROM prodotti WHERE marca = 'NVIDIA';
SELECT * FROM prodotti WHERE prezzo < 500;
SELECT * FROM prodotti WHERE stock > 0 AND marca = 'AMD';
SELECT * FROM prodotti WHERE marca = 'AMD' OR marca = 'NVIDIA';
```

Gli operatori di confronto sono `=`, `<>` (diverso), `<`, `>`, `<=`, `>=`. Si combinano con `AND`, `OR`, `NOT`.

#### Ordinare e limitare

```sql
SELECT * FROM prodotti ORDER BY prezzo DESC;        -- dal più caro
SELECT * FROM prodotti ORDER BY marca ASC, nome;    -- per marca, poi nome
SELECT * FROM prodotti LIMIT 5;                     -- solo le prime 5
SELECT * FROM prodotti ORDER BY prezzo DESC LIMIT 3; -- i 3 più costosi
```

#### Valori aggregati e raggruppamento

```sql
SELECT COUNT(*) FROM prodotti;                        -- quante righe
SELECT AVG(prezzo) FROM prodotti;                     -- prezzo medio
SELECT marca, COUNT(*) FROM prodotti GROUP BY marca;  -- quanti prodotti per marca
```

Le funzioni aggregate (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) riassumono più righe in un unico valore. Con `GROUP BY` si calcolano gruppi separati.

### `UPDATE` — modificare righe esistenti

```sql
UPDATE prodotti
SET prezzo = 549.99, stock = 10
WHERE id = 2;
```

> [!IMPORTANT]
> La clausola `WHERE` in `UPDATE` e `DELETE` è **obbligatoria** se vuoi agire su alcune righe: senza di essa il comando modifica o cancella **tutte** le righe della tabella. È l'errore classico e più pericoloso in SQL.

### `DELETE` — cancellare righe

```sql
DELETE FROM prodotti WHERE id = 3;
DELETE FROM prodotti WHERE stock = 0;   -- cancella tutte le righe esaurite
```

---

## 6. Le relazioni in pratica: `JOIN`

Una `JOIN` combina righe di due tabelle in base a una colonna comune, ricostruendo la relazione tra chiave primaria e chiave esterna.

```sql
SELECT utenti.nome, ordini.totale
FROM ordini
JOIN utenti ON ordini.id_utente = utenti.id;
```

Con una tabella `ordini(id, id_utente, totale)` e una `utenti(id, nome)`, la query restituisce il nome dell'utente accanto a ogni suo ordine. `JOIN` (o `INNER JOIN`) tiene solo le righe che hanno corrispondenza in entrambe le tabelle; `LEFT JOIN` tiene anche le righe della tabella sinistra che non hanno corrispondenze (utile per trovare, ad esempio, gli utenti senza ordini).

---

## 7. SQLite

**SQLite** è un DBMS diverso da tutti gli altri. Non è un server a cui ci si connette: è una **libreria embedded** che viene incorporata direttamente nell'applicazione. Il database è **un singolo file** sul disco (es. `database.db`).

```text
   Altri DBMS (MySQL, PostgreSQL)          SQLite
   +-------------------+                   +-------------------+
   |  Applicazione     |                   |  Applicazione    |
   +-------------------+                   |  +-------------+  |
             |   rete (host, porta,        |  |  SQLite     |  |
             |    utente, password)        |  |  (libreria) |  |
             v                             |  +-------------+  |
   +-------------------+                   +-------------------+
   |  Server DBMS      |                            |
   |  (processo a parte)|                           v
   +-------------------+                   file database.db
```

### Perché SQLite

- **Zero configurazione**: non c'è nulla da installare o avviare; basta un file.
- **Portatile**: l'intero database è un file, facile da copiare, fare backup, spostare.
- **Leggero**: perfetto per sviluppo, prototipi, progetti piccoli e medi, app desktop e mobile.
- **Tipizzazione flessibile**: non rifiuta i dati se il tipo non combacia.

### Quando _non_ usarlo

SQLite non è pensato per scritture concorrenti intensive: un solo processo alla volta scrive sul file. Per applicazioni con molti utenti in scrittura simultanea serve un DBMS client-server come PostgreSQL. Per il progetto di questo corso, però, è la scelta ideale.

### Il file `database.db`

Nella cartella del progetto il database è un normale file. Lo si può ispezionare e manipolare senza scrivere codice:

```bash
sqlite3 database.db        # apre la shell interattiva di SQLite
```

Alcuni comandi della shell (prefissati da un punto):

```sql
.tables                     -- elenca le tabelle
.schema prodotti            -- mostra il CREATE TABLE di una tabella
.headers on                 -- mostra i nomi delle colonne nei risultati
.mode column                -- risultati formattati in colonne leggibili
.quit                       -- esci
```

```bash
sqlite3 database.db "SELECT * FROM prodotti;" # query diretta da riga di comando
```

> [!NOTE]
> Nel `.gitignore` conviene aggiungere il file `.db`: è un dato locale generato, non codice sorgente. Ogni sviluppatore se lo ricrea eseguendo lo schema, non lo riceve dal repository.

---

## 8. Usare SQLite da Node.js

Nel `package.json` del progetto compaiono **due pacchetti** con nomi simili ma ruoli diversi:

```json
"dependencies": {
  "sqlite": "^5.1.1",
  "sqlite3": "^6.0.1"
}
```

| Pacchetto | Ruolo                                                                     |
| :-------- | :------------------------------------------------------------------------ |
| `sqlite3` | il **driver** vero e proprio: parla con la libreria SQLite, API a callback |
| `sqlite`  | un **wrapper** _promise-based_ costruito sopra `sqlite3`: rende tutto `async`/`await` |

Si possono usare entrambi, ma **non mescolarli**. Il wrapper `sqlite` è più comodo da leggere; `sqlite3` puro è utile per capire cosa succede sotto.

### Installazione

```bash
npm install sqlite3 sqlite
```

### Con il wrapper `sqlite` (async/await)

```js
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

// Aprire (o creare) il database
const db = await open({
  filename: './database.db',
  driver: sqlite3.Database,
});

// Creare la tabella se non esiste
await db.exec(`
  CREATE TABLE IF NOT EXISTS prodotti (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    nome    TEXT    NOT NULL,
    marca   TEXT    NOT NULL,
    prezzo  REAL    NOT NULL,
    stock   INTEGER NOT NULL DEFAULT 0
  )
`);

// Inserire una riga (i "?" sono segnaposto per i valori)
const result = await db.run(
  'INSERT INTO prodotti (nome, marca, prezzo, stock) VALUES (?, ?, ?, ?)',
  ['RTX 4070 Super', 'NVIDIA', 599.0, 8]
);
console.log('Inserito con id:', result.lastID);

// Leggere una singola riga
const prodotto = await db.get('SELECT * FROM prodotti WHERE id = ?', 1);

// Leggere tutte le righe
const prodotti = await db.all('SELECT * FROM prodotti ORDER BY prezzo DESC');
console.log(prodotti);

// Modificare
await db.run('UPDATE prodotti SET stock = ? WHERE id = ?', [5, 1]);

// Cancellare
await db.run('DELETE FROM prodotti WHERE id = ?', 3);

// Chiudere
await db.close();
```

I "metodi" del wrapper:

| Metodo              | Restituisce                        | Uso tipico                          |
| :------------------ | :--------------------------------- | :---------------------------------- |
| `db.exec(sql)`      | niente                             | più comandi DDL/script insieme      |
| `db.run(sql, ...p)` | `{ lastID, changes }`              | `INSERT`, `UPDATE`, `DELETE`        |
| `db.get(sql, ...p)` | la **prima** riga (o `undefined`)  | cercare un singolo record           |
| `db.all(sql, ...p)` | un **array** di righe              | elenchi                             |

> [!IMPORTANT]
> **I segnaposto `?` non sono un dettaglio opzionale.** Non concatenare mai i valori nella stringa SQL (`"WHERE id = " + id`): è la porta d'ingresso della **SQL injection**, l'attacco in cui un utente inserisce testo malevolo che il database interpreta come comando. Passando i valori come argomenti separati, il driver li tratta sempre come dati, mai come codice.

### Con il driver `sqlite3` puro (callback)

```js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Le operazioni sono in sequenza
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS prodotti (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            prezzo REAL NOT NULL
          )`);

  db.run('INSERT INTO prodotti (nome, prezzo) VALUES (?, ?)', ['Mouse', 29.99], function (err) {
    if (err) return console.error(err);
    console.log('Inserito con id', this.lastID); // nota: "function", non arrow, per avere this
  });

  // db.all raccoglie TUTTE le righe in un array
  db.all('SELECT * FROM prodotti', (err, rows) => {
    if (err) return console.error(err);
    console.log(rows);
  });

  // db.each elabora una riga alla volta (utile su tabelle grandi)
  db.each('SELECT * FROM prodotti', (err, row) => {
    console.log(row.id, row.nome);
  });
});

db.close();
```

> [!NOTE]
> Nel driver `sqlite3` le callback sono **error-first** (`(err, result)`). In più, per avere `this.lastID` bisogna usare una `function` anonima e non una _arrow function_: le arrow function non hanno un proprio `this`. È una delle differenze dal wrapper `sqlite`, che invece restituisce direttamente un oggetto risultato.

---

## 9. Esempio: una piccola API CRUD

Mettendo insieme Express, il wrapper `sqlite` e le route HTTP, si ottiene un'API che espone la tabella `prodotti` in formato JSON.

```js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const port = 3000;

app.use(express.json()); // permette di leggere req.body come JSON

let db;

// Apriamo il DB una sola volta, all'avvio
async function avvia() {
  db = await open({ filename: './database.db', driver: sqlite3.Database });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS prodotti (
      id      INTEGER PRIMARY KEY AUTOINCREMENT,
      nome    TEXT    NOT NULL,
      marca   TEXT,
      prezzo  REAL    NOT NULL,
      stock   INTEGER NOT NULL DEFAULT 0
    )
  `);

  app.listen(port, () => console.log(`API su http://localhost:${port}`));
}

// READ — elenco di tutti i prodotti (con filtri opzionali)
app.get('/api/prodotti', async (req, res) => {
  try {
    const { marca } = req.query;
    const righe = marca
      ? await db.all('SELECT * FROM prodotti WHERE marca = ?', marca)
      : await db.all('SELECT * FROM prodotti');
    res.json(righe);
  } catch (err) {
    res.status(500).json({ errore: 'Errore del server' });
  }
});

// READ — un singolo prodotto per id
app.get('/api/prodotti/:id', async (req, res) => {
  const prodotto = await db.get('SELECT * FROM prodotti WHERE id = ?', req.params.id);
  if (!prodotto) return res.status(404).json({ errore: 'Prodotto non trovato' });
  res.json(prodotto);
});

// CREATE — nuovo prodotto
app.post('/api/prodotti', async (req, res) => {
  const { nome, marca, prezzo, stock } = req.body;
  const risultato = await db.run(
    'INSERT INTO prodotti (nome, marca, prezzo, stock) VALUES (?, ?, ?, ?)',
    [nome, marca, prezzo, stock ?? 0]
  );
  res.status(201).json({ id: risultato.lastID });
});

// UPDATE — modifica un prodotto
app.put('/api/prodotti/:id', async (req, res) => {
  const { nome, marca, prezzo, stock } = req.body;
  await db.run(
    'UPDATE prodotti SET nome = ?, marca = ?, prezzo = ?, stock = ? WHERE id = ?',
    [nome, marca, prezzo, stock, req.params.id]
  );
  res.json({ aggiornato: true });
});

// DELETE — elimina un prodotto
app.delete('/api/prodotti/:id', async (req, res) => {
  await db.run('DELETE FROM prodotti WHERE id = ?', req.params.id);
  res.json({ eliminato: true });
});

avvia();
```

### Corrispondenza tra route e operazioni SQL

| Metodo HTTP + percorso   | Operazione SQL         | Risultato atteso    |
| :----------------------- | :--------------------- | :------------------ |
| `GET /api/prodotti`      | `SELECT` (tutte)       | `200` con array JSON |
| `GET /api/prodotti/:id`  | `SELECT` (una)         | `200` o `404`       |
| `POST /api/prodotti`     | `INSERT`               | `201` con nuovo id  |
| `PUT /api/prodotti/:id`  | `UPDATE`               | `200`               |
| `DELETE /api/prodotti/:id` | `DELETE`             | `200`               |

Ogni handler è `async` e usa `await` per attendere la query: Node non si blocca mentre il database risponde, e può servire altre richieste nel frattempo.

> [!NOTE]
> `stock ?? 0` usa l'operatore di _nullish coalescing_: se `stock` è `null` o `undefined`, usa `0`. Serve a garantire un valore di default anche quando il client non lo invia.

---

## 10. Riferimenti

- **SQLite — Documentazione ufficiale** — <https://www.sqlite.org/docs.html>. In particolare _SQL Syntax_ e la pagina sui tipi: <https://www.sqlite.org/datatype3.html>.
- **node-sqlite3 (GitHub)** — <https://github.com/TryGhost/node-sqlite3>. Il driver e la sua API a callback.
- **sqlite (wrapper npm)** — <https://www.npmjs.com/package/sqlite>. L'API `open`, `get`, `all`, `run` con Promise.
- **W3Schools — SQL Tutorial** — <https://www.w3schools.com/sql/>. Riferimento rapido su sintassi `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
- **MDN — Express: Accesso al database** — <https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs>. Per capire come un'API si collega al database nel contesto di una web app.
