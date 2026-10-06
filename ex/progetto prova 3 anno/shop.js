// Il titolo riporta al login
const titolo = document.getElementById('titolo');
if (titolo) {
  titolo.addEventListener('click', () => { window.location.href = 'index.html'; });
}

// Tutti i contenitori che sanno ricevere prodotti
const contenitori = document.querySelectorAll('[data-categoria]');

// ---------------------------------------------------------------
// Scarica i prodotti dall'API e li disegna nelle sezioni
// ---------------------------------------------------------------
async function caricaProdotti(params = new URLSearchParams()) {
  const query = params.toString();
  const risposta = await fetch('/api/prodotti' + (query ? '?' + query : ''));

  if (!risposta.ok) {
    console.error('Errore API:', risposta.status);
    return;
  }

  const prodotti = await risposta.json();

  // 1. svuota tutti i contenitori
  contenitori.forEach(c => { c.innerHTML = ''; });

  // 2. disegna ogni prodotto nel contenitore della sua categoria
  prodotti.forEach(p => {
    const contenitore = document.querySelector(`[data-categoria="${p.categoria}"]`);
    if (!contenitore) return;      // categoria senza sezione in pagina

    contenitore.insertAdjacentHTML('beforeend', `
      <div class="prodotto">
        <a href="prodotto.html?id=${encodeURIComponent(p.slug)}">
          <img src="${p.immagine}" alt="${p.nome}">
        </a>
        <p>${p.nome}</p>
        <p class="prezzo">${p.prezzoFormattato}</p>
        <button class="btn-aggiungi-al-carrello"
                data-slug="${p.slug}"
                data-nome="${p.nome}"
                data-prezzo="${p.prezzo}"
                data-immagine="${p.immagine}">
          Aggiungi al Carrello
        </button>
      </div>
    `);
  });

  // 3. le sezioni rimaste vuote non devono occupare spazio
  nascondiSezioniVuote();
}

// ---------------------------------------------------------------
// Una sezione senza prodotti non si mostra (fa anche da filtro)
// ---------------------------------------------------------------
function nascondiSezioniVuote() {
  document.querySelectorAll('main section').forEach(sezione => {
    const contenitore = sezione.querySelector('[data-categoria]');
    if (!contenitore) return;      // sezione senza data-categoria: la ignoro
    const quanti = contenitore.querySelectorAll('.prodotto').length;
    sezione.style.display = quanti === 0 ? 'none' : '';
  });
}

// ---------------------------------------------------------------
// Filtri: invece di nascondere <div> col display, si chiama l'API
// ---------------------------------------------------------------
function applicaFiltri() {
  const params = new URLSearchParams();

  document.querySelectorAll('input[name="categoria"]:checked')
    .forEach(cb => params.append('categoria', cb.value));

  document.querySelectorAll('input[name="marca"]:checked')
    .forEach(cb => params.append('marca', cb.value));

  caricaProdotti(params);
}

document.querySelectorAll('.filtro-checkbox')
  .forEach(cb => cb.addEventListener('change', applicaFiltri));

// Avvio: tutti i prodotti
caricaProdotti();