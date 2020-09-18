import * as commando from 'discord.js-commando'
import {Message, TextChannel} from "discord.js";
import {CommandoMessage} from "discord.js-commando";
import {pg} from "../../bot";
import {faq_embed} from "../../utils";

module.exports = class SyncCommand extends commando.Command {
    private readonly channel: string;
    constructor(client: commando.Client) {
        super(client, {
            name: 'sync',
            group: 'faq',
            memberName: 'sync',
            description: 'Syncs the message',
        });
        this.channel = <string>process.env.CHANNEL_ID
    }

    async run(msg: CommandoMessage): Promise<Message[]> {
        let channel = (await this.client.channels.fetch(this.channel, true)) as TextChannel;
        let messages = await channel.messages.fetch({}, false)

        messages.forEach( msg => {
            if (msg.author.id === this.client?.user?.id) {
                msg.delete({reason: "Re-sync faq"} )
                    .then()
                    .catch(console.warn);

            }
        });

        let faqs = await pg.query("SELECT question, answer, message_id FROM faq.faq WHERE active = true ORDER BY id");

        faqs.rows.forEach(row => {
            let embed = faq_embed(row.question, row.answer)
            channel.send(embed).then(message => {
                pg.query("UPDATE faq.faq SET message_id = $1 WHERE message_id = $2", [message.id, row.message_id])
                    .then()
                    .catch(console.warn);

            }).catch(console.warn)
        })

        await msg.react("✅")
        return Promise.resolve([])
    }
}
