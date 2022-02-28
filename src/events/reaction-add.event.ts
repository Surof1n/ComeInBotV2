import { CiEmbed, CiListener, ErrorReputationDate } from "@core";
import { messages } from "@res";
import { MessageReaction, User } from "discord.js";

export default class ReactionAddEvent extends CiListener {
  constructor() {
    super("messageReactionAdd", {
      emitter: "client",
      event: "messageReactionAdd",
    });
  }

  async run(reaction: MessageReaction, userReaction: User) {
    const { message, emoji } = reaction;
    const { guild, member } = message;
    if (!guild || !member) return;
    const memberReaction = guild.members.resolve(userReaction);
    if (!memberReaction || userReaction.bot) return;

    const matchEmoji = emoji.toString().emojimatcher();
    
    if (
      memberReaction.id === message.author?.id &&
      matchEmoji === guild.reputation.emoji
    ) {
      const finallyMessage = await message.channel.send(
        CiEmbed.create("warn", {
          author: "Ошибочка!",
          description: `Вы не можете подарить теплоту себе!`,
        })
      );

      setTimeout(() => finallyMessage.delete(), 5000);
      await reaction.remove();
      return;
    }
    if (matchEmoji === guild.reputation.emoji && !message.author?.bot) {
      const infoEmbed = {
        title: `${memberReaction.displayName} дарит теплоту ${member.displayName}.`,
        randomText: messages.rep_given?.randomitem(),
      };
      try {
        await memberReaction.reputationController.send(member);
        await message.channel.send(
          CiEmbed.create("positiveInfo", {
            author: "Ух ты!",
            header: infoEmbed.title,
            description: infoEmbed.randomText.text,
            footer: infoEmbed.randomText.author,
          })
        );
      } catch (error) {
        if (error instanceof ErrorReputationDate) {
          await message.channel
            .send(
              CiEmbed.create("positiveInfo", {
                author: "Увидимся завтра!",
                description: `На сегодня теплоты для <@${member.id}> достаточно.`,
              })
            )
            .then((m) => setTimeout(() => m.delete(), 10000));
          await reaction.remove();
          return;
        }
        await message.channel
          .send(
            CiEmbed.create("info", {
              author: "Ошибка!",
              description: "Cрочно обратитесь к администратору!",
            })
          )
          .then((m) => setTimeout(() => m.delete(), 10000));
        await reaction.remove();
        return;
      }
    }
  }
}
