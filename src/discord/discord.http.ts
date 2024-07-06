import { ChannelType, Routes } from 'discord.js';

import { IncompleteCreateChannelRes } from './discord.types.js';
import { rest } from './discord.rest.js';
import { GUILD_ID } from '../configs/discord.configs.js';

export const createChannel = async (args: {
  name: string,
  type: ChannelType,
  permission_overwrites?: { id: string, type: number, allow?: string, deny?: string }[],
  reason?: string
}): Promise<IncompleteCreateChannelRes> => {
  return (rest.post(Routes.guildChannels(GUILD_ID), { body: args }) as Promise<IncompleteCreateChannelRes>) ; 
}

export const sendMessageToChannel = async (args: { channelId: string, message: string }) => {
  const { channelId, message } = args;
  return rest.post(Routes.channelMessages(channelId), {
    body: {
      content: message,
    }
  });
}

export const updateChannel = async (channelId: string, name: string) => {
  return rest.patch(Routes.channel(channelId), { body: { name } });
}
