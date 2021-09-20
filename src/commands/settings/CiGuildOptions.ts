import { CiCommand, CiEmbed } from "@core";
import { GuildEntity } from "@db";
import { Guild } from "discord.js";
import { Message } from "discord.js";

export default class GuildOptionsCommand extends CiCommand {
  constructor() {
    super({
      name: "guildoptions",
      aliases: ["настройгильдию", "настроитьгильдию"],
      category: "settings",
      description: "Поправь или добавь настройки гильдии",
      userPermissions: ['ADMINISTRATOR'], 
      cidescription: {
        header: "",
        commandForm: "",
        rules: "",
        initExamples(_guild: Guild, prefix: string) {
          return [`${prefix}guildoptions list`];
        },
      },
      args: [
        {
          index: 0,
          id: "typeSettings",
          type: "string",
          name: "тип",
        },
        {
          index: 1,
          id: "valueSettings",
          type: "string",
          name: "значение",
          default: "settings",
        },
      ],
    });
  }

  async exec(
    { member, channel, guild }: Message,
    {
      typeSettings,
      valueSettings,
    }: { typeSettings: string; valueSettings: string }
  ): Promise<void> {
    if (!guild || !member) return;
    // const newChannel = valueSettings
    //   ? guild.channels.cache.get(valueSettings)
    //   : null;
    // const newRole = valueSettings ? guild.roles.cache.get(valueSettings) : null;
    // const listOptions = ["emojiReputation"];
    switch (typeSettings) {
      case "emojiReputation":
        const emoji = valueSettings.emojimatcher();
        if (!emoji) {
          channel.send(
            CiEmbed.error(
              `Параметр ${typeSettings} не обновлён!`,
              "",
              `Значение параметра у гильдии осталось тем же: ${guild.reputation.emoji.emojicomplete()}`
            )
          );
          return;
        }
        guild.reputation.emoji = emoji;
        GuildEntity.update({ id: guild.id }, { reputation: guild.reputation });
        channel.send(
          CiEmbed.info(
            `Обновление параметра ${typeSettings}`,
            "",
            `Значение параметра у гильдии измененно: ${valueSettings}`
          )
        );
        return;
      default:
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
