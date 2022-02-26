import { CiListener } from "@core";
import { Guild, VoiceChannel, VoiceState } from "discord.js";

export default class ReadyEvent extends CiListener {
  constructor() {
    super("voiceStateUpdate", {
      emitter: "client",
      event: "voiceStateUpdate",
    });
  }

  async run(oldState: VoiceState, state: VoiceState): Promise<void> {
    const { member, guild } = state;

    if (!member) return;

    const isJoined =
      !!(!oldState.channelId && state.channel) ||
      oldState.channel === state.channel;

    const isLeaved = !!(oldState.channelId && !state.channelId);

    const isChannelChanged = !!(
      oldState.channelId !== state.channelId &&
      !isJoined &&
      !isLeaved
    );

    const isVoiceCreate =
      state.channelId === guild.channelsOptions.createVoiceChannel;

    if (isVoiceCreate && (isJoined || isChannelChanged)) {
      const existedPrivateChannel =
        guild.channelManager.getItemInCollectionWithOwner(member.id);

      if (existedPrivateChannel) {
        const isChannelCreated = !!guild.channels.resolve(
          existedPrivateChannel.id
        );
        if (isChannelCreated) {
          await member.voice.setChannel(existedPrivateChannel.id);
          return;
        } else await guild.channelManager.remove(existedPrivateChannel.id);
        return;
      }

      const stateNowChannel = state.channel;
      if (!stateNowChannel) return;

      const parentID = stateNowChannel.parentId;
      if (!parentID) return;

      const channelPermissions =
        state.channel?.parent?.permissionOverwrites.valueOf();

      const generatedChannel = await guild.channels.create(
        `Комната "${member.displayName}"`,
        {
          type: "GUILD_VOICE",
          userLimit: 0,
          permissionOverwrites: channelPermissions,
          parent: parentID,
        }
      );

      guild.channelManager.add(generatedChannel.id, member.id);

      try {
        await member.voice.setChannel(generatedChannel);
      } catch (error) {
        if (
          !generatedChannel.isBots() &&
          oldState.channel instanceof VoiceChannel
        ) {
          await deleteEmpty(guild, oldState.channel);
        }
      }
    }

    if (
      oldState.channel instanceof VoiceChannel &&
      guild.channelManager.has(oldState.channel.id) &&
      (isLeaved || isChannelChanged)
    ) {
      if (!oldState.channel.members.filter((item) => !item.user.bot).length) {
        try {
          await deleteEmpty(guild, oldState.channel);
        } catch (error) {
          await deleteEmpty(guild, oldState.channel);
        } finally {
          if (oldState.channel?.deleted === false && !oldState.channel.isBots())
            await deleteEmpty(guild, oldState.channel);
        }
      }
    }
  }
}

async function deleteEmpty(guild: Guild, channel: VoiceChannel) {
  guild.channelManager.remove(channel.id);
  await channel.delete("Private room was empty");
}
