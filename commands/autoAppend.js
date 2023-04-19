const { SlashCommandBuilder } = require('@discordjs/builders');
const googleIt = require('google-it')
const Append = require('../functions/add.js');



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
        const map = new Map();

        await googleIt({'only-urls': true, 'limit': 1, 'query':  gameName})
        .then(results => {

            //json has an array, THEN kvp object T-T
            let link = results[0].link
            interaction.reply(gameName + "\n" + link)})
        .catch(e => {})
        
        /*await interaction.reply(gameName + " " +  map.get(gameName))*/
    }
}