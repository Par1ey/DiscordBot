const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('Role assignment')
        .setDescription('Assigns role to user')
    ,
    async execute(interaction)
    {
        const { options } = interaction
        const test = options.getChannel()

        await interaction.reply({test});
    }
}