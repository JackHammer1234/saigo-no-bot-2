// nemesisGenerator.js
// Generador completo de Némesis — rewards pool único, mutaciones y locks por clan/rango

// ---------------------------
// Helpers
// ---------------------------
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function weightedRandom(pool) {
  const total = pool.reduce((s, it) => s + it.weight, 0);
  let r = Math.random() * total;
  for (const it of pool) {
    if (r < it.weight) return it;
    r -= it.weight;
  }
  return pool[pool.length - 1];
}

// ---------------------------
// Base pools (editable)
// ---------------------------
const NOMBRES = ["Rell","Akuma","Takeshi","Daigo","Rinzo","Kaizen","Arata","Okami","Jinrai","Suzuki","Kaito","Mei"];
const APELLIDOS = ["Shiro","Hoshino","Yamazaki","Kurogane","Hidaruma","Renge","Kaisen","Uchiha","Senju","Hyuga"];

const CLANES = ["Uchiha","Senju","Hyuga","Aburame","Nara","Akimichi","Yuki","Kaguya","Hoshigaki","Inuzuka"];

const UBICACIONES = [
  "Aldea de la Hoja",
  "Aldea de la Nube",
  "Bosque de los Susurros",
  "Ruinas del País del Hierro",
  "Valle del Fin",
  "Aldea de la Lluvia",
  "Frontera del País del Viento",
  "Territorio Desconocido"
];

const MOTIVOS = [
  "Venganza personal",
  "Odio al clan",
  "Conflicto por territorio",
  "Traición pasada",
  "Deuda de sangre",
  "Juramento roto"
];

// ---------------------------
// Alias / Títulos lockeados por clan + rango
// ---------------------------
const ALIASES_BY_CLAN_RANK = {
  Uchiha: {
    S: ["El Susurro del Mangekyō","El Incinerador Carmesí"],
    A: ["El Portador de Llamas","Ojo Guardián"],
    B: ["El Vigía Escarlata"],
    C: ["El Ojo Despierto"],
    D: ["La Chispa"]
  },
  Aburame: {
    S: ["El Nido Viviente","El Pastor de Enjambres"],
    A: ["Colmenal Nocturno"],
    B: ["Zumbido Silente"],
    C: ["Portador del Enjambre"],
    D: ["Niño Insecto"]
  },
  // fallback
  DEFAULT: {
    S: ["El Devorador de Aldeas","El Renacido"],
    A: ["El Acechador Nocturno"],
    B: ["El Rastreador"],
    C: ["El Sombrío"],
    D: ["El Recluta Errante"]
  }
};

const TITULOS_BY_RANK = {
  S: ["Portador del Rencor","El que Nunca Muere"],
  A: ["Caminante del Silencio","Destructor del Karma"],
  B: ["Sombra Errante","Reputación de Acero"],
  C: ["Eco de Guerra","El Vigilante"],
  D: ["Aprendiz Oscuro","Huellas Menores"]
};

// ---------------------------
// Quotes lockeadas por motivo
// ---------------------------
const QUOTES_BY_MOTIVE = {
  "Venganza personal": [
    "“Lo que me quitaste no se recupera… pero tu vida sí.”",
    "“No vine a hablar, vine a ajustar cuentas.”"
  ],
  "Odio al clan": [
    "“Tu linaje se apaga conmigo.”",
    "“Los apellidos no salvan vidas.”"
  ],
  "Conflicto por territorio": [
    "“Estás en tierra equivocada.”",
    "“Todo lo que pisas, ahora arde.”"
  ],
  "Traición pasada": [
    "“Jamás olvidaré lo que hiciste.”",
    "“Prometiste. Fallaste. Pagarás.”"
  ],
  "Deuda de sangre": [
    "“Una vida por otra: la ecuación final.”",
    "“Sangre reclama sangre.”"
  ],
  "Juramento roto": [
    "“Las promesas tienen precio.”",
    "“Tus palabras no me detendrán.”"
  ]
};

// ---------------------------
// Mutaciones corporales (pool general) + mutaciones por clan
// ---------------------------
// rareza keys: comun, poco_comun, rara, epica, legendaria
const MUTACIONES = [
  { nombre: "Refuerzo Muscular", rareza:"comun", weight: 40, efecto:"Aumento de masa muscular inusual que mejora potencia física."},
  { nombre: "Piel Endurecida", rareza:"comun", weight: 35, efecto:"Piel con dureza anormal que reduce daño físico leve."},
  { nombre: "Iris Rachado", rareza:"poco_comun", weight: 20, efecto:"Pupilas reptilianas que mejoran visión y percepción de chakra."},
  { nombre: "Garras Quirúrgicas", rareza:"poco_comun", weight: 18, efecto:"Uñas que se transforman en cuchillas naturales."},
  { nombre: "Carne Regenerativa", rareza:"rara", weight: 10, efecto:"Regeneración rápida de heridas superficiales."},
  { nombre: "Columna Segmentada", rareza:"rara", weight: 8, efecto:"Capacidad de contorsión y movimientos imposibles."},
  { nombre: "Esqueleto Vivo", rareza:"epica", weight: 3, efecto:"Huesos que actúan como extremidades secundarias."},
  { nombre: "Corazón Doble", rareza:"epica", weight: 2, efecto:"Dos corazones que aumentan resistencia y recuperación."},
  { nombre: "Carcasa de Chakra", rareza:"legendaria", weight: 0.6, efecto:"Armadura de chakra permanente que absorbe golpes."},
  { nombre: "Genoma Forbidden", rareza:"legendaria", weight: 0.2, efecto:"Modificaciones genéticas únicas con efectos impredecibles."}
];

const MUTACIONES_POR_CLAN = {
  Uchiha: [
    { nombre:"Ocular Mutado", rareza:"epica", weight:1.5, efecto:"Un dojutsu degenerado con capacidades de lectura de movimiento."}
  ],
  Aburame: [
    { nombre:"Colmena Interna", rareza:"rara", weight:3, efecto:"Enjambre simbiótico dentro del cuerpo que actúa como arma/órgano."}
  ],
  Kaguya: [
    { nombre:"Hueso Serrado", rareza:"epica", weight:1.8, efecto:"Huesos que emergen con filo, causan daño cortante."}
  ]
};

// ---------------------------
// Reward pool (una sola tabla gigante, con rarezas y pesos base)
// ---------------------------
// rareza keys: comun, poco_comun, rara, epica, legendaria
const REWARD_POOL = [
  // comunes
  { nombre:"Fragmento Antiguo", rareza:"comun", weight:40 },
  { nombre:"Muestra de Chakra", rareza:"comun", weight:35 },
  { nombre:"Células Básicas", rareza:"comun", weight:30 },

  // poco comunes
  { nombre:"Amuleto de Hueso", rareza:"poco_comun", weight:20 },
  { nombre:"Daga Ancestral", rareza:"poco_comun", weight:18 },
  { nombre:"ADN Adaptativo", rareza:"poco_comun", weight:15 },

  // raras
  { nombre:"Pergamino Perdido", rareza:"rara", weight:10 },
  { nombre:"Genosoma Refinado", rareza:"rara", weight:8 },
  { nombre:"Sellado Tormentoso", rareza:"rara", weight:7 },

  // épicas
  { nombre:"Liberación Carmesí", rareza:"epica", weight:3 },
  { nombre:"Pacto de Sanguijuela", rareza:"epica", weight:2 },
  { nombre:"Susano'o Parasitario", rareza:"epica", weight:1.5 },

  // legendarias
  { nombre:"Kami Fūjin", rareza:"legendaria", weight:0.6 },
  { nombre:"Máscara del Demonio Blanco", rareza:"legendaria", weight:0.35 },
  { nombre:"Colmillo del Primer Shinobi", rareza:"legendaria", weight:0.25 }
];

// ---------------------------
// Drops por rango (cuántos picks hace de la tabla unica)
// ---------------------------
const DROPS_BY_RANK = { D:1, C:1, B:2, A:3, S:4 };

// ---------------------------
// Rareza modifiers por rango (modifican weight base por rareza)
// ---------------------------
// key names match REWARD_POOL rareza values
const RAREZA_MODIFIERS = {
  D: { comun:1.2, poco_comun:1.0, rara:0.8, epica:0.4, legendaria:0.2 },
  C: { comun:1.0, poco_comun:1.0, rara:1.0, epica:0.8, legendaria:0.4 },
  B: { comun:0.7, poco_comun:1.0, rara:1.2, epica:1.0, legendaria:0.6 },
  A: { comun:0.4, poco_comun:0.9, rara:1.3, epica:1.5, legendaria:0.8 },
  S: { comun:0.2, poco_comun:0.6, rara:1.5, epica:2.0, legendaria:1.5 }
};

// ---------------------------
// Mutación modifiers por rango
// ---------------------------
const MUTACION_MODIFIERS = {
  D: { comun:1.2, poco_comun:1.0, rara:0.6, epica:0.3, legendaria:0.1 },
  C: { comun:1.0, poco_comun:1.0, rara:0.8, epica:0.5, legendaria:0.2 },
  B: { comun:0.9, poco_comun:1.0, rara:1.0, epica:0.7, legendaria:0.3 },
  A: { comun:0.7, poco_comun:1.1, rara:1.3, epica:1.1, legendaria:0.6 },
  S: { comun:0.4, poco_comun:0.9, rara:1.5, epica:1.8, legendaria:1.3 }
};

// ---------------------------
// Generadores auxiliares
// ---------------------------
function pickAliasFor(clan, rank) {
  const byClan = ALIASES_BY_CLAN_RANK[clan];
  if (byClan && byClan[rank] && byClan[rank].length) return random(byClan[rank]);
  // fallback default for rank
  return random(ALIASES_BY_CLAN_RANK.DEFAULT[rank] || ALIASES_BY_CLAN_RANK.DEFAULT.S);
}

function pickTitleFor(rank) {
  return random(TITULOS_BY_RANK[rank] || TITULOS_BY_RANK.S);
}

// ---------------------------
// Generar mutación (pool general + pool clan)
// ---------------------------
function generateMutation(rango, clan) {
  const mod = MUTACION_MODIFIERS[rango] || MUTACION_MODIFIERS.C;

  // pool ajustado
  const pool = MUTACIONES.map(m => ({
    ...m,
    weight: m.weight * (mod[m.rareza] ?? 1)
  }));

  // añadir mutaciones de clan si hay
  if (MUTACIONES_POR_CLAN[clan]) {
    MUTACIONES_POR_CLAN[clan].forEach(m => {
      pool.push({
        ...m,
        weight: m.weight * (mod[m.rareza] ?? 1)
      });
    });
  }

  return weightedRandom(pool); // retorna objeto mutación completo
}

// ---------------------------
// Generar recompensas (multi-drop desde una sola tabla gigante)
// ---------------------------
function generateRewards(rango) {
  const drops = DROPS_BY_RANK[rango] || 1;
  const mod = RAREZA_MODIFIERS[rango] || RAREZA_MODIFIERS.C;

  const adjustedPool = REWARD_POOL.map(r => ({
    ...r,
    weight: r.weight * (mod[r.rareza] ?? 1)
  }));

  const picked = [];
  for (let i = 0; i < drops; i++) {
    const pick = weightedRandom(adjustedPool);
    picked.push({ nombre: pick.nombre, rareza: pick.rareza });
  }
  return picked;
}

// ---------------------------
// Generador completo de némesis
// ---------------------------
function generarNemesis() {
  const nombre = `${random(NOMBRES)} ${random(APELLIDOS)}`;
  const clan = random(CLANES);
  const rango = random(Object.keys(RAREZA_MODIFIERS)); // D,C,B,A,S
  const ubicacion = random(UBICACIONES);
  const roleplays = Math.floor(Math.random() * 4) + 1; // 1-4
  const motivo = random(MOTIVOS);

  const alias = pickAliasFor(clan, rango);
  const titulo = pickTitleFor(rango);
  const quote = random(QUOTES_BY_MOTIVE[motivo] || ["..."]);

  const mutacion = generateMutation(rango, clan);
  const recompensas = generateRewards(rango);

  return {
    nombre,
    clan,
    rango,
    ubicacion,
    roleplays,
    motivo,
    alias,
    titulo,
    quote,
    mutacion,
    recompensas
  };
}

module.exports = { generarNemesis };
