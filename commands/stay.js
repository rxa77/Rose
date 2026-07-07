const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    name: "stay",

    data: new SlashCommandBuilder()
        .setName("stay")
        .setDescription("دخول البوت للروم الصوتي والبقاء 24/7"),

    async execute(interaction) {

        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({
                content: "❌ لازم تكون داخل روم صوتي أولاً",
                ephemeral: true
            });
        }

        joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
            selfDeaf: true
        });

        await interaction.reply({
            content: `🎧 دخلت **${voiceChannel.name}**\n🌹 Rose الآن بوضع 24/7`
        });
    }
};
