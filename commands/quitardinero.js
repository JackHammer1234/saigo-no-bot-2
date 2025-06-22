const { quitarDinero } = require("../economia");

module.exports = {
  name: "remove",
  description: "Quita dinero a un usuario",
  execute(message, args) {
    const user = message.mentions.users.first();
    const cantidad = parseInt(args[1]);

    if (!user || isNaN(cantidad))
      return message.reply("Uso: !quitardinero @usuario cantidad");

    quitarDinero(user.id, cantidad);
    message.reply(`Le quitaste ${cantidad} ryo a ${user.username}.`);
  },
};
