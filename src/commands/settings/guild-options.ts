import { CiCommand, CiEmbed } from "@core";
import { Guild } from "discord.js";
import { Message } from "discord.js";
import * as Controllers from "./controllers";

export default class GuildOptionsCommand extends CiCommand {
  constructor() {
    super({
      name: "guildoptions",
      ciCategory: "settings",
      aliases: ["настройгильдию", "настроитьгильдию"],

      userPermissions: ["ADMINISTRATOR"],
      ciDescription: {
        description: "Поправь или добавь настройки гильдии",
        header: "",
        commandForm: "",
        rules: "",
        initExamples(_guild: Guild, prefix: string) {
          return [`${prefix}guildoptions`];
        },
      },
      args: [
        {
          index: 0,
          id: "typeSettings",
          type: "string",
          name: "тип",
          default: "",
        },
        {
          index: 1,
          id: "valueSettings",
          type: "string",
          match: "content",
          name: "значение",
          default: "",
        },
      ],
    });
  }

  async exec(
    message: Message,
    {
      typeSettings,
      valueSettings,
    }: { typeSettings: string; valueSettings: string }
  ): Promise<void> {

    const { member, channel, guild } = message;
    if (!guild || !member) return;
    if (typeSettings === "") {
      await channel.send(
        CiEmbed.create(
          "info",
          {
            author: `Вывожу возможные параметры для изменения`,
            description: `${Object.keys(Controllers)
              .map((item) => "`" + item + "`")
              .join(", ")}`,
          },
          false
        )
      );
      return;
    }
    if (typeSettings in Controllers) {
      await new Controllers[typeSettings as keyof typeof Controllers]().update(
        { message, channel, guild },
        typeSettings,
        valueSettings
      );
    } else {
      await channel.send(
        CiEmbed.create("error", {
          author: `Параметр не найден!`,
          description: `Значения параметров у гильдии не изменены.`,
        })
      );
      return;
    }
  }
}
