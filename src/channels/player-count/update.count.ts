import { PLAYER_COUNT_CHANNEL_ID } from "../../configs/discord.configs.js";
import { updateChannel } from "../../discord/discord.http.js";
import { getPlayerCount } from "../../steam/steam.http.js";
import { constructChannelName } from "./helpers.js";

export const handlePlayerChannelCount = async (): Promise<void> => {
  const { data } = await getPlayerCount();
  const name = constructChannelName(data.response.player_count)
  const start = Date.now();

  console.log('Updating existing channel..', name, new Date().toISOString())
  await updateChannel(PLAYER_COUNT_CHANNEL_ID, name);
  console.log('Updated existing channel..', name, Date.now() - start);
}

