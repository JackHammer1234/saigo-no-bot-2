const { modificarDinero } = require("../economia");

const ROL_ADMIN_ID = "1389445186836234281";

module.exports = {
  name: "ad",
  description: "Añade dinero a un usuario",
  async execute(message, args) {
    const user = message.mentions.users.first();
    const cantidad = parseInt(args[1]);

    // Validar argumentos
    if (!user || isNaN(cantidad)) {
      return message.reply("Uso: !ad @usuario cantidad");
    }

    // Validar permisos por rol
    const rolesDelAutor = message.member.roles.cache.map(role => role.id);
    if (!rolesDelAutor.includes(ROL_ADMIN_ID)) {
      return message.reply("❌ No tienes permiso para usar este comando.");
    }

    // Ejecutar acción
    try {
      await modificarDinero(user.id, cantidad);
      message.reply(`Le diste ${cantidad} ryo a ${user.username}.`);
    } catch (error) {
      console.error(error);
      message.reply("❌ Hubo un error al modificar el dinero.");
    }
  },
};
