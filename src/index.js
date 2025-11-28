require('dotenv').config();
const {Client, IntentsBitField, EmbedBuilder} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('clientReady', (c) => {
    console.log(`${c.user.tag} is online!`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return
    }
    
    if (message.content === 'hello') {
        message.reply('FUCK YOU');
    };
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    
    // HEY
    if (interaction.commandName === 'hey') {
        interaction.reply('hey!');
    }

    // PING
    if (interaction.commandName === 'ping') {
        interaction.reply('pong!');
    }

    // ADD
    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;

        interaction.reply(`The sum of ${num1} and ${num2} is ${num1 + num2}`);
    }

    // GITHUB & INFO
    if (interaction.commandName === 'github') {
        const embed = new EmbedBuilder()
            .setTitle("Rowlet's Information!")
            .setDescription("This is all of Rowlet's important information!\n\nRowlet is a Discord bot created by @robbyunderdog. His creation was originally an experiment with using discord.js over discord.py. Rowlet has evolved to be much more than that though.\n\n> https://github.com/robbyunderdog/discordBotRowlet")
            .setImage("https://preview.redd.it/why-rowlet-is-the-best-v0-3e6sa5klo4ne1.jpg?width=1080&crop=smart&auto=webp&s=d41ed2edaa0e31c21a9525022e19b08d77b93575")
            .setColor("#1b7e3c")
            .setFooter({
                text: "FUCK Litten, all my homies hate that guy.",
                iconURL: "https://preview.redd.it/why-rowlet-is-the-best-v0-3e6sa5klo4ne1.jpg?width=1080&crop=smart&auto=webp&s=d41ed2edaa0e31c21a9525022e19b08d77b93575",
            })
            .setTimestamp();
        interaction.reply({embeds: [embed]});
    }
});

client.login(process.env.TOKEN);