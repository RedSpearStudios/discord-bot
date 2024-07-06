import { handleFillAServer } from "./post.message.js";

/**
 * The discord rate limits are quite aggressive
 * Official documentation was light at the time: this interval doesn't hit rate limits
 */
const FILL_A_SERVER_UPDATE_INTERVAL_IN_MS = 60 * 30 * 1000;

export const updateFillAServer = async () => {
  // Run on startup
  await handleFillAServer().catch(e => console.error(e));

  // Then run on an interval
  setInterval(async () => {
    await handleFillAServer().catch(e => console.error(e));
  }, FILL_A_SERVER_UPDATE_INTERVAL_IN_MS)
}
