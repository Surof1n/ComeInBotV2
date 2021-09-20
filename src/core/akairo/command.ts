import { CiClient } from "@core";
import { CiCommandOptions, CiDescription } from "@types";
import { ArgumentGenerator, ArgumentOptions, Command } from "discord-akairo";

export class CiCommand extends Command {
  public cidescription: CiDescription;
  public declare client: CiClient;
  public argsInOptions?: ArgumentOptions[] | ArgumentGenerator;
  constructor(options: CiCommandOptions) {
    super(options.name, options);
    options.aliases.unshift(options.name);
    this.cidescription = options.cidescription;
    this.prefix = process.env["PREFIX"];
    this.argsInOptions = options.args;
  }
}
