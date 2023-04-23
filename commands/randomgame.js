const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const gameListModel = require('../models/game-list-schema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomgame')
        .setDescription('Gets a random game from the voting pot')
    ,
    async execute(interaction)
    {
        //Get games down
        const result = await gameListModel.find({ name: 'votingPot'})
        
        //Pick a random entry in the array
        const random = Math.floor(Math.random() * result.length);
        result[random]
        const embed = new EmbedBuilder()
            .setColor("Gold")
            .setTitle('The Random Game')
            .setDescription('Game:\n' + result[random].gameName + '\n\nLink:\n' + result[random].link)

        //Sends embed
        const m = await interaction.reply({embeds: [embed] });
    }
}