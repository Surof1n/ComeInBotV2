import { ReputationController } from "@core";
import { GuildReputationSettings } from "@res";
import { CommandOptions } from "discord-akairo";
import { Guild } from "discord.js";

declare module "discord.js" {
  interface GuildMember {
    reputationController: ReputationController;
    about: string;
  }
  interface Guild {
    reputation: typeof GuildReputationSettings;
  }
}
declare global {
  interface Array<T> {
    randomitem(): T;
  }
  interface String {
    emojimatcher(): string | null;
    emojicomplete(): string | null;
  }
}

declare module "discord-akairo" {
  interface ArgumentOptions {
    name: string;
  }
}

export interface CiCommandOptions extends CommandOptions {
  aliases: string[];
  name: string;
  cidescription: CiDescription;
}

export interface CiDescription {
  header: string;
  commandForm: string;
  rules: string;
  initExamples(guild: Guild, prefix: string): string[];
}

export type TimeOutTypes = "hour" | "day" | "isoWeek" | "month" | "year";
