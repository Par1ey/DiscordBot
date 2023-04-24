const Discord = require('discord.js');
    const client = new Discord.Client({
        intents: [Discord.GatewayIntentBits.DirectMessages, Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent, Discord.GatewayIntentBits.GuildModeration],
        partials: [Discord.Partials.Channel],
    });

const NoNoWords = ["retard", "nigger", "faggot"];
    

client.on('messageCreate', (message) => {
    for(var i = 0; i < NoNoWords.length; i++) {
        if (message.content.toLowerCase().includes(NoNoWords[i])) {
            if(message.member.permissions > client.permissions) {    
                message.member.timeout(60 * 60 * 1000);
                message.channel.send("Warning to <@" + message.author.id + "> for the use of offensive language.");
                console.log("Warning given to user " + message.author.id + " for the use of offensive language.");
            } else {
                message.channel.send("Warning to <@" + message.author.id + "> for the use of offensive language.");
                console.log("Warning given to user " + message.author.id + " for the use of offensive language.");
            }
        }
    }    
})
    
client.login('MTA5Nzc4NDc4OTgzNjI1MTE0Nw.GmTXfs.3kZGiyU-GJ7NdoWJCZ7Hi5FGbHFMpjbh79v93w');

