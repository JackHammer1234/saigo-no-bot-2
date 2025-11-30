// nemesisGenerator.js

//---------------------------------------------------------
// HELPERS
//---------------------------------------------------------
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomWeighted(list) {
  const total = list.reduce((acc, item) => acc + item.peso, 0);
  let roll = Math.random() * total;

  for (const item of list) {
    if (roll < item.peso) return item;
    roll -= item.peso;
  }
}

//---------------------------------------------------------
// TABLA GIGANTE DE RECOMPENSAS (modular + con rareza)
//---------------------------------------------------------
// rareza: común, poco comun, raro, epico, legendario
// peso: mientras más alto, más probable

const tablaRecompensas = [
  // Comunes
  { nombre: "Pergamino de Taijutsu básico", descripcion: "Mejora ligera de técnica física.", rareza: "comun", peso: 30 },
  { nombre: "Vendas reforzadas", descripcion: "Soporte simple para entrenamientos duros.", rareza: "comun", peso: 30 },
  { nombre: "Comida militar mejorada", descripcion: "Recuperación decente de energía.", rareza: "comun", peso: 25 },

  // Poco comunes
  { nombre: "Pergamino de arma oculta", descripcion: "Acceso a una técnica rara de proyectiles.", rareza: "poco comun", peso: 18 },
  { nombre: "Contrapesos de chakra", descripcion: "Aumenta precisión y control.", rareza: "poco comun", peso: 15 },

  // Raros
  { nombre: "Contrato de invocación menor", descripcion: "Permite invocar criatura aliada básica.", rareza: "raro", peso: 10 },
  { nombre: "Insectos simbióticos únicos", descripcion: "Extensión sensorial y ofensiva.", rareza: "raro", peso: 8 },
  { nombre: "Mutación elemental menor", descripcion: "Acceso a una variante elemental rara.", rareza: "raro", peso: 7 },

  // Épicos
  { nombre: "Kinjutsu prohibido sellado", descripcion: "Una técnica prohibida de alto riesgo.", rareza: "epico", peso: 4 },
  { nombre: "Marca maldita experimental", descripcion: "Gran aumento de poder con efectos colaterales.", rareza: "epico", peso: 3 },

  // Legendarios
  { nombre: "Sharingan 3T", descripcion: "Capacidad de predicción avanzada.", rareza: "legendario", peso: 1 },
  { nombre: "Byakugan puro", descripcion: "Visión total casi perfecta.", rareza: "legendario", peso: 1 },
  { nombre: "Shikotsumyaku", descripcion: "Manipulación de huesos estilo Kaguya.", rareza: "legendario", peso: 1 },
];

//---------------------------------------------------------
// ESCALADO SEGÚN RANGO
//---------------------------------------------------------
// Cuántas recompensas se entregan según rango
const cantidadPorRango = {
  D: 1,
  C: 2,
  B: 3,
  A: 4,
  S: 5,
};

// Modificador de pesos según rareza por rango
// Rango alto = menos probabilidades de que toque lo común
const modificadorPorRango = {
  D: { comun: 1.0, "poco comun": 0.9, raro: 0.8, epico: 0.6, legendario: 0.4 },
  C: { comun: 0.9, "poco comun": 0.85, raro: 0.8, epico: 0.65, legendario: 0.45 },
  B: { comun: 0.8, "poco comun": 0.75, raro: 0.8, epico: 0.75, legendario: 0.55 },
  A: { comun: 0.6, "poco comun": 0.65, raro: 0.9, epico: 1.0, legendario: 0.85 },
  S: { comun: 0.4, "poco comun": 0.6, raro: 1.0, epico: 1.2, legendario: 1.3 },
};

//---------------------------------------------------------
// OTROS MÓDULOS QUE PIDES QUE SALGAN DESDE AQUÍ
//---------------------------------------------------------

const nombres = ["Raiko", "Guren", "Ashiro", "Naito", "Kiro", "Daizen", "Rinji"];
const apellidos = ["Kazama", "Rell", "Hidaruma", "Shirogane", "Kurogiri", "Saizo", "Arakami"];
const clanes = ["Uchiha", "Hyuga", "Aburame", "Akimichi", "Nara", "Kaguya", "Yuki", "Hoshigaki"];
const ubicaciones = [
  "Aldea de la Hoja",
  "Bosque de los Susurros",
  "Ruinas del País del Fuego",
  "Valle del Fin",
  "Aldea de la Lluvia",
  "Territorio sin nombre",
];
const personalidades = [
  "rencoroso",
  "obsesivo",
  "calculador",
  "creepy amable",
  "silencioso pero perturbador",
  "arrogante",
];
const motivos = [
  "te odia sin razón",
  "piensa que arruinaste su futuro",
  "tu clan le quitó algo importante",
  "cree que debes morir para que él prospere",
  "te ve como una amenaza inevitable",
];

function randomNombre() {
  return `${random(nombres)} ${random(apellidos)}`;
}

function randomClan() {
  return random(clanes);
}

function randomUbicacion() {
  return random(ubicaciones);
}

function randomPersonalidad() {
  return random(personalidades);
}

function randomMotivo() {
  return random(motivos);
}

function randomRango() {
  return random(["D", "C", "B", "A", "S"]);
}

function randomTiempo() {
  return Math.floor(Math.random() * 5); // 0–4 roles faltantes
}

//---------------------------------------------------------
// GENERADOR DE RECOMPENSAS
//---------------------------------------------------------
function generarRecompensas(rango) {
  const cantidad = cantidadPorRango[rango];
  const mod = modificadorPorRango[rango];

  // Aplica el modificador de pesos a una copia
  const tablaModificada = tablaRecompensas.map((r) => ({
    ...r,
    peso: r.peso * mod[r.rareza],
  }));

  const recompensas = [];

  for (let i = 0; i < cantidad; i++) {
    const r = randomWeighted(tablaModificada);
    recompensas.push({
      nombre: r.nombre,
      descripcion: r.descripcion,
      rareza: r.rareza,
    });
  }

  return recompensas;
}

//---------------------------------------------------------
// GENERADOR DE NÉMESIS COMPLETA
//---------------------------------------------------------
function generarNemesisCompleto() {
  const rango = randomRango();

  return {
    nombre: randomNombre(),
    clan: randomClan(),
    ubicacion: randomUbicacion(),
    personalidad: randomPersonalidad(),
    motivo: randomMotivo(),
    rango,
    tiempoRestante: randomTiempo(),
    recompensas: generarRecompensas(rango),
  };
}

module.exports = {
  generarNemesisCompleto,
};
