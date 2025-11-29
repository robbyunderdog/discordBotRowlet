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
            await interaction.editReply('You cannot ban that user. They own this shit.')
            return;
        }
        
        const targetUserRolePosition = targetUser.roles.highest.position; // gets targets highest role
        const requestUserRolePosition = interaction.member.roles.highest.position; // gets requesters highest role
        const botRolePosition = interaction.guild.members.me.roles.highest.position; // gets bots highest role
        
        if (targetUserRolePosition >= requestUserRolePosition) { // checks if target has greater or equal roles to requester
            interaction.editReply('You can\'t ban that user as they have the same and/or higher role than you.');
            return;
        }
        
        if (targetUserRolePosition >= botRolePosition) { // checks if target has greater or equal roles to bot
            interaction.editReply('I can\'t ban that user because they have the same and/or higher role than me.');
            return;
        }
        
        // BANS THE TARGET
        try {
            await targetUser.ban({reason});
            await interaction.editReply(`User ${targetUser} was banned.\nReason: ${reason}`);
        } catch (error) {
            console.log(`There was an error with banning the user: ${error}`);
        }
    },
    
    name: 'ban',
    description: 'Brings the hammer.',
    options: [
        {
            name: 'target-user',
            description: 'User you want to ban.',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'reason',
            description: 'Reason for the ban.',
            type: ApplicationCommandOptionType.String,
        }
    ],

    permissionsRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers],
}