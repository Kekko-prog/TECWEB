const  {creaProdotto} = require('../models');

const TABELLE_DETTAGLIO = {
    'GPU':          Gpu,
    'CPU':          Cpu,
    'SSD':          Ssd,
    'Scheda Madre': SchedaMadre,
    'Alimentatore': Alimentatore,
    'Hard Disk':    HardDisk,
    'Ram':          Ram,
};

//elenco: solo tabella base(lo sho non ha bisogno delle specifiche)
async function trovaTutti(db, {categoria, marca } = {}) {
    const condizioni = [], valori = [];
    if (categoria) { condizioni.push('categoria = ?'); valori.push(categoria); }
    if (marca) { condizioni.push('marca = ?'); valori.push(marca);}

    const sql = 'SELECT * FROM prodotti' + (condizioni.length ? 'WHERE' + condizioni.join('AND') : '');const righe = await db.all(sql, valori);
    return righe.map(creaProdotto);
  }

  // Dettaglio: prima la riga base, poi la riga di dettaglio della categoria
  async function trovaPerSlug(db, slug) {
    const base = await db.get('SELECT * FROM prodotti WHERE slug = ?', slug);
    if (!base) return null;

    const tabella = TABELLE_DETTAGLIO[base.categoria];
    if (tabella) {
      const dettaglio = await db.get(
        `SELECT * FROM ${tabella} WHERE id_prodotto = ?`, base.id
      );
      Object.assign(base, dettaglio);   // unisce le colonne specifiche
      delete base.id_prodotto;          // non ci serve piu'
    }

    return creaProdotto(base);          // la factory sceglie la classe
  }

  module.exports = { trovaTutti, trovaPerSlug, TABELLE_DETTAGLIO };
