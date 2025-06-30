const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const productos = require("../productos");

module.exports = {
  name: "comprar",
  description: "Muestra la tienda por categorías y te permite comprar con !comprar clave",
  async execute(message, args) {
    if (args.length) return; // no hacemos compra aquí, solo mostramos tienda

    const categorias = {};
    for (const key in productos) {
      const prod = { key, ...productos[key] };
      const cat = prod.categoria || "Misc";
      if (!categorias[cat]) categorias[cat] = [];
      categorias[cat].push(prod);
    }

    const catKeys = Object.keys(categorias);
    let index = 0;

    const generarEmbed = (i) => {
      const cat = catKeys[i];
      const items = categorias[cat];

      const embed = new EmbedBuilder()
        .setTitle(`📦 Categoría: ${cat}`)
        .setColor("Blue")
        .setDescription(
          items
            .map((item) => `**${item.nombre}** \`(${item.key})\` — ${item.precio} ryo`)
            .join("\n")
        )
        .setFooter({ text: `Página ${i + 1} de ${catKeys.length}` });

      return embed;
    };

    const row = (i) =>
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("anterior")
          .setLabel("⏪")
          .setStyle(ButtonStyle.Primary)
          .setDisabled(i === 0),
        new ButtonBuilder()
          .setCustomId("siguiente")
          .setLabel("⏩")
          .setStyle(ButtonStyle.Primary)
          .setDisabled(i === catKeys.length - 1)
      );

    const msg = await message.reply({
      embeds: [generarEmbed(index)],
      components: [row(index)],
    });

    const collector = msg.createMessageComponentCollector({
      time: 60000, // 1 min
      filter: (i) => i.user.id === message.author.id,
    });

    collector.on("collect", async (interaction) => {
      if (interaction.customId === "anterior") index--;
      else if (interaction.customId === "siguiente") index++;

      await interaction.update({
        embeds: [generarEmbed(index)],
        components: [row(index)],
      });
    });

    collector.on("end", () => {
      msg.edit({ components: [] }).catch(() => {});
    });
  },
};
