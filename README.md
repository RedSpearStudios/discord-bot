# discord

Where the discord bot lives.

## Overview

The discord bot currently handles two concepts:

1. A non-joinable voice channel that is renamed with the current player count at given intervals. The interval is controlled by the `CHANNEL_NAME_UPDATE_INTERNAL_IN_MS` value in the code base.
2. A `#fill-a-server` channel which is posted to when the play count goes above a certain threshold, at given intervals. The interval is controlled by the `FILL_A_SERVER_UPDATE_INTERVAL_IN_MS` value in the code base.

## Requirements

- In order for the bot to run you must have a bot user in your server/guild who has the ability to manage channels.

## Setup

We will now guide you through setup. As you retrieve the values in this guide you should add them to your `.env` file (see `.example.env`) in the root directory (if running locally) or as environment variables in your CI/CD pipeline.

### Creating a bot

- Create a bot at discord.com/developers/applications
- Set the token you get on creation as the `DISCORD_TOKEN` in your `.env` file.
- Retrieve your `BOT_ID` from the url of your bot's page. It should look something like this: `https://discord.com/developers/applications/BOT_ID_HERE/information`.
  - Login to the discord developer portal > Applications > Your Application > Information ^
  - Add it to your `.env` file as `BOT_ID`.


N.B. https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot

### Adding bot to server

- You will need to be an admin of the server you are adding the bot to (or at least have the correct permissions to add a bot to a server).
- Select your application in the discord dev portal, click OAuth2, then url generator, add the `bot` scope > with `Manager Server`, `Manage Channels` & `Send Messages` bot permissions.
- That should generate a url that looks something like this: `https://discord.com/api/oauth2/authorize?client_id=BOT_ID&permissions=2096&scope=bot`.
  - N.B. The permissions are bitwise: `2096` reflects the permissions required for the actions of this bot.
- Follow the prompts and your bot should be added to your server

### Guild configs

- Get the `EVERYONE_ROLE_ID` of your Discord Server. This is easy to retrieve as it is the same as your `GUILD_ID`. You can get this from the url of your server.
  - Red Spear Studios' is `621904483219144717`, extracted from: `https://discord.com/channels/621904483219144717/1004433263860908122`.
  - N.B. Login to the discord the web app on a browser to see server URLs.
  - Set the `EVERYONE_ROLE_ID` & `GUILD_ID` in your environment variables (these are the same value)

### Creating the channels

- There are two files in the repository you can run with `tsx` to create online player count and fill-a-server channels for your server.

- Run `npm install`

- Run `tsx ./channels/player-count/helper.ts`
  - The output in the CLI will tell you the channelId.
  - Take this id update the `PLAYER_COUNT_CHANNEL_ID` environment variable.

- Run `tsc ./channels/fill-a-server/helper.ts`
  - The output in the CLI will tell you the channelId.
  - Take this id update the `FILL_A_SERVER_CHANNEL_ID` environment variable.

- You should see in your server that both channels have been created.

#### Other required environment variables
- After this, you should also set the `STEAM_GAME_ID` for your game to get the online player count from the Steam API
- You should also set the `MINIMUM_PLAYER_COUNT_TO_NOTIFY` to the minimum player count you want to be notified about in the `#fill-a-server` channel.


You should now be ready to run the bot.

## Running

You can run the service locally by running `npm run start`. 

On start-up the bot will check for updates required to player count + fill-a-server channels. It will then run on set intervals for further updates defined in the `interval.handler.ts` files

## Rate limiting

The discord API is rate limited, and the documentation is pretty sketchy on what the limits are. 

We have found that 6 minute intervals are a near maximum for the kind of updates we are performing.
