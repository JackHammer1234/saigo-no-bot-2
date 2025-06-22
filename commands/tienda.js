const { quitarDinero, obtenerDinero, agregarItem } = require("../economia");
const productos = require("../productos");

module.exports = {
  name: "tienda",
  description: "Compra productos en la tienda",
  execute(message, args) {
    if (!args.length) {
      // Mostrar productos agrupados por categoría
      const categorias = {};

      for (const key in productos) {
        const producto = { key, ...productos[key] };
        const cat = producto.categoria || "Misc";
        if (!categorias[cat]) categorias[cat] = [];
        categorias[cat].push(producto);
      }

      let lista = "__**PRODUCTOS DISPONIBLES:**__\n\n";

      for (const cat in categorias) {
        lista += `__**${cat.toUpperCase()}**__\n`;
        categorias[cat].forEach((item) => {
          lista += `- ${item.nombre} (${item.key}): ${item.precio} ryo\n`;
        });
        lista += "\n";
      }

      return message.reply(lista.trim());
    }

    // Comprar producto
    const productoCodigo = args[0].toUpperCase();
    const cantidad = parseInt(args[1]) || 1; // Por defecto 1

    if (!productos[productoCodigo])
      return message.reply("Producto no encontrado.");

    if (cantidad <= 0)
      return message.reply("La cantidad debe ser mayor que 0.");

    const producto = productos[productoCodigo];
    const total = producto.precio * cantidad;
    const dinero = obtenerDinero(message.author.id);

    if (dinero < total)
      return message.reply(
        `No tienes suficiente ryo. Necesitas ${total} ryo para comprar ${cantidad} ${producto.nombre}.`,
      );

    quitarDinero(message.author.id, total);
    for (let i = 0; i < cantidad; i++) {
      agregarItem(message.author.id, productoCodigo);
    }

    return message.reply(
      `¡Has comprado ${cantidad} ${producto.nombre}${
        cantidad > 1 ? "s" : ""
      } por ${total} ryo!`,
    );
  },
  productos,
};
