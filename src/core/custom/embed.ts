import { Colors, Icons } from "@res";
import { ColorResolvable, MessageEmbedOptions } from "discord.js";
import { MessageEmbed } from "discord.js";

const typesEmbeds = {
  positiveInfo: {
    color: Colors.Orange,
    icon: Icons.infoOrange,
  },
  info: {
    color: Colors.Blue,
    icon: Icons.info,
  },
  error: {
    color: Colors.Red,
    icon: Icons.error,
  },
  warn: {
    color: Colors.Yellow,
    icon: Icons.warning,
  },
  success: {
    color: Colors.Green,
    icon: Icons.success,
  },
};
export class CiEmbed extends MessageEmbed {
  private static types = typesEmbeds;
  constructor(data?: MessageEmbed | MessageEmbedOptions) {
    super(data);
  }

  static create<T extends boolean = false>(
    type: keyof typeof typesEmbeds | { icon: string; color: ColorResolvable },
    {
      author,
      header,
      description,
      footer,
    }: {
      author?: string;
      header?: string;
      description?: string;
      footer?: string;
    },
    isInstance?: T
  ): RecordForEmbed<T> {
    const embed = new CiEmbed();
    const selectType = typeof type === "string" ? this.types[type] : type;
    author
      ? embed.setAuthor({ iconURL: selectType.icon, name: author })
      : false;
    header ? (embed.title = header) : false;
    footer ? embed.setFooter(footer) : false;
    description ? embed.setDescription(description) : false;
    embed.setColor(selectType.color);
    const result = isInstance ? embed : { embeds: [embed] };
    return result as RecordForEmbed<T>;
  }
}

type RecordForEmbed<T extends boolean> = T extends true
  ? CiEmbed
  : { embeds: CiEmbed[] };
