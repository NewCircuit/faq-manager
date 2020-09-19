import * as commando from 'discord.js-commando'
import {CommandoMessage} from "discord.js-commando";
import {Message, TextChannel} from "discord.js";
import {pg} from "../../bot";
import {faqEmbed} from "../../utils";

module.exports = class GetCommand extends commando.Command {
    private readonly channel: string;
    constructor(client: commando.Client) {
        super(client, {
            name: 'get',
            group: 'faq',
            memberName: 'faq',
            description: 'Get question',
            args: [
                {
                    key: "id",
                    prompt: "What question do you want to be fetched?",
                    type: 'string',
                    infinite: true
                }
            ]
        });
        this.channel = <string>process.env.CHANNEL_ID
    }

    public async run(msg: CommandoMessage, {id}: {id: string}): Promise<Message[]> {
        let res = await pg.query("SELECT question, answer, id FROM faq.faq WHERE message_id = $1 OR id = $1::bigint LIMIT 1", [id[0]]);
        if (res.rowCount === 0) {
            await msg.reply("Unable to locate FAQ");
            return Promise.resolve([]);
        }
        let embed = faqEmbed(res.rows[0])
        embed.setFooter(`ID: ${res.rows[0].id}`)
        await msg.embed(embed)
        return Promise.resolve([])
    }
}
