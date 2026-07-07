const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    name: "247",

    data: new SlashCommandBuilder()
        .setName("247")
        .setDescription("تفعيل وضع البقاء 24/7"),

    async execute(interaction) {

        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({
                content: "❌ يجب أن تكون داخل روم صوتي لتفعيل 24/7",
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
            content: "🌹 تم تفعيل وضع **24/7**\n🎧 Rose سيبقى في الروم الصوتي."
        });
    }
};
