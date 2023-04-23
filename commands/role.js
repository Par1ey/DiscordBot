const { SlashCommandBuilder } = require('@discordjs/builders');
const { GuildMember, Role } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Creates new role')
        .addUserOption((option) =>
        option
            .setName('recipient')
            .setDescription('Recipient of the new role')
            .setRequired(true))
        .addStringOption((option) => 
        option
            .setName('name')
            .setDescription('Name of the role')
            .setRequired(true))
        /*.addChannelOption((option) =>
        option
            .setName('channel')
            .setDescription('Specify channel')
            .setRequired(true),
    )*/
    ,
    async execute(interaction)
    {
        const { options } = interaction;
        const userID = options.getUser('recipient'); 
        const roleName = options.getString('name');
        var newRole = new Role();

        const guildID = await interaction.commandGuildId
        await interaction.client.guilds.fetch(guildID).then(async guild => {
            await guild.roles.create({
            name: roleName,
            color: '#0000FF',
            reason: 'we needed a role for Super Cool People'}).then(role =>{
                newRole = role;
                interaction.reply("The role: " + role.name + ' was created');
            });
        })

        var user = await interaction.guild.members.fetch(userID);
        user.roles.add(newRole);
    }
}