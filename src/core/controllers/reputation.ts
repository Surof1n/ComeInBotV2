import { ErrorReputationDate } from "@core";
import { GuildMemberEntity, TransferEntity } from "@db";
import { GuildMember } from "discord.js";
import * as moment from "moment";
import { BaseController } from ".";

export class ReputationController implements BaseController {
  member: GuildMember;
  count: number;
  constructor(member: GuildMember, count: number) {
    this.member = member;
    this.count = count;
  }
  async send(receiver: GuildMember) {
    const transfers = await TransferEntity.find({
      where: {
        memberID: this.member.id,
        receiverID: receiver.id,
        guildID: receiver.guild.id,
        type: "reputation",
      },
    });

    if (
      transfers.find(
        (transfer) => moment().diff(moment(transfer.date), "days", true) < 1
      )
    ) {
      throw new ErrorReputationDate("Transfer was created in this day.");
    }
    receiver.reputationController.count += 1;
    await GuildMemberEntity.update(
      { id: receiver.id, guildID: receiver.guild.id },
      {
        reputationCount: receiver.reputationController.count,
      }
    );
    const dataTranfer = new TransferEntity(
      this.member.id,
      receiver.id,
      receiver.guild.id,
      "reputation",
      1
    );
    await dataTranfer.save();
    return;
  }

  public mouthUpdate() {
    this.count = 0;
    GuildMemberEntity.update(
      { id: this.member.id },
      {
        reputationCount: this.count,
      }
    );
  }
}
