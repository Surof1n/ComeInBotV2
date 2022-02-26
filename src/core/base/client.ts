import { CiCommandHandler, CiGuild, CiGuildMember } from "@core";
import {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} from "discord-akairo";
import { Intents } from "discord.js";
import { join } from "path";
import { CiOptions } from "../../resource/options";
import { CiUser, CiVoiceChannel } from "../custom";

export class CiClient extends AkairoClient {
  commandHandler: CommandHandler;
  eventHandler: ListenerHandler;
  inhibitorHandler: InhibitorHandler;
  constructor() {
    super({
      structures: {
        GuildMember: () => CiGuildMember,
        Guild: () => CiGuild,
        VoiceChannel: () => CiVoiceChannel,
        User: () => CiUser,
      },
      intents: Object.values(Intents.FLAGS),
    });
    this.commandHandler = new CiCommandHandler(this, {
      directory: join(__dirname, "../..", "commands"),
      prefix: CiOptions.prefix,
    });
    this.eventHandler = new ListenerHandler(this, {
      directory: join(__dirname, "../..", "events"),
    });
    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: join(__dirname, "../..", "inhibitors"),
    });

    this.eventHandler.setEmitters({
      commandHandler: this.commandHandler,
      eventHandler: this.eventHandler,
    });

    this.commandHandler.useListenerHandler(this.eventHandler);
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.inhibitorHandler.loadAll();
    this.eventHandler.loadAll();
    this.commandHandler.loadAll();
  }

  async init() {
    const response = await this.login(CiOptions.token);
    console.log("Token connected:", response);
    return this;
  }
}
