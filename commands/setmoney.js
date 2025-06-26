const { setDinero } = require('../economia');
const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'setmoney',
  description: 'Establece el dinero de un usuario a una cantidad específica.',
  usage: '!setmoney @usuario cantidad',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply('No tienes permiso para usar este comando.');
    }

    const user = message.mentions.users.first();
    if (!user) return message.reply('Debes mencionar a un usuario.');

    const amount = parseInt(args[1], 10);
    if (isNaN(amount)) return message.reply('Cantidad inválida.');

    try {
      await setDinero(user.id, amount);
      message.channel.send(`El dinero de ${user.username} se ha establecido en ${amount}.`);
    } catch (error) {
      console.error(error);
      message.reply('Ocurrió un error al establecer el dinero.');
    }
  },
};

