import { CiCommand, CiEmbed } from "@core";
import { GuildMemberEntity } from "@db";
import { messages } from "@res";
import { Message } from "discord.js";
const MAX_PROFILE_LENGTH = 170;

export default class GuildAboutMember extends CiCommand {
  constructor() {
    super({
      name: "about",
      aliases: ["обомне", "осебе"],
      category: "settings",
      description: "Измени информацию о себе.",
      args: [
        {
          index: 0,
          id: "text",
          type: "string",
          name: "текст",
          match: "content",
          default: "",
        },
      ],
      cidescription: {
        header: "Помощь по команде: осебе",
        commandForm: ".обомне <техт?> необязателен",
        rules: "<техт?> необязателен",
        initExamples(_guild, prefix) {
          return [`${prefix}осебе Как же я крут!`];
        },
      },
    });
  }
  async exec({ member, channel }: Message, { text }: { text: string }) {
    if (!member || !channel) return;
    if (text.length <= MAX_PROFILE_LENGTH) {
      if (text) {
        member.about = text;
        const bodyEmbed = messages.alter_profile_info.randomitem();
        channel.send(
          CiEmbed.success(
            "Вы сменили информацию о себе",
            "",
            bodyEmbed.text,
            bodyEmbed.author
          )
        );
        GuildMemberEntity.update(member.id, { about: member.about });
      } else {
        member.about = "";
        const bodyEmbed = messages.alter_profile_info.randomitem();
        channel.send(
          CiEmbed.success(
            "Вы сбросили информацию о себе",
            "",
            bodyEmbed.text,
            bodyEmbed.author
          )
        );
        GuildMemberEntity.update(member.id, { about: member.about });
      }
    } else {
      channel.send(
        CiEmbed.error(
          "При смене информации о себе произошла ошибка!",
          "",
          `Введёная строка привышает ${MAX_PROFILE_LENGTH} символов.`
        )
      );
      return;
    }
    return;
  }
}
