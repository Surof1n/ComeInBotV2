import { CiClient } from "@core";
import { KeysCategory } from "@res";
import { CiCommandOptions, CiDescription } from "@types";
import { ArgumentGenerator, ArgumentOptions, Command } from "discord-akairo";
import { Message } from "discord.js";

export class CiCommand extends Command {
  public ciDescription: CiDescription;
  public declare client: CiClient;

  public ciCategory: KeysCategory;
  public argsInOptions?: ArgumentOptions[] | ArgumentGenerator;
  constructor(options: CiCommandOptions) {
    options.category = options.ciCategory;
    super(options.name, options);
    options.aliases.unshift(options.name);
    this.ciDescription = options.ciDescription;
    this.ciCategory = options.ciCategory;
    this.prefix = process.env["PREFIX"];
    this.argsInOptions = options.args;
  }
}
