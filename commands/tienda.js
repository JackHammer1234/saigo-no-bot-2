const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const productos = require("../productos");
const {
  obtenerDinero,
  quitarDinero,
  agregarItem,
} = require("../economia");

module.exports = {
  name: "comprar",
  description:
    "Muestra la tienda por categorías o compra un producto con !comprar CLAVE [cantidad]",
  async execute(message, args) {
    // ---------- SI ES UNA COMPRA ----------
    if (args.length > 0) {
      const productoCodigo = args[0].toUpperCase();
      const cantidad = parseInt(args[1]) || 1;

      if (!productos[productoCodigo])
        return message.reply("Producto no encontrado.");
      if (cantidad <= 0)
        return message.reply("La cantidad debe ser mayor que 0.");

      const producto = productos[productoCodigo];
      const total = producto.precio * cantidad;
      const dinero = await obtenerDinero(message.author.id);

      if (dinero < total) {
        return message.reply(
          `No tienes suficiente ryo. Necesitas ${total} ryo para comprar ${cantidad} ${producto.nombre}.`
        );
      }

      await quitarDinero(message.author.id, total);
      for (let i = 0; i < cantidad; i++) {
        await agregarItem(message.author.id, productoCodigo);
      }

      return message.reply(
        `🛒 Has comprado **${cantidad} ${producto.nombre}${
          cantidad > 1 ? "s" : ""
        }** por **${total} ryo**.`
      );
    }

    // ---------- SI NO HAY ARGUMENTOS, MOSTRAR TIENDA ----------
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

      return new EmbedBuilder()
        .setTitle(`📦 Categoría: ${cat}`)
        .setColor(0xffffff) // Blanco
        .setDescription(
          items
            .map(
              (item) =>
                `**${item.nombre}** \`(${item.key})\` — ${item.precio} ryo`
            )
            .join("\n")
        )
        .setFooter({ text: `Página ${i + 1} de ${catKeys.length}` });
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
      time: 60000,
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

