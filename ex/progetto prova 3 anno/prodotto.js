const titolo = document.getElementById('titolo2');
if (titolo) {
  titolo.addEventListener('click', function() {
    window.location.href = 'shop.html'; 
  });
}

const catalogo = {
    // ---- SCHEDE VIDEO ----
    "amd-rx-7600": {
        nome: "AMD RX 7600",
        prezzo: "€ 299.00", // Inventa o metti il prezzo vero
        immagine: "img/GPU/amd-rx-7600.webp",
        descrizione: "Scheda video perfetta per il gaming in 1080p con prestazioni eccellenti.",
        categoria: "Scheda Video",
        marca: "AMD"
    },
    "nvidia-rtx-4060": {
        nome: "NVIDIA RTX 4060",
        prezzo: "€ 329.00",
        immagine: "img/GPU/nvidia-rtx-4060.webp",
        descrizione: "Ottima scheda con supporto al DLSS 3 per un framerate altissimo.",
        categoria: "Scheda Video",
        marca: "NVIDIA"
    },
    "amd-rx-7800-xt": {
        nome: "AMD RX 7800 XT",
        prezzo: "€ 519.00",
        immagine: "img/GPU/amd-rx-7800-xt.webp",
        descrizione: "Scheda di fascia alta pensata per il gaming in 1440p con ray tracing.",
        categoria: "Scheda Video",
        marca: "AMD"
    },
    "nvidia-rtx-3050": {
        nome: "NVIDIA RTX 3050",
        prezzo: "€ 209.00",
        immagine: "img/GPU/nvidia-rtx-3050.webp",
        descrizione: "Scheda entry level ideale per iniziare a giocare in 1080p senza spendere troppo.",
        categoria: "Scheda Video",
        marca: "NVIDIA"
    },
    "nvidia-rtx-4070-super": {
        nome: "NVIDIA RTX 4070 SUPER",
        prezzo: "€ 649.00",
        immagine: "img/GPU/nvidia-rtx-4070-super.webp",
        descrizione: "Il compromesso perfetto tra prezzo e prestazioni per il gaming in 1440p.",
        categoria: "Scheda Video",
        marca: "NVIDIA"
    },
    "nvidia-rtx-4080-super": {
        nome: "NVIDIA RTX 4080 SUPER",
        prezzo: "€ 1109.00",
        immagine: "img/GPU/nvidia-rtx-4080-super.webp",
        descrizione: "Scheda di fascia enthusiast per il 4K ad alti refresh rate.",
        categoria: "Scheda Video",
        marca: "NVIDIA"
    },
    "nvidia-rtx-4090": {
        nome: "NVIDIA RTX 4090",
        prezzo: "€ 1899.00",
        immagine: "img/GPU/nvidia-rtx-4090.webp",
        descrizione: "La GPU più potente del mercato, senza compromessi su 4K, rendering e IA.",
        categoria: "Scheda Video",
        marca: "NVIDIA"
    },

    // ---- PROCESSORI ----
    "amd-ryzen-5-7600x": {
        nome: "AMD RYZEN 5 7600X",
        prezzo: "€ 219.00",
        immagine: "img/CPU/amd-ryzen-5-7600x.webp",
        descrizione: "6 core e 12 thread su socket AM5, ottimo per gaming e uso quotidiano.",
        categoria: "Processore",
        marca: "AMD"
    },
    "amd-ryzen-7-7800x3d": {
        nome: "AMD RYZEN 7 7800X3D",
        prezzo: "€ 389.00",
        immagine: "img/CPU/amd-ryzen-7-7800x3d.webp",
        descrizione: "Con la cache 3D V-Cache è il processore da gaming più efficiente sul mercato.",
        categoria: "Processore",
        marca: "AMD"
    },
    "amd-ryzen-9-7950x": {
        nome: "AMD RYZEN 9 7950X",
        prezzo: "€ 559.00",
        immagine: "img/CPU/amd-ryzen-9-7950x.webp",
        descrizione: "16 core e 32 thread per produttività spinta, rendering e compilazione.",
        categoria: "Processore",
        marca: "AMD"
    },
    "intel-i3-13100": {
        nome: "INTEL I3 13100",
        prezzo: "€ 129.00",
        immagine: "img/CPU/intel-i3-13100.webp",
        descrizione: "CPU entry level a 4 core, perfetta per un PC da ufficio o da studio.",
        categoria: "Processore",
        marca: "Intel"
    },
    "intel-i5-14600k": {
        nome: "INTEL I5 14600K",
        prezzo: "€ 299.00",
        immagine: "img/CPU/intel-i5-14600k.webp",
        descrizione: "14 core sbloccati per l'overclock, il punto di equilibrio per un PC da gaming.",
        categoria: "Processore",
        marca: "Intel"
    },
    "intel-i7-14700k": {
        nome: "INTEL I7 14700K",
        prezzo: "€ 429.00",
        immagine: "img/CPU/intel-i7-14700k.webp",
        descrizione: "20 core per gaming ad alto refresh rate e streaming in contemporanea.",
        categoria: "Processore",
        marca: "Intel"
    },
    "intel-i9-14900k": {
        nome: "INTEL I9 14900K",
        prezzo: "€ 589.00",
        immagine: "img/CPU/intel-i9-14900k.webp",
        descrizione: "24 core con frequenze fino a 6 GHz, il massimo per gaming e produttività.",
        categoria: "Processore",
        marca: "Intel"
    },

    // ---- SCHEDE MADRI ----
    "entry-h610": {
        nome: "ENTRY H610",
        prezzo: "€ 89.00",
        immagine: "img/MOBO/entry-h610.webp",
        descrizione: "Scheda madre essenziale su chipset H610, ideale per build economiche Intel.",
        categoria: "Scheda Madre",
        marca: "Intel"
    },
    "microatx-b760": {
        nome: "MICROATX B760",
        prezzo: "€ 139.00",
        immagine: "img/MOBO/microatx-b760.webp",
        descrizione: "Formato micro-ATX su chipset B760, compatto ma con tutto il necessario.",
        categoria: "Scheda Madre",
        marca: "Intel"
    },
    "minitx-b760": {
        nome: "MINITX B760",
        prezzo: "€ 179.00",
        immagine: "img/MOBO/minitx-b760.webp",
        descrizione: "Formato mini-ITX su B760, per build piccole ma potenti.",
        categoria: "Scheda Madre",
        marca: "Intel"
    },
    "microatx-b650": {
        nome: "MICROATX B650",
        prezzo: "€ 159.00",
        immagine: "img/MOBO/microatx-b650.webp",
        descrizione: "Micro-ATX su chipset B650 per processori AMD Ryzen serie 7000.",
        categoria: "Scheda Madre",
        marca: "AMD"
    },
    "atx-z790": {
        nome: "ATX Z790",
        prezzo: "€ 279.00",
        immagine: "img/MOBO/atx-z790.webp",
        descrizione: "Scheda top di gamma su Z790, con supporto all'overclock e PCIe 5.0.",
        categoria: "Scheda Madre",
        marca: "Intel"
    },
    "atx-x670e": {
        nome: "ATX X670E",
        prezzo: "€ 329.00",
        immagine: "img/MOBO/atx-x670e.webp",
        descrizione: "Il chipset AM5 più completo: PCIe 5.0 su GPU e SSD, connettività estrema.",
        categoria: "Scheda Madre",
        marca: "AMD"
    },

    // ---- ALIMENTATORI ----
    "550w-bronze": {
        nome: "550W BRONZE",
        prezzo: "€ 59.00",
        immagine: "img/PSU/550w-bronze.webp",
        descrizione: "Alimentatore da 550W certificato 80+ Bronze, giusto per build di fascia media.",
        categoria: "Alimentatore",
        marca: "Corsair"
    },
    "650w-bronze": {
        nome: "650W BRONZE",
        prezzo: "€ 69.00",
        immagine: "img/PSU/650w-bronze.webp",
        descrizione: "650W certificati 80+ Bronze, la scelta sicura per una build da gaming.",
        categoria: "Alimentatore",
        marca: "Corsair"
    },
    "750w-gold": {
        nome: "750W GOLD",
        prezzo: "€ 109.00",
        immagine: "img/PSU/750w-gold.webp",
        descrizione: "750W con certificazione 80+ Gold e ventola silenziosa in modalità zero-RPM.",
        categoria: "Alimentatore",
        marca: "Seasonic"
    },
    "850w-gold": {
        nome: "850W GOLD",
        prezzo: "€ 139.00",
        immagine: "img/PSU/850w-gold.webp",
        descrizione: "850W 80+ Gold, ideale per schede video di fascia alta e overclock.",
        categoria: "Alimentatore",
        marca: "Seasonic"
    },
    "1000w-platinum": {
        nome: "1000W PLATINUM",
        prezzo: "€ 219.00",
        immagine: "img/PSU/1000w-platinum.webp",
        descrizione: "1000W certificati 80+ Platinum, per configurazioni multi-GPU e workstation.",
        categoria: "Alimentatore",
        marca: "Corsair"
    },
    "1200w-platinum": {
        nome: "1200W PLATINUM",
        prezzo: "€ 289.00",
        immagine: "img/PSU/1200w-platinum.webp",
        descrizione: "1200W 80+ Platinum per le build più esigenti, con cablaggio completamente modulare.",
        categoria: "Alimentatore",
        marca: "Seasonic"
    },

    // ---- SSD ----
    "sata-500gb": {
        nome: "SATA 500GB",
        prezzo: "€ 39.00",
        immagine: "img/SSD/sata-500gb.webp",
        descrizione: "SSD SATA da 500GB, l'upgrade più economico per un vecchio PC.",
        categoria: "SSD",
        marca: "Crucial"
    },
    "sata-1tb": {
        nome: "SATA 1TB",
        prezzo: "€ 69.00",
        immagine: "img/SSD/sata-1tb.webp",
        descrizione: "SSD SATA da 1TB, affidabile e compatibile con qualsiasi scheda madre.",
        categoria: "SSD",
        marca: "Crucial"
    },
    "nvme-gen3-1tb": {
        nome: "NVME GEN3 1TB",
        prezzo: "€ 59.00",
        immagine: "img/SSD/nvme-gen3-1tb.webp",
        descrizione: "SSD NVMe PCIe 3.0 da 1TB con letture fino a 3500 MB/s.",
        categoria: "SSD",
        marca: "Crucial"
    },
    "nvme-gen4-1tb": {
        nome: "NVME GEN4 1TB",
        prezzo: "€ 79.00",
        immagine: "img/SSD/nvme-gen4-1tb.webp",
        descrizione: "SSD NVMe PCIe 4.0 da 1TB, fino a 7000 MB/s per avvii e caricamenti istantanei.",
        categoria: "SSD",
        marca: "Samsung"
    },
    "nvme-gen4-2tb": {
        nome: "NVME GEN4 2TB",
        prezzo: "€ 139.00",
        immagine: "img/SSD/nvme-gen4-2tb.webp",
        descrizione: "2TB NVMe PCIe 4.0, tanto spazio e prestazioni elevate per giochi e progetti.",
        categoria: "SSD",
        marca: "Samsung"
    },
    "nvme-gen5-2tb": {
        nome: "NVME GEN5 2TB",
        prezzo: "€ 249.00",
        immagine: "img/SSD/nvme-gen5-2tb.webp",
        descrizione: "SSD NVMe PCIe 5.0 da 2TB con velocità fino a 12000 MB/s.",
        categoria: "SSD",
        marca: "Samsung"
    },

    // ---- HARD DISK ----
    "1tb-7200rpm": {
        nome: "1TB 7200RPM",
        prezzo: "€ 49.00",
        immagine: "img/HDD/1tb-7200rpm.webp",
        descrizione: "Hard disk meccanico da 1TB a 7200RPM, economico per l'archiviazione.",
        categoria: "Hard Disk",
        marca: "Seagate"
    },
    "2tb-7200rpm": {
        nome: "2TB 7200RPM",
        prezzo: "€ 69.00",
        immagine: "img/HDD/2tb-7200rpm.webp",
        descrizione: "2TB a 7200RPM con cache da 256MB, ideale per giochi e backup.",
        categoria: "Hard Disk",
        marca: "Seagate"
    },
    "4tb-5400rpm": {
        nome: "4TB 5400RPM",
        prezzo: "€ 99.00",
        immagine: "img/HDD/4tb-5400rpm.webp",
        descrizione: "4TB a 5400RPM, silenzioso e capiente per foto, video e archivi.",
        categoria: "Hard Disk",
        marca: "Western Digital"
    },
    "8tb-nas": {
        nome: "8TB NAS",
        prezzo: "€ 189.00",
        immagine: "img/HDD/8tb-nas.webp",
        descrizione: "Hard disk da 8TB ottimizzato per NAS, progettato per il funzionamento 24/7.",
        categoria: "Hard Disk",
        marca: "Western Digital"
    },
    "12tb-nas": {
        nome: "12TB NAS",
        prezzo: "€ 279.00",
        immagine: "img/HDD/12tb-nas.webp",
        descrizione: "12TB per NAS con tecnologia helium, massima capacità e affidabilità.",
        categoria: "Hard Disk",
        marca: "Seagate"
    },

    // ---- PERIFERICHE ----
//    "tastiera-meccanica-rgb": {
//        nome: "Tastiera Meccanica RGB",
//        prezzo: "€ 89.00",
//        immagine: "img/periferiche/tastiera-meccanica-rgb.svg",
//        descrizione: "Tastiera meccanica con switch tattili e illuminazione RGB personalizzabile.",
//        categoria: "Periferica",
//        marca: "Razer"
//    },
//    "tastiera-wireless": {
//        nome: "Tastiera Wireless",
//        prezzo: "€ 59.00",
//        immagine: "img/periferiche/tastiera-wireless.svg",
//        descrizione: "Tastiera senza fili a basso profilo, perfetta per studio e ufficio.",
//        categoria: "Periferica",
//        marca: "Logitech"
//    },
//    "mouse-gaming": {
//        nome: "Mouse Gaming",
//        prezzo: "€ 49.00",
//        immagine: "img/periferiche/mouse-gaming.svg",
//        descrizione: "Mouse da gaming con sensore ad alta precisione e 8 tasti programmabili.",
//        categoria: "Periferica",
//        marca: "Razer"
//    },
//    "mouse-wireless": {
//        nome: "Mouse Wireless",
//        prezzo: "€ 39.00",
//        immagine: "img/periferiche/mouse-wireless.svg",
//        descrizione: "Mouse wireless ergonomico con lunga durata della batteria.",
//        categoria: "Periferica",
//        marca: "Logitech"
//    },
//    "mousepad-xl": {
//        nome: "Mousepad XL",
//        prezzo: "€ 24.00",
//        immagine: "img/periferiche/mousepad-xl.svg",
//        descrizione: "Tappetino XL a superficie liscia, con base antiscivolo e bordi cuciti.",
//        categoria: "Periferica",
//        marca: "SteelSeries"
//    },
//    "headset-gaming": {
//        nome: "Headset Gaming",
//        prezzo: "€ 79.00",
//        immagine: "img/periferiche/headset-gaming.svg",
//        descrizione: "Cuffie da gaming con audio surround e microfono a cancellazione di rumore.",
//        categoria: "Periferica",
//        marca: "HyperX"
//    },
//    "webcam-1080p": {
//        nome: "Webcam 1080p",
//        prezzo: "€ 59.00",
//        immagine: "img/periferiche/webcam-1080p.svg",
//        descrizione: "Webcam Full HD 1080p a 30fps, ideale per streaming e videoconferenze.",
//        categoria: "Periferica",
//        marca: "Logitech"
//    },
//    "monitor-144hz": {
//        nome: "Monitor 144Hz",
//        prezzo: "€ 199.00",
//        immagine: "img/periferiche/monitor-144hz.svg",
//        descrizione: "Monitor Full HD da 144Hz con pannello IPS e tempo di risposta di 1ms.",
//        categoria: "Periferica",
//        marca: "AOC"
//    },
//    "monitor-4k": {
//        nome: "Monitor 4K",
//        prezzo: "€ 449.00",
//        immagine: "img/periferiche/monitor-4k.svg",
//        descrizione: "Monitor 4K UHD da 27\" con colori accurati, perfetto per creativi e gaming.",
//        categoria: "Periferica",
//        marca: "Samsung"
//    },
//    "controller": {
//        nome: "Controller Gaming",
//        prezzo: "€ 59.00",
//        immagine: "img/periferiche/controller.svg",
//        descrizione: "Controller wireless compatibile con PC, con vibrazione e jack per le cuffie.",
//        categoria: "Periferica",
//        marca: "Microsoft"
//    },
}

// 1. Leggo l'URL per capire che prodotto ha cliccato l'utente (es. ?id=amd-rx-7600)
const urlParams = new URLSearchParams(window.location.search);
const idProdotto = urlParams.get('id');
// 2. Controllo se l'id esiste nel mio catalogo
if (idProdotto && catalogo[idProdotto]) {
    // Prendo tutte le informazioni di quel prodotto
    const prodotto = catalogo[idProdotto];
    // 3. Inserisco i dati veri nell'HTML
    document.getElementById('nome-dettaglio').textContent = prodotto.nome;
    document.getElementById('prezzo-dettaglio').textContent = prodotto.prezzo;
    document.getElementById('desc-dettaglio').textContent = prodotto.descrizione;
    document.getElementById('cat-dettaglio').textContent = prodotto.categoria;
    document.getElementById('marca-dettaglio').textContent = prodotto.marca;
    
    // Per l'immagine non si usa textContent, ma si cambia l'attributo .src
    document.getElementById('img-dettaglio').src = prodotto.immagine;
} else {
    // Se apro la pagina senza cliccare dallo shop, mostro un errore
    document.getElementById('nome-dettaglio').textContent = "Prodotto non trovato";
    document.getElementById('img-dettaglio').src = "img/placeholder.jpg";
}
