const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const gameListModel = require('../models/game-list-schema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gamevote')
        .setDescription('Votes on the different games in the voting pot')
        .addStringOption((option) =>
        option
            .setName('delay')
            .setDescription('Delay between polls in interger seconds')
            .setRequired(true),
        )
    ,
    async execute(interaction)
    {
        const delay = parseInt(interaction.options.getString('delay'));

        //construct winner class, that includes the DB id and vote score
        class PollObj {
            constructor(cID, mID, gameName, link, score){
                this.channelId = cID;
                this.messageId = mID;
                this.gameName = gameName;
                this.link = link
                this.count = score
            }
        }

        var winnerCount = new PollObj('', '', '', '', 0);

        //get the games form database
        const result = await gameListModel.find({ name: 'votingPot'})

        if(result.length == 0){                         //If no entries are found then log
            interaction.reply('No games are included in the current voting pot');
        } else {                                        //Else then look through each game
            var previousMessage = interaction.reply('@everyone the voting process is starting in ' + delay + 's');

            let i = 0;
            var votes = [];

            //makes embed for the game to be voted on
            var sender = setInterval(async () => {
                //Sends poll 
                if(i < result.length) {
                    const embed = new EmbedBuilder()
                    .setColor("Gold")
                    .setTitle(result[i].gameName)
                    .setDescription(result[i].link)

                    //Sends embed
                    const m = await interaction.followUp({embeds: [embed] });

                    //Makes it a poll by adding reactions
                    await m.react("👍");
                    await m.react("👎");

                    var tempPoll = new PollObj(m.channelId, m.id, result[i].gameName, result[i].link, 0);
                    votes[i] = tempPoll;
                }   
                
                i++;          
            }, 1000 * delay); //delay for each voting process

            setTimeout(async () => {
                //Stop the poll maker
                clearInterval(sender);

                //Find the winner by checking for the highest score
                for(let i = 0; i < votes.length; i++){
                    interaction.client.channels.cache.get(votes[i].channelId).messages.fetch(votes[i].messageId).then(async message => {
                        let plus = message.reactions.cache.get('👍').count;
                        let minus = message.reactions.cache.get('👎').count;
                        votes[i].count = plus - minus;


                        if(votes[i].count >= winnerCount.count){
                            winnerCount = votes[i];
                        }

                        if(i == votes.length - 1 ){
                            const embed = new EmbedBuilder()
                                .setColor("Gold")
                                .setTitle('The winner of the voting pot is: ' + winnerCount.gameName)
                                .setDescription('Link to the game: ' + winnerCount.link)
    
                            interaction.followUp({embeds: [embed] });
                            await gameListModel.deleteMany({ name: 'votingPot'})
                        }
                    })
                }

                
            }, 1000 * delay * (result.length + 1));  //After every poll is done, get the winner

        }
            
               

            //this code spits it all out in one go
            /*for(let i = 0; i < result.length; i++){
                //makes embed for the game to be voted on
                setTimeout(async () => {
                    const embed = new EmbedBuilder()
                    .setColor("Gold")
                    .setTitle(result[i].gameName)
                    .setDescription(result[i].link)

                    //Sends embed
                    const m = await interaction.followUp({embeds: [embed] });

                    //Makes it a poll by adding reactions
                    await m.react("👍");
                    await m.react("👎");

                    console.log(winner);
                }, 1000 * 30); //30 second delay for each voting process
                
                //count the number of reactions after 20 seconds
                let plus = poll.reactions.cache.get('👍').count;
                let minus = poll.reactions.cache.get('👎').count;
                let score = plus - minus;

                //if the score is bigger, than make that game the winner
                if(score > winner.count){
                    winner.count = score;
                    winner.winnerID = result[i]._id;
                }
            }
        }

        const winnerGame = await gameListModel.find({ _id: winner._id}).then(async e  => {
            console.log(e);
        })
        
        
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