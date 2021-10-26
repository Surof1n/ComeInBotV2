import { GuildMember } from "discord.js";

export interface BaseController {
  member: GuildMember;
  count: number;
}
