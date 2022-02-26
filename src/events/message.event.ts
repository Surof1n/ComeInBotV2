import { CiListener } from "@core";
import { Message } from "discord.js";
import { triggers } from "../resource";

export default class MessageEvent extends CiListener {
  private checkTriggers(msg: string) {
    const lowerCaseMessage = msg.toLowerCase();
    return triggers.find((item) => {
      if (item.trigger instanceof Array) {
        const activeTrigger = item.trigger.find((str) => {
          return lowerCaseMessage.includes(str);
        });
        if (activeTrigger) return true;
        else return false;
      } else {
        return lowerCaseMessage.includes(item.trigger);
      }
    });
  }
  private botMessage(randomEmbed: { text: string; author: string }) {
    return `**${randomEmbed.text}**\n\n*${randomEmbed.author}*`;
  }

  constructor() {
    super("messageCreate", {
      emitter: "client",
      event: "messageCreate",
    });
  }

  async run(message: Message) {
    const { member, channel, guild } = message;
    
    if (!member || !channel || !guild) return;

    if (message.content.includes(guild.prefix)) return;

    if (member.user.bot) return;

    const checkedTrigger = this.checkTriggers(message.content);

    if (checkedTrigger) {
      channel.send(this.botMessage(checkedTrigger));
    }

    const isCommandChannel = !!guild.channelsOptions.commandChannel
      .split(" ")
      .includes(message.channel.id);

    if (!isCommandChannel) {
      member.messagesCount += 1;
      member.sparkController.add(1);
    }
  }
}
