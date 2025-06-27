const { EmbedBuilder } = require("discord.js");
const economia = require("../models/eeconomia.js");
const productos = require("../productos");


module.exports = {
  name: "comprar",
  description: "Compra un objeto de la tienda.",
  async execute(message, args) {
    const objeto = args[0];
    if (!objeto) {
      return message.reply("Debes especificar el nombre del objeto que quieres comprar.");
    }

    const item = tienda.find(i => i.nombre.toLowerCase() === objeto.toLowerCase());
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
    usuario.inventario.push(item.nombre);

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
