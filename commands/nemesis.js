const { generarNemesisCompleto } = require("../nemesisGenerator");

module.exports = {
  name: "nemesis",
  description: "Genera una némesis procedural con recompensas",
  async execute(message, args) {
    try {
      const n = generarNemesisCompleto();

      let texto = `# Némesis:\n\n`;

      texto += `- ***Rango:***\n`;
      texto += `    - "${n.rango}"\n`;

      texto += `- ***Clan:***\n`;
      texto += `    - "${n.clan}"\n`;

      texto += `- ***Última ubicación registrada:***\n`;
      texto += `    - "${n.ubicacion}"\n`;

      texto += `- ***Rolsplays restantes para la aparición del Némesis:***\n`;
      texto += `    - "${n.tiempoRestante}"\n\n`;

      texto += `# Recompensas:\n\n`;

      for (const r of n.recompensas) {
        texto += `- ***${r.nombre}***\n`;
        texto += `    > "${r.descripcion}"\n\n`;
      }

      message.reply(texto);

    } catch (error) {
      console.error(error);
      message.reply("Error generando al ninjer este tirabrosaurio rex.");
    }
  },
};
