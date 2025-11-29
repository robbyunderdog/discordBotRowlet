const {Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
    */
    
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || 'No reason provided.';

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if (!targetUser) {
            await interaction.editReply('That user does not exist in this server.');
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply('You cannot kick that user. They own this shit.')
            return;
        }
        
        const targetUserRolePosition = targetUser.roles.highest.position; // gets targets highest role
        const requestUserRolePosition = interaction.member.roles.highest.position; // gets requesters highest role
        const botRolePosition = interaction.guild.members.me.roles.highest.position; // gets bots highest role
        
        if (targetUserRolePosition >= requestUserRolePosition) { // checks if target has greater or equal roles to requester
            interaction.editReply('You can\'t kick that user as they have the same and/or higher role than you.');
            return;
        }
        
        if (targetUserRolePosition >= botRolePosition) { // checks if target has greater or equal roles to bot
            interaction.editReply('I can\'t kick that user because they have the same and/or higher role than me.');
            return;
        }
        
        // KICKS THE TARGET
        try {
            await targetUser.kick(reason);
            await interaction.editReply(`User ${targetUser} was kicked.\nReason: ${reason}`);
        } catch (error) {
            console.log(`There was an error with kicking the user: ${error}`);
        }
    },

    name: 'kick',
    description: 'Kicks target from server.',
    options: [
        {
            name: 'target-user',
            description: 'User you want to kick.',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'reason',
            description: 'Reason for the kick.',
            type: ApplicationCommandOptionType.String,
        }
    ],

    permissionsRequired: [PermissionFlagsBits.KickMembers],
    botPermissions: [PermissionFlagsBits.KickMembers],
}