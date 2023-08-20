// 註冊與更新commands
import { REST, Routes } from 'discord.js'

// 發送http請求
// 此處因為guildId固定，而寫死，該指令只會註冊到該伺服器
// 未用傳參的方式，建議在以下函式中傳入guildId參數
const updateSlashCommands = () => {
    //也可用axios或fetch，但我們選用discord.js提供的方式
    const rest = new REST({version: 10}).setToken(process.env.TOKEN)
    rest.put(
        //設定url
        Routes.applicationGuildCommands(
            process.env.APPICATION_ID,
            '1142848137078251700'
        ),
        {
            body: {}
        }   
    )
}