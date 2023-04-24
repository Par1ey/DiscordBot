const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows all avaliable commands for the bot')
    ,
    async execute(interaction)
    {

        const embed = new EmbedBuilder()
        .setTitle('Command list')
        .setDescription(
            '/votingpot\nShows games that have been added to the pot' + 
            '\n\n/autoappend\nAdds game to voting pot\nThe link is provided though a google search' + 
            '\n\n/append\nManual addition of a game\nYou have to provide a link to use this command' + 
            '\n\n/gamevote\nSets up a poll for each game in the voting pot\nSpecify a delay between each poll\nThe bot can send a ping to play the game if the time options are filled out' + 
            '\n\n/randomgame\nGives a random game from the voting pot' + 
            '\n\n/schedule\nThe bot will send your message at the specified time')

        await interaction.reply({embeds: [embed] });
    }
}