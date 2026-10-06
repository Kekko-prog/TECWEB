const express = require('express');
const path = require('path');
const { apriDatabase } = require('./db/connection');
const { popola } = require('./db/seed');
const prodottiRouter = require('./routes/prodotti');

const PORT = 3000;

async function avvia() {
  // 1. PRIMA il database: schema creato e PRAGMA foreign_keys attivo
  const db = await apriDatabase();

  // 2. POI il seed: idempotente, girera' a ogni avvio senza duplicare
  await popola(db);

  // 3. SOLO ORA il server puo' accettare richieste
  const app = express();
  app.use(express.json());

  // il router e' una funzione che riceve "db": dependency injection
  app.use('/api/prodotti', prodottiRouter(db));

  // i file statici: il front-end resta dov'e'
  app.use(express.static(path.join(__dirname, 'ex', 'progetto prova 3 anno')));

  // gestore errori centralizzato: qualunque errore non catturato finisce qui
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ errore: 'Errore interno del server' });
  });

  app.listen(PORT, () => {
    console.log(`Server su   http://localhost:${PORT}`);
    console.log(`Shop:       http://localhost:${PORT}/shop.html`);
    console.log(`API elenco: http://localhost:${PORT}/api/prodotti`);
  });
}

avvia().catch((err) => {
  console.error('Avvio fallito:', err);
  process.exit(1);
});