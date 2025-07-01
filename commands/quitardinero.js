const { quitarDinero } = require("../economia");

const ROL_ADMIN_ID = "1389445186836234281";

module.exports = {
  name: "remove",
  description: "Quita dinero a un usuario",
  async execute(message, args) {
    const user = message.mentions.users.first();
    const cantidad = parseInt(args[1]);

    // Validar argumentos
    if (!user || isNaN(cantidad)) {
      return message.reply("Uso: !remove @usuario cantidad");
    }

    // Validar permisos por rol
    const rolesDelAutor = message.member.roles.cache.map(role => role.id);
    if (!rolesDelAutor.includes(ROL_ADMIN_ID)) {
      return message.reply("❌ No tienes permiso para usar este comando.");
    }

    // Ejecutar acción
    try {
      await quitarDinero(user.id, cantidad);
      message.reply(`Le quitaste ${cantidad} ryo a ${user.username}.`);
    } catch (error) {
      console.error(error);
      message.reply("❌ Hubo un error al quitar el dinero.");
    }
  },
};

