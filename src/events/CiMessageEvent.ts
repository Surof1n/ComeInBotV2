import { Listener } from "discord-akairo";
import { Message } from "discord.js";
import { messages, triggers } from "../resource/";

export default class MessageEvent extends Listener {
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
    super("message", {
      emitter: "client",
      event: "message",
    });
  }

  async exec(message: Message) {
    const { member, channel} = message;
    if (member.user.bot) return;

    const checkedTrigger = this.checkTriggers(message.content);

    if (checkedTrigger) {
      channel.send(this.botMessage(checkedTrigger));
    }
  }
}
