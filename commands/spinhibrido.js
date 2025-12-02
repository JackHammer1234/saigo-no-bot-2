client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === "!spinhibrido") {
    const win = Math.random() < 0.8; // 10%

    if (win) {
      message.reply("hibrido :speakinghead: ");
    } else {
      message.reply("No jaja vya maluco no...");
    }
  }
});
