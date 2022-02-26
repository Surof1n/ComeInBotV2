import { CiCommand, CiEmbed } from "@core";
import { CategoryesWithTranslate, CategoryesIcon, KeysCategory } from "@res";
import { Category } from "discord-akairo";
import {
  Guild,
  Message,
  MessageActionRow,
  MessageButton,
  MessageReaction,
  User,
} from "discord.js";

export default class GuildOptionsCommand extends CiCommand {
  constructor() {
    super({
      name: "help",
      aliases: ["помощь"],
      ciCategory: "utils",
      userPermissions: ["ADMINISTRATOR"],
      ciDescription: {
        description: "Cправочник по вызову для справки по командам.",
        header: "-",
        commandForm: "-",
        rules: "-",
        initExamples(_guild: Guild, prefix: string) {
          return [`${prefix}guildoptions`];
        },
      },
      args: [
        {
          index: 0,
          id: "command",
          type: "string",
          name: "комманда",
          default: "",
        },
      ],
    });
  }
  async exec(
    { guild, channel, author }: Message,
    { command }: { command: string }
  ): Promise<void> {
    const categoryes = this.client.commandHandler.categories;
    if (command && guild) {
      const parseCommand = this.client.commandHandler.findCommand(
        command
      ) as CiCommand;
      if (!parseCommand) {
        channel.send(CiEmbed.create("info", { author: "Команда не найдёна!" }));
        return;
      }
      parseCommand.ciDescription
        ? parseCommand.ciDescription.initExamples(guild, guild.prefix)
        : false;

      const helpEmbed = CiEmbed.create(
        { icon: `${CategoryesIcon.get(parseCommand.ciCategory)}`, color: 0 },
        {
          author: `Помощь по модулю ${CategoryesWithTranslate.get(
            parseCommand.ciCategory
          )}`,
          header: `Помощь по команде \`${this.prefix}${parseCommand.id}\``,
        },
        true
      );
      parseCommand.description
        ? helpEmbed.addField("Описание:", `${parseCommand.description}`)
        : false;
      parseCommand.ciDescription?.commandForm
        ? helpEmbed.addField(
            "Использование:",
            `${parseCommand.ciDescription.commandForm}`
          )
        : false;
      parseCommand.ciDescription?.rules
        ? helpEmbed.addField(
            "Правила использования:",
            `${parseCommand.ciDescription.rules}`
          )
        : false;
      parseCommand.ciDescription?.examples
        ? helpEmbed.addField(
            "Примеры использования:",
            `${parseCommand.ciDescription.examples.join("\n")}`
          )
        : false;
      parseCommand.aliases
        ? helpEmbed.addField(
            "Иные названия:",
            `${parseCommand.aliases
              .map((item) => `\`\`${item}\`\``)
              .join(", ")}`
          )
        : false;
      await channel.send({ embeds: [helpEmbed] });
      return;
    }
    const emojiRight = "▶️",
      emojiLeft = "◀️";
    let sliderIndex = 0;
    const categoryesNames = [...categoryes.keys()] as KeysCategory[];

    const helpEmbed = categoryesNames.map((category, index) => {
      const commands = this.client.commandHandler.categories.get(
        category
      ) as Category<string, CiCommand>;

      const embed = CiEmbed.create(
        { icon: `${CategoryesIcon.get(category)}`, color: 0 },
        {
          author: `Помощь по модулю ${CategoryesWithTranslate.get(category)}`,
          description: `${commands
            ?.map(
              (command) =>
                `**${command.aliases[0]}** — ${command.ciDescription.description} \n\n`
            )
            .join(" ")}`,
          footer: `\n${this.prefix}help <команда> для подробностей\nСтраница ${
            index + 1
          }/${categoryesNames.length}`,
        },
        true
      );

      return embed;
    });
    const selectedEmbed =
      helpEmbed[sliderIndex] ||
      CiEmbed.create(
        "info",
        {
          author: "При использовани возникла ошибка.",
          description: `Обратитесь к администратору или повторно используйте команду **${
            String(this.prefix) + this.aliases[0]
          }** `,
        },
        true
      );

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("left")
        .setStyle("SECONDARY")
        .setEmoji(emojiLeft),

      new MessageButton()
        .setCustomId("right")
        .setStyle("SECONDARY")
        .setEmoji(emojiRight)
    );

    const embedMessage = await channel.send({
      embeds: [selectedEmbed],
      components: [row],
    });

    const collector = embedMessage.createMessageComponentCollector({
      filter: (i) => {
        return (
          ["right", "left"].includes(i.customId) && i.user.id === author.id
        );
      },
      time: 120000,
    });

    collector.on("collect", async (i) => {
      if (i.customId === "right") {
        sliderIndex === helpEmbed.length - 1
          ? (sliderIndex = 0)
          : (sliderIndex += 1);
      } else if (i.customId === "left") {
        sliderIndex == 0
          ? (sliderIndex = helpEmbed.length - 1)
          : (sliderIndex -= 1);
      } else {
        embedMessage.delete();
        return;
      }

      const selectedEmbed =
        helpEmbed[sliderIndex] ||
        CiEmbed.create(
          "info",
          {
            author: "При использовани возникла ошибка.",
            description: `Обратитесь к администратору или повторно используйте команду **${
              String(this.prefix) + this.aliases[0]
            }** `,
          },
          true
        );

      await i.update({ embeds: [selectedEmbed] });

      return;
    });
  }
}
