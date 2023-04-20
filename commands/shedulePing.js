const { SlashCommandBuilder } = require('@discordjs/builders');
var cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shedule')
        .setDescription('Shedule a ping')
        .addChannelOption((option) =>
        option
          .setName('channel')
          .setDescription('Specify channel')
          .setRequired(true),
        )
        .addStringOption((option) =>
        option
          .setName('option')
          .setDescription('The option')
          .setRequired(true),
        )
        .addStringOption((option) =>
        option
          .setName('option2')
          .setDescription('The option')
          .setRequired(true),
      )
    ,
    async execute(interaction)
    {
        cron.schedule('5 * * * * *', async () => {
            await interaction.reply('Pong!');
          });
    }
}