class Prodotto {
    constructor({ id, slug, nome, marca, categoria, prezzo, immagine, descrizione, stock }) {
      this.id = id;
      this.slug = slug;
      this.nome = nome;
      this.marca = marca;
      this.categoria = categoria;
      this.prezzo = prezzo;
      this.immagine = immagine;
      this.descrizione = descrizione;
      this.stock = stock;
    }

    // proprieta' calcolata: comune a tutti, si scrive una volta sola
    get prezzoFormattato() {
      return `€ ${this.prezzo.toFixed(2)}`;
    }

    // la base non ha specifiche; ogni sottoclasse le sue
    specifiche() {
      return [];
    }

    // come il prodotto diventa JSON quando lo mando al browser
    toJSON() {
      return {
        id: this.id, 
        slug: this.slug, 
        nome: this.nome, 
        marca: this.marca,
        categoria: this.categoria, 
        prezzo: this.prezzo,
        prezzoFormattato: this.prezzo.toFixed(2),
        immagine: this.immagine, 
        descrizione: this.descrizione, 
        stock: this.stock,
        specifiche: this.specifiche(),
      };
    }
  }

  module.exports = Prodotto;
