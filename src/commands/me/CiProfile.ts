import { CiCommand } from "@core";
import { GuildMember, Message } from "discord.js";
import { CiCardsProfile } from "@core";

export default class profileCommand extends CiCommand {
  constructor() {
    super({
      name: "profile",
      aliases: ["профиль", "карточка"],
      category: "economy",
      description: "Вызовите свою или чужую карточку пользователя!",
      cidescription: {
        header: "Помощь по команде: карточка",
        commandForm: ".карточка <пользователь?>",
        rules: "<пользователь?> необязателен",
        initExamples(_guild, prefix) {
          return [
            `${prefix}карточка <@205085626880491520>`,
            `${prefix}карточка Nexus`,
            `${prefix}карточка 20508562688049152`,
          ];
        },
      },
      args: [
        {
          index: 0,
          id: "targetMember",
          type: "member",
          name: "пользователь",
          default: (message: Message) => message.member,
        },
      ],
    });
  }

  async exec(
    { channel }: Message,
    {
      targetMember,
    }: {
      targetMember: GuildMember;
    }
  ): Promise<void> {
    channel.send(await CiCardsProfile.createDefaultCard(targetMember));
    return;
  }
}
