import {
  DMChannel,
  Guild,
  Message,
  NewsChannel,
  TextChannel,
} from "discord.js";

export abstract class BaseSettings {
  abstract update(
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
  ): Promise<void>;
}
