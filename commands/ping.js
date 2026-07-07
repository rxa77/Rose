const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "ping",

  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("يعرض سرعة البوت"),

  // أمر !
  async execute(message, args) {
    message.reply(`🏓 Pong! ${message.client.ws.ping}ms`);
  },

  // أمر /
  async execute(interaction) {
    await interaction.reply(`🏓 Pong! ${interaction.client.ws.ping}ms`);
  },
};
