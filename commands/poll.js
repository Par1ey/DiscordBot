const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Counter  = require('../functions/questioncounter');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll with up to five questions.')
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('Specify channel')
        .setRequired(true),
    )
    .addStringOption((option) =>
    option
      .setName('question')
      .setDescription('The question')
      .setRequired(true),
    )
    .addStringOption((option) =>
    option
      .setName('question2')
      .setDescription('The question'),
    )
    .addStringOption((option) =>
    option
      .setName('question3')
      .setDescription('The question'),
    )
    .addStringOption((option) =>
    option
      .setName('question4')
      .setDescription('The question'),
    )
    .addStringOption((option) =>
    option
      .setName('question5')
      .setDescription('The question'),
    )
    ,
async execute(interaction) {
    const { options } = interaction;

    let pollreactions = { // For Multiple Choices
      1: '0️⃣',
      2: '1️⃣',
      3: '2️⃣',
      4: '3️⃣',
      5: '4️⃣',
      6: '😢',
  }
    
    const channel = options.getChannel('channel');
    const question = options.getString('question');
    const question2 = options.getString('question2');
    const question3 = options.getString('question3');
    const question4 = options.getString('question4');
    const question5 = options.getString('question5');
    
    let counter = new Counter(question, question2, question3, question4, question5);

    const embed = new EmbedBuilder()
        .setTitle('Penis')
        .setColor("Gold")
        .setDescription(counter.question())
        .setTimestamp();

    try {
      const m = await channel.send({ embeds: [embed] });
      if(counter.reaction() == 1){
        await m.react(pollreactions[1]);
        await interaction.reply("Shit sent :)");
      } else if(counter.reaction() == 2){
        await m.react(pollreactions[1]);
        await m.react(pollreactions[2]);
        await interaction.reply("Shit sent :)");
      } else if(counter.reaction() == 3){
        await m.react(pollreactions[1]);
        await m.react(pollreactions[2]);
        await m.react(pollreactions[3]);
        await interaction.reply("Shit sent :)");
      } else if(counter.reaction() == 4){
        await m.react(pollreactions[1]);
        await m.react(pollreactions[2]);
        await m.react(pollreactions[3]);
        await m.react(pollreactions[4]);
        await interaction.reply("Shit sent :)");
      } else {
        await m.react(pollreactions[1]);
        await m.react(pollreactions[2]);
        await m.react(pollreactions[3]);
        await m.react(pollreactions[4]);
        await m.react(pollreactions[5]);
        await interaction.reply("Shit sent :)");
      }
    } catch (err){
      console.log(err);
    }
  }
}; 