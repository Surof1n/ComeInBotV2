import { CiEmbed } from "@core";
import { GuildEntity } from "@db";
import {
  DMChannel,
  Guild,
  GuildChannel,
  Message,
  NewsChannel,
  TextChannel,
} from "discord.js";
import { BaseSettings } from "./BaseSettings";

export class CommandChannel extends BaseSettings {
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
    const commandChannels = valueSettings.split(" ").reduce((arr, item) => {
      const commandChannel = guild.channels.resolve(item);
      if (commandChannel) arr.push(commandChannel);
      return arr;
    }, [] as GuildChannel[]);

    if (!commandChannels.length) {
      message.channel.send(
        CiEmbed.error(
          `Параметр ${typeSettings} не обновлён!`,
          "",
          `Значение параметра у гильдии осталось тем же: ${guild.channelsOptions.commandChannel
            .split(" ")
            .map((item) => `<#${item}>`)
            .join(" ")}`
        )
      );
      return;
    }
    guild.channelsOptions.commandChannel = commandChannels
      .map((item) => item.id)
      .reduce((arr: string[], item) => {
        if (!arr.includes(item)) arr.push(item);
        return arr;
      }, [])
      .join(", ");
    GuildEntity.update({ id: guild.id }, { channels: guild.channelsOptions });
    channel.send(
      CiEmbed.info(
        `Обновление параметра ${typeSettings}`,
        "",
        `Значение параметра у гильдии измененно: ${guild.channelsOptions.commandChannel
          .split(" ")
          .map((item) => `<#${item}>`)
          .join(" ")}`
      )
    );
  }
}
