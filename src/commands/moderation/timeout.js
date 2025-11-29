const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const ms = require('ms');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        const mentionable = interaction.options.get('target-user').value;
        const duration = interaction.options.get('duration').value;
        const reason = interaction.options.get('reason')?.value || 'No reason provided.';

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(mentionable);
        if (!targetUser) {
            await interaction.editReply('That user doesn\'t exist on the server.');
            return;
        }

        if (targetUser.user.bot) {
            await interaction.editReply('I can\'t timeout a bot.');
            return;
        }

        const msDuration = ms(duration);
        if (isNaN(msDuration)) {
            await interaction.editReply('Please provide a valid timeout duration.');
            return;
        }

        if (msDuration > 5000 || msDuration < 2.419e9) {
            await interaction.editReply('Timeout duration can\'t be less than 5 seconds or more than 28 days.');
        }

        const targetUserRolePosition = targetUser.roles.highest.position; // gets targets highest role
        const requestUserRolePosition = interaction.member.roles.highest.position; // gets requesters highest role
        const botRolePosition = interaction.guild.members.me.roles.highest.position; // gets bots highest role

        if (targetUserRolePosition >= requestUserRolePosition) { // checks if target has greater or equal roles to requester
            interaction.editReply('You can\'t timeout that user as they have the same and/or higher role than you.');
            return;
        }

        if (targetUserRolePosition >= botRolePosition) { // checks if target has greater or equal roles to bot
            interaction.editReply('I can\'t timeout that user because they have the same and/or higher role than me.');
            return;
        }

        //TIMES OUT TARGET
        try {
            const {default: prettyMs} = await import('pretty-ms');

            if (targetUser.isCommunicationDisabled()) {
                await targetUser.timeout(msDuration, reason);
                await interaction.editReply(`${targetUser}'s timeout has been changed to ${prettyMs(msDuration, {verbose: true})}.\nReason: ${reason}`);
                return;
            }

            await targetUser.timeout(msDuration, reason);
            await interaction.editReply(`${targetUser} was timed out for ${prettyMs(msDuration, {verbose: true})}.\nReason: ${reason}`)

        } catch (error) {
            console.log(`There was an error when timing out the target: ${error}`);
        }
    },
    
    name: 'timout',
    description: 'Timeout a user.',
    options: [
        {
            name: 'target-user',
            description: 'The user you want to timeout.',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'duration',
            description: 'The amount of time for timeout (30m, 1h, 1 day, etc).',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for the timeout.',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.MuteMembers],
    botPermissions: [PermissionFlagsBits.MuteMembers],
}