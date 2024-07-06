import dayjs from '../../dependencies/dayjs.js';

export const constructChannelName = (playerCount: number) => `🟢 | ${playerCount} | online | ${dayjs().utc().format('HH:mm')} UTC`
