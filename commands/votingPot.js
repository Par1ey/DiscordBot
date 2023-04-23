const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const gameListModel = require('../models/game-list-schema');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('votingpot')
        .setDescription('Send the list of games in the voting pot')
        ,
    async execute(interaction)
    {
        const result = await gameListModel.find({ name: 'votingPot'})

        if(result.length == 0){                         //If no entries are found then log
            interaction.reply('No games are included in the current voting pot');
        } else {                                        //Else then look through each game
            let description = '';

            for(let i = 0; i < result.length; i++){
                description = description + "Game Name: " + result[i].gameName + '\nLink: ' + result[i].link + '\n\n';   
            }
            
            const embed = new EmbedBuilder()
                .setColor("Gold")
                .setTitle('Current voting pot')
                .setDescription(description)

            await interaction.reply({embeds: [embed] })
        }
        
        //Removes all games from database
        /*await scheduledModel.Remove({ name: votingPot });
        console.log('Successfully sent votingPot and removed games from database');*/

        /*const embed = new EmbedBuilder()
        .setColor("Gold")
        .setTitle(gameName)
        .setDescription(link)
        .setTimestamp();

        const m = await interaction.reply({embeds: [embed] });*/
    }
}