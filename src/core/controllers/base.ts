import { GuildMember } from "discord.js";

export abstract class BaseController {
  constructor(public member: GuildMember, public count: number) {}
  abstract add(): void;
  abstract send(receiver: GuildMember): void;
  abstract remove(): void;
}
