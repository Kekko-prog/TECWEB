const Prodotto = require('./Prodotto');

class alimentatore extends Prodotto {
    constructor(dati){
        super(dati);
        this.watt = dati.watt;
        this.certificazione = dati.certificazione;
        this.modulare = dati.modulare;
    }

    specifiche() {
        if(this.watt == null) return[]
        return [
            { nome: 'Watt', valore: this.watt},
            { nome: 'Certificazione', valore: this.certificazione},
            { nome: 'Modulare', valore: this.modulare},            
        ] 
    }
}


module.exports = alimentatore;