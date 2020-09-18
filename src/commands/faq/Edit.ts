import * as commando from 'discord.js-commando'
import {CommandoMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {pg} from "../../bot";

module.exports = class EditCommand extends commando.Command {
    constructor(client: commando.Client) {
        super(client, {
            name: 'edit',
            group: 'faq',
            memberName: 'edit',
            description: 'edits a faq question',
            args: [
                {
                    key: 'id',
                    prompt: 'What question do you want to edit?',
                    type: 'string',
                },
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
    }

    async run(msg: CommandoMessage, {id, question, answer}: {id: string, question: string, answer: string}): Promise<Message[]> {
        let res = await pg.query("SELECT question, answer, id FROM faq.faq WHERE message_id = $1 OR id = $1::bigint LIMIT 1", [id[0]]);
        if (res.rowCount === 0) {
            await msg.reply("Unable to locate faq");
            return Promise.resolve([]);
        }
        return Promise.resolve([]);
    }
}
