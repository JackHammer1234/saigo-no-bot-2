const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const economia = require("../economia");

module.exports = {
  name: "leaderboard",
  description: "Muestra el ranking de usuarios con más ryo.",
  async execute(message) {
    try {
      const todos = await economia.obtenerTodos();

      if (!todos || todos.length === 0) {
        return message.reply("No hay datos de economía.");
      }

      const sorted = todos.sort((a, b) => b.dinero - a.dinero);
      const pageSize = 10;
      let page = 0;

      const generarEmbed = async (pagina) => {
        const start = pagina * pageSize;
        const end = start + pageSize;
        const top = sorted.slice(start, end);

        let desc = "";

        for (let i = 0; i < top.length; i++) {
          const { id, dinero } = top[i];
          let nombre;

          try {
            const user = await message.client.users.fetch(id);
            nombre = user.username;
          } catch {
            nombre = `Usuario desconocido (${id})`;
          }

          desc += `**${start + i + 1}.** ${nombre}: ${dinero} ryo\n`;
        }

        return new EmbedBuilder()
          .setTitle("🏆 Ranking de Ryo")
          .setColor(0xffffff)
          .setDescription(desc || "Sin datos")
          .setFooter({
            text: `Página ${pagina + 1} de ${Math.ceil(sorted.length / pageSize)}`,
          });
      };

      const row = (pagina) =>
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("anterior")
            .setLabel("⏪")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(pagina === 0),
          new ButtonBuilder()
            .setCustomId("siguiente")
            .setLabel("⏩")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(pagina >= Math.ceil(sorted.length / pageSize) - 1)
        );

      const embed = await generarEmbed(page);
      const msg = await message.reply({
        embeds: [embed],
        components: [row(page)],
      });

      const collector = msg.createMessageComponentCollector({
        time: 60000,
        filter: (i) => i.user.id === message.author.id,
      });

      collector.on("collect", async (interaction) => {
        if (interaction.customId === "anterior") page--;
        if (interaction.customId === "siguiente") page++;

        const nuevoEmbed = await generarEmbed(page);
        await interaction.update({
          embeds: [nuevoEmbed],
          components: [row(page)],
        });
      });

      collector.on("end", () => {
        msg.edit({ components: [] }).catch(() => {});
      });
    } catch (error) {
      console.error(error);
      message.reply("Error al obtener el ranking.");
    }
  },
};

