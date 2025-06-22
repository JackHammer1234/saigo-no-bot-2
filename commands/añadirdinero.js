const { modificarDinero } = require("../economia");

module.exports = {
  name: "ad",
  description: "Añade dinero a un usuario",
  execute(message, args) {
    const user = message.mentions.users.first();
    const cantidad = parseInt(args[1]);

    if (!user || isNaN(cantidad))
      return message.reply("Uso: !añadirdinero @usuario cantidad");

    modificarDinero(user.id, cantidad);
    message.reply(`Le diste ${cantidad} ryo a ${user.username}.`);
  },
};
