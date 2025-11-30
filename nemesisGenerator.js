// nemesisGenerator.js

//---------------------------------------------------------
// Helpers
//---------------------------------------------------------
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomWeighted(options) {
  const total = options.reduce((a, b) => a + b.weight, 0);
  let roll = Math.random() * total;

  for (const opt of options) {
    if (roll < opt.weight) return opt.value;
    roll -= opt.weight;
  }
}

//---------------------------------------------------------
// TABLA GIGANTE DE RECOMPENSAS
//---------------------------------------------------------

const tablaRecompensas = [
  // Doujutsus
  "Byakugan",
  "Sharingan 1T",
  "Sharingan 2T",
  "Sharingan 3T",
  "Rinnegan Falso",
  "Ketsuryugan",
  "Shikotsumyaku (huesos)",
  "Jogan (bootleg raro)",
  
  // Ninjutsu / Kinjutsu
  "Kinjutsu de sellado prohibido",
  "Modo Sabio incompleto",
  "Técnica prohibida regenerativa",
  "Arte de marionetas avanzado",
  "Contrato de invocación mayor",
  "Contrato de invocación menor",

  // Pergaminos
  "Pergamino: Fūinjutsu pesado",
  "Pergamino: Taijutsu especialista",
  "Pergamino: Kenjutsu avanzado",
  "Pergamino: Jutsu de clon único raro",
  "Pergamino: Técnica de expansión corporal",

  // Mutaciones / rarezas
  "Mutación elemental (lava)",
  "Mutación elemental (hielo)",
  "Mutación elemental (tormenta)",
  "Aumento sensorial extremo",
  "Cuerpo resistente a venenos",
  
  // Cosas malditas
  "Marca maldita experimental",
  "Contrato con espíritu vengativo",
  "Técnica que consume vida",
  "Insectos simbióticos únicos",
  "Bestia sellada nivel bajo",

  // Extra basura OP
  "Artefacto ninja antiguo",
  "Arma chakra viva",
  "Jutsu perdido del clan",
  "Memoria implantada de jutsu",
];

//---------------------------------------------------------
// CLANES
//---------------------------------------------------------
const clanes = [
  "Uchiha",
  "Hyuga",
  "Aburame",
  "Akimichi",
  "Nara",
  "Yamanaka",
  "Kurama (genjutsu loco)",
  "Kaguya bootleg",
  "Clan sin nombre pero peligroso",
];

//---------------------------------------------------------
// PERSONALIDADES
//---------------------------------------------------------
const personalidades = [
  "rencoroso",
  "obsesivo",
  "calculador",
  "silencioso pero turbio",
  "presumido",
  "creepy amable",
  "de mente rota pero funcional",
];

//---------------------------------------------------------
// MOTIVOS
//---------------------------------------------------------
const motivos = [
  "odia tu cara nomás",
  "tu clan le hizo algo hace generaciones",
  "cree que eres una amenaza",
  "su maestro le ordenó destruirte",
  "piensa que le robaste 'su destino'",
  "observó tu progreso y sintió celos letales",
  "cree que tú arruinaste su vida (aunque no)",
];

//---------------------------------------------------------
// GENERADOR PRINCIPAL
//---------------------------------------------------------
function generarNemesis() {
  // Nombre cutre por ahora
  const nombres = ["Raiko", "Guren", "Ashiro", "Naito", "Kiro", "Daizen", "Rinji"];
  const nombre = random(nombres);

  // Recompensa única
  const recompensa = random(tablaRecompensas);

  // Nemesis final
  return {
    nombre,
    clan: random(clanes),
    recompensa,        // Esto es lo que “heredará”
    personalidad: random(personalidades),
    motivo: random(motivos),
  };
}

module.exports = { generarNemesis, tablaRecompensas };
