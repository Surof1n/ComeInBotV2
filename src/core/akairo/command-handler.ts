import { CiCommand, CiEmbed } from "@core";
import {
  AkairoClient,
  CommandHandler,
  CommandHandlerOptions,
} from "discord-akairo";
import { Message } from "discord.js";

export class CiCommandHandler extends CommandHandler {
  constructor(client: AkairoClient, options: CommandHandlerOptions) {
    super(client, options);
  }
  async runCommand(message: Message, command: CiCommand, args: any[]) {
    const { member, guild } = message;
    let promises: Promise<boolean>[] = [];

    if (member && !member.loaded) promises.push(member?.fetchData());
    if (guild && !guild.loaded) promises.push(guild?.fetchData());

    await Promise.all(promises);
    const errorArguments = [];
    let stateErrorArguments = false;
    for await (const [key, value] of Object.entries(args)) {
      if (!value) {
        if (Array.isArray(command.argsInOptions)) {
          const optionArgumentItem = command.argsInOptions.find(
            (item) => item?.id === key
          );
          if (typeof optionArgumentItem?.default === "undefined") {
            errorArguments.push(`__${optionArgumentItem?.name}__`);
            if (!stateErrorArguments) stateErrorArguments = true;
          }
        }
      } else {
        if (Array.isArray(command.argsInOptions)) {
          const optionArgumentItem = command.argsInOptions.find(
            (item) => item?.id === key
          );
          errorArguments.push(`${optionArgumentItem?.name}`);
        }
      }
    }
    if (stateErrorArguments) {
      await message.channel.send(
        CiEmbed.create("info", {
          author: "Ошибка! Неправильный параметр команды.",
          description: `**${command.prefix}${
            command.aliases[0]
          } ${errorArguments.map((item) => `<${item}>`).join(" ")}**`,
          footer: `Мы подчеркнули значения с ошибкой`,
        })
      );
      return;
    }
    if (!command.ciDescription.examples && message.guild)
      command.ciDescription.initExamples(message.guild, message.guild.prefix);

    return await super.runCommand(message, command, args);
  }
}
