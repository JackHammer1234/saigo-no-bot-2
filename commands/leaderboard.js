const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const economiaPath = path.resolve(__dirname, "../data/economia.json");

module.exports = {
  name: "leaderboard",
  description: "Muestra el ranking de usuarios con más ryo.",
  async execute(message) {
    if (!fs.existsSync(economiaPath)) {
      return message.reply("No hay datos de economía aún.");
    }

    const data = JSON.parse(fs.readFileSync(economiaPath));
    const sorted = Object.entries(data)
      .sort(([, a], [, b]) => b.dinero - a.dinero)
      .slice(0, 10); // Top 10

    if (sorted.length === 0) {
      return message.reply("No hay datos de economía.");
    }

    let texto = "__**TOP DE RYO 💰:**__\n\n";

    for (let i = 0; i < sorted.length; i++) {
      const [id, usuario] = sorted[i];
      let nombre;

      try {
        const user = await message.client.users.fetch(id);
        nombre = `<@${user.id}>`; // 👈 Aquí se pingea al usuario
      } catch {
        nombre = `Usuario desconocido (${id})`;
      }

      texto += `**${i + 1}.** ${nombre}: ${usuario.dinero} ryo\n`;
    }

    message.reply(texto);
  },
};
