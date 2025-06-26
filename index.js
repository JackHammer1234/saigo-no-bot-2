require("dotenv").config();

const conectarDB = require("./db");
const Economia = require("./models/eeconomia.js");

const express = require("express");
const app = express();

const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

const prefix = "!";
client.commands = new Collection();

// Cargar comandos
const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.name && typeof command.execute === "function") {
    client.commands.set(command.name, command);
  } else {
    console.warn(`⚠️ El comando en ${file} no tiene "name" o "execute".`);
  }
}

// Servidor Express mínimo para Render
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Bot activo");
});
app.listen(PORT, () => {
  console.log(`Servidor web activo en el puerto ${PORT}`);
});

// Evento listo
client.once(Events.ClientReady, () => {
  console.log(`✅ Bot iniciado como ${client.user.tag}`);

  const canalId = "1225924380664791171";
  const canal = client.channels.cache.get(canalId);

  if (canal) {
    canal.send("Commit done");
  } else {
    console.log("No encontré el canal para enviar el mensaje.");
  }
});

// Evento mensaje
client.on(Events.MessageCreate, (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(`❌ Error al ejecutar ${commandName}:`, error);
    message.reply("Hubo un error al ejecutar ese comando.");
  }
});

// Función async para conectar DB y luego iniciar bot
async function iniciar() {
  await conectarDB(process.env.MONGO_URI);
  client.login(process.env.TOKEN);
}

iniciar();

