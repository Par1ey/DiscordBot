const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('question')
    .setDescription('Create a quick single question poll.')
    .addStringOption((option) =>
      option
        .setName('question')
        .setDescription('The question')
        .setRequired(true),
    )
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('Specify channel')
        .setRequired(true),
    ),
async execute(interaction) {
    const { options } = interaction;

    const channel = options.getChannel('channel');
    const question = options.getString('question');

    const embed = new EmbedBuilder()
        .setColor("Gold")
        .setDescription(question)
        .setTimestamp();

    try {
      const m = await channel.send({ embeds: [embed] });
      await m.react("👍");
      await m.react("👎");
      await interaction.reply("Shit sent :)");
    } catch (err){
      console.log(err);
    }
  }
}; 