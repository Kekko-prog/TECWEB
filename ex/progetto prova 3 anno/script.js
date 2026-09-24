function controllaAccesso() {

    let tentativo = document.getElementById("parolaSegreta").value;

    if (tentativo === "akinformatica") {
        window.location.href = "shop.html";
    } else {
        alert("Parola errata, riprova!");
    }
}

function sePremiInvio(evento) {
    if (evento.key === "Enter") {
        controllaAccesso(); 
    }
}