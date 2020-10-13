import * as commando from 'discord.js-commando'
import {CommandoMessage} from "discord.js-commando";
import {config, pg} from "../../bot";
import {faqEmbed} from "../../utils";

export = class GetCommand extends commando.Command {
    private readonly channel: string;
    constructor(client: commando.Client) {
        super(client, {
            name: 'get',
            group: 'faq',
            memberName: 'faq',
            description: 'Get question',
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: "id",
                    prompt: "What question do you want to be fetched?",
                    type: 'string',
                    infinite: true
                }
            ]
        });
        this.channel = config.channel_id
    }

    public async run(msg: CommandoMessage, {id}: {id: string}): Promise<null> {
        let res = await pg.query("SELECT question, answer, id FROM faq.faq WHERE message_id = $1 OR id = $1::bigint LIMIT 1", [id[0]]);
        if (res.rowCount === 0) {
            await msg.reply("Unable to locate FAQ");
            return null
        }
        let embed = faqEmbed(res.rows[0])
        embed.setFooter(`ID: ${res.rows[0].id}`)
        await msg.embed(embed)
        return null
    }
}
