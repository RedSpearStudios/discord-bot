import { ChannelType } from "discord.js";
import { BOT_USER_ID, EVERYONE_ROLE_ID } from "../../configs/discord.configs.js";
import { CONNECT_BITWISE, CONNECT_MANNAGE_CHANNELS_BITWISE } from "../../discord/discord.bitwise.js";
import { createChannel } from "../../discord/discord.http.js";
import { constructChannelName } from "./helpers.js";
import { getPlayerCount } from "../../steam/steam.http.js";

/**
 * This only needs to be run once during setup to create a channel and retrieve the id
 */

export const createOnlinePlayerCountChannel = async () => {
  const { data } = await getPlayerCount();
  const name = constructChannelName(data.response.player_count)

  const createChannelRes = await createChannel({
    name,
    type: ChannelType.GuildVoice,
    reason: 'Creation of player count room',
    permission_overwrites: [
      {
        id: EVERYONE_ROLE_ID,
        type: 0, // role
        deny: CONNECT_BITWISE
      },
      {
        id: BOT_USER_ID,
        type: 1, // member
        allow: CONNECT_MANNAGE_CHANNELS_BITWISE // connect + manage channels
      },
    ]
  });    

  console.log(createChannelRes?.id, 'onlinePlayerCountChannelId')
}

