const { setDinero } = require('../economia');

module.exports = {
  name: 'setmoney',
  description: 'Establece el dinero de un usuario a una cantidad específica.',
  usage: '!setmoney @usuario cantidad',
  execute(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('No tienes permiso para usar este comando.');
    }

    const user = message.mentions.users.first();
    if (!user) return message.reply('Debes mencionar a un usuario.');

    const amount = parseInt(args[1], 10);
    if (isNaN(amount)) return message.reply('Cantidad inválida.');

    setDinero(user.id, amount);

    message.channel.send(`El dinero de ${user.username} se ha establecido en ${amount}.`);
  },
};

