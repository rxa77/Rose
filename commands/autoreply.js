const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

const file = "./autoreplies.json";

if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "{}");
}

module.exports = {
    name: "autoreply",

    data: new SlashCommandBuilder()
        .setName("autoreply")
        .setDescription("إدارة الردود التلقائية")

        .addSubcommand(sub =>
            sub
                .setName("add")
                .setDescription("إضافة رد تلقائي")
                .addStringOption(option =>
                    option
                        .setName("word")
                        .setDescription("الكلمة")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName("reply")
                        .setDescription("الرد")
                        .setRequired(true)
                )
        )

        .addSubcommand(sub =>
            sub
                .setName("remove")
                .setDescription("حذف رد")
                .addStringOption(option =>
                    option
                        .setName("word")
                        .setDescription("الكلمة")
                        .setRequired(true)
                )
        )

        .addSubcommand(sub =>
            sub
                .setName("list")
                .setDescription("عرض الردود")
        )

        .addSubcommand(sub =>
            sub
                .setName("delete")
                .setDescription("حذف جميع الردود")
        ),

    async execute(interaction) {

        let replies = JSON.parse(
            fs.readFileSync(file, "utf8")
        );

        const sub = interaction.options.getSubcommand();

        if (sub === "add") {

            const word = interaction.options.getString("word");
            const reply = interaction.options.getString("reply");

            if (!replies[word]) {
                replies[word] = [];
            }

            replies[word].push(reply);

            fs.writeFileSync(
                file,
                JSON.stringify(replies, null, 2)
            );

            return interaction.reply(
                `✅ تم إضافة رد جديد للكلمة: **${word}**`
            );
        }


        if (sub === "remove") {

            const word = interaction.options.getString("word");

            delete replies[word];

            fs.writeFileSync(
                file,
                JSON.stringify(replies, null, 2)
            );

            return interaction.reply(
                `🗑️ تم حذف ردود: **${word}**`
            );
        }


        if (sub === "list") {

            const list = Object.keys(replies)
                .map(word =>
                    `• ${word} (${replies[word].length} ردود)`
                )
                .join("\n") || "لا توجد ردود";

            return interaction.reply(
                `🔧 الردود الحالية:\n${list}`
            );
        }


        if (sub === "delete") {

            fs.writeFileSync(file, "{}");

            return interaction.reply(
                "🗑️ تم حذف جميع الردود"
            );
        }
    }
};
