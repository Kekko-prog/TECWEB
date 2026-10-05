const Prodotto = require('./Prodotto');

class Ssd extends Prodotto {
  constructor(dati) {
    super(dati);
    this.capacita = dati.capacita;        // in GB
    this.interfaccia = dati.interfaccia;  // SATA / NVMe
    this.velocita = dati.velocita;        // MB/s
  }

  specifiche() {
    if (this.capacita == null) return [];
    return [
      { nome: 'Capacita', valore: `${this.capacita} GB` },
      { nome: 'Interfaccia', valore: this.interfaccia },
      { nome: 'Velocita', valore: `${this.velocita} MB/s` },
    ];
  }
}

module.exports = Ssd;