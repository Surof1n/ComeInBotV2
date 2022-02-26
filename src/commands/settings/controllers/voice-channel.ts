import { CiEmbed } from "@core";
import { GuildEntity } from "@db";
import { Guild, Message } from "discord.js";
import { BaseSettings } from "./base-settings";

export class VoiceChannel extends BaseSettings {
  async update(
    {
      guild,
      channel,
    }: {
      guild: Guild;
      message: Message;
      channel: Message["channel"];
    },
    typeSettings: string,
    valueSettings: string
  ) {
    const newChannel = valueSettings
      ? guild.channels.cache.get(valueSettings)
      : null;

    if (!valueSettings) {
      channel.send(
        CiEmbed.create("info", {
          author: `Запрос на выдачу параметра ${typeSettings}`,
          description: `Значение параметра у гильдии: <#${guild.channelsOptions.createVoiceChannel}>`,
        })
      );
      return;
    }
    if (newChannel?.type !== "GUILD_VOICE") {
      await channel.send(
        CiEmbed.create("error", {
          author: `Параметр ${typeSettings} не обновлён!`,
          description: `Значение параметра у гильдии осталось тем же: <#${guild.channelsOptions.createVoiceChannel}>`,
        })
      );
      return;
    }
    guild.channelsOptions.createVoiceChannel = valueSettings;
    await GuildEntity.update({ id: guild.id }, { channels: guild.channelsOptions });
    await channel.send(
      CiEmbed.create("info", {
        author: `Обновление параметра ${typeSettings}`,
        description: `Значение параметра у гильдии измененно: ${valueSettings}`,
      })
    );
  }
}
