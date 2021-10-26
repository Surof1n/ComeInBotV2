import {
  BaseController,
  ErrorAddCountNegative,
  ErrorEqualsMembersSend,
  ErrorMoreRemoveSparks,
} from "@core";
import { GuildMemberEntity } from "@db";
import type { GuildMember } from "discord.js";

export class SparkController implements BaseController {
  member: GuildMember;
  count: number;
  constructor(member: GuildMember, count: number) {
    this.member = member;
    this.count = count;
  }
  add(count: number) {
    if (count <= 0) throw new ErrorAddCountNegative("spark <= 0");
    this.count = this.count + count;

    GuildMemberEntity.update(this.member.id, {
      sparkCount: this.count,
    });
  }
  send(receiver: GuildMember, count: number) {
    if (this.member.id === receiver.id)
      throw new ErrorEqualsMembersSend("recievier === sender");
    this.remove(count);
    receiver.sparkController.add(count);
  }

  remove(count: number) {
    if (this.count - count < 0) throw new ErrorMoreRemoveSparks("more remove");
    if (count <= 0) throw new ErrorAddCountNegative("spark <= 0");
    this.count = this.count - count;
    GuildMemberEntity.update(this.member.id, { sparkCount: this.count });
  }
}
