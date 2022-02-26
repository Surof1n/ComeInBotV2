import { CiEmbed } from "@core";
import { GuildEntity } from "@db";
import { Guild, GuildChannel, Message, ThreadChannel } from "discord.js";
import { BaseSettings } from "./base-settings";

export class CommandChannel extends BaseSettings {
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
    const commandChannels = valueSettings.split(" ").reduce((arr, item) => {
      const commandChannel = guild.channels.resolve(item);
      if (commandChannel) arr.push(commandChannel);
      return arr;
    }, [] as (GuildChannel | ThreadChannel)[]);

    if (!commandChannels.length) {
      await message.channel.send(
        CiEmbed.create("info", {
          author: `Параметр ${typeSettings} не обновлён!`,
          description: `Значение параметра у гильдии осталось тем же: ${guild.channelsOptions.commandChannel
            .split(" ")
            .map((item) => `<#${item}>`)
            .join(" ")}`,
        })
      );
      return;
    }
    guild.channelsOptions.commandChannel = commandChannels
      .map((item) => item.id)
      .reduce((arr: string[], item) => {
        if (!arr.includes(item)) arr.push(item);
        return arr;
      }, [])
      .join(" ");
    await GuildEntity.update(
      { id: guild.id },
      { channels: guild.channelsOptions }
    );
    await channel.send(
      CiEmbed.create("info", {
        author: `Обновление параметра ${typeSettings}`,
        description: `Значение параметра у гильдии измененно: ${guild.channelsOptions.commandChannel
          .split(" ")
          .map((item) => `<#${item}>`)
          .join(" ")}`,
      })
    );
  }
}
