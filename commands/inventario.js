const { obtenerInventario } = require("../economia");
const productos = require("../productos");

module.exports = {
  name: "inventario",
  description: "Muestra el inventario de un usuario",
  async execute(message, args) {
    const user = message.mentions.users.first() || message.author;
    try {
      const inventario = await obtenerInventario(user.id);
      if (Object.keys(inventario).length === 0) {
        return message.reply(`${user.username} no tiene items.`);
      }

      let lista = `**Inventario de ${user.username}:**\n`;
      for (const key in inventario) {
        const producto = productos[key]?.nombre || key;
        lista += `- ${producto} (${key}): ${inventario[key]}\n`;
      }

      message.reply(lista);
    } catch (error) {
      console.error(error);
      message.reply("Error al obtener el inventario.");
    }
  },
};
