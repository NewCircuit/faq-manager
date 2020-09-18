import * as commando from 'discord.js-commando';
import path from 'path'
import {connect_to_db} from "./database";

require('dotenv').config();


const client = new commando.CommandoClient({
    commandPrefix: '.faq',
    owner: '357918459058978816'
});

export const pg = connect_to_db(<string>process.env.DATABASE_URL);

client.login(<string>process.env.TOKEN);

client.registry.registerGroups([
    ['faq', 'faq commands']])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log(`Logged in as ${client?.user?.username}`)
});

export default {
    pg
}
