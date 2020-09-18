import {MessageEmbed} from "discord.js";

export function faq_embed(question: string, answer: string): MessageEmbed {
    return new MessageEmbed()
        .setColor(0x1385ef)
        .setTitle(question)
        .setDescription(answer)
}

export default {
    faq_embed
}
