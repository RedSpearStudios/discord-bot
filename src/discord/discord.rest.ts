import { REST } from 'discord.js';
import { DISCORD_TOKEN } from '../configs/discord.configs.js';

export const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);
