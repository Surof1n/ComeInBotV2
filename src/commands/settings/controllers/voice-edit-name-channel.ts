import { CiEmbed } from "@core";
import { GuildEntity } from "@db";
import { Guild, Message } from "discord.js";
import { BaseSettings } from "./base-settings";

export class VoiceEditChannel extends BaseSettings {
  constructor() {
    super();
  }

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
    if (!valueSettings) {
      await message.channel.send(
        CiEmbed.create("error", {
          author: `Параметр ${typeSettings} не обновлён!`,
          description: `Значение параметра у гильдии осталось тем же: ${guild.channelsOptions.voiceEditNameChannel}`,
        })
      );
      return;
    }
    guild.channelsOptions.voiceEditNameChannel = valueSettings;
    await GuildEntity.update(
      { id: guild.id },
      { channels: guild.channelsOptions }
    );
    await channel.send(
      CiEmbed.create("info", {
        author: `Обновление параметра ${typeSettings}`,
        description: `Значение параметра у гильдии измененно: ${valueSettings}`,
      })
    );
  }
}
