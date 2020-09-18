import * as commando from 'discord.js-commando';
import {Message, TextChannel} from 'discord.js'
import {CommandoMessage} from "discord.js-commando";
import {pg} from "../../bot";
import {faq_embed} from '../../utils'


module.exports = class AddCommand extends commando.Command {
    private readonly channel: string;
    constructor(client: commando.Client) {
        super(client, {
            name: 'add',
            group: 'faq',
            memberName: 'add',
            description: 'Adds a faq message',
            args: [
                {
                    key: 'question',
                    prompt: 'What question do you need to be answered?',
                    type: 'string'
                },
                {
                    key: 'answer',
                    prompt: 'What answer do you want for the question?',
                    type: 'string'
                }
            ],
        });
        this.channel = <string>process.env.CHANNEL_ID
    }
    async run(msg: CommandoMessage, {question, answer}: { question: string, answer: string }): Promise<Message[]> {
        let embed = faq_embed(question, answer);
        let channel = (await this.client.channels.fetch("738174661954764911", true)) as TextChannel;
        let message = await channel.send(embed)
        await pg.query(
            "INSERT INTO faq.faq (guild_id, question, answer, message_id) VALUES ($1, $2, $3, $4)",
            [msg.guild.id, question, answer, message.id]
        );
        return Promise.resolve([])
    }
}
