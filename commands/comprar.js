const { EmbedBuilder } = require("discord.js");
const economia = require("../models/eeconomia.js");
const productos = require("../productos");

module.exports = {
  name: "comprar",
  description: "Compra un objeto de la tienda.",
  async execute(message, args) {
    const clave = args[0]?.toUpperCase(); // Código como "PV", "LB1", etc.
    if (!clave) {
      return message.reply("Debes escribir el código del producto. Ejemplo: `!comprar PV`");
    }

    const item = productos[clave];

    if (!item) {
      return message.reply(`❌ Ese producto no existe. Usa \`!tienda\` para ver la lista de códigos válidos.`);
    }

    const usuario = await economia.obtenerUsuario(message.author.id);
    if (!usuario) {
      return message.reply("No tienes perfil económico. Usa otro comando primero.");
    }

    if (usuario.dinero < item.precio) {
      return message.reply(`No tienes suficiente ryo. Te faltan **${item.precio - usuario.dinero}** ryo.`);
    }

    // Realizar compra
    usuario.dinero -= item.precio;
    usuario.inventario.push(clave); // Guardamos el código, no el nombre

    await economia.actualizarUsuario(message.author.id, usuario);

    const embed = new EmbedBuilder()
      .setTitle("`COMPRA EXITOSA`")
      .setDescription(
        "--------------------------------------------------------------------------------------\n" +
        `Has comprado **${item.nombre}** por **${item.precio}** ryo.\n\n` +
        `**Nuevo saldo:** ${usuario.dinero} ryo`
      )
      .setColor(0x00ff99);

    return message.channel.send({ embeds: [embed] });
  },
};

