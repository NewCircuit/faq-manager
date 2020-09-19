import * as commando from 'discord.js-commando';
import path from 'path'

import {connectToDb} from "./services/database";
import {loadConfig} from "./services/config";

export let config = loadConfig();
export const pg = connectToDb(config.database_url);

const client = new commando.CommandoClient({
    commandPrefix: '.faq',
    owner: '357918459058978816'
});

client.login(config.token);

client.registry.registerGroups([
    ['faq', 'faq commands']])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log(`Logged in as ${client?.user?.username}`)
});
