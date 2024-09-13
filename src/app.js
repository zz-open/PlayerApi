import Koa from 'koa'
import chalk from 'chalk'

import {initRouter} from './router/index.js'
import {defaultConfig} from './config/index.js'
import settingsConfig from '../settings.js'
import { toMerged } from './common/share/index.js'
import initMiddleware from './middleware/index.js'
const app = new Koa()

function main() {
    initHello()
    initGlobalConfig()
    
    if (!(global.APPLICATION_CONFIG.tecent.uin || global.APPLICATION_CONFIG.tecent.cookie)) {
        console.log(chalk.yellow(`😔 The configuration ${chalk.red('tecent.uin')} or your ${chalk.red('tecent.cookie')} in file ${chalk.green('settings.js')} has not configured. \n`));
        return
    }

    initMiddleware(app)
    initRouter(app)
    startServer()
}

function initHello(){
    console.log(chalk.green('\n🥳🎉 欢迎使用 仔仔音乐api服务. \n'));
    console.log(chalk.red('\n 支持 企鹅音乐, 网易云音乐. \n'));
}

function initGlobalConfig() {
    const config = toMerged(defaultConfig, settingsConfig)
    global.APPLICATION_CONFIG = config
} 

function startServer(){
    app.listen(global.APPLICATION_CONFIG.server.port, () => {
        console.log(chalk.green(`\n🎉🎉🎉 server running http://localhost:${global.APPLICATION_CONFIG.server.port} \n`));
    })
}

export default main