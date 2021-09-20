import { CheckIntervalEntity } from "@db";
import { Guild } from "discord.js";
import * as moment from "moment";
import { TimeOutSet } from "@res";
import { TimeOutTypes } from "@types";
export class CiTimeout {
  public activeTimeOut!: NodeJS.Timeout;
  public guild: Guild;
  constructor(guild: Guild) {
    this.guild = guild;
    this.activeTimeOut;
    this.init();
  }

  public init() {
    this.activeTimeOut = setInterval(async () => {
      const timeOutEntity = await CheckIntervalEntity.find();
      if (timeOutEntity.length != Array.from(TimeOutSet).length) {
        for await (const type of TimeOutSet.keys()) {
          const newEntityTimeOut = new CheckIntervalEntity();
          newEntityTimeOut.guildID = this.guild.id;
          newEntityTimeOut.type = type as TimeOutTypes;
          newEntityTimeOut.date = moment()
            .add("1", type as moment.DurationInputArg2)
            .startOf(type as moment.unitOfTime.StartOf)
            .toDate();
          newEntityTimeOut.status = true;
          newEntityTimeOut.save();
        }
      }

      if (timeOutEntity.length) {
        for await (const entity of timeOutEntity) {
          if (entity.status) {
            if (moment().isAfter(moment(entity.date))) {
              switch (entity.type) {
                case "month":
                  this.guild.members.cache.forEach((member) => {
                    member.reputationController.mouthUpdate();
                  });
                  break;
                default:
                  break;
              }
              entity.date = moment()
                .add("1", entity.type as moment.DurationInputArg2)
                .startOf(entity.type as moment.unitOfTime.StartOf)
                .toDate();
              entity.save();
            }
          }
        }
      }
    }, 5000);
  }
}
