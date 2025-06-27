const productos = require("../productos");

module.exports = {
  name: "tienda",
  description: "Muestra los productos disponibles en la tienda",
  execute(message) {
    // Mostrar productos agrupados por categoría
    const categorias = {};

    for (const key in productos) {
      const producto = { key, ...productos[key] };
      const cat = producto.categoria || "Misc";
      if (!categorias[cat]) categorias[cat] = [];
      categorias[cat].push(producto);
    }

    let lista = "__**🛒 PRODUCTOS DISPONIBLES:**__\n\n";

    for (const cat in categorias) {
      lista += `__**${cat.toUpperCase()}**__\n`;
      categorias[cat].forEach((item) => {
        lista += `- ${item.nombre} (\`${item.key}\`): ${item.precio} ryo\n`;
      });
      lista += "\n";
    }

    return message.reply(lista.trim());
  },
  productos,
};
