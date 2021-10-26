import { CiCommand, CiEmbed } from "@core";
import { Guild } from "discord.js";
import { Message } from "discord.js";
import * as Controllers from "./controllers";

export default class GuildOptionsCommand extends CiCommand {
  constructor() {
    super({
      name: "guildoptions",
      aliases: ["настройгильдию", "настроитьгильдию"],
      category: "settings",
      description: "Поправь или добавь настройки гильдии",
      userPermissions: ["ADMINISTRATOR"],
      cidescription: {
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
      channel.send(
        CiEmbed.error(
          `Вывожу возможные параметры для изменения`,
          "",
          `${Object.keys(Controllers)
            .map((item) => "`" + item + "`")
            .join(", ")}`
        )
      );
      return;
    }
    if (typeSettings in Controllers) {
      new Controllers[typeSettings as keyof typeof Controllers]().update(
        { message, channel, guild },
        typeSettings,
        valueSettings
      );
    } else {
      channel.send(
        CiEmbed.error(
          `Параметр не найден!`,
          "",
          `Значения параметров у гильдии не изменены.`
        )
      );
      return;
    }
  }
}
