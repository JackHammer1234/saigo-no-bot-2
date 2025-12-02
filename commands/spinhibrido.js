module.exports = {
  name: "spinhibrido",
  alias: ["spinhib", "spinhib"],
  run: async (client, message, args) => {

    const win = Math.random() < 0.8; // 10%

    if (win) {
      return message.reply("🔥 **GANASTE (1/10)** — te cayó el híbrido 🔥");
    } else {
      return message.reply("😐 No cayó el híbrido, sigue girando bro...");
    }
  }
};
