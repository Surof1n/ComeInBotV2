import { ReputationController, SparkController } from "@core";
import { AkairoClient } from "discord-akairo";
import { Guild, GuildMember } from "discord.js";
import { GuildMemberEntity } from "@db";
import { RawGuildMemberData } from "discord.js/typings/rawDataTypes";

export class CiGuildMember extends GuildMember {
  reputation!: ReputationController;
  private _messagesCount!: number;

  loaded = false;
  about!: string;

  constructor(client: AkairoClient, data: RawGuildMemberData, guild: Guild) {
    super(client, data, guild);
  }
  async fetchData() {
    let dataMember = await GuildMemberEntity.findOne(this.id);

    if (!dataMember) {
      dataMember = new GuildMemberEntity();
      dataMember.id = this.id;
      dataMember.guildID = this.guild.id;
      dataMember.reputationCount = 0;
      dataMember.messagesCount = 0;
      dataMember.sparkCount = 0;
      dataMember.about = "";
      await dataMember.save();
    }

    this.sparkController = new SparkController(this, dataMember.sparkCount);

    this.reputationController = new ReputationController(
      this,
      dataMember.reputationCount
    );

    this.messagesCount = dataMember.messagesCount;
    this.about = dataMember.about;

    this.loaded = true;
    return this.loaded;
  }

  public get messagesCount() {
    return this._messagesCount;
  }

  public set messagesCount(value: number) {
    GuildMemberEntity.update(this.id, {
      messagesCount: value,
    });
    this._messagesCount = value;
  }
}
