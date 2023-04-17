const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a quick multiple question poll.')
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('Specify channel')
        .setRequired(true),
    )
    .addIntegerOption((option) =>
    option
      .setName('questionNumber')
      .setDescription('Number of questions')
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

    const pollreactions = { // For Multiple Choices
        1: '🇦',
        2: '🇧',
        3: '🇨',
        4: '🇩',
        5: '🇪',
        6: '🇫',
        7: '🇬',
        8: '🇭',
        9: '🇮',
        10: '🇯',
        11: '🇰',
        12: '🇱',
        13: '🇲',
        14: '🇳',
        15: '🇴',
        16: '🇵',
        17: '🇶',
        18: '🇷',
        19: '🇸',
        20: '🇹',
    }

    const x = 4;
    
    const channel = options.getChannel('channel');
    const number = options.getNumber('questionNumber');
    const question = options.getString('question');
    const question2 = options.getString('question2');
    const question3 = options.getString('question3');
    const question4 = options.getString('question4');
    const question5 = options.getString('question5');

    const descriptions = [];
    descriptions.push(question,
         question + '\n' + question2,
          question + '\n' + question2 + '\n' + question3,
           question + '\n' + question2 + '\n' + question3 + '\n' + question4,
            question + '\n' + question2 + '\n' + question3 + '\n' + question4 + '\n' + question5);

    const embed = new EmbedBuilder()
        .setColor("Gold")
        .setDescription(descriptions[number])
        .setTimestamp();

    try {
      const m = await channel.send({ embeds: [embed] });
      m.react(pollreactions[x + 1]);
      await interaction.reply("Shit sent :)");
    } catch (err){
      console.log(err);
    }
  }
}; 