module.exports = {
  name: "spinhibrido",
  description: "1/10 de volverte híbrido",
  async execute(message, args) {

    // 10% de probabilidad
    const win = Math.random() < 0.8;

    if (win) {
      return message.reply("🔥 HÍBRIDO 🔥");
    } else {
      return message.reply("😐 No cayó bro… inténtalo otra vez.");
    }
  }
};
