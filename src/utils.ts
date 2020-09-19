import {MessageEmbed} from "discord.js";

export function faqEmbed(row: {question: string, answer: string}): MessageEmbed {
    return new MessageEmbed()
        .setColor(0x1385ef)
        .setTitle(row.question)
        .setDescription(row.answer)
}

export default {
    faqEmbed
}
