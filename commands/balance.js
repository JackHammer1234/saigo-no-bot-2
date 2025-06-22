const { obtenerDinero } = require("../economia");

module.exports = {
  name: "balance",
  description: "Muestra el dinero de un usuario",
  execute(message, args) {
    const user = message.mentions.users.first() || message.author;
    const dinero = obtenerDinero(user.id);
    message.reply(`${user.username} tiene ${dinero} ryo.`);
  },
};
