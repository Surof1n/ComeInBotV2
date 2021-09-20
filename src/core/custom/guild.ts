import { CiClient, CiTimeout } from "@core";
import { GuildEntity } from "@db";
import { GuildReputationSettings } from "@res";
import { Guild } from "discord.js";


export class CiGuild extends Guild {
  reputation!: typeof GuildReputationSettings;
  time: CiTimeout
  constructor(client: CiClient, data: object) {
    super(client, data);
    this.initData();
    this.time = new CiTimeout(this)
  }

  private async initData() {
    let dataGuild = await GuildEntity.findOne(this.id);

    if (!dataGuild) {
      dataGuild = new GuildEntity();
      dataGuild.id = this.id;
      dataGuild.reputation = GuildReputationSettings;
      dataGuild.save();
    }

    this.reputation = dataGuild.reputation;
  }
}
