const { quitarItem } = require("../economia");

module.exports = {
  name: "quitaritem",
  description: "Quita un ítem a un usuario",
  execute(message, args) {
    const user = message.mentions.users.first();
    const itemKey = args[1]?.toUpperCase();

    if (!user || !itemKey) return message.reply("Uso: !quitaritem @usuario clave");

    const resultado = quitarItem(user.id, itemKey);
    if (resultado) {
      message.reply(`Se quitó 1 unidad del ítem ${itemKey} a ${user.username}.`);
    } else {
      message.reply(`${user.username} no tiene ese ítem.`);
    }
  },
};
