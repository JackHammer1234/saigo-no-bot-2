const { quitarDinero, obtenerDinero, agregarItem } = require("../economia");
const productos = require("../productos");

module.exports = {
  name: "comprar",
  description: "Compra productos en la tienda o muestra la lista si no especificas nada",
  async execute(message, args) { // <- IMPORTANTE: async
    if (!args.length) {
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

    const productoCodigo = args[0].toUpperCase();
    const cantidad = parseInt(args[1]) || 1;

    if (!productos[productoCodigo])
      return message.reply("Producto no encontrado.");

    if (cantidad <= 0)
      return message.reply("La cantidad debe ser mayor que 0.");

    const producto = productos[productoCodigo];
    const total = producto.precio * cantidad;

    const dinero = await obtenerDinero(message.author.id); // <- AWAIT AQUÍ

    if (dinero < total)
      return message.reply(
        `No tienes suficiente ryo. Necesitas ${total} ryo para comprar ${cantidad} ${producto.nombre}.`
      );

    await quitarDinero(message.author.id, total);
    for (let i = 0; i < cantidad; i++) {
      await agregarItem(message.author.id, productoCodigo);
    }

    return message.reply(
      `¡Has comprado ${cantidad} ${producto.nombre}${
        cantidad > 1 ? "s" : ""
      } por ${total} ryo!`
    );
  },
  productos,
};

