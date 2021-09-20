import { CiEmbed, ErrorReputationDate } from "@core";
import { messages } from "@res";
import { Listener } from "discord-akairo";
import { MessageReaction, User } from "discord.js";

export default class ReactionAddEvent extends Listener {
  constructor() {
    super("messageReactionAdd", {
      emitter: "client",
      event: "messageReactionAdd",
    });
  }

  async exec(reaction: MessageReaction, userReaction: User) {
    const { message, emoji } = reaction;
    const { guild, member } = message;
    if (!guild || !member) return;
    const memberReaction = guild.member(userReaction);
    if (!memberReaction || userReaction.bot) return;

    const matchEmoji = emoji.toString().emojimatcher();
    if (
      memberReaction.id === message.author.id &&
      matchEmoji === guild.reputation.emoji
    ) {
      const finallyMessage = await message.channel.send(
        CiEmbed.error("Ошибка!", "", `Вы не можете подарить теплоту себе!`)
      );
      await finallyMessage.delete({ timeout: 5000 });
      await reaction.remove();
      return;
    }
    if (matchEmoji === guild.reputation.emoji && !message.author.bot) {
      const infoEmbed = {
        title: `${memberReaction.displayName} дарит теплоту ${member.displayName}`,
        randomText: messages.rep_given?.randomitem(),
      };
      try {
        await memberReaction.reputationController.send(member);
        await message.channel.send(
          CiEmbed.infoOrange(
            "Уведомление!",
            infoEmbed.title,
            infoEmbed.randomText.text,
            infoEmbed.randomText.author
          )
        );
      } catch (error) {
        if (error instanceof ErrorReputationDate) {
          await message.channel
            .send(
              CiEmbed.infoOrange(
                "Увидимся завтра!",
                undefined,
                `На сегодня теплоты для <@${member.id}> достаточно.`
              )
            )
            .then((m) => m.delete({ timeout: 10000 }));
          await reaction.remove();
          return;
        }
        console.log(error);
        await message.channel
          .send(CiEmbed.info("Ошибка!", `Cрочно обратитесь к администратору!`))
          .then((m) => m.delete({ timeout: 10000 }));
        await reaction.remove();
        return;
      }
    }
  }
}
