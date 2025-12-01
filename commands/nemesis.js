// /src/commands/nemesis.js
const { generarNemesis } = require("../nemesisGenerator");

module.exports = {
  name: "nemesis",
  description: "Genera un némesis procedural",

  async execute(message) {
    try {
      const nm = generarNemesis();

      // Top line: Nombre Clan — Título
      let txt = `# Némesis: ${nm.nombre} ${nm.clan} — ${nm.alias}\n\n`;


      txt += `- ***Rango:***\n`;
      txt += `    > "${nm.rango}"\n`;
      txt += `- ***Clan:***\n`;
      txt += `    > "${nm.clan}"\n`;
      txt += `- ***Última ubicación registrada:***\n`;
      txt += `    > "${nm.ubicacion}"\n`;
      txt += `- ***Roleplays restantes para la aparición del Némesis:***\n`;
      txt += `    > "${nm.roleplays}"\n`;
      txt += `- ***Motivo:***\n`;
      txt += `    > "${nm.motivo}"\n\n`;

      // Quote (ligada al motivo)
      txt += `> *${nm.quote}*\n\n`;

      // Mutación corporal
      txt += `# Mutación corporal:\n\n`;
      txt += `- ***${nm.mutacion.nombre}***\n`;
      txt += `    > "${nm.mutacion.efecto}"\n\n`;

      // Recompensas (single giant table picks)
      txt += `# Recompensas:\n\n`;
      for (const r of nm.recompensas) {
        txt += `- ***${r.nombre}***\n`;
        txt += `    > "${r.rareza}"\n\n`;
      }

      message.reply(txt);

    } catch (err) {
      console.error("Error en comando nemesis:", err);
      message.reply("tirabrosaurio, el némesis explotó 💀");
    }
  }
};
