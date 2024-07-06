import { config } from 'dotenv'
config();
import env from 'env-var';

/**
 * See README.md for setting these up
 */
export const DISCORD_TOKEN = env.get('DISCORD_TOKEN').required().asString();
export const BOT_USER_ID = env.get('BOT_USER_ID').required().asString();

/**
 * These should be the same value but have been broken out for import readability
 */
export const GUILD_ID = env.get('GUILD_ID').required().asString();
export const EVERYONE_ROLE_ID = env.get('EVERYONE_ROLE_ID').required().asString();

export const PLAYER_COUNT_CHANNEL_ID = env.get('PLAYER_COUNT_CHANNEL_ID').required().asString();
export const FILL_A_SERVER_CHANNEL_ID = env.get('FILL_A_SERVER_CHANNEL_ID').required().asString();

// Get from steam
export const STEAM_GAME_ID = env.get('STEAM_GAME_ID').required().asIntPositive();

// The minimum player count to notify in the fill-a-server channel
export const MINIMUM_PLAYER_COUNT_TO_NOTIFY = env.get('MINIMUM_PLAYER_COUNT_TO_NOTIFY').required().asIntPositive();
