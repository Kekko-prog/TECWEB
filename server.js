const express = require('express'); // import della libreria express
const path = require('path'); // strumento di node.js che serve a gestire i percorsi delle cartelle 
const sqlite3 = require('sqlite3'); // IMPORTANTE: libreria per il database
const { open } = require('sqlite'); // IMPORTANTE: libreria per aprire il database

const app = express(); // creazione e accesso del server web
const port = 3000; // la porta (il "citofono") a cui il sito risponderà in locale

// Permette al server di ricevere e inviare dati in formato JSON
app.use(express.json());

// CONFIGURAZIONE DATABASE
let db;
(async () => {
    // 1. Crea (o apre se esiste) il file fisico del database
    db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });
    console.log("Connesso al database SQLite!");
    
    // questa parte di configurazione dice semplicemente di creare fisicamente un file chiamato database.db dentro TECWEB
    // se non esiste gia e di aprirlo per poterci lavorare dentro

    await db.exec(`
        CREATE TABLE IF NOT EXISTS prodotti (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            prezzo REAL,
            immagine TEXT
        )
    `)
    // database funzionano con le tabelle, dicendo al server, crea una tabella chiamata 'prodotti' con queste colonne
    // ID (un numero che cresce da solo), il nome del prodotto (testo), il prezzo (numero con virgola) e il percorso dell'immagine (testo).
    
    const riga = await db.get("SELECT COUNT(*) as count FROM prodotti");
    if (riga.count === 0) {
        await db.run("INSERT INTO prodotti (nome, prezzo, immagine) VALUES ('AMD RX 7600', 299.99, 'img/GPU/amd-rx-7600.webp')");
        await db.run("INSERT INTO prodotti (nome, prezzo, immagine) VALUES ('AMD RX 7800 XT', 549.99, 'img/GPU/amd-rx-7800-xt.webp')");
        console.log("Dati di prova inseriti nel database.");
    }
})();
// il server controlla se la tabella è vuota, in tal caso esegue un comando INSERT per scriverci dentro

// ----------------------------------------------------
// API PER COMUNICARE COL SITO
// ----------------------------------------------------
app.get('/api/prodotti', async (req, res) => {
    try {
        const prodotti = await db.all("SELECT * FROM prodotti");
        res.json(prodotti);
    } catch (error) {
        res.status(500).json({ error: "Errore interno del server" });
    }
});
// crea una "porta" (API) all'indirizzo '/api/prodotti'. Quando il sito fa una richiesta qui, 
// il server va nel database, legge tutti i prodotti (SELECT *) e li invia indietro al sito web in formato JSON.

// ----------------------------------------------------
// AVVIO DEL SERVER E FILE STATICI
// ----------------------------------------------------
const publicPath = path.join(__dirname, 'ex/progetto prova 3 anno'); 
app.use(express.static(publicPath)); 
// calcola il percorso esatto della tua cartella e dice al server di rendere "pubblici" 
// su internet tutti i file HTML, CSS e JS che ci trova dentro.

app.listen(port, () => {
    console.log(`Server Node.js in esecuzione!`);
    console.log(`Vai sul tuo browser a: http://localhost:${port}`);
});
// infine mette il server in ascolto continuo sulla porta 3000, 
// stampando un messaggio nel terminale per darti la conferma che è tutto acceso e funzionante.
