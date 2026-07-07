module.exports = {
    name: "interactionCreate",

    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);

            if (!interaction.replied) {
                await interaction.reply({
                    content: "حدث خطأ ❌",
                    ephemeral: true
                });
            }
        }
    }
};
