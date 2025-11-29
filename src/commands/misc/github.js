const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'github',
    description: 'Rowlet\'s Github!',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,

    callback: async (client, interaction) => {
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
}