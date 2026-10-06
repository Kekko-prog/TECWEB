const titolo = document.getElementById('titolo2');
if (titolo) {
  titolo.addEventListener('click', () => { window.location.href = 'shop.html'; });
}

// 1. leggo l'URL per capire quale prodotto ha cliccato l'utente
const idProdotto = new URLSearchParams(window.location.search).get('id');

function mostraNonTrovato() {
  document.getElementById('nome-dettaglio').textContent   = 'Prodotto non trovato';
  document.getElementById('prezzo-dettaglio').textContent = '';
  document.getElementById('desc-dettaglio').textContent   = '';
  document.getElementById('cat-dettaglio').textContent    = '-';
  document.getElementById('marca-dettaglio').textContent  = '-';
  document.getElementById('img-dettaglio').src            = 'img/placeholder.jpg';
  document.getElementById('lista-specifiche').innerHTML   = '';
}

async function caricaDettaglio() {
  if (!idProdotto) return mostraNonTrovato();

  const risposta = await fetch('/api/prodotti/' + encodeURIComponent(idProdotto));
  if (!risposta.ok) return mostraNonTrovato();   // 404 dall'API

  const p = await risposta.json();

  document.getElementById('nome-dettaglio').textContent   = p.nome;
  document.getElementById('prezzo-dettaglio').textContent = p.prezzoFormattato;
  document.getElementById('desc-dettaglio').textContent   = p.descrizione;
  document.getElementById('cat-dettaglio').textContent    = p.categoria;
  document.getElementById('marca-dettaglio').textContent  = p.marca;
  document.getElementById('img-dettaglio').src            = p.immagine;

  // 2. specifiche: NON un if sulla categoria, ma l'array della classe
  const lista = document.getElementById('lista-specifiche');
  if (p.specifiche.length === 0) {
    lista.innerHTML = '<li>Nessuna specifica disponibile</li>';
  } else {
    lista.innerHTML = p.specifiche
      .map(s => `<li><strong>${s.nome}:</strong> ${s.valore}</li>`)
      .join('');
  }
}

caricaDettaglio();