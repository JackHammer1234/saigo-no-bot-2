// Tabla gigante de recompensas
const recompensasBase = [
  // Comunes
  { nombre: "Pergamino: Técnica Menor", descripcion: "jaaj imagina mejor nada bro", rareza: "comun", peso: 50 },
  { nombre: "Material Genético: Civil Random", descripcion: "Bro ni sabía pelear.", rareza: "comun", peso: 50 },

  // Poco comunes
  { nombre: "Células de Clan", descripcion: "Células modificadas de algún clan ninja.", rareza: "poco-comun", peso: 25 },
  { nombre: "Pergamino Avanzado", descripcion: "Una técnica respetable, la neta.", rareza: "poco-comun", peso: 25 },

  // Raras
  { nombre: "Arma Especial", descripcion: "Un arma con propiedades únicas.", rareza: "raro", peso: 10 },
  { nombre: "Kinjutsu Menor", descripcion: "Jutsu prohibido, pero no tan malvibroso.", rareza: "raro", peso: 10 },

  // Épicas
  { nombre: "Kinjutsu Mayor", descripcion: "Jutsu prohibido de verdad, asi bien malvibroso como señora del metro wei.", rareza: "epico", peso: 4 },
  { nombre: "Material Genético de Clan Poderoso", descripcion: "bro piensa que es crush.", rareza: "epico", peso: 4 },

  // Legendarias
  { nombre: "Reliquia Legendaria", descripcion: "bro encontro la enka???.", rareza: "legendario", peso: 1 },
  { nombre: "Kekkei Genkai Raro", descripcion: "FLAW OF THE WORLD.", rareza: "legendario", peso: 1 },
];

// Cantidad de recompensas según rango
const recompensasPorRango = {
  D: 1,
  C: 2,
  B: 3,
  A: 4,
  S: 5
};

// Ajuste de pesos según rango (más alto = menos chance de rareza alta)
const modificadorPesosPorRango = {
  D: 2,
  C: 1.5,
  B: 1.2,
  A: 1,
  S: 0.8
};

// Elige una recompensa ponderada
function elegirPonderado(lista) {
  const totalPeso = lista.reduce((a, b) => a + b.peso, 0);
  let random = Math.random() * totalPeso;

  for (const item of lista) {
    if (random < item.peso) return item;
    random -= item.peso;
  }
  return lista[0];
}

// Generador final
function generarNemesis(rango) {
  const cantidad = recompensasPorRango[rango] || 1;
  const mod = modificadorPesosPorRango[rango] || 1;

  // Copia profunda
  const tabla = recompensasBase.map(r => ({
    ...r,
    peso: Math.max(1, r.peso * mod)
  }));

  const resultado = [];
  for (let i = 0; i < cantidad; i++) {
    resultado.push(elegirPonderado(tabla));
  }
  return resultado;
}

module.exports = { generarNemesis };
