const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "comandos",
  description: "Lista todos los comandos disponibles del bot.",
  execute(message) {
    const comandos = message.client.commands;
    const nombres = comandos.map(cmd => `\`${cmd.name}\``).join(", ");

    const embed = new EmbedBuilder()
      .setTitle("`COMANDOS DISPONIBLES`") // ENCABEZADO CON FORMATO
      .setDescription(
        "------------------------------------------------------\n" + 
        "**Comandos disponibles:**\n" +
        `${nombres}`
      )
      .setColor(0xf2b4ff);

    message.channel.send({ embeds: [embed] });
  },
};

