const Prodotto = require('./Prodotto');

class SchedaMadre extends Prodotto {
    constructor(dati) {
        super(dati);
        this.chipset = dati.chipset;
        this.formato = dati.formato;
        this.socket = dati.socket;
    }

    specifiche() {
        if (this.chipset == null) return []
        return[
            { nome: 'Chipset', valore: this.chipset },
            { nome: 'Formato', valore: this.formato },
            { nome: 'Socket', valore: this.socket },
        ] 
    }
}

module.exports = SchedaMadre;