const { creaProdotto } = require('../models');

// I nomi delle tabelle NON possono essere segnaposto '?' in SQL, quindi
// stanno qui: una whitelist nel codice, mai presa dall'input dell'utente.
// chiave = categoria nel DB, valore = nome della tabella di dettaglio.
const TABELLE_DETTAGLIO = {
  'GPU':          'gpu',
  'CPU':          'cpu',
  'SSD':          'ssd',
  'Scheda Madre': 'schede_madri',
  'Alimentatore': 'alimentatori',
  'Hard Disk':    'hard_disk',
  'RAM':          'ram',
};

// Costruisce le condizioni WHERE a partire dai filtri.
// "campo" arriva da un array costante scritto qui sotto, quindi
// interpolarlo e' sicuro. I VALORI viaggiano sempre come '?'.
function componiFiltri(filtri = {}) {
  const condizioni = [];
  const valori = [];

  for (const campo of ['categoria', 'marca']) {
    const valore = filtri[campo];
    if (valore == null || valore === '') continue;

    // Express trasforma i parametri ripetuti in array:
    // ?categoria=GPU&categoria=CPU  ->  ['GPU', 'CPU']
    const lista = Array.isArray(valore) ? valore : [valore];
    if (lista.length === 0) continue;

    condizioni.push(`${campo} IN (${lista.map(() => '?').join(', ')})`);
    valori.push(...lista);
  }

  return { condizioni, valori };
}

// Elenco: solo la tabella base (lo shop non ha bisogno delle specifiche)
async function trovaTutti(db, filtri = {}) {
  const { condizioni, valori } = componiFiltri(filtri);

  const sql = 'SELECT * FROM prodotti'
    + (condizioni.length ? ' WHERE ' + condizioni.join(' AND ') : '')
    + ' ORDER BY categoria, nome';

  const righe = await db.all(sql, valori);
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