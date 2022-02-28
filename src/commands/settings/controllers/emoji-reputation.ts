import { CiEmbed } from "@core";
import { GuildEntity } from "@db";
import {
  Guild,
  Message,
} from "discord.js";
import { BaseSettings } from "./base-settings";

export class EmojiReputation extends BaseSettings {
  async update(
    {
      guild,
      message,
      channel,
    }: {
      guild: Guild;
      message: Message;
      channel: Message["channel"];
    },
    typeSettings: string,
    valueSettings: string
  ) {
    const emoji = valueSettings.emojimatcher();
    if (!emoji) {
      await message.channel.send(
        CiEmbed.create("error", {
          author: `Параметр ${typeSettings} не обновлён!`,
          description: `Значение параметра у гильдии осталось тем же: ${guild.reputation.emoji.emojicomplete()}`,
        })
      );
      return;
    }
    guild.reputation.emoji = emoji;
    await GuildEntity.update({ id: guild.id }, { reputation: guild.reputation });
    await channel.send(
      CiEmbed.create("info", {
        author: `Обновление параметра ${typeSettings}`,
        description: `Значение параметра у гильдии измененно: ${valueSettings}`,
      })
    );
  }
}
