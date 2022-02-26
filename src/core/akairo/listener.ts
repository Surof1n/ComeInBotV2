import { AkairoError, ListenerOptions } from "discord-akairo";
import { Listener } from "discord-akairo";
import {
  Guild,
  GuildChannel,
  GuildEmoji,
  GuildMember,
  Message,
  Presence,
  Role,
  User,
  VoiceState,
} from "discord.js";

export class CiListener extends Listener {
  constructor(id: string, options?: ListenerOptions) {
    super(id, options);
  }

  public async exec(...args: any[]) {
    for await (const arg of args) {
      const promises: Promise<any>[] = [];
      if (arg instanceof Role) {
        if (arg.guild) {
          if (!arg.guild.loaded) promises.push(arg.guild.fetchData());
        }
      } else if (arg instanceof User) {
        if (arg && !arg.loaded && !arg.bot) {
          promises.push(arg.fetchData());
        }
      } else if (arg instanceof Guild) {
        if (arg) {
          if (!arg.loaded) promises.push(arg.fetchData());
        }
      } else if (
        arg instanceof GuildEmoji ||
        arg instanceof GuildChannel ||
        arg instanceof GuildMember
      ) {
        if (arg.guild) {
          if (!arg.guild.loaded) promises.push(arg.guild.fetchData());
        }
        if (arg instanceof GuildMember && !arg.loaded)
          promises.push(arg.fetchData());
      } else if (
        arg instanceof VoiceState ||
        arg instanceof Presence ||
        arg instanceof Message
      ) {
        if (
          arg instanceof Message &&
          arg.author &&
          !arg.author.loaded &&
          arg.guild &&
          !arg.author.bot
        ) {
          promises.push(arg.author.fetchData(arg.guild));
        }
        if (
          arg instanceof Presence &&
          arg.user &&
          !arg.user.loaded &&
          arg.guild &&
          !arg.user.bot
        )
          promises.push(arg.user.fetchData(arg.guild));
        if (arg.member && !arg.member.loaded)
          promises.push(arg.member.fetchData());
        if (arg.guild) {
          if (!arg.guild.loaded) promises.push(arg.guild.fetchData());
        }
      }
      await Promise.all(promises);
    }
    await this.run(...args);
  }

  public async run(..._args: any[]) {
    throw new AkairoError("NOT_IMPLEMENTED");
  }
}
