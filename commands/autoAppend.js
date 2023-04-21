const { SlashCommandBuilder } = require('@discordjs/builders');
const googleIt = require('google-it')
const Append = require('../functions/add.js');
const gameListModel = require('../models/game-list-schema');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('autoappend')
        .setDescription('Adds game to game list')
        .addStringOption((option) => 
        option
            .setName('name')
            .setDescription('Game name')
            .setRequired(true),
        ),
    async execute(interaction)
    {
        const { options } = interaction
        const gameName = options.getString('name');

        await googleIt({'only-urls': true, 'limit': 1, 'query':  gameName})
        .then(async results => {
            //upload game and link to database
            await new gameListModel({
                gameName: gameName,
                link: results[0].link,
                votes: 0,                       //set default votes to 0, this gets changed under the voting process
                guildId: interaction.guildId,
              }).save()
            })
        .catch(e => {})
        
        await interaction.reply(gameName + " has successfully been added to the voting pot")
    }
}