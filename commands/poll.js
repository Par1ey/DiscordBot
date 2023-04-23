const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Counter  = require('../functions/questioncounter');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll with up to five options.')
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('Specify channel')
        .setRequired(true),
    )
    .addStringOption((option) =>
       option
        .setName('question')
        .setDescription('the question')
        .setRequired(true)
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
    .addStringOption((option) =>
       option
        .setName('option3')
        .setDescription('The option'),
    )
    .addStringOption((option) =>
       option
        .setName('option4')
        .setDescription('The option'),
    )
    .addStringOption((option) =>
       option
        .setName('option5')
        .setDescription('The option'),
    ),
async execute(interaction) {
    const { options } = interaction;
    
    const channel = options.getChannel('channel');
    const question = options.getString('question');
    const option = options.getString('option');
    const option2 = options.getString('option2');
    const option3 = options.getString('option3');
    const option4 = options.getString('option4');
    const option5 = options.getString('option5');
    
    let counter = new Counter(option, option2, option3, option4, option5);

    const embed = new EmbedBuilder()
        .setTitle(question)
        .setColor("Gold")
        .setDescription(counter.question())
        .setTimestamp();

    let pollreactions = { // For Multiple Choices
      1: '0️⃣',
      2: '1️⃣',
      3: '2️⃣',
      4: '3️⃣',
      5: '4️⃣',
      6: '😢',
    }

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