import { Colors, Icons } from "@res";
import { MessageEmbedOptions } from "discord.js";
import { MessageEmbed } from "discord.js";

export class CiEmbed extends MessageEmbed {
  constructor(data?: MessageEmbed | MessageEmbedOptions) {
    super(data);
  }

  private static create(
    author?: string,
    header?: string,
    description?: string,
    footer?: string,
    icon?: string
  ): CiEmbed {
    const embed = new CiEmbed();
    author ? embed.setAuthor(author, icon) : false;
    header ? (embed.title = header) : false;
    footer ? embed.setFooter(footer) : false;
    description ? embed.setDescription(description) : false;
    return embed;
  }

  static error(
    author?: string,
    header?: string,
    description?: string,
    footer?: string,
    color: number = Colors.Red,
    icon: string = Icons.error
  ): CiEmbed {
    return this.create(author, header, description, footer, icon).setColor(
      color
    );
  }

  public static warn(
    author?: string,
    header?: string,
    description?: string,
    footer?: string,
    color: number = Colors.Yellow,
    icon: string = Icons.warning
  ): CiEmbed {
    return this.create(author, header, description, footer, icon).setColor(
      color
    );
  }

  public static success(
    author?: string,
    header?: string,
    description?: string,
    footer?: string,
    color: number = Colors.Green,
    icon: string = Icons.success
  ): CiEmbed {
    return this.create(author, header, description, footer, icon).setColor(
      color
    );
  }

  public static info(
    author?: string,
    header?: string,
    description?: string,
    footer?: string,
    color: number = Colors.Blue,
    icon: string = Icons.info
  ): CiEmbed {
    return this.create(author, header, description, footer, icon).setColor(
      color
    );
  }

  public static infoOrange(
    author?: string,
    header?: string,
    description?: string,
    footer?: string,
    color: number = Colors.Orange,
    icon: string = Icons.infoOrange
  ): CiEmbed {
    return this.create(author, header, description, footer, icon).setColor(
      color
    );
  }
}
