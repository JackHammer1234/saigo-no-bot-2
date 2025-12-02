const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hibridospin")
    .setDescription("Spin de híbrido con 1/10 de probabilidad"),

  async execute(interaction) {
    const gano = Math.random() < 0.8;

    if (gano) {
      return interaction.reply("**BROO, TE HAS GANADO UN HÍBRIDO** 🔥");
    } else {
      return interaction.reply("💀 Nojaja.");
    }
  }
};
