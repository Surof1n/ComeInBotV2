import { CiClient, CiTimeout } from "@core";
import { GuildEntity } from "@db";
import {
  CiOptions,
  GuildChannelsSettings,
  GuildReputationSettings,
} from "@res";
import { Guild } from "discord.js";
import { RawGuildData } from "discord.js/typings/rawDataTypes";
import { TempChannelManager } from "./temp-channel-manager";

export class CiGuild extends Guild {
  loaded = false;
  reputation!: typeof GuildReputationSettings;
  channelsOptions!: typeof GuildChannelsSettings;
  time: CiTimeout;
  prefix = CiOptions.prefix;
  constructor(client: CiClient, data: RawGuildData) {
    super(client, data);
    this.time = new CiTimeout(this);
  }

  async fetchData() {
    let dataGuild = await GuildEntity.findOne(this.id);

    if (!dataGuild) {
      dataGuild = new GuildEntity();
      dataGuild.id = this.id;
      dataGuild.reputation = GuildReputationSettings;
      dataGuild.channels = GuildChannelsSettings;
      await dataGuild.save();
    }

    this.reputation = dataGuild.reputation;
    this.channelsOptions = dataGuild.channels;

    this.channelManager = new TempChannelManager(
      this,
      dataGuild.channels.createVoiceChannel
    );

    const isInitChannel = await this.channelManager.init();

    if (!isInitChannel) throw new Error("Ошибка инциализации менеджера комнат");
    this.loaded = true;
    return this.loaded;
  }
}
