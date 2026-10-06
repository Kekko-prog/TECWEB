const express = require('express');
const repo = require('../repositories/prodottiRepository');

module.exports = (db) => {
  const router = express.Router();

  // Elenco con filtri opzionali e ripetibili:
  //   /api/prodotti
  //   /api/prodotti?categoria=GPU
  //   /api/prodotti?categoria=GPU&categoria=CPU&marca=AMD
  router.get('/', async (req, res) => {
    const prodotti = await repo.trovaTutti(db, req.query);
    res.json(prodotti);
  });

  // Dettaglio per slug: /api/prodotti/amd-rx-7600
  router.get('/:slug', async (req, res) => {
    const p = await repo.trovaPerSlug(db, req.params.slug);
    if (!p) return res.status(404).json({ errore: 'Prodotto non trovato' });
    res.json(p);                        // Express chiama p.toJSON() da solo
  });

  return router;
};