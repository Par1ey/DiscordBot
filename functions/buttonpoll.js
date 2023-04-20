const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ButtonStyle } = require('discord.js');

module.exports = class buttonpoll {
    constructor(x){
        this.x = x;
    }

    async execute() {
        
        const GamNam = this.x;

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
                .setCustomId(`Poll-No${replyObject.id}`)
                .setStyle(ButtonStyle.Danger),
        )
        interaction.editReply({components: [pollButtons]});

    }

}