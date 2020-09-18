import * as commando from 'discord.js-commando'
import {CommandoMessage} from "discord.js-commando";
import {Message, TextChannel} from "discord.js";
import {pg} from "../../bot";
import {faq_embed} from "../../utils";

interface Args {
    context: string
}

module.exports = class GetCommand extends commando.Command {
    constructor(client: commando.Client) {
        super(client, {
            name: 'get',
            group: 'faq',
            memberName: 'faq',
            description: 'Get question',
            args: [
                {
                    key: "context",
                    prompt: "What question do you want to be fetched?",
                    type: 'string',
                    infinite: true
                }
            ]
        });
    }

    async run(msg: CommandoMessage, {context}: {context: string}): Promise<Message[]> {
        let res = await pg.query("SELECT question, answer FROM faq.faq WHERE question = $1", [context[0]]);
        if (res.rowCount === 0) {
            await msg.reply("Unable to locate FAQ");
            return Promise.resolve([]);
        }
        let embed = faq_embed(res.rows[0].question, res.rows[0].answer)
        let channel = (await this.client.channels.fetch("756303306841784411", true)) as TextChannel;
        await channel.send(embed)
        return Promise.resolve([])
    }
}
