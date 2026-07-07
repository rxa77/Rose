const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",

    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("عرض أوامر البوت"),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor(`#${process.env.EMBED_COLOR || "000000"}`)
            .setTitle("🌹 Rose Commands")
            .setDescription("قائمة أوامر البوت")
            .addFields(
                {
                    name: "🌹 General",
                    value: "`/help` - عرض الأوامر\n`/ping` - فحص البوت"
                },
                {
                    name: "🎧 Voice",
                    value: "`/stay` - وضع 24/7\n`/247` - تفعيل 24/7"
                },
                {
                    name: "🔧 Auto Reply",
                    value:
                    "`/autoreply add` - إضافة رد\n" +
                    "`/autoreply remove` - حذف رد\n" +
                    "`/autoreply list` - عرض الردود\n" +
                    "`/autoreply delete` - حذف الكل"
                }
            )
            .setFooter({
                text: "Rose Bot 🌹"
            });

        await interaction.reply({
            embeds: [embed]
        });
    }
};
