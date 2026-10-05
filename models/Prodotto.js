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

    get prezzoFormattato() {
      return `€ ${this.prezzo.toFixed(2)}`;
    }

    specifiche() {
      return [];
    }

    toJSON() {
      return {
        id: this.id, slug: this.slug, nome: this.nome, marca: this.marca,
        categoria: this.categoria, prezzo: this.prezzo,
        prezzoFormattato: this.prezzoFormattato,
        immagine: this.immagine, descrizione: this.descrizione, stock: this.stock,
        specifiche: this.specifiche(),
      };
    }
  }

  module.exports = Prodotto;
