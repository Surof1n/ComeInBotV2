import { CiEmbed } from "@core";
import { GuildEntity } from "@db";
import {
  DMChannel,
  Guild,
  Message,
  NewsChannel,
  TextChannel,
} from "discord.js";
import { BaseSettings } from "./BaseSettings";

export class EmojiReputation extends BaseSettings {
  async update(
    {
      guild,
      message,
      channel,
    }: {
      guild: Guild;
      message: Message;
      channel: TextChannel | DMChannel | NewsChannel;
    },
    typeSettings: string,
    valueSettings: string
  ) {
    const emoji = valueSettings.emojimatcher();
    if (!emoji) {
      message.channel.send(
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
  }
}
