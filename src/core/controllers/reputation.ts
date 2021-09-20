import { ErrorReputationDate } from "@core";
import { GuildMemberEntity, TransferEntity } from "@db";
import { GuildMember } from "discord.js";
import * as moment from "moment";
import { BaseController } from ".";

export class ReputationController extends BaseController {
  constructor(member: GuildMember, count: number) {
    super(member, count);
  }
  add(): void {
    throw new Error("Method not implemented.");
  }
  async send(receiver: GuildMember) {
    const transfers = await TransferEntity.find({
      where: {
        id: this.member.id,
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
  remove(): void {
    throw new Error("Method not implemented.");
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
