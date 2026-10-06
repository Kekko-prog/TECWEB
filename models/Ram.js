const Prodotto = require('./Prodotto');

class Ram extends Prodotto {
    constructor(dati){
        super(dati);
        this.tipo = dati.tipo;
        this.capacita = dati.capacita;
        this.velocita = dati.velocita;
    }

    specifiche() {
        if(this.tipo == null) return[]
        return [
            { nome: 'Tipo', valore: this.tipo},
            { nome: 'Capacita', valore: `${this.capacita} GB`},
            { nome: 'Velocita', valore: `${this.velocita} MHz`},
        ]
    }
}

module.exports = Ram;