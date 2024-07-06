import { handlePlayerChannelCount } from "./update.count.js";

/**
 * The discord rate limits are quite aggressive
 * Official documentation was light at the time: this interval doesn't hit rate limits
 */
const CHANNEL_NAME_UPDATE_INTERNAL_IN_MS = 60 * 6 * 1000;

export const updateChannelPlayerCount = async () => {
  // Run on startup
  await handlePlayerChannelCount().catch(e => console.error(e));

  // Then run on an interval
  setInterval(async () => {
    await handlePlayerChannelCount().catch(e => console.error(e));
  }, CHANNEL_NAME_UPDATE_INTERNAL_IN_MS)
}
