const { TABELLE_DETTAGLIO } = require('../repositories/prodottiRepository');

const prodotti = [
    // ---------------------------- GPU (7) ----------------------------
  { slug: 'amd-rx-7600', nome: 'AMD RX 7600', marca: 'AMD', categoria: 'GPU',
    prezzo: 299.00, immagine: 'img/GPU/amd-rx-7600.webp', stock: 8,
    descrizione: 'Scheda video perfetta per il gaming in 1080p con prestazioni eccellenti.',
    dettaglio: { vram: 8, chipset: 'Navi 33' } },

  { slug: 'amd-rx-7800-xt', nome: 'AMD RX 7800 XT', marca: 'AMD', categoria: 'GPU',
    prezzo: 519.00, immagine: 'img/GPU/amd-rx-7800-xt.webp', stock: 5,
    descrizione: 'Scheda di fascia alta pensata per il gaming in 1440p con ray tracing.',
    dettaglio: { vram: 16, chipset: 'Navi 32' } },

  { slug: 'nvidia-rtx-3050', nome: 'NVIDIA RTX 3050', marca: 'NVIDIA', categoria: 'GPU',
    prezzo: 209.00, immagine: 'img/GPU/nvidia-rtx-3050.webp', stock: 12,
    descrizione: 'Scheda entry level ideale per iniziare a giocare in 1080p senza spendere troppo.',
    dettaglio: { vram: 8, chipset: 'GA106' } },

  { slug: 'nvidia-rtx-4060', nome: 'NVIDIA RTX 4060', marca: 'NVIDIA', categoria: 'GPU',
    prezzo: 329.00, immagine: 'img/GPU/nvidia-rtx-4060.webp', stock: 10,
    descrizione: 'Ottima scheda con supporto al DLSS 3 per un framerate altissimo.',
    dettaglio: { vram: 8, chipset: 'AD107' } },

  { slug: 'nvidia-rtx-4070-super', nome: 'NVIDIA RTX 4070 SUPER', marca: 'NVIDIA', categoria: 'GPU',
    prezzo: 649.00, immagine: 'img/GPU/nvidia-rtx-4070-super.webp', stock: 4,
    descrizione: 'Il compromesso perfetto tra prezzo e prestazioni per il gaming in 1440p.',
    dettaglio: { vram: 12, chipset: 'AD104' } },

  { slug: 'nvidia-rtx-4080-super', nome: 'NVIDIA RTX 4080 SUPER', marca: 'NVIDIA', categoria: 'GPU',
    prezzo: 1109.00, immagine: 'img/GPU/nvidia-rtx-4080-super.webp', stock: 2,
    descrizione: 'Scheda di fascia enthusiast per il 4K ad alti refresh rate.',
    dettaglio: { vram: 16, chipset: 'AD103' } },

  { slug: 'nvidia-rtx-4090', nome: 'NVIDIA RTX 4090', marca: 'NVIDIA', categoria: 'GPU',
    prezzo: 1899.00, immagine: 'img/GPU/nvidia-rtx-4090.webp', stock: 1,
    descrizione: 'La GPU piu\' potente del mercato, senza compromessi su 4K, rendering e IA.',
    dettaglio: { vram: 24, chipset: 'AD102' } },

  // ---------------------------- CPU (7) ----------------------------
  { slug: 'amd-ryzen-5-7600x', nome: 'AMD RYZEN 5 7600X', marca: 'AMD', categoria: 'CPU',
    prezzo: 219.00, immagine: 'img/CPU/amd-ryzen-5-7600x.webp', stock: 15,
    descrizione: '6 core e 12 thread su socket AM5, ottimo per gaming e uso quotidiano.',
    dettaglio: { core: 6, thread: 12, socket: 'AM5' } },

  { slug: 'amd-ryzen-7-7800x3d', nome: 'AMD RYZEN 7 7800X3D', marca: 'AMD', categoria: 'CPU',
    prezzo: 389.00, immagine: 'img/CPU/amd-ryzen-7-7800x3d.webp', stock: 7,
    descrizione: 'Con la cache 3D V-Cache e\' il processore da gaming piu\' efficiente sul mercato.',
    dettaglio: { core: 8, thread: 16, socket: 'AM5' } },

  { slug: 'amd-ryzen-9-7950x', nome: 'AMD RYZEN 9 7950X', marca: 'AMD', categoria: 'CPU',
    prezzo: 559.00, immagine: 'img/CPU/amd-ryzen-9-7950x.webp', stock: 3,
    descrizione: '16 core e 32 thread per produttivita\' spinta, rendering e compilazione.',
    dettaglio: { core: 16, thread: 32, socket: 'AM5' } },

  { slug: 'intel-i3-13100', nome: 'INTEL I3 13100', marca: 'Intel', categoria: 'CPU',
    prezzo: 129.00, immagine: 'img/CPU/intel-i3-13100.webp', stock: 20,
    descrizione: 'CPU entry level a 4 core, perfetta per un PC da ufficio o da studio.',
    dettaglio: { core: 4, thread: 8, socket: 'LGA1700' } },

  { slug: 'intel-i5-14600k', nome: 'INTEL I5 14600K', marca: 'Intel', categoria: 'CPU',
    prezzo: 299.00, immagine: 'img/CPU/intel-i5-14600k.webp', stock: 9,
    descrizione: '14 core sbloccati per l\'overclock, il punto di equilibrio per un PC da gaming.',
    dettaglio: { core: 14, thread: 20, socket: 'LGA1700' } },

  { slug: 'intel-i7-14700k', nome: 'INTEL I7 14700K', marca: 'Intel', categoria: 'CPU',
    prezzo: 429.00, immagine: 'img/CPU/intel-i7-14700k.webp', stock: 6,
    descrizione: '20 core per gaming ad alto refresh rate e streaming in contemporanea.',
    dettaglio: { core: 20, thread: 28, socket: 'LGA1700' } },

  { slug: 'intel-i9-14900k', nome: 'INTEL I9 14900K', marca: 'Intel', categoria: 'CPU',
    prezzo: 589.00, immagine: 'img/CPU/intel-i9-14900k.webp', stock: 4,
    descrizione: '24 core con frequenze fino a 6 GHz, il massimo per gaming e produttivita\'.',
    dettaglio: { core: 24, thread: 32, socket: 'LGA1700' } },

  // ----------------------- SCHEDE MADRI (6) ------------------------
  { slug: 'entry-h610', nome: 'ENTRY H610', marca: 'Intel', categoria: 'Scheda Madre',
    prezzo: 89.00, immagine: 'img/MOBO/entry-h610.webp', stock: 18,
    descrizione: 'Scheda madre essenziale su chipset H610, ideale per build economiche Intel.',
    dettaglio: { chipset: 'H610', formato: 'micro-ATX', socket: 'LGA1700' } },

  { slug: 'microatx-b760', nome: 'MICROATX B760', marca: 'Intel', categoria: 'Scheda Madre',
    prezzo: 139.00, immagine: 'img/MOBO/microatx-b760.webp', stock: 11,
    descrizione: 'Formato micro-ATX su chipset B760, compatto ma con tutto il necessario.',
    dettaglio: { chipset: 'B760', formato: 'micro-ATX', socket: 'LGA1700' } },

  { slug: 'minitx-b760', nome: 'MINITX B760', marca: 'Intel', categoria: 'Scheda Madre',
    prezzo: 179.00, immagine: 'img/MOBO/minitx-b760.webp', stock: 5,
    descrizione: 'Formato mini-ITX su B760, per build piccole ma potenti.',
    dettaglio: { chipset: 'B760', formato: 'mini-ITX', socket: 'LGA1700' } },

  { slug: 'microatx-b650', nome: 'MICROATX B650', marca: 'AMD', categoria: 'Scheda Madre',
    prezzo: 159.00, immagine: 'img/MOBO/microatx-b650.webp', stock: 9,
    descrizione: 'Micro-ATX su chipset B650 per processori AMD Ryzen serie 7000.',
    dettaglio: { chipset: 'B650', formato: 'micro-ATX', socket: 'AM5' } },

  { slug: 'atx-z790', nome: 'ATX Z790', marca: 'Intel', categoria: 'Scheda Madre',
    prezzo: 279.00, immagine: 'img/MOBO/atx-z790.webp', stock: 6,
    descrizione: 'Scheda top di gamma su Z790, con supporto all\'overclock e PCIe 5.0.',
    dettaglio: { chipset: 'Z790', formato: 'ATX', socket: 'LGA1700' } },

  { slug: 'atx-x670e', nome: 'ATX X670E', marca: 'AMD', categoria: 'Scheda Madre',
    prezzo: 329.00, immagine: 'img/MOBO/atx-x670e.webp', stock: 4,
    descrizione: 'Il chipset AM5 piu\' completo: PCIe 5.0 su GPU e SSD, connettivita\' estrema.',
    dettaglio: { chipset: 'X670E', formato: 'ATX', socket: 'AM5' } },

  // ----------------------- ALIMENTATORI (6) ------------------------
  { slug: '550w-bronze', nome: '550W BRONZE', marca: 'Corsair', categoria: 'Alimentatore',
    prezzo: 59.00, immagine: 'img/PSU/550w-bronze.webp', stock: 14,
    descrizione: 'Alimentatore da 550W certificato 80+ Bronze, giusto per build di fascia media.',
    dettaglio: { watt: 550, certificazione: '80+ Bronze', modulare: 0 } },

  { slug: '650w-bronze', nome: '650W BRONZE', marca: 'Corsair', categoria: 'Alimentatore',
    prezzo: 69.00, immagine: 'img/PSU/650w-bronze.webp', stock: 12,
    descrizione: '650W certificati 80+ Bronze, la scelta sicura per una build da gaming.',
    dettaglio: { watt: 650, certificazione: '80+ Bronze', modulare: 0 } },

  { slug: '750w-gold', nome: '750W GOLD', marca: 'Seasonic', categoria: 'Alimentatore',
    prezzo: 109.00, immagine: 'img/PSU/750w-gold.webp', stock: 8,
    descrizione: '750W con certificazione 80+ Gold e ventola silenziosa in modalita\' zero-RPM.',
    dettaglio: { watt: 750, certificazione: '80+ Gold', modulare: 1 } },

  { slug: '850w-gold', nome: '850W GOLD', marca: 'Seasonic', categoria: 'Alimentatore',
    prezzo: 139.00, immagine: 'img/PSU/850w-gold.webp', stock: 6,
    descrizione: '850W 80+ Gold, ideale per schede video di fascia alta e overclock.',
    dettaglio: { watt: 850, certificazione: '80+ Gold', modulare: 1 } },

  { slug: '1000w-platinum', nome: '1000W PLATINUM', marca: 'Corsair', categoria: 'Alimentatore',
    prezzo: 219.00, immagine: 'img/PSU/1000w-platinum.webp', stock: 3,
    descrizione: '1000W certificati 80+ Platinum, per configurazioni multi-GPU e workstation.',
    dettaglio: { watt: 1000, certificazione: '80+ Platinum', modulare: 1 } },

  { slug: '1200w-platinum', nome: '1200W PLATINUM', marca: 'Seasonic', categoria: 'Alimentatore',
    prezzo: 289.00, immagine: 'img/PSU/1200w-platinum.webp', stock: 2,
    descrizione: '1200W 80+ Platinum per le build piu\' esigenti, con cablaggio completamente modulare.',
    dettaglio: { watt: 1200, certificazione: '80+ Platinum', modulare: 1 } },

  // ---------------------------- SSD (6) ----------------------------
  { slug: 'sata-500gb', nome: 'SATA 500GB', marca: 'Crucial', categoria: 'SSD',
    prezzo: 39.00, immagine: 'img/SSD/sata-500gb.webp', stock: 22,
    descrizione: 'SSD SATA da 500GB, l\'upgrade piu\' economico per un vecchio PC.',
    dettaglio: { capacita: 500, interfaccia: 'SATA', velocita: 550 } },

  { slug: 'sata-1tb', nome: 'SATA 1TB', marca: 'Crucial', categoria: 'SSD',
    prezzo: 69.00, immagine: 'img/SSD/sata-1tb.webp', stock: 16,
    descrizione: 'SSD SATA da 1TB, affidabile e compatibile con qualsiasi scheda madre.',
    dettaglio: { capacita: 1000, interfaccia: 'SATA', velocita: 550 } },

  { slug: 'nvme-gen3-1tb', nome: 'NVME GEN3 1TB', marca: 'Crucial', categoria: 'SSD',
    prezzo: 59.00, immagine: 'img/SSD/nvme-gen3-1tb.webp', stock: 14,
    descrizione: 'SSD NVMe PCIe 3.0 da 1TB con letture fino a 3500 MB/s.',
    dettaglio: { capacita: 1000, interfaccia: 'NVMe PCIe 3.0', velocita: 3500 } },

  { slug: 'nvme-gen4-1tb', nome: 'NVME GEN4 1TB', marca: 'Samsung', categoria: 'SSD',
    prezzo: 79.00, immagine: 'img/SSD/nvme-gen4-1tb.webp', stock: 13,
    descrizione: 'SSD NVMe PCIe 4.0 da 1TB, fino a 7000 MB/s per avvii e caricamenti istantanei.',
    dettaglio: { capacita: 1000, interfaccia: 'NVMe PCIe 4.0', velocita: 7000 } },

  { slug: 'nvme-gen4-2tb', nome: 'NVME GEN4 2TB', marca: 'Samsung', categoria: 'SSD',
    prezzo: 139.00, immagine: 'img/SSD/nvme-gen4-2tb.webp', stock: 7,
    descrizione: '2TB NVMe PCIe 4.0, tanto spazio e prestazioni elevate per giochi e progetti.',
    dettaglio: { capacita: 2000, interfaccia: 'NVMe PCIe 4.0', velocita: 7000 } },

  { slug: 'nvme-gen5-2tb', nome: 'NVME GEN5 2TB', marca: 'Samsung', categoria: 'SSD',
    prezzo: 249.00, immagine: 'img/SSD/nvme-gen5-2tb.webp', stock: 3,
    descrizione: 'SSD NVMe PCIe 5.0 da 2TB con velocita\' fino a 12000 MB/s.',
    dettaglio: { capacita: 2000, interfaccia: 'NVMe PCIe 5.0', velocita: 12000 } },

  // ------------------------- HARD DISK (5) -------------------------
  { slug: '1tb-7200rpm', nome: '1TB 7200RPM', marca: 'Seagate', categoria: 'Hard Disk',
    prezzo: 49.00, immagine: 'img/HDD/1tb-7200rpm.webp', stock: 17,
    descrizione: 'Hard disk meccanico da 1TB a 7200RPM, economico per l\'archiviazione.',
    dettaglio: { capacita: 1000, rpm: 7200, cache: 64 } },

  { slug: '2tb-7200rpm', nome: '2TB 7200RPM', marca: 'Seagate', categoria: 'Hard Disk',
    prezzo: 69.00, immagine: 'img/HDD/2tb-7200rpm.webp', stock: 11,
    descrizione: '2TB a 7200RPM con cache da 256MB, ideale per giochi e backup.',
    dettaglio: { capacita: 2000, rpm: 7200, cache: 256 } },

  { slug: '4tb-5400rpm', nome: '4TB 5400RPM', marca: 'Western Digital', categoria: 'Hard Disk',
    prezzo: 99.00, immagine: 'img/HDD/4tb-5400rpm.webp', stock: 8,
    descrizione: '4TB a 5400RPM, silenzioso e capiente per foto, video e archivi.',
    dettaglio: { capacita: 4000, rpm: 5400, cache: 256 } },

  { slug: '8tb-nas', nome: '8TB NAS', marca: 'Western Digital', categoria: 'Hard Disk',
    prezzo: 189.00, immagine: 'img/HDD/8tb-nas.webp', stock: 5,
    descrizione: 'Hard disk da 8TB ottimizzato per NAS, progettato per il funzionamento 24/7.',
    dettaglio: { capacita: 8000, rpm: 7200, cache: 256 } },

  { slug: '12tb-nas', nome: '12TB NAS', marca: 'Seagate', categoria: 'Hard Disk',
    prezzo: 279.00, immagine: 'img/HDD/12tb-nas.webp', stock: 2,
    descrizione: '12TB per NAS con tecnologia helium, massima capacita\' e affidabilita\'.',
    dettaglio: { capacita: 12000, rpm: 7200, cache: 256 } },
];

async function inserisci(db, p) {
  // 1. riga base
  const r = await db.run(
    `INSERT OR IGNORE INTO prodotti
       (slug, nome, marca, categoria, prezzo, immagine, descrizione, stock)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [p.slug, p.nome, p.marca, p.categoria, p.prezzo,
     p.immagine, p.descrizione, p.stock ?? 0]
  );

  // changes === 0 significa "esisteva gia'" (lo slug e' UNIQUE)
  if (r.changes === 0) return;
  if (!p.dettaglio) return;

  // 2. riga di dettaglio nella tabella della sua categoria
  const tabella = TABELLE_DETTAGLIO[p.categoria];
  if (!tabella) {
    throw new Error(`Categoria senza tabella di dettaglio: ${p.categoria}`);
  }

  const colonne    = Object.keys(p.dettaglio);
  const segnaposto = colonne.map(() => '?').join(', ');

  await db.run(
    `INSERT INTO ${tabella} (id_prodotto, ${colonne.join(', ')})
     VALUES (?, ${segnaposto})`,
    [r.lastID, ...Object.values(p.dettaglio)]
  );
}

async function popola(db) {
  await db.exec('BEGIN');                  // tutto o niente
  try {
    for (const p of prodotti) await inserisci(db, p);
    await db.exec('COMMIT');
    console.log(`Seed completato: ${prodotti.length} prodotti.`);
  } catch (err) {
    await db.exec('ROLLBACK');
    throw err;
  }
}

module.exports = { popola };
