const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Append = require('../functions/add.js');
const { map } = require('../functions/add.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('append')
        .setDescription('Adds game to game list')
        .addStringOption((option) => 
        option
            .setName('name')
            .setDescription('Game name')
            .setRequired(true),
        ) 
        .addStringOption ( (option) =>
        option
            .setName('link')
            .setDescription('Link to game')
            .setRequired(true),
        ),
    async execute(interaction)
    {
        const { options } = interaction

        const gameName = options.getString('name');
        const link = options.getString('link');
        const listThing = new Append(gameName)

        listThing.add();

        await interaction.reply('The game: ' + gameName + ' has been added to the bag' + '\n' + map.get(gameName));

        /*const embed = new EmbedBuilder()
        .setColor("Gold")
        .setTitle(gameName)
        .setDescription(link)
        .setTimestamp();

        const m = await interaction.reply({embeds: [embed] });*/
    }
}