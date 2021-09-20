import "module-alias/register";

import { CiClient, CiGuild, CiGuildMember } from "@core";
import { createConnection } from "typeorm";
import { Structures } from "discord.js";
import { emojis } from "@res";

Structures.extend("GuildMember", () => CiGuildMember);
Structures.extend("Guild", () => CiGuild);

Array.prototype.randomitem = function () {
  return this[Math.floor(Math.random() * this.length)];
};

String.prototype.emojimatcher = function (this: string) {
  const standEmoji = emojis[this];
  if (standEmoji) return this;
  const CUSTOM_EMOJI_REGEX = /<(?:.*)?:(\w+):(\d+)>/;
  const matchedString = this.match(CUSTOM_EMOJI_REGEX);
  return matchedString ? matchedString.slice(1, 3).join(":") : null;
};

String.prototype.emojicomplete = function (this: string) {
  const standEmoji = emojis[this];
  if (standEmoji) return this;
  const CUSTOM_EMOJI_THIS = /(\w+):(\d+)/;
  const matchedString = this.match(CUSTOM_EMOJI_THIS);
  return matchedString ? `<:${this}>` : null;
};

async function init() {
  await createConnection()
    .then(() => console.log("Database Connect"))
    .catch((err) => console.error(err));
  new CiClient().init();
}

init();
