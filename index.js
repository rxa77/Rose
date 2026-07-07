require("dotenv").config();

const {
    Client,
    Collection,
    GatewayIntentBits
} = require("discord.js");

const fs = require("fs");
const path = require("path");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// Collections
client.commands = new Collection();
client.prefix = "!";


// =======================
// تحميل الأوامر
// =======================

const commandsPath = path.join(__dirname, "commands");

const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(path.join(commandsPath, file));

    if (!command.name) {
        console.log(`⚠️ تجاهل ${file} لأنه لا يحتوي على name`);
        continue;
    }

    client.commands.set(command.name, command);

    console.log(`✅ تم تحميل الأمر: ${command.name}`);
}


// =======================
// تحميل الأحداث
// =======================

const eventsPath = path.join(__dirname, "events");

const eventFiles = fs
    .readdirSync(eventsPath)
    .filter(file => file.endsWith(".js"));

for (const file of eventFiles) {

    const event = require(path.join(eventsPath, file));

    if (event.once) {

        client.once(event.name, (...args) =>
            event.execute(...args, client)
        );

    } else {

        client.on(event.name, (...args) =>
            event.execute(...args, client)
        );

    }

    console.log(`📌 تم تحميل الحدث: ${event.name}`);
}


// =======================
// Prefix Commands
// =======================

client.on("messageCreate", async message => {

    if (message.author.bot) return;

    if (!message.content.startsWith(client.prefix)) return;


    const args = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/ +/);


    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;


    try {

        if (command.execute) {
            await command.execute(message, args, client);
        }

    } catch (error) {

        console.error(error);

        message.reply("حدث خطأ ❌");

    }

});


// =======================
// تشغيل البوت
// =======================

client.login(process.env.TOKEN);
