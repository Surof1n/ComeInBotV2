import { Guild, User } from "discord.js";
import { RawUserData } from "discord.js/typings/rawDataTypes";
import { CiClient } from "../base";

export class CiUser extends User {
  loaded = false;
  constructor(client: CiClient, data: RawUserData) {
    super(client, data);
  }

  public async fetchData(guild?: Guild) {
    if (guild) {
      const member = guild.members.resolve(this);
      if (member && !member.loaded) await member.fetchData();
    } else {
      for await (const guild of this.client.guilds.valueOf().values()) {
        try {
          const member = guild.members.resolve(this);
          if (member && !member.loaded) await member.fetchData();
        } catch (error) {}
      }
    }
    this.loaded = true;
    return this.loaded;
  }
}
