import { ChannelType } from "discord.js";
import { BOT_USER_ID, EVERYONE_ROLE_ID } from "../../configs/discord.configs.js";
import { MANAGE_CHANNELS_SEND_MESSAGES_BITWISE, SEND_MESSAGES_BITWISE } from "../../discord/discord.bitwise.js";
import { createChannel } from "../../discord/discord.http.js";

/**
 * This only needs to be run once during setup to create a channel and retrieve the id
 */

export const createFillAServerChannel = async () => {
  const createChannelRes = await createChannel({
    name: 'fill-a-server',
    type: ChannelType.GuildText,
    reason: 'Send a message when there are a good number of players online',
    permission_overwrites: [
      {
        id: EVERYONE_ROLE_ID,
        type: 0, // role
        deny: SEND_MESSAGES_BITWISE
      },
      {
        id: BOT_USER_ID,
        type: 1, // member
        allow: MANAGE_CHANNELS_SEND_MESSAGES_BITWISE // connect + manage channels
      },
    ]
  });    

  console.log(createChannelRes?.id, 'fillAServerChannelId')
}

