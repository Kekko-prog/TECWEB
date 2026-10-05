
  const sqlite3 = require('sqlite3');
  const { open } = require('sqlite');
  const path = require('path');

  async function apriDatabase() {
      const db = await open({
          filename: path.join(__dirname, '..', 'database.db'),
          driver: sqlite3.Database,
      });

      await db.exec('PRAGMA foreign_keys = ON');

      await db.exec(`
          CREATE TABLE IF NOT EXISTS prodotti (
              id          INTEGER PRIMARY KEY AUTOINCREMENT,
              slug        TEXT    NOT NULL UNIQUE,
              nome        TEXT    NOT NULL,
              marca       TEXT,
              categoria   TEXT    NOT NULL,
              prezzo      REAL    NOT NULL,
              immagine    TEXT,
              descrizione TEXT,
              stock       INTEGER NOT NULL DEFAULT 0
          );
  
          CREATE TABLE IF NOT EXISTS gpu (
              id_prodotto INTEGER PRIMARY KEY REFERENCES prodotti(id) ON DELETE CASCADE,
              vram        INTEGER,    -- GB
              chipset     TEXT
          );

          CREATE TABLE IF NOT EXISTS cpu (
              id_prodotto INTEGER PRIMARY KEY REFERENCES prodotti(id) ON DELETE CASCADE,
              core        INTEGER,
              thread      INTEGER,
              socket      TEXT
          );

          CREATE TABLE IF NOT EXISTS schede_madri (
              id_prodotto INTEGER PRIMARY KEY REFERENCES prodotti(id) ON DELETE CASCADE,
              chipset     TEXT,
              formato     TEXT,
              socket      TEXT
          );

          CREATE TABLE IF NOT EXISTS alimentatori (
              id_prodotto     INTEGER PRIMARY KEY REFERENCES prodotti(id) ON DELETE CASCADE,
              watt            INTEGER,
              certificazione  TEXT,   -- 80+ Bronze / Gold / Platinum
              modulare        INTEGER NOT NULL DEFAULT 0
          );

          CREATE TABLE IF NOT EXISTS ssd (
              id_prodotto INTEGER PRIMARY KEY REFERENCES prodotti(id) ON DELETE CASCADE,
              capacita    INTEGER,    -- GB
              interfaccia TEXT,       -- SATA / NVMe
              velocita    INTEGER     -- MB/s
          );

          CREATE TABLE IF NOT EXISTS hard_disk (
              id_prodotto INTEGER PRIMARY KEY REFERENCES prodotti(id) ON DELETE CASCADE,
              capacita    INTEGER,
              rpm         INTEGER,
              cache       INTEGER
          );

          CREATE TABLE IF NOT EXISTS ram (
              id_prodotto INTEGER PRIMARY KEY REFERENCES prodotti(id) ON DELETE CASCADE,
              tipo        TEXT,       -- DDR4 / DDR5
              capacita    INTEGER,    -- GB
              velocita    INTEGER     -- MHz
          );
      `);

      return db;
  }

  module.exports = { apriDatabase };
