const fs = require("fs");

module.exports = {
    name: "messageCreate",

    async execute(message) {

        if (message.author.bot) return;

        const replies = JSON.parse(
            fs.readFileSync("./autoreplies.json", "utf8")
        );

        const word = message.content.trim();

        if (!replies[word]) return;

        const responses = replies[word];

        const random = responses[
            Math.floor(Math.random() * responses.length)
        ];

        message.reply(random);
    }
};
