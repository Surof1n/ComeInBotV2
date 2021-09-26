import { ReputationController } from "@core";
import { AkairoClient } from "discord-akairo";
import { Guild, GuildMember } from "discord.js";
import { GuildMemberEntity } from "@db";

export class CiGuildMember extends GuildMember {
  reputation!: ReputationController;

  about!: string;

  constructor(client: AkairoClient, data: object, guild: Guild) {
    super(client, data, guild);
    this.initData();
  }
  private async initData() {
    let dataMember = await GuildMemberEntity.findOne(this.id);

    if (!dataMember) {
      dataMember = new GuildMemberEntity();
      dataMember.id = this.id;
      dataMember.guildID = this.guild.id;
      dataMember.reputationCount = 0;
      dataMember.about = "";
      await dataMember.save();
    }

    this.reputationController = new ReputationController(
      this,
      dataMember.reputationCount
    );

    this.about = dataMember.about;
  }
}
