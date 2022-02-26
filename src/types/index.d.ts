import { ReputationController, SparkController } from "@core";
import {
  GuildChannelsSettings,
  GuildReputationSettings,
  KeysCategory,
} from "@res";
import { CommandOptions } from "discord-akairo";
import { Guild } from "discord.js";
import { TempChannelManager } from "src/core/custom/temp-channel-manager";

declare module "discord.js" {
  interface GuildMember {
    reputationController: ReputationController;
    sparkController: SparkController;
    messagesCount: number;
    about: string;
    loaded: boolean;

    fetchData(): Promise<boolean>;
  }
  interface Guild {
    loaded: boolean;
    prefix: string;
    reputation: typeof GuildReputationSettings;
    channelsOptions: typeof GuildChannelsSettings;

    channelManager: TempChannelManager;

    fetchData(): Promise<boolean>;
  }

  interface User {
    fetchData(guild?: Guild): Promise<boolean>;
    loaded: boolean;
  }

  interface VoiceChannel {
    isBots(): boolean;
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
  ciDescription: CiDescription;
  ciCategory: KeysCategory;
}

export interface CiDescription {
  header: string;
  commandForm: string;
  rules: string;

  examples?: string[];
  description: string;
  initExamples(guild: Guild, prefix: string): string[];
}

export type TimeOutTypes = "hour" | "day" | "isoWeek" | "month" | "year";
