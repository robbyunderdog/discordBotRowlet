require('dotenv').config();
const {Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const roles = [
    {
        id: '1443883077582721116',
        label: 'RED'
    },
    {
        id: '1443883128757420132',
        label: 'BLUE'
    },
    {
        id: '1443883155806359563',
        label: 'GREEN'
    }
]

client.on('clientReady', async (c) => {
    try {
        const channel = await client.channels.cache.get('1443389164090425516');
        if (!channel) {
            return;
        }

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder()
                    .setCustomId(role.id)
                    .setLabel(role.label)
                    .setStyle(ButtonStyle.Primary)
            );
        });

        await channel.send({
            content: 'Claim or remove a role below!',
            components: [row]
        });

        process.exit();

    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.TOKEN);