import axios from 'axios';
import { STEAM_GAME_ID } from '../configs/discord.configs.js';

export const getPlayerCount = async () => {
  const res = await axios.get(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=${STEAM_GAME_ID}`);
  return res;
}
