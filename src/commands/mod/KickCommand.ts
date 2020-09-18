import * as commando from 'discord.js-commando';
import {Message} from 'discord.js'
import {CommandoMessage} from "discord.js-commando";

module.exports = class KickCommand extends commando.Command {
    constructor(client: commando.Client) {
        super(client, {
            name: 'kick',
            group: 'mod',
            memberName: 'kick',
            description: 'Kicks a user from a server'
        });
    }
    async run(msg: CommandoMessage): Promise<Message[]> {
        return Promise.resolve([])
    }
}
