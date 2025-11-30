const { generarNemesis } = require("../nemesisGenerator");

// Nombre random básico (ajústalo si quieres)
function randomName() {
  const nombres = ["Rell", "Akuma", "Takeshi", "Daigo", "Rinzo", "Kaizen", "Arata", "Okami", "Jinrai"];
  const apellidos = ["Shiro", "Rell", "Yamazaki", "Kurogane", "Hidaruma", "Renge", "Kaisen"];
  return `${nombres[Math.floor(Math.random() * nombres.length)]} ${apellidos[Math.floor(Math.random() * apellidos.length)]}`;
}

// Clanes posibles
function randomClan() {
  const clanes = ["Uchiha", "Senju", "Hyuga", "Inuzuka", "Aburame", "Nara", "Akimichi", "Yuki", "Kaguya", "Hoshigaki"];
  return clanes[Math.floor(Math.random() * clanes.length)];
}

// Ubicaciones posibles
function randomUbicacion() {
  const lugares = [
    "Aldea de la Hoja",
    "Aldea de la Nube",
    "Bosque de los Susurros",
    "Ruinas del País del Hierro",
    "Valle del Fin",
    "Aldea de la Lluvia",
    "Frontera del País del Viento",
    "Entre tus nalgas (lore canon)",
  ];
  return lugares[Math.floor(Math.random() * lugares.length)];
}

// Rangos posibles
function randomRango() {
  const rangos = ["D", "C", "B", "A", "S"];
  return rangos[Math.floor(Math.random() * rangos.length)];
}

// Tiempo antes de ataque
function randomTiempo() {
  return Math.floor(Math.random() * 5); // 0–4
}

module.exports = {
  name: "nemesis",
  description: "Genera tu Nemesis procedural estilo Warframe",
  async execute(message, args) {
    try {
      // Generar la info base del némesis
      const nombre = randomName();
      const clan = randomClan();
      const ubicacion = randomUbicacion();
      const rango = randomRango();
      const tiempo = randomTiempo();

      // Generar recompensas según rango
      const recompensas = generarNemesis(rango);

      // Construir texto estilo tu formato
      let texto = `# 🩸 **Némesis: ${nombre}**\n\n`;
      texto += `- **Rango:** ${rango}\n`;
      texto += `- **Clan:** ${clan}\n`;
      texto += `- **Última vez visto en:** ${ubicacion}\n`;
      texto += `- **Roles faltantes para que te ataque:** ${tiempo}\n\n`;
      texto += `# **Recompensas:**\n`;

      for (const recompensa of recompensas) {
        texto += `\n## ${recompensa.nombre}\n`;
        texto += `> ${recompensa.descripcion}\n`;
      }

      message.reply(texto);

    } catch (error) {
      console.error(error);
      message.reply("❌ Error generando al ninjer este");
    }
  },
};
