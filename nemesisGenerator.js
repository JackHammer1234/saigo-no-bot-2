// nemesisGenerator.js
// Generador de Némesis — mutaciones por clan/rango y rewards

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
// Base pools
// ---------------------------
const NOMBRES = ["Saigo"];
const APELLIDOS = ["no Senshi"];

const CLANES = ["Haruno"];

const UBICACIONES = [
  "Aldea de la Hoja",
  "Aldea de la Nube",
  "Bosque de la muerte",
  "Ruinas de la aldea del remolino",
  "Valle del Fin",
  "Aldea de la Lluvia",
  "Frontera del País del Viento",
  "Territorio Desconocido",
  "Dunas GoroGoro",
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
// Alias / Títulos
// ---------------------------
const ALIASES_BY_CLAN_RANK = {
  Uchiha: { S:["El Susurro del Mangekyō","El Incinerador Carmesí"], A:["El Portador de Llamas","Ojo Guardián"], B:["El Vigía Escarlata"], C:["El Ojo Despierto"], D:["La Chispa"] },
  Aburame: { S:["El Nido Viviente","El Pastor de Enjambres"], A:["Colmenal Nocturno"], B:["Zumbido Silente"], C:["Portador del Enjambre"], D:["Niño Insecto"] },
  Haruno: { S:["MISTEEER OOOMAZING"], A:["MR OOOMAZING"], B:["MR OMAZING"], C:["señor omazing"], D:["omazing"] },
  DEFAULT: { S:["El Devorador de Aldeas","El Renacido"], A:["El Acechador Nocturno"], B:["El Rastreador"], C:["El Sombrío"], D:["El Recluta Errante"] }
};

// ---------------------------
// Quotes
// ---------------------------
const QUOTES_BY_MOTIVE = {
  "Venganza personal":["Lo que me quitaste no se recupera… pero tu vida sí.","No vine a hablar, vine a ajustar cuentas."],
  "Odio al clan":["Tu linaje se apaga conmigo.","Los apellidos no salvan vidas."],
  "Conflicto por territorio":["Estás en tierra equivocada.","Todo lo que pisas, ahora arde."],
  "Traición pasada":["Jamás olvidaré lo que hiciste.","Prometiste. Fallaste. Pagarás."],
  "Deuda de sangre":["Una vida por otra: la ecuación final.","Sangre reclama sangre."],
  "Juramento roto":["Las promesas tienen precio.","Tus palabras no me detendrán."]
};

// ---------------------------
// Mutaciones por clan y rango
// ---------------------------
const MUTACIONES_POR_CLAN_Y_RANGO = {
  ANY: {
    S:[{ nombre:"Refuerzo Supremo", rareza:"epica", weight:5, efecto:"Mejora extrema de fuerza y velocidad", titulo:"del Poder Supremo" }],
    A:[{ nombre:"Agilidad Sobrehumana", rareza:"poco_comun", weight:10, efecto:"Aumenta la velocidad de reacción", titulo:"de la Agilidad" }],
    B:[],
    C:[],
    D:[]
  },
  Haruno: {
    S:[{ nombre:"FACTOR OOOOMAZIIIING", rareza:"comun", weight:10, efecto:"Factor que todos los Haruno poseen", titulo:"del Factor OOOOMAZIIIING" }],
    A:[{ nombre:"Puño Divino", rareza:"poco_comun", weight:5, efecto:"EL HOMBRE MÁS FUERTE DEL MUNDO", titulo:"del Puño Divino" }],
    B:[],
    C:[],
    D:[]
  }
};

// ---------------------------
// Recompensas
// ---------------------------
const REWARD_POOL = [
  { nombre:"Fragmento Antiguo", rareza:"comun", weight:40 },
  { nombre:"Muestra de Chakra", rareza:"comun", weight:35 },
  { nombre:"Células Básicas", rareza:"comun", weight:30 },
  { nombre:"Amuleto de Hueso", rareza:"poco_comun", weight:20 },
  { nombre:"Daga Ancestral", rareza:"poco_comun", weight:18 },
  { nombre:"ADN Adaptativo", rareza:"poco_comun", weight:15 }
];
const DROPS_BY_RANK = { D:1, C:1, B:2, A:3, S:4 };
const RAREZA_MODIFIERS = {
  D:{comun:1.2,poco_comun:1.0,rara:0.8,epica:0.4,legendaria:0.2},
  C:{comun:1.0,poco_comun:1.0,rara:1.0,epica:0.8,legendaria:0.4},
  B:{comun:0.7,poco_comun:1.0,rara:1.2,epica:1.0,legendaria:0.6},
  A:{comun:0.4,poco_comun:0.9,rara:1.3,epica:1.5,legendaria:0.8},
  S:{comun:0.2,poco_comun:0.6,rara:1.5,epica:2.0,legendaria:1.5}
};
const MUTACION_MODIFIERS = RAREZA_MODIFIERS;

// ---------------------------
// Pickers
// ---------------------------
function pickAliasFor(clan, rank) {
  const byClan = ALIASES_BY_CLAN_RANK[clan];
  if (byClan && byClan[rank] && byClan[rank].length) return random(byClan[rank]);
  return random(ALIASES_BY_CLAN_RANK.DEFAULT[rank]);
}

function generateMutation(rango, clan) {
  const mod = MUTACION_MODIFIERS[rango] || MUTACION_MODIFIERS.C;
  let pool = [];

  // ANY
  if (MUTACIONES_POR_CLAN_Y_RANGO.ANY[rango]) {
    MUTACIONES_POR_CLAN_Y_RANGO.ANY[rango].forEach(m => pool.push({ ...m, weight: m.weight * (mod[m.rareza] ?? 1) }));
  }

  // Clan específico
  if (MUTACIONES_POR_CLAN_Y_RANGO[clan] && MUTACIONES_POR_CLAN_Y_RANGO[clan][rango]) {
    MUTACIONES_POR_CLAN_Y_RANGO[clan][rango].forEach(m => pool.push({ ...m, weight: m.weight * (mod[m.rareza] ?? 1) }));
  }

  return pool.length ? weightedRandom(pool) : { nombre:"Ninguna", titulo:null, efecto:"Sin efecto" };
}

// ---------------------------
// Recompensas
// ---------------------------
function generateRewards(rango, clan) {
  const drops = DROPS_BY_RANK[rango] || 1;
  const mod = RAREZA_MODIFIERS[rango] || RAREZA_MODIFIERS.C;
  let pool = REWARD_POOL.map(r => ({ ...r, weight: r.weight * (mod[r.rareza] ?? 1) }));
  const out = [];
  for (let i=0; i<drops; i++) out.push(random(pool));
  return out;
}

// ---------------------------
// Generador principal
// ---------------------------
function generarNemesis() {
  const nombre = `${random(NOMBRES)} ${random(APELLIDOS)}`;
  const clan = random(CLANES);
  const rango = random(Object.keys(RAREZA_MODIFIERS));
  const ubicacion = random(UBICACIONES);
  const roleplays = Math.floor(Math.random()*4)+1;
  const motivo = random(MOTIVOS);
  const mutacion = generateMutation(rango, clan);
  const aliasBase = pickAliasFor(clan, rango);
  const aliasFinal = mutacion.titulo ? `${aliasBase} ${mutacion.titulo}` : aliasBase;
  const quote = random(QUOTES_BY_MOTIVE[motivo] || ["..."]);
  const recompensas = generateRewards(rango, clan);

  return { nombre, clan, rango, ubicacion, roleplays, motivo, alias: aliasFinal, quote, mutacion, recompensas };
}

module.exports = { generarNemesis };
