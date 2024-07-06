import { FILL_A_SERVER_CHANNEL_ID, MINIMUM_PLAYER_COUNT_TO_NOTIFY } from "../../configs/discord.configs.js";
import { sendMessageToChannel } from "../../discord/discord.http.js";
import { getPlayerCount } from "../../steam/steam.http.js";

export const handleFillAServer = async (): Promise<void> => {
  console.log('Updating fill-a-server', new Date().toISOString())
  const { data } = await getPlayerCount();

  const start = Date.now();

  if (parseInt(data.response.player_count) < MINIMUM_PLAYER_COUNT_TO_NOTIFY) {
    console.log('Skipping fill-a-server', new Date().toISOString())
    return;
  }

  await sendMessageToChannel({
    channelId: FILL_A_SERVER_CHANNEL_ID,
    message: `:fire: There are currently ${data.response.player_count} players online, come join us! :fire:`,
  })

  console.log('Updated existing channel..', Date.now() - start);
}
