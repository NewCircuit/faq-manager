import * as commando from 'discord.js-commando';
import {CommandoMessage} from "discord.js-commando";
import {GuildMember, Message} from 'discord.js'
import {pg} from '../../bot'

interface args {
    member: GuildMember
}

module.exports = class Database extends commando.Command {
    constructor(client: commando.Client) {
        super(client, {
            name: 'databasetest',
            group: 'misc',
            memberName: 'databasetest',
            description: 'test for database'
        });
    }


    async run(msg: CommandoMessage, args: args): Promise<Message[]> {
        await msg.say("Hello World!");
        const res = await pg.query("SELECT NOW()")
        console.log(res.rows[0].now);
        return Promise.resolve([]);
    }
};
