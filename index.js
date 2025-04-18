const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');

const app = express();
const PORT = process.env.PORT || 3000;

// Your Discord application's public key (from https://discord.com/developers/applications)
const PUBLIC_KEY = 'b0db805b8c4ad83f9f9b35e1e58c60528ed647080eb85bb39c8d84ebcf85367d';

app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
    const interaction = req.body;

    if (interaction.type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }

    if (interaction.type === InteractionType.APPLICATION_COMMAND && interaction.data.name === 'artillery') {
        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: 'remember us. @here https://discord.gg/9aQkgVTM2K ',
            },
        });
    }

    res.status(400).send('Unknown interaction');
});

app.listen(PORT, () => {
    console.log(`⚡ App listening on port ${PORT}`);
});
