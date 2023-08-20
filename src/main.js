import { Client, Events, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
import vueInit from '@/core/vue'
import { loadCommands, loadEvents } from '@/core/loader.js'
import { useAppStore } from '@/store/app.js'

vueInit()
dotenv.config() //存取環境變數檔中的變數
loadCommands()

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const appStore = useAppStore()
appStore.client = client
loadEvents()

client.login(process.env.TOKEN);