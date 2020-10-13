import * as commando from 'discord.js-commando';
import {TextChannel} from 'discord.js'
import {CommandoMessage} from "discord.js-commando";
import {config, pg} from "../../bot";
import {faqEmbed} from '../../utils'

export = class AddCommand extends commando.Command {
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
        this.channel = config.channel_id
    }
    
    public async run(msg: CommandoMessage, {question, answer}: { question: string, answer: string }): Promise<null> {
        let embed = faqEmbed({question, answer});
        let channel = (await this.client.channels.fetch(this.channel, true)) as TextChannel;
        let message = await channel.send(embed)
        await pg.query(
            "INSERT INTO faq.faq (guild_id, question, answer, message_id) VALUES ($1, $2, $3, $4)",
            [msg.guild.id, question, answer, message.id]
        );
        return null
    }
}
