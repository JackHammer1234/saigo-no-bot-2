const fs = require('fs');
const money = require('../../money.json');

module.exports = {
  name: 'setmoney',
  description: 'Establece la cantidad de dinero de un usuario.',
  usage: '!setmoney @usuario cantidad',
  execute(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('No tienes permiso para usar este comando.');
    }

    const user = message.mentions.users.first();
    if (!user) return message.reply('Debes mencionar a un usuario.');

    const amount = parseInt(args[1]);
    if (isNaN(amount)) return message.reply('Debes especificar una cantidad válida.');

    // Establecer la cantidad
    money[user.id] = amount;

    // Guardar el archivo JSON
    fs.writeFileSync('./money.json', JSON.stringify(money, null, 2));

    message.channel.send(`El dinero de ${user.username} se ha establecido a ${amount} monedas.`);
  },
};
