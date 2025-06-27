const { EmbedBuilder } = require("discord.js");
const economia = require("../models/eeconomia.js");
const productos = require("../productos");

module.exports = {
  name: "comprar",
  description: "Compra un objeto de la tienda.",
  async execute(message, args) {
    const clave = args[0]?.toUpperCase(); // Convertimos a mayúsculas para coincidir con las claves
    if (!clave) {
      return message.reply("Debes especificar el código del objeto que quieres comprar.");
    }

    const item = productos[clave];

    if (!item) {
      return message.reply("Ese objeto no está en la tienda.");
    }

    const usuario = await economia.obtenerUsuario(message.author.id);
    if (!usuario) {
      return message.reply("No tienes datos económicos. Usa otro comando primero.");
    }

    if (usuario.dinero < item.precio) {
      return message.reply("No tienes suficiente ryo para comprar este objeto.");
    }

    // Restar dinero y agregar al inventario
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

    message.channel.send({ embeds: [embed] });
  },
};
