const productos = {
  // Consumibles
  PP: { nombre: "Papel", precio: 1, categoria: "Consumibles" },
  CM: { nombre: "Comida", precio: 10, categoria: "Consumibles" },
  PS: {
    nombre: "Poción pequeña de stamina",
    precio: 100,
    categoria: "Consumibles",
  },
  PV: {
    nombre: "Poción pequeña de vida",
    precio: 700,
    categoria: "Consumibles",
  },
  PM: { nombre: "Poción mixta", precio: 1000, categoria: "Consumibles" },
  EV: { nombre: "Estimulante de vida", precio: 1200, categoria: "Consumibles" },
  SS: { nombre: "Super Suero", precio: 5000, categoria: "Consumibles" },

  // Pergaminos
  PE: {
    nombre: "Pergamino de estudiante",
    precio: 150,
    categoria: "Pergaminos",
  },
  PG: { nombre: "Pergamino de genin", precio: 400, categoria: "Pergaminos" },
  PC: { nombre: "Pergamino de chunin", precio: 800, categoria: "Pergaminos" },
  PJ: { nombre: "Pergamino de jounin", precio: 1200, categoria: "Pergaminos" },
  PRC: {
    nombre: "Pergamino de Renegado clase C",
    precio: 200,
    categoria: "Pergaminos",
  },
  PRB: {
    nombre: "Pergamino de Renegado clase B",
    precio: 400,
    categoria: "Pergaminos",
  },
  PRA: {
    nombre: "Pergamino de Renegado clase A",
    precio: 800,
    categoria: "Pergaminos",
  },

  // Armas
  SB: { nombre: "Senbon", precio: 15, categoria: "Armas" },
  SG: { nombre: "Shuriken Gigante", precio: 25, categoria: "Armas" },
  KC: { nombre: "Kunai cegador (30)", precio: 50, categoria: "Armas" },
  FS: { nombre: "Fuhma Shuriken", precio: 200, categoria: "Armas" },
  BE: { nombre: "Bastón eléctrico", precio: 400, categoria: "Armas" },
  GD: { nombre: "Guadañas dobles", precio: 600, categoria: "Armas" },
  DR: { nombre: "Destruyerrocas", precio: 1000, categoria: "Armas" },
  KS: { nombre: "Katana Samurái", precio: 1000, categoria: "Armas" },
  KH: { nombre: "Kunai con hilo", precio: 1000, categoria: "Armas" },
  GF: { nombre: "Guadaña de 2 filos", precio: 1200, categoria: "Armas" },
  SF: { nombre: "Sound flute", precio: 2000, categoria: "Armas" },
  TC: { nombre: "Tanto de césped", precio: 2000, categoria: "Armas" },
  UG: { nombre: "Umpire Guitar", precio: 2000, categoria: "Armas" },
  TP: { nombre: "Tanto perdida", precio: 3000, categoria: "Armas" },

  // Chisei (Libros y equipo especial)
  LB1: { nombre: "Libro básico de chakra", precio: 300, categoria: "Chisei" },
  KQ: {
    nombre: "Kit de primeros auxilios/Quirúrgico",
    precio: 500,
    categoria: "Chisei",
  },
  MT: {
    nombre: "Materiales para marionetas (Shirogane)",
    precio: 500,
    categoria: "Chisei",
  },
  MM: {
    nombre: "Materiales para mascaras (Kurohari)",
    precio: 500,
    categoria: "Chisei",
  },
  LB2: {
    nombre: "Libro de historia ninja y estrategia",
    precio: 600,
    categoria: "Chisei",
  },
  LB3: {
    nombre: "Libro de matemática/tableros de ajedrez o shogi",
    precio: 800,
    categoria: "Chisei",
  },
  LB4: {
    nombre: "Libro de leyendas del mundo ninja",
    precio: 1000,
    categoria: "Chisei",
  },
  EQ1: {
    nombre: "Equipo tecnológico para laboratorio",
    precio: 5000,
    categoria: "Chisei",
  },

  // Misc (Tecnología avanzada y equipo especial)
  VG1: {
    nombre: "Equipo del Guardián de las Noches",
    precio: 8500,
    categoria: "Misc",
  },
  NM1: {
    nombre: "Nanomáquinas para incremento de fuerza",
    precio: 3000,
    categoria: "Misc",
  },
  AB1: { nombre: "Armadura de Bijuu", precio: 14000, categoria: "Misc" },
  EQ: { nombre: "Equipo quirurgico", precio: 800, categoria: "Misc" },
};

module.exports = productos;
