import { parseJosnFile, writeJosnFile } from "../utils/utils"
import { Config } from "../type/config"
import { runCmdSync } from "../utils/command"

const fs = window.require('fs')

//全局数据库

//只读配置read only=======================================================================================
const roConfig = {
    id: '230708',
    clientVer: 'V0.2.230708_preview',
    url: {
        home: 'https://www.hotpe.top/',
        github: 'https://github.com/VirtualHotBar/HotPE_Client',
        docs: 'https://docs.hotpe.top/',
        blog: 'https://blog.hotpe.top/',
        donate: 'https://www.hotpe.top/donation/',
        update: {
            PE: 'https://api.github.com/repos/VirtualHotBar/HotPEToolBox/releases/latest',
            client: 'https://api.github.com/repos/VirtualHotBar/HotPE_Client/releases/latest'
        },
        package: {
            PE: 'https://p0.hotpe.top/Package/PE/{id}.7z',
            client: 'https://p0.hotpe.top/Package/Cilent/{id}.7z'
        }
    },
    path:{
        execDir:process.cwd()+'\\',
        tools:'.\\resources\\tools\\',
        resources:{
            pe:'.\\resources\\files\\pe\\',
            client:'.\\resources\\files\\client\\'
        }
        
    },
    environment: {
        sysLetter: runCmdSync('echo %SystemDrive%').substring(0,2)+'\\',
        temp:runCmdSync('echo %temp%').replaceAll('\r\n',''),
        userName:runCmdSync('echo %UserName%').replaceAll('\r\n','')
    }
}

//动态配置================================================================================================
const configPath = './resources/config.json'

//默认配置
let config: Config = {
    api: 'https://api.hotpe.top/',
    state: {
        install:'noDown',
        update:'without'
    },
    environment: {
        HotPEDrive: {
            new: { drive: '', isMove: false ,version:''},
            all: []
        },
        ware: {
            disks: []
        }

    },
    resources: {
        pe: {
            new: '',
            all: [],
            update: {
                id: '',
                name: '',
                description: '',
                url: '',
                date: ''
            }
        },
        client: {
            new: '',
            all: [],
            update: {
                id: '',
                name: '',
                description: '',
                url: '',
                date: ''
            }
        }
    }, directory: {

    },
    notice: {
        show: false,
        type: 'info',
        content: ''
    },download:{
        thread:8
    }
}


if (fs.existsSync(configPath)) {
    //如果配置文件存在，则读取配置
    config = parseJosnFile(configPath)
} else {
    //如果配置文件不存在，则使用默认配置
    //默认配置

    saveConfig()
}

//保存配置
function saveConfig() {
    writeJosnFile(configPath, config)
}

export { config, roConfig, saveConfig }