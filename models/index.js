const Prodotto      = require('./Prodotto');
const Gpu           = require('./Gpu');
const Cpu           = require('./Cpu');
const Ssd           = require('./Ssd');
const Schede_madre  = require('./Schede_madre');
const Alimentatore  = require('./Alimentatore');
const Hard_disk     = require('./Hard_disk');
const Ram           = require('./Ram');

const classiPerCategoria = {
    'GPU':          Gpu,
    'CPU':          Cpu,
    'SSD':          Ssd,
    'Scheda Madre': SchedaMadre,
    'Alimentatore': Alimentatore,
    'Hard Disk':    HardDisk,
    'Ram':          Ram, 
};

// Trasforma una riga grezza del database nell'oggetto della classe corretta
function creaProdotto(riga) {
  const Classe = classiPerCategoria[riga.categoria] ?? Prodotto; // fallback
  return new Classe(riga);
}
module.exports = { creaProdotto, classiPerCategoria };

