const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Append = require('../functions/add.js');
const { map } = require('../functions/add.js');
const votingPot = require('./votingPot.js');
const gameListModel = require('../models/game-list-schema');

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

        await new gameListModel({
            name: votingPot,
            gameName: gameName,
            link: link,                       //set default votes to 0, this gets changed under the voting process
            guildId: interaction.guildId,
          }).save()

        await interaction.reply(gameName + " has successfully been added to the voting pot")
    }
}