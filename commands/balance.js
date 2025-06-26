const { obtenerDinero } = require("../economia");

module.exports = {
  name: "balance",
  description: "Muestra el dinero de un usuario",
  async execute(message, args) {
    const user = message.mentions.users.first() || message.author;
    try {
      const dinero = await obtenerDinero(user.id);
      message.reply(`${user.username} tiene ${dinero} ryo.`);
    } catch (error) {
      console.error(error);
      message.reply("Error al obtener el balance.");
    }
  },
};
