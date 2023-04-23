const { ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ButtonStyle, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gamepoll')
        .setDescription('create a yes/no poll')
        .addStringOption(option => 
           option
            .setName('gamename')
            .setDescription('Provide the name of the game')
            .setRequired(true)
        ),

        /**
         * 
         * @param { ChatInputCommandInteraction } interaction 
         */


    async execute(interaction) {
        
        const GamNam = interaction.options.getString('gamename');


        const pollembed = new EmbedBuilder()
            .setDescription('Do you want to play: ' + GamNam)
            .addFields([
                { name: "Yes's", value: "0", inline: true },
                { name: "No's", value: "0", inline: true }
            ])
            .setColor([104, 204, 156]);

        const replyObject = await interaction.reply({embeds: [pollembed], fetchReply: true});
        
        const pollButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel("Yes")
                .setCustomId(`Poll-Yes-${replyObject.id}`)
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setLabel("No")
                .setCustomId(`Poll-No-${replyObject.id}`)
                .setStyle(ButtonStyle.Danger),
        )
        interaction.editReply({components: [pollButtons]});

    }

}