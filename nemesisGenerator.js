// nemesisGenerator.js

function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Tu TABLETA MAMALONA de opciones
const clanes = ["Uchiha", "Hyuga", "Aburame", "Nara", "Akimichi"];
const talentos = ["Doujutsu raro", "Kinjutsu prohibido", "Contrato con invocación", "Pergamino secreto", "Mutación kekkei genkai"];
const personalidades = ["rencoroso", "obsesivo", "calculador", "ruidoso", "sádico"];
const razones = ["te odia por accidente", "le ganaste en algo", "tu clan le cae mal", "su jefe lo mandó", "eres un obstáculo"];

function generarNemesis() {
  const nemesis = {
    nombre: "???",
    clan: random(clanes),
    talento: random(talentos),
    personalidad: random(personalidades),
    motivo: random(razones)
  };

  return nemesis;
}

module.exports = { generarNemesis };
