const titolo = document.getElementById('titolo');
if (titolo) {
  titolo.addEventListener('click', function() {
    window.location.href = 'index.html'; 
  });
}


// da valutare non lo so
const checkboxFiltri = document.querySelectorAll('.filtro-checkbox');
const sezioni = document.querySelectorAll('section');
// Ogni volta che l'utente spunta o toglie la spunta da una checkbox
checkboxFiltri.forEach(chk => {
    chk.addEventListener('change', applicaFiltri);
});
function applicaFiltri() {
    // 1. Raccogliamo i valori delle categorie spuntate (es. ['schede-video'])
    const categorieSpuntate = Array.from(document.querySelectorAll('input[name="categoria"]:checked'))
                                   .map(cb => cb.value);
    // 2. Raccogliamo i valori delle marche spuntate (es. ['amd', 'nvidia'])
    const marcheSpuntate = Array.from(document.querySelectorAll('input[name="marca"]:checked'))
                                .map(cb => cb.value);
    // 3. Scorriamo ogni sezione
    sezioni.forEach(sezione => {
        const idSezione = sezione.id;
        // Se ci sono categorie spuntate e questa sezione NON è tra quelle, la nascondiamo
        const categoriaValida = categorieSpuntate.length === 0 || categorieSpuntate.includes(idSezione);
        if (!categoriaValida) {
            sezione.style.display = 'none';
            return;
        }
        const prodotti = sezione.querySelectorAll('.prodotto');
        let visibili = 0;
        prodotti.forEach(prodotto => {
            const testo = prodotto.querySelector('p').textContent.toLowerCase();
            // Il prodotto è valido se non c'è nessuna marca spuntata, 
            // oppure se il nome del prodotto contiene almeno una delle marche spuntate
            const marcaValida = marcheSpuntate.length === 0 || marcheSpuntate.some(marca => testo.includes(marca));
            if (marcaValida) {
                prodotto.style.display = '';
                visibili++;
            } else {
                prodotto.style.display = 'none';
            }
        });
        // Mostra la sezione solo se ha prodotti visibili (o se è una sezione ancora senza prodotti)
        if (prodotti.length > 0) {
            sezione.style.display = (visibili > 0) ? '' : 'none';
        } else {
            sezione.style.display = '';
        }
    });
}