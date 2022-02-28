import {
  Guild,
  Message,
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
      channel: Message["channel"];
    },
    typeSettings: string,
    valueSettings: string
  ): Promise<void>;
}
