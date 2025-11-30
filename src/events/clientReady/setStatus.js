const {ActivityType} = require('discord.js');

module.exports = (client) => {
    
    let status = [
        {
            name: 'All my homies hate Litten',
            type: ActivityType.Streaming,
        },
        {
            name: 'All my homies hate Popplio',
            type: ActivityType.Streaming,
        },
        {
            name: 'All my homies love Rowlet',
            type: ActivityType.Streaming,
        },
        {
            name: 'IncineFRAUD',
            type: ActivityType.Streaming,
        },
    ]

    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    }, 20000);
};