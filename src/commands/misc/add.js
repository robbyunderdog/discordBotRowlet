const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: 'add',
    description: 'Add two numbers together.',
    // devOnly: true,
    // testOnly: true,
    // deleted: true,
    options: [
        {
            name: 'first-number',
            description: 'The first number to add.',
            required: true,
            type: ApplicationCommandOptionType.Number,
        },
        {
            name: 'second-number',
            description: 'The second number to add.',
            required: true,
            type: ApplicationCommandOptionType.Number,
        },
    ],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;

        interaction.editReply(`The sum of ${num1} and ${num2} is ${num1 + num2}`);
    }
}