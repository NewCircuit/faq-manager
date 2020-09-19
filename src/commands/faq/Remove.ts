import * as commando from 'discord.js-commando'
import {Message, TextChannel} from "discord.js";
import {CommandoMessage} from "discord.js-commando";
import {pg} from "../../bot";

module.exports = class SyncCommand extends commando.Command {
    private readonly channel: string;
    constructor(client: commando.Client) {
        super(client, {
            name: 'remove',
            group: 'faq',
            memberName: 'delete',
            aliases: ['delete', 'rm'],
            description: 'Deletes a faq',
            argsPromptLimit: 0,
            args: [
                {
                    key: "id",
                    prompt: "What message do you want to remove?",
                    type: "string",
                    infinite: true
                }
            ]
        });
        this.channel = <string>process.env.CHANNEL_ID
    }

    public async run(msg: CommandoMessage, {id}: {id: string}): Promise<Message[]> {
        let res = await pg.query("SELECT message_id, active FROM faq.faq WHERE message_id = $1 OR id = $1::bigint LIMIT 1", [id[0]]);
        if (res.rowCount === 0) {
            await msg.reply("Unable to locate that message, please check if the message id is correct");
            return Promise.resolve([]);
        }
        if (res.rows[0].active === false) {
            await msg.reply("This faq is already deleted");
            return Promise.resolve([]);
        }

        let channel = (await this.client.channels.fetch(this.channel)) as TextChannel;
        let message = await channel.messages.fetch(res.rows[0].message_id);
        await message.delete();
        await pg.query("UPDATE faq.faq SET active = false WHERE message_id = $1", [res.rows[0].message_id])
        await msg.react("✅")
        return Promise.resolve([]);
    }
}
