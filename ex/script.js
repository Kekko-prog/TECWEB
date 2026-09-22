// Definiamo le opzioni per il secondo menu in base al gioco selezionato
        const opzioniPerGioco = {
                
            minecraft: [
                { valore: "", testo: "-- Scegli --" },
                { valore: "hardcore", testo: "Modalita' Hardocore" },
                { valore: "survival", testo: "Modalita' Survival" },
                { valore: "creative", testo: "Modalita' Creativa" },
                { valore: "bedwars", testo: "Bedwars / Minigame" }
            ],
            carx: [
                { valore: "", testo: "-- Scegli --" },
                { valore: "chaser", testo: "chaser" },
                { valore: "leader", testo: "leader" },
                { valore: "tuner", testo: "tuner" },
                { valore: "livery", testo: "livery designer" },
            ],
            acc: [
                { valore: "", testo: "-- Scegli --" },
                { valore: "monza", testo: "Monza Circuit" },
                { valore: "spa", testo: "Spa-Francorchamps" },
                { valore: "setup", testo: "Setup engineer" }
            ],
            r6: [
                { valore: "", testo: "-- Scegli --" },
                { valore: "fragger", testo: "fragger" },
                { valore: "support", testo: "support" },
                { valore: "intel", testo: "intel" },
                { valore: "classificata", testo: "ranked" },
                { valore: "mezzasega", testo: "se non giochi ranked non inviare il form" }
            ],
            rocket: [
                { valore: "", testo: "-- Scegli --" },
                { valore: "2v2", testo: "Competitiva 2v2" },
                { valore: "3v3", testo: "Competitiva 3v3" },
                { valore: "freestyler", testo: "freestyler" },
                { valore: "allenamento", testo: "Pacchetti di Allenamento" }
            ]
        };

        function aggiornaSottomenu() {
            const menuGioco = document.getElementById("scelta");
            const menuSottoScelta = document.getElementById("sottoscelta");
            const giocoSelezionato = menuGioco.value;

            // Svuota il secondo menu
            menuSottoScelta.innerHTML = "";

            // Se non è stato selezionato nessun gioco valido
            if (!giocoSelezionato || !opzioniPerGioco[giocoSelezionato]) {
                menuSottoScelta.disabled = true;
                const opzionePredefinita = document.createElement("option");
                opzionePredefinita.value = "";
                opzionePredefinita.text = "Prima seleziona un gioco";
                menuSottoScelta.appendChild(opzionePredefinita);
                return;
            }

            // Attiva il secondo menu
            menuSottoScelta.disabled = false;

            // Popola il secondo menu con le nuove opzioni
            opzioniPerGioco[giocoSelezionato].forEach(opzione => {
                const nuovaOpzione = document.createElement("option");
                nuovaOpzione.value = opzione.valore;
                nuovaOpzione.text = opzione.testo;
                menuSottoScelta.appendChild(nuovaOpzione);
            });
        }