module.exports = {
  name: "comandos",
  description: "Lista todos los comandos disponibles del bot.",
  execute(message) {
    const comandos = message.client.commands;
    const nombres = comandos.map(cmd => cmd.name).join(", ");

    message.channel.send(`**Comandos disponibles:**\n${nombres}`);
  },
};
