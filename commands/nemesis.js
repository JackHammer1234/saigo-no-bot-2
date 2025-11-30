const { generarNemesis } = require("../nemesisGenerator");

module.exports = {
  name: "nemesis",
  description: "Genera una némesis aleatoria estilo shinobi",
  async execute(message, args) {
    try {
      const n = generarNemesis();

      const txt = `
**Némesis Generada**
- Nombre: ${n.nombre}
- Clan: ${n.clan}
- Personalidad: ${n.personalidad}
- Motivo: ${n.motivo}
- Herencia / Recompensa: **${n.recompensa}**
      `;

      message.reply(txt);
    } catch (err) {
      console.error(err);
      message.reply("Error generando a tu némesis, bro.");
    }
  }
};
