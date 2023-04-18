const { SlashCommandBuilder } = require('@discordjs/builders');
const { Append } = require('../functions/add.ts');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('append')
        .setDescription('Adds game to game list')
        .addStringOption((option) => 
        option
            .setName('append')
            .setDescription('Game name')
            .setRequired(true),
        ),
    async execute(interaction)
    {
        await interaction.reply("pp");
    }
}