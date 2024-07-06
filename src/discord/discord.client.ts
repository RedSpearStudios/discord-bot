import { Client, GatewayIntentBits } from 'discord.js';
import { updateChannelPlayerCount } from '../channels/player-count/interval.handler.js';
import { updateFillAServer } from '../channels/fill-a-server/interval.handler.js';
import { DISCORD_TOKEN } from '../configs/discord.configs.js';

export const initialiseClient = () => {
  console.log('Initialising Discord client...');
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.on('ready', async () => {
    updateChannelPlayerCount().catch(e => {
      console.error(e);
    })

    updateFillAServer().catch(e => {
      console.error(e);
    })
  });

  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }
  });

  client.login(DISCORD_TOKEN);
  console.log('Discord client initialised...');
}
