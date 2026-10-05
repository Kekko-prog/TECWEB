const Prodotto = require('./Prodotto');

class Cpu extends Prodotto {
    constructor(dati) {
        super(dati);                 // prima il costruttore della base
        this.core = dati.core;       // poi i campi specifici della CPU
        this.thread = dati.thread;
        this.socket = dati.socket;
    }

    specifiche() {
        if (this.core == null) return []; // riga senza dettaglio (elenco shop)
        return [
            { nome: 'Core', valore: this.core },
            { nome: 'Thread', valore: this.thread },
            { nome: 'Socket', valore: this.socket },
        ];
    }
}

module.exports = Cpu;