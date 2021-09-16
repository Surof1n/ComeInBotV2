import {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} from "discord-akairo";
import { Intents } from "discord.js";
import { join } from "path";
import { CiOptions } from "../resource/options";

export class CiClient extends AkairoClient {
  commandHandler: CommandHandler;
  eventHandler: ListenerHandler;
  inhibitorHandler: InhibitorHandler;
  constructor() {
    super({
      disableMentions: "everyone",
      messageCacheMaxSize: 300,
    });
    this.commandHandler = new CommandHandler(this, {
      directory: join(__dirname, "..", "commands"),
      prefix: CiOptions.prefix,
    });
    this.eventHandler = new ListenerHandler(this, {
      directory: join(__dirname, "..", "events"),
    });
    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: join(__dirname, "..", "inhibitors"),
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
    await this.login(CiOptions.token);
    console.log("Token Connect");
    return this;
  }
}
