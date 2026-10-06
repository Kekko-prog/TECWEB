const Prodotto = require('./Prodotto');

class HardDisk extends Prodotto {
    constructor(dati) {
        super(dati);
        this.capacita = dati.capacita;
        this.rpm = dati.rpm;
        this.cache = dati.cache;
    }

    specifiche() {
        if(this.capacita == null) return []
        return [
            {nome: 'Capacita', valore: this.capacita},
            {nome: 'Rpm', valore: this.rpm},
            {nome: 'Cache', valore: this.cache},
        ]
    }
}

module.exports = HardDisk;