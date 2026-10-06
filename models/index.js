const Prodotto     = require('./Prodotto');
const Gpu          = require('./Gpu');
const Cpu          = require('./Cpu');
const Ssd          = require('./Ssd');
const SchedaMadre  = require('./SchedaMadre');   // il file e' SchedaMadre.js
const Alimentatore = require('./Alimentatore');
const HardDisk     = require('./HardDisk');      // il file e' HardDisk.js
const Ram          = require('./Ram');

// Le chiavi di questa mappa devono essere IDENTICHE al campo "categoria"
// delle righe nel database (e ai data-categoria di shop.html).
const classiPerCategoria = {
  'GPU':          Gpu,
  'CPU':          Cpu,
  'SSD':          Ssd,
  'Scheda Madre': SchedaMadre,
  'Alimentatore': Alimentatore,
  'Hard Disk':    HardDisk,
  'RAM':          Ram,
};

// Trasforma una riga grezza del database nell'oggetto della classe corretta
function creaProdotto(riga) {
  const Classe = classiPerCategoria[riga.categoria] ?? Prodotto; // fallback
  return new Classe(riga);
}

module.exports = { creaProdotto, classiPerCategoria };

