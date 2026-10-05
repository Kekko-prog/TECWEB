const Prodotto = require('./Prodotto');

class Gpu extends Prodotto {
    constructor(dati) {
        super(dati);                 // prima il costruttore della base
        this.vram = dati.vram;       // poi i campi specifici della GPU
        this.chipset = dati.chipset;
    }

    specifiche() {
        if (this.vram == null) return []; // riga senza dettaglio (elenco shop)
        return [
            { nome: 'VRAM', valore:`${this.vram} GB` }, //`${this.vram} GB` concatena come stringa
            { nome: 'CHIPSET', valore: this.chipset },
        ];
    }
}

module.exports = Gpu;