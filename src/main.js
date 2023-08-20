import { Client, Events, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
import vueInit from '@/core/vue'

import { loadCommands } from '@/core/loader.js'

loadCommands()

vueInit()
dotenv.config() //存取環境變數檔中的變數

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.TOKEN);