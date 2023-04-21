const { SlashCommandBuilder } = require('@discordjs/builders');
const momentTimezone = require('moment-timezone');
const scheduledSchema = require('../functions/scheduled-schema');

module.exports = {
    init: (client) => {
        const checkForPosts = async () => {
          const query = {
            date: {
              $lte: Date.now(),
            },
          }
    
          const results = await scheduledSchema.find(query)
    
          for (const post of results) {
            const { guildId, channelId, content } = post
    
            const guild = await client.guilds.fetch(guildId)
            if (!guild) {
              continue
            }
    
            const channel = guild.channels.cache.get(channelId)
            if (!channel) {
              continue
            }
    
            channel.send(content)
          }
    
          await scheduledSchema.deleteMany(query)
    
          setTimeout(checkForPosts, 1000 * 10)
        }
    
        checkForPosts()
    },

    data: new SlashCommandBuilder()
        .setName('shedule')
        .setDescription('Shedule a ping in UTC time')
        .addChannelOption((option) =>
        option
          .setName('channel')
          .setDescription('Specify channel')
          .setRequired(true),
        )
        .addStringOption((option) =>
        option
          .setName('message')
          .setDescription('Message to be sheduled')
          .setRequired(true),
        )
        .addStringOption((option) =>
        option
          .setName('year')
          .setDescription('Year in the format YYYY')
          .setRequired(true),
        )
        .addStringOption((option) =>
        option
          .setName('month')
          .setDescription('Month in the format MM')
          .setRequired(true),
        )
        .addStringOption((option) =>
        option
          .setName('date')
          .setDescription('Date in the format DD')
          .setRequired(true),
        )
        .addStringOption((option) =>
        option
          .setName('hour')
          .setDescription('Hour in the format of HH, according to am and pm')
          .setRequired(true),
        )
        .addStringOption((option) =>
        option
          .setName('minute')
          .setDescription('Minute in the format mm')
          .setRequired(true),
        )
    ,
    async execute(interaction)
    {
        const dateData = {
            guildID: interaction.guildId,
            channel: interaction.options.getChannel('channel'),
            message: interaction.options.getString('message'),

            year: parseInt(interaction.options.getString('year')),
            month: parseInt(interaction.options.getString('month')) - 1,    //Month is for some reason +1 to user input
            date: parseInt(interaction.options.getString('date')),

            hour: parseInt(interaction.options.getString('hour')) + 2,      //Hour is for some reason -2 to user input
            minute: parseInt(interaction.options.getString('minute')),
        }

        const targetDate = new Date(dateData.year, dateData.month, dateData.date, dateData.hour, dateData.minute)
        console.log(targetDate);

          await new scheduledSchema({
            date: targetDate.valueOf(),
            content: dateData.message,
            guildId: dateData.guildID,
            channelId: dateData.channel,
          }).save()

          await interaction.reply('Message has been scheduled');
    }
}