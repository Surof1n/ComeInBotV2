import { Guild, VoiceChannel } from "discord.js";
import { RawGuildChannelData } from "discord.js/typings/rawDataTypes";

export class CiVoiceChannel extends VoiceChannel {
  constructor(guild: Guild, data?: RawGuildChannelData) {
    super(guild, data);
  }

  isBots(): boolean {
    return !!this.members.find((member) => member.user.bot);
  }
}
