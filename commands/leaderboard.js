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
      .sort(([, a], [, b]) => b.dinero - a.dinero); // Ya sin .slice(0, 10)

    if (sorted.length === 0) {
      return message.reply("No hay datos de economía.");
    }

    let texto = "__**RANKING DE RYO 💰:**__\n\n";

    for (let i = 0; i < sorted.length; i++) {
      const [id, usuario] = sorted[i];
      let nombre;

      try {
        const user = await message.client.users.fetch(id);
        nombre = user.username; // Sin ping, solo nombre de usuario
      } catch {
        nombre = `Usuario desconocido (${id})`;
      }

      texto += `**${i + 1}.** ${nombre}: ${usuario.dinero} ryo\n`;
    }

    // Si es muy largo, se parte en varios mensajes (Discord tiene límite de 2000 caracteres por mensaje)
    const partes = texto.match(/[\s\S]{1,1900}/g); // Deja margen por si acaso
    for (const parte of partes) {
      await message.channel.send(parte);
    }
  },
};
