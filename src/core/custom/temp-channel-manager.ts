import { TempChannelsEntity } from "@db";
import {
  Snowflake,
  Collection,
  Guild,
  VoiceChannel,
  CategoryChannel,
} from "discord.js";

export class TempChannelManager {
  private tempChannels: Collection<
    Snowflake,
    { id: Snowflake; ownerID: Snowflake; coOwnersID: Snowflake[] }
  > = new Collection();

  constructor(private guild: Guild, private channelID: string) {}

  async init() {
    try {
      const createVoiceChannel = await this.guild.channels.fetch(
        this.channelID
      );

      if (createVoiceChannel instanceof VoiceChannel) {
        if (createVoiceChannel.parentId) {
          const parentCreateVoiceChannel = await this.guild.channels.fetch(
            createVoiceChannel.parentId
          );
          if (parentCreateVoiceChannel instanceof CategoryChannel) {
            await parentCreateVoiceChannel.children
              .find((item) => item.name === "123")
              ?.delete();

            await parentCreateVoiceChannel.createChannel("123", {
              type: "GUILD_TEXT",
            });
          }
        }
      }
    } catch (error) {}

    try {
      const findedChannels = await TempChannelsEntity.find();
      for await (const entry of findedChannels) {
        this.tempChannels.set(entry.channelID, {
          id: entry.channelID,
          ownerID: entry.ownerID,
          coOwnersID: entry.coOwnersID,
        });
      }
    } catch (error) {
      return false;
    }
    return true;
  }

  async add(channelID: Snowflake, ownerID: Snowflake) {
    this.tempChannels.set(channelID, {
      id: channelID,
      ownerID: ownerID,
      coOwnersID: [],
    });

    await TempChannelsEntity.create({
      channelID: channelID,
      ownerID: ownerID,
    }).save();
  }

  async remove(channelID: Snowflake) {
    this.tempChannels.delete(channelID);
    TempChannelsEntity.delete({ channelID: channelID });
  }

  async getEntityWithOwner(adminID: Snowflake) {
    return await TempChannelsEntity.findOne({ ownerID: adminID });
  }

  getItemInCollectionWithOwner(adminID: Snowflake) {
    return this.tempChannels.find((entity) => entity.ownerID === adminID);
  }

  has(channelID: Snowflake) {
    return this.tempChannels.has(channelID);
  }

  valueOf() {
    return this.tempChannels;
  }
}
