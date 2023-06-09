require('dotenv').config();

const {REST} = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Collection, Partials, GatewayIntentBits, IntentsBitField, Intents } = require('discord.js');
const { Guilds, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const mongoose = require('mongoose')
const DATABASE = process.env.DATABASE;


const fs = require('fs');
const path = require('path');
const scheduledModel = require('./models/scheduled-schema');


const myIntents = new IntentsBitField();
myIntents.add(
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers);


const client = new Client({
    intents: [Guilds, GuildMessages, myIntents],
    partials: [User, Message, GuildMember, ThreadMember]
});

const { loadEvents } = require('./Handlers/eventHandler');

// List of all commands
const commands = [];
client.commands = new Collection();
client.events = new Collection();
loadEvents(client);

const commandsPath = path.join(__dirname, "commands"); // E:\yt\discord bot\js\intro\commands
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

client.on("ready", () => {
    // Get all ids of the servers
    const guild_ids = client.guilds.cache.map(guild => guild.id);


    const rest = new REST({version: '9'}).setToken(process.env.TOKEN);
    for (const guildId of guild_ids)
    {
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), 
            {body: commands})
        .then(() => console.log('Successfully updated commands for guild ' + guildId))
        .catch(console.error);
    }

    mongoose
        .connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((m) => {
            console.log('Connected to database established');
            SheduledMessagesCheck();
        })
        .catch((err) => console.log(err))
});

client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    try
    {
        await command.execute(interaction);
    }
    catch(error)
    {
        console.error(error);
        await interaction.reply({content: "There was an error executing this command"});
    }
});
    

client.login(process.env.TOKEN);

//Reading for scheduled messages from mongodb
async function SheduledMessagesCheck(){
    setInterval(async () => { 
        //Get the messages that are planned
        const result = await scheduledModel.find({ name: 'SheduledMessage'});

        if(result.length == 0){                                 //If no entries are found then log
            console.log('No scheduled messages exist');
        } else {                                                //Else then check each message
            for(let i = 0; i < result.length; i++){
                if(result[i].date < new Date()){                //Should it be sent yet?
                    //log the message time, current time and content for diagnostics 
                    console.log('\nContent: ' + result[i].content + 
                    '\nScheduled Time: ' + result[i].date + 
                    '\nCurrent Time: ' + new Date());

                    //get channel, then remove filler characters <, # og >
                    const channel = await client.channels.fetch(result[i].channelId.replace('<','').replace('#','').replace('>','')); 

                    //send scheduled message in the specified channel
                    channel.send(result[i].content);      
                    
                    //Remove the message from the database
                    await scheduledModel.findOneAndRemove({ _id: result[i]._id });
                    console.log('Successfully sent and removed the scheduled message');
                }
            }
        }
    }, 1000 * 60) //Checks the database every 60s
}
