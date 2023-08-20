// 註冊與更新commands
import { REST, Routes, Collection } from 'discord.js'
import fg from 'fast-glob'
import { useAppStore } from '@/store/app'

// 此處因為guildId固定，而寫死，指令只會註冊到該伺服器
// 未用傳參的方式，建議在以下函式中傳入guildId參數
const updateSlashCommands = async (commands) => {
    // 使用discord.js提供的REST物件發送http請求
    const rest = new REST({version: 10}).setToken(process.env.TOKEN)
    const result = await rest.put(
        //設定url
        Routes.applicationGuildCommands(
            process.env.APPLICATION_ID,
            '1142848137078251700',
        ),
        {
            body: commands,
        },   
    )

    //console.log(result)
}

// 使用fast-commands套件中的函式來遍歷所有index.js
export const loadCommands = async() => {
    const appStore = useAppStore()
    const commands = []
    const actions = new Collection() // collection is a data structure in discord.js expends from map of js
    const files = await fg('./src/commands/**/index.js') // **代表搜尋所有目錄
    for(const file of files){
        const cmd = await import(file)
        console.log(cmd.command)
        commands.push(cmd.command)
        actions.set(cmd.command.name, cmd.action)
    }

    await updateSlashCommands(commands)
    appStore.commandsActionMap = actions
    console.log(appStore.commandsActionMap)
}

export const loadEvents = async () => {
    const appStore = useAppStore()
    const client = appStore.client
    const files = await fg('./src/events/**/index.js')
    for(const file of files){
        const eventFile = await import(file)

        if(eventFile.event.once){
            client.once(eventFile.event.name,eventFile.action)
        }
        else {
            client.on(eventFile.event.name,eventFile.action)
        }   
    }
}