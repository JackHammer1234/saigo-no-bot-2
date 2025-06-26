const economia = require("../economia");

module.exports = {
  name: "leaderboard",
  description: "Muestra el ranking de usuarios con más ryo.",
  async execute(message) {
    try {
      // Obtener todos los usuarios con dinero
      const todos = await economia.obtenerTodos(); // Este método debe devolver un array [{id, dinero, inventario}, ...]

      if (!todos || todos.length === 0) {
        return message.reply("No hay datos de economía.");
      }

      // Ordenar de mayor a menor
      const sorted = todos.sort((a, b) => b.dinero - a.dinero);

      let texto = "__**RANKING DE RYO 💰:**__\n\n";

      for (let i = 0; i < sorted.length; i++) {
        const { id, dinero } = sorted[i];
        let nombre;

        try {
          const user = await message.client.users.fetch(id);
          nombre = user.username;
        } catch {
          nombre = `Usuario desconocido (${id})`;
        }

        texto += `**${i + 1}.** ${nombre}: ${dinero} ryo\n`;
      }

      // Partir mensajes largos
      const partes = texto.match(/[\s\S]{1,1900}/g);
      for (const parte of partes) {
        await message.channel.send(parte);
      }
    } catch (error) {
      console.error(error);
      message.reply("Error al obtener el ranking.");
    }
  },
};
