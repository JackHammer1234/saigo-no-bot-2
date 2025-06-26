const { modificarDinero } = require("../economia");

module.exports = {
  name: "ad",
  description: "Añade dinero a un usuario",
  async execute(message, args) {
    const user = message.mentions.users.first();
    const cantidad = parseInt(args[1]);

    if (!user || isNaN(cantidad))
      return message.reply("Uso: !añadirdinero @usuario cantidad");

    try {
      await modificarDinero(user.id, cantidad);
      message.reply(`Le diste ${cantidad} ryo a ${user.username}.`);
    } catch (error) {
      console.error(error);
      message.reply("Hubo un error al modificar el dinero.");
    }
  },
};
