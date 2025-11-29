const {ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');

module.exports = {
    // deleted: true,
    name: 'ban',
    description: 'Brings the Hammer.',
    // devOnly: Boolean,
    // testOnly: Boolean,

    options: [
        {
            name: 'target-user',
            description: 'The user you want to ban.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'The reason for the ban.',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],

    callback: (client, interaction) => {
        interaction.reply('ban..');
    }
}