import { Inhibitor } from "discord-akairo";
import { Message } from "discord.js";

export default class ChannelInhibitor extends Inhibitor {
  constructor() {
    super("channel-command", {
      reason: "channel-command",
      type: "all",
    });
  }

  exec(message: Message) {
    const check = message.guild?.channelsOptions.commandChannel
      .split(" ")
      .includes(message.channel.id);
    if (message.guild?.channelsOptions.commandChannel === "") return false;
    if (check === undefined) return false;
    if (message.member?.permissions.has("ADMINISTRATOR")) return false;
    return !check;
  }
}
