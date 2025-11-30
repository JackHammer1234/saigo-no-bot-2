const { generarNemesisCompleto } = require("../nemesisGenerator");

module.exports = {
  name: "nemesis",
  description: "Genera tu Némesis procedural estilo Warframe",
  async execute(message, args) {
    try {
      const nemesis = generarNemesisCompleto();

      let texto = `# 🩸 **Némesis: ${nemesis.nombre}**\n\n`;
      texto += `- **Rango:** ${nemesis.rango}\n`;
      texto += `- **Clan:** ${nemesis.clan}\n`;
      texto += `- **Última vez visto en:** ${nemesis.ubicacion}\n`;
      texto += `- **Roles faltantes para que te ataque:** ${nemesis.tiempo}\n\n`;

      texto += `# **Recompensas:**\n`;

      for (const recompensa of nemesis.recompensas) {
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
