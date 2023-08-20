// 註冊與更新commands
import { REST, Routes } from 'discord.js'
import fg from 'fast-glob'

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

    console.log(result)
}

// 使用fast-commands套件中的函式來遍歷所有index.js
export const loadCommands = async() => {
    const commands = []
    const files = await fg('./src/commands/**/index.js') // **代表搜尋所有目錄
    for(const file of files){
        const cmd = await import(file)
        console.log(cmd.command)
        commands.push(cmd.command)
    }

    await updateSlashCommands(commands)
}