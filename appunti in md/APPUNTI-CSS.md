# CSS - Fogli di Stile

Il CSS è un linguaggio dichiarativo, non un linguaggio di programmazione.
Funziona con delle regole dichiarative: ogni file associato ad un HTML serve per definire lo stile di pagina che verrà applicato dal browser per la visualizzazione della pagina HTML.
Questo file viene definito _stylesheet_, ovvero un file contenente un insieme di regole CSS.

Il **Selector** (selettore) ha la funzione di selezionare gli elementi a cui verrà applicato lo stile.

**Esempio:**

```html
<h1>Hello CSS</h1>
<p>Our <em>first</em> page with <em>style</em>!</p>
```

```css
h1 {
  color: red;
  font-size: 50px;
}

em {
  color: blue;
}
```

## Come si include uno stylesheet?

Lo stylesheet in un file HTML si associa tramite il tag `<link>` all'interno dell'`<head>`:

```html
<head>
  <meta charset="UTF-8" />
  <title>CSS</title>
  <link rel="stylesheet" href="style.css" />
</head>
```

- `rel="stylesheet"`: questo attributo specifica la relazione tra il file linkato e il documento HTML.
- `href="style.css"`: attributo che specifica l'URL del file da linkare.

Le regole del CSS possono essere anche definite negli elementi `<style>` all'interno dell'`<head>` del documento HTML:

```html
<head>
  <meta charset="UTF-8" />
  <title>CSS</title>
  <style>
    h1 {
      color: red;
      font-size: 50px;
    }
  </style>
</head>
```

Inoltre, gli elementi HTML possono essere modificati nella riga stessa tramite l'attributo `style` (queste modifiche si applicano solo all'elemento selezionato):

```html
<em style="color: fuchsia; font-weight: bold;">inline style</em>
```

---

## Selettori

I selettori sono una parte chiave del CSS. Specificano a quale elemento le regole CSS vengono applicate, ma non sono usati per lo styling in sé. Ne esistono di diversi tipi:

### Universale (`*`)

_Aka "wildcard"_: matcha qualsiasi elemento.

```css
* {
  color: hotpink;
}
```

```html
<p>Here's a list:</p>
<ul>
  <li>Ann</li>
  <li>Bob</li>
  <li><a href="/car/">Carl</a></li>
  <li>Dave</li>
</ul>
<a href="/">Back to homepage</a>
```

### Type (Tipo)

Matcha il nome del tag selezionato.

```css
a {
  background: yellow;
}
```

```html
<p>Here's a list:</p>
<ul>
  <li>Ann</li>
  <li>Bob</li>
  <li><a href="/car/">Carl</a></li>
  <li>Dave</li>
</ul>
<a href="/">Back to homepage</a>
```

### ID (`#`)

Matchano l'attributo `id="value"`. Si usa `#value`.

```css
#msg {
  background: cyan;
}
```

```html
<form>
  <label for="msg">Message: </label>
  <input id="msg" type="text" name="msg" /><br />
  <label for="num">Number: </label>
  <input id="num" type="number" name="num" />
</form>
```

### Class (`.`)

Matcha l'attributo `class="value"`. Si usa `.value`.

```css
.primary {
  background: blue;
  color: white;
}
```

```html
<button>Reset form</button> <button class="primary btn">Continue</button>
```

### Attribute (Attributo)

Matcha un elemento con un determinato attributo `[attribute]` o `[attribute='value']`.

```css
[for] {
  /* tutti gli elementi con un attributo 'for' */
  background: yellow;
}
[type="number"] {
  /* tutti gli elementi con type='number' */
  background: cyan;
}
```

```html
<form>
  <label for="msg">Message: </label>
  <input id="msg" type="text" name="msg" /><br />
  <label for="num">Number: </label>
  <input id="num" type="number" name="num" />
</form>
```

### Match Parziale per Attributi

Esistono anche selettori che permettono il matching parziale:

- `*=` contiene una determinata parola
- `^=` inizia per una determinata parola
- `$=` finisce per una determinata parola

```css
[href*="programming"] {
  /* contains 'programming' */
  text-decoration: overline;
}
[href^="https"] {
  /* start with 'https' */
  color: red;
}
[href$=".it/"] {
  /* ends with '.it/' */
  color: green;
}
```

Seguendo le regole di prima avremo:

- `<a href="http://bookofprogramming.com/">Link 1</a>` diventa sottolineato verso sopra
- `<a href="https://programming.net/">Link 2</a>` diventa sottolineato verso sopra e diventa rosso
- `<a href="http://webtechnologies.it/">Link 3</a>` diventa verde

### Combinare i Selettori

È anche possibile combinare selettori per matchare elementi con combinazioni di attributi:

```css
a[target="_blank"] {
  color: red;
}
a.my-class {
  color: green;
}
a[href*="programming"].my-class {
  background: yellow;
}
```

Seguendo le regole di prima avremo:

- `<a href="http://bookofprogramming.com/" target="_blank">Link 1</a>` diventa rosso
- `<a class="my-class" href="https://programming.net/">Link 2</a>` diventa verde con background giallo
- `<em class="my-class">Hello</em>` diventa carattere italico corsivo

---

## Combinatori

I selettori complessi permettono di matchare elementi in base alla loro gerarchia e possono essere combinati in base alla loro posizione all'interno del DOM.
La sintassi è: `selector1 combinator selector2`.
Ne esistono 4 tipi principali:

### 1. Descendant Selector (Spazio)

Matcha `selector2` che si trova all'interno di `selector1`.

```css
section em {
  color: teal;
}
```

```html
<section>
  <p>
    A student asked Fu-Tzu about the nature of the cycle of Data and Control.
    Fu-Tzu replied:
    <em>Think of a compiler, compiling itself.'</em>
  </p>
</section>
<em>-- Fragment of the Book of Programming</em>
```

### 2. Child Selector (`>`)

Matcha `selector2` che è figlio diretto di `selector1`. (Se si trova all'interno ma non è figlio diretto non viene matchato).

```css
main > em {
  color: teal;
  font-variant: small-caps;
}
```

```html
<main>
  CSS <em>selectors</em>:
  <p>We <em>like</em> 'em.</p>
</main>
```

### 3. Adjacent Sibling Selector (`+`)

Matcha `selector2` che segue immediatamente `selector1`.

```css
.master + li {
  color: red;
}
```

```html
<ul>
  <li>Tsu-li</li>
  <li class="master">Fu-Tzu</li>
  <li>Tsu-ssu</li>
  <li class="disciple">Li-Win</li>
</ul>
```

### 4. General Sibling Selector (`~`)

Matcha `selector2` che segue `selector1` (anche non immediatamente).

```css
.master ~ li.disciple {
  color: red;
}
```

```html
<ul>
  <li>Tsu-li</li>
  <li class="master">Fu-Tzu</li>
  <li>Tsu-ssu</li>
  <li class="disciple">Li-Win</li>
</ul>
```

---

## Pseudo Classi

Gli elementi HTML possono avere diversi stati, ad esempio per il tipo di interazione o per la loro relazione con altri elementi. I selettori pseudo classe iniziano con `:` e permettono di modificare graficamente degli elementi in base al loro stato.

- **Stato Interattivo**: risultato ottenuto da un'interazione di un utente.
- **Stato Storico**: usato per "ricordare" quali link sono stati visitati.
- **Stato Form**: specifico per le interazioni con i form.

### Stati Interattivi

- `:hover` = seleziona gli elementi dove un dispositivo di puntamento viene piazzato sopra.
- `:active` = matcha lo stato di un elemento con il quale si ha un'interazione (il bottone è stato premuto).
- `:focus` = matcha lo stato di un elemento che è stato focusato.

```html
<p>Learnign <em>HTML</em> and <em>CSS</em>.</p>
Message: <input type="text" /><br /><br />
<button>Keep me pressed</button>
```

```css
em:hover {
  background: yellow;
}
input[type="text"]:focus {
  background: cyan;
}
button:active {
  background: blue;
  color: white;
}
```

### Stati Storici

- `:link` = seleziona un link che non è stato ancora visitato.
- `:visited` = seleziona un link che è stato già visitato.

```html
<a href="./js/">New link</a> <a href="./css/">Visited link</a>
```

```css
:link {
  color: red;
}
:visited {
  color: darkred;
}
```

### Stati Form

```html
<div>
  <label for="mail">Message:</label><input id="mail" type="email" />
  <button disabled>Cancel</button><button>Subscribe</button>
</div>
<input type="checkbox" /> Checkbox<br /><br />
<em>What a nice form!</em>
```

```css
:disabled {
  border: 2px dashed red;
}
:invalid {
  color: red;
}
:checked ~ em {
  color: deeppink;
  font-weight: bold;
}
```

### Posizioni di Relazione

- `:first-child` e `:last-child`: selezionano rispettivamente il primo e l'ultimo figlio tra tutti i fratelli, indipendentemente dal tag.
- `:only-child`: può essere usato per selezionare elementi che non hanno fratelli.
- `:first-of-type` e `:last-of-type`: primo e ultimo figlio in mezzo a tanti fratelli, considerando solo elementi dello stesso tipo.
- `:nth-child(n)` e `:nth-of-type(n)`: elemento in posizione n-esima.
  _(NB: L'indicizzazione in CSS inizia da 1!)_

```html
<p><em>Ann</em> <strong>Bob</strong> <em>Carl</em></p>
<p><strong>Ann</strong> <em>Bob</em> <strong>Carl</strong></p>
```

Esempi di funzionamento:

- `em:last-child { color: red; }` -> Solo Carl della prima riga diventa rosso (essendo l'ultimo figlio di em).
- `em:last-of-type { color: red; }` -> Carl e Bob diventano rossi perché sono gli ultimi figli del loro tipo `<em>`.
- `em:first-child { color: red; }` -> Solo Ann diventa rosso perché è il primo figlio del suo tipo `<em>`.
- `em:first-of-type { color: red; }` -> Ann e Bob diventano rossi perché sono i primi figli del loro tipo `<em>`.
- `em:nth-child(2) { color: red; }` -> Solo Bob diventa rosso dato che è il secondo figlio del suo tipo `<em>`.

Le posizioni di relazione possono essere usate anche sulle liste ordinate come in questo caso (dispari = blu | pari = rossi):

```html
<p>Lectures:</p>
<ol>
  <li>Introduction</li>
  <!-- blu -->
  <li>HTML</li>
  <!-- rosso -->
  <li>CSS (basics)</li>
  <!-- blu -->
  <li>CSS (frameworks + Sass)</li>
  <!-- rosso -->
  <li>JavaScript</li>
  <!-- blu -->
</ol>
```

```css
li:nth-child(even) {
  color: red;
}
li:nth-child(odd) {
  color: blue;
}
```

---

## Pseudo Elementi

I pseudo elementi possono essere usati per targettare determinati contenuti di un elemento HTML senza aggiungere styling html aggiuntivo. La sua sintassi è: `selector::pseudo-element`.

- `::first-letter` = targetta la prima lettera di un contenuto dentro un elemento block-level.
- `::first-line` = targetta la prima riga di un contenuto dentro un elemento block-level.
- `::selection` = targetta il contenuto attualmente selezionato dall'utente.
- `::before` = crea un elemento che è il primo figlio dell'elemento selezionato.
- `::after` = crea un elemento che è l'ultimo figlio dell'elemento selezionato.

```html
<p>
  A student had been sitting motionless behind his computer for hours, frowning
  darkly. He was trying to write a beautiful solution to a difficult problem,
  but could not find the right approach.
</p>
<p>
  Fu-Tzu hit him on the back of his head and shouted 'Type something!' The
  student started writing an ugly solution. After he had finished, he suddenly
  understood the beautiful solution.
</p>
```

```css
p::first-letter {
  font-weight: bold; /* la prima riga diventa rossa */
}
p::first-line {
  color: red;
}
p:last-child::selection {
  background: red;
  color: white;
}
```

---

## The Cascade

Alcune volte più regole si possono applicare allo stesso elemento, e possono andare in conflitto tra loro. La **Cascade** è l'algoritmo che risolve questi conflitti.

- INPUT = un insieme di regole che configgono tra loro per un singolo elemento.
- OUTPUT = una singola proprietà che si applica.

La Cascade consiste in 4 punti chiave:

1. Origine ed Importanza
2. Livelli (Layers)
3. Specificità
4. Posizione e ordine apparente delle regole

_(Il CSS che imponiamo noi non è l'unico stylesheet che viene applicato alla pagina HTML, c'è quello di default che applica il browser e magari anche un "plugin" che l'utente può avere impostato di default)._

La regola `!important` può essere usata per dare più importanza ad una proprietà dentro al CSS:

```css
h1 {
  color: red !important;
}
```

### 1. Gerarchia delle Origini e Importanza

L'algoritmo ordina la priorità delle origini dalla più bassa alla più alta in questo modo:

- Stili predefiniti del Browser (User Agent Styles)
- Stili dell'Utente (Local User Styles)
- Stili dell'Autore (Authored Styles, ovvero il codice CSS che scriviamo noi)
- Stili dell'Autore con `!important`
- Stili dell'Utente con `!important`
- Stili predefiniti del Browser con `!important`

### 2. Livelli (Layers)

All'interno di ogni categoria di origine/importanza, la Cascade valuta i livelli (Layers). L'ordine dal livello meno specifico al più specifico è il seguente:

- Livelli nominati (Named Layers - primo ad apparire)
- Livelli nominati (Named Layers - ultimo ad apparire)
- Livello non nominato (Unnamed Layer - il normale codice CSS all'interno di o importato)
- Stili inline (Inline styles - hanno la priorità massima in questa specifica valutazione)

### 3. Specificità

Quando due regole in conflitto appartengono alla stessa origine/importanza e allo stesso livello (Layer), la specificità entra in gioco per risolvere il conflitto. L'idea di base è che il selettore più specifico vince.
CSS definisce come calcolare la specificità tramite una tripla numerica (A, B, C):

- Si ignora il selettore universale (`*`)
- **A**: Conta il numero di selettori di id (es. `#msg`)
- **B**: Conta il numero di selettori di classe, attributi e pseudo-classi (es. `.primary`, `[type='number']`, `:hover`)
- **C**: Conta il numero di selettori di tipo (elementi HTML) e pseudo-elementi (es. `em`, `::first-letter`)

I confronti vengono effettuati considerando i tre componenti in ordine:

- La specificità con il valore A maggiore è più specifica e vince.
- Se i due valori A sono pari, vince la specificità con il valore B maggiore.
- Se anche i due valori B sono pari, vince la specificità con il valore C maggiore.
- Se tutti i valori sono pari, le due specificità sono considerate uguali.

### 4. Posizione e Ordine di Apparizione

Quando due proprietà hanno la stessa origine/importanza, si trovano nello stesso livello (Layer) e hanno un'identica specificità, vince l'ultima regola ad apparire nel codice.
Questa regola si applica sia all'ordine in cui le regole sono scritte all'interno di uno stesso foglio di stile, sia all'ordine in cui i diversi fogli di stile vengono inclusi nell'HTML tramite i tag `<link>`.

_(NB: Gli stili predefiniti del browser (User Agent Styles) sono nascosti di default nei Developer Tools del browser)._

### Ereditarietà (Inheritance)

In CSS, se non viene impostato un valore specifico, alcune proprietà possono essere ereditate dagli elementi antenati.
Tra le proprietà ereditabili troviamo: `color`, `font-size`, `font-family`, `font-weight` e `font-style`.
È fondamentale ricordare che le proprietà ereditate hanno la specificità più bassa in assoluto tra tutti i metodi di styling.

---

# CSS - PARTE 2

Alcune proprietà di CSS possono essere usate per cambiare la grandezza di un elemento: `width`, `height`, `font-size`, `margin`, `padding`, `border`, ecc.

### Grandezze Assolute e Relative

Quando si ridimensiona un elemento in CSS si posso usare sia lunghezze assolute che relative (in base all'altra grandezza).

- **Assolute**: definite usando un numero e una delle lunghezze definite supportate (es. cm, in, mm, px).

```css
div {
  background: red;
  width: 2.54cm;
  height: 1in;
  border: 2mm solid black;
  color: white;
  font-size: 24px;
}
```

Le percentuali possono essere definite relative all'elemento parente:

```html
<div class="a">
  <div class="b"></div>
</div>
```

```css
.a {
  width: 300px;
  height: 200px;
  background: red;
}
.b {
  width: 50%; /* 150px */
  height: 50%; /* 100px */
  background: blue;
}
```

## Layout - Box Model

Ogni elemento HTML è una box, ogni box è fatta da aree distinte:

- **Content box**: è dove il figlio dell'elemento vive.
- **Padding**: separa il contenuto del box dal bordo.
- **Border Box**: è il bordo dell'elemento.
- **Margin**: crea lo spazio fuori dagli elementi.

```text
|--------------------------------|
|          Margin Box            |
|  |--------------------------|  |
|  |       Border Box         |  |
|  |  |--------------------|  |  |
|  |  |    Padding Box     |  |  |
|  |  |  |--------------|  |  |  |
|  |  |  | Content Box  |  |  |  |
|  |  |  |--------------|  |  |  |
|  |  |                    |  |  |
|  |  |--------------------|  |  |
|  |                          |  |
|  |--------------------------|  |
|                                |
|--------------------------------|
```

La grandezza di ogni area può essere definita tramite dichiarazioni in CSS.
Il colore e il comportamento viene definito dai loro Layout mode, content, box mode priorities.

Di default le box vengono mostrate usando il **flow-layout** (a.k.a. normal flow).
Possono anche essere mostrate con il layout `INLINE`, e con il layout `BLOCK`.

### Layout Inline

Posiziona le box in orizzontale. Ignora `width` e `height`.

```css
em {
  display: inline; /* default */
  background: yellow;
  border: 1px solid;
  width: 50px;
  height: 50px; /* ignored */
}
```

```html
<h3>Heading</h3>
<p>Learning <em>HTML</em> and <em>CSS</em></p>
```

### Layout Block

Posiziona la box su una nuova linea dedicata (come andasse a capo).
Paragrafi `<p>` e intestazioni `<hx>` sono display block nei default user agent styles.
Se non specificato diversamente, gli elementi block si espandono per occupare l'intera grandezza disponibile nella dimensione orizzontale (inline dimension).

```css
em {
  display: block;
  background: yellow;
  border: 1px solid;
  width: 50px;
  height: 50px;
}
```

### Layout Inline-Block

Stesso comportamento di `inline` (si affianca agli altri elementi), ma permette di impostare una larghezza (`width`) e un'altezza (`height`).

```css
em {
  display: inline-block;
  background: yellow;
  border: 1px solid;
  width: 50px;
  height: 50px;
}
```

### Layout None

La proprietà `display: none;` viene usata per **rimuovere completamente** l'elemento dalla visualizzazione della pagina (come se non esistesse nell'HTML).

```css
em {
  display: none;
}
```

---

## Floats

La proprietà `float` può essere usata per far "fluttuare" gli elementi nella direzione indicata (es. `left` o `right`), e fa in modo che gli elementi successivi gli scorrano attorno (wrap).

```html
<h1>Fu-Tzu</h1>
<img src="pic.jpg" />
<p>With a long beard and robes adorned with clever coding jokes...</p>
```

```css
img {
  width: 20vw;
  min-width: 100px;
  float: left;
  margin-right: 1rem;
}
```

**Clear**: La proprietà `clear` viene usata per impedire che un elemento successivo scorra attorno (wrap) a un elemento floating.

```css
p + p {
  clear: both;
}
```

---

## Posizionamento (Positioning)

La proprietà `position` cambia il modo in cui un elemento si comporta nel normale flusso del documento.
Il valore di default della proprietà è `static`.
Gli altri possibili valori sono:

- `relative`: Posizionato relativamente alla sua normale posizione.
- `absolute`: Posizionato relativamente al suo **antenato posizionato più vicino** (nearest relative-positioned ancestor).
- `fixed`: Posizionato relativamente al **viewport** (finestra del browser), utile per elementi che non devono muoversi durante lo scroll (es. un tasto "Back to top").
- `sticky`: Una sorta di ibrido tra relative e fixed. È relativo finché non attraversa una soglia (scroll), poi diventa fisso (fixed) finché non raggiunge il confine del suo parente contenitore.

**Esempio Sticky:**

```css
nav {
  padding: 1em;
  background: gainsboro;
  position: sticky;
  top: 0px;
}
```

---

## Layout Moderni: Flexbox e Grid

Il CSS moderno offre due meccanismi aggiuntivi di layout rispetto al normal flow:

- **Flexbox**: progettato per layout **mono-dimensionali** (orizzontale o verticale).
- **Grid**: progettato per layout **bi-dimensionali** (righe e colonne).

### Flexbox

I "flex containers" vengono dichiarati usando la proprietà `display: flex;`.
Sono elementi block-level, ma i loro figli diventano "flex items".
Ogni flex container ha un **main axis** (asse principale) e un **cross axis** (asse incrociato, perpendicolare).
Il main axis è impostato usando `flex-direction` (il default è `row`, riga).

- `flex-grow`: fa sì che il flex item si espanda per occupare tutto lo spazio disponibile nell'asse principale.
- `flex-shrink`: controlla se il flex item può rimpicciolire la sua grandezza base per adattarsi al contenitore.
- `flex-wrap`: controlla come vengono gestiti gli "overflow" (elementi che escono dallo spazio) dicendo se gli elementi possono andare a capo.

**Gestione dello spazio libero:**

- `justify-content`: specifica come gestire lo spazio libero (free space) lungo l'asse **principale**. I valori includono: `flex-start`, `flex-end`, `center`, `space-around`, `space-between`, `space-evenly`.
- `align-content`: specifica come gestire lo spazio libero lungo l'asse **incrociato**. (Valori simili).

### Grid

Grid è un layout bidimensionale basato su righe e colonne.
I "grid containers" sono dichiarati usando `display: grid;`. I figli diretti diventano "grid items".
Il contenitore definisce il numero e la grandezza delle righe e delle colonne.

```css
.container {
  display: grid;
  /* Due colonne */
  grid-template-columns: 1fr 100px;
  /* Tre righe */
  grid-template-rows: 20px 50px 100px;
  gap: 10px;
}
```

**L'unità `fr` (Fractional Unit)**
Un'unità relativa speciale che funziona solo nei layout grid.
Rappresenta una **quota (frazione) flessibile** dello spazio disponibile.
Es. `grid-template-columns: 1fr 1fr 1fr;` definisce 3 colonne che si dividono in parti uguali lo spazio a disposizione.

**Placement e Aree**
Di default, gli item si posizionano lungo le righe. È possibile forzare il posizionamento per colonne con `grid-auto-flow: column;`.
Si può anche assegnare un nome ad alcune aree della grid e piazzarvi dentro gli elementi.

```css
body {
  display: grid;
  grid-template-columns: 70vw 1fr;
  grid-template-rows: auto auto 1fr auto;
  grid-template-areas:
    "header header"
    "navbar navbar"
    "main sidebar"
    "footer footer";
}
header {
  grid-area: header;
}
nav {
  grid-area: navbar;
}
/* ecc. */
```

---

## Responsive Design

Evoluzione storica dei layout sul web:

1. **Fixed-width Layouts**: Anni '90, monitor spesso 640x480. Disegnare con larghezza fissa (es. 640px) era comodo. Se lo schermo era troppo piccolo l'utente doveva usare lo scroll orizzontale; se lo schermo era troppo grande rimaneva tantissimo spazio sprecato.
2. **Liquid (Fluid) Layouts**: Al posto di larghezze fisse si usano le percentuali (layout "liquidi"). Funziona meglio, ma sugli schermi giganti le righe diventano troppo larghe (stretched) e su schermi minuscoli il testo si schiaccia in colonnine (squashed).
3. **Separate Websites**: Nascono gli smartphone, e l'approccio temporaneo fu creare un sito web separato (es. mobile.sito.it) che reindirizza l'utente in base al dispositivo (User Agent Sniffing). Difficile da mantenere!
4. **Adaptive Layouts**: Nascono le Media Queries. Layout a larghezza fissa che "saltano" da un design all'altro in base alla dimensione. Funziona bene sulle dimensioni esatte previste, ma peggiora nelle dimensioni intermedie.
5. **Responsive Layouts**: Il termine nasce nel 2010. È un mashup di Media Queries e Liquid Layouts. Caratterizzato da contenitori fluidi, media fluidi e Media Queries per aggiustamenti specifici. "Layout e immagini devono sembrare perfetti su qualsiasi device".

### Media Queries

Permettono di applicare alcuni stili CSS **solo** quando il dispositivo su cui si visualizza la pagina rispetta specifiche caratteristiche.
Iniziano con la keyword `@media`. Esistono 3 tipi di output in CSS moderno: `print` (stampa o anteprima), `screen` (schermi), `all` (tutti).
Si possono testare "Media Features" (racchiuse tra parentesi):

- `max-width`, `min-width`
- `orientation: landscape` o `orientation: portrait`

```css
@media (max-width: 600px) {
  main {
    width: 100%;
  }
}
```

### Viewport Meta Tag

I primi browser mobile, per far fronte a siti non pensati per loro, simulavano uno schermo largo (virtual viewport di 980px) e rimpicciolivano tutto visivamente (scaling).
Ma per un sito che **è** ottimizzato per mobile, questo comportamento non è voluto! (Le media queries per 640px non si attiverebbero mai).
Per prendere il controllo del viewport si inserisce nell'`<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

- `width=device-width`: ordina al browser di assumere che la larghezza designata per il sito corrisponda a quella vera del device.
- `initial-scale=1`: ordina di non eseguire nessuno scaling artificiale dell'interfaccia.
