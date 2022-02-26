import {
  createCanvas,
  loadImage,
  CanvasRenderingContext2D,
  registerFont,
} from "canvas";
import { GuildMember, MessageAttachment } from "discord.js";
import * as moment from "moment";
import { CardSettings, CiOptions } from "@res";

export class CiCardsProfile {
  static async createDefaultCard(
    member: GuildMember
  ): Promise<MessageAttachment> {
    registerFont("src/assets/fonts/Oswald-Regular.ttf", {
      family: "Oswald-Regular",
    });
    registerFont("src/assets/fonts/Caveat-Bold.ttf", { family: "Caveat" });
    registerFont("src/assets/fonts/Academy-Bold.ttf", { family: "Academy" });
    const canvas = createCanvas(
      CardSettings.IMAGE_SIZE.x,
      CardSettings.IMAGE_SIZE.y
    );
    const ctx = canvas.getContext("2d");
    const background = await loadImage("src/assets/usual/usual-background.png");
    const base = await loadImage("src/assets/usual/base.png");
    const avatar = await loadImage(
      member.user.displayAvatarURL({ format: "png" })
    );
    ctx.fillStyle = "#ffffff";
    ctx.drawImage(
      background,
      0,
      0,
      CardSettings.IMAGE_SIZE.x,
      CardSettings.IMAGE_SIZE.y
    );
    ctx.drawImage(base, 0, 0);
    ctx.font = '41px "Caveat"';
    // const role = member.roles.cache.find((item) =>
    //   Object.values(RoleLevel).includes(item.id)
    // );
    // const widthTextNickname = ctx.measureText(member.displayName).width;
    ctx.fillText(
      member.displayName.length > 20
        ? member.displayName.slice(0, 20) + "..."
        : member.displayName,
      CardSettings.POSITIONS.nickname.x,
      CardSettings.POSITIONS.nickname.y + 41
    );
    // Draw role
    ctx.font = "24px Oswald-Regular";
    // const roleFill = `Статус: ${
    //   role
    //     ? role.name.includes("Гость")
    //       ? "Гость"
    //       : role.name.includes("Житель")
    //       ? "Житель"
    //       : role.name.includes("Знать")
    //       ? "Знать"
    //       : ""
    //     : ""
    // }`;
    ctx.fillText(
      "-",
      CardSettings.POSITIONS.role.x,
      CardSettings.POSITIONS.role.y + 26
    );
    // Draw stats
    ctx.font = '26px "Caveat"';
    ctx.fillText(
      member.messagesCount.toString(),
      CardSettings.POSITIONS.stats.messages.x,
      CardSettings.POSITIONS.stats.messages.y + 26
    );
    ctx.fillText(
      "-",
      CardSettings.POSITIONS.stats.vc_hours.x,
      CardSettings.POSITIONS.stats.vc_hours.y + 26
    );
    ctx.fillText(
      moment().diff(member.joinedAt, "days").toString(),
      CardSettings.POSITIONS.stats.days.x,
      CardSettings.POSITIONS.stats.days.y + 26
    );
    // Draw data economy
    ctx.fillStyle = "#000000";
    ctx.fillText(
      member.sparkController.count.toString(),
      CardSettings.POSITIONS.wallet.sparks.x -
        Math.floor(
          ctx.measureText(member.sparkController.count.toString()).width / 2
        ) +
        2,
      CardSettings.POSITIONS.wallet.sparks.y + 26
    );
    ctx.fillText(
      member.reputationController.count.toString(),
      CardSettings.POSITIONS.wallet.warmth.x -
        Math.floor(
          ctx.measureText(member.reputationController.count.toString()).width /
            2
        ) +
        2,
      CardSettings.POSITIONS.wallet.warmth.y + 26
    );
    ctx.fillText(
      "-",
      CardSettings.POSITIONS.wallet.pents.x -
        Math.floor(ctx.measureText("-").width / 2) +
        2,
      CardSettings.POSITIONS.wallet.pents.y + 26
    );
    // Draw About Me
    ctx.font = "22px Academy";

    ctx.fillText(
      wrap(
        ctx,
        member.about
          ? member.about
          : `Используй ${CiOptions.prefix}about для заполнения информации о себе.`
      ),
      CardSettings.POSITIONS.userInfo.x - 10,
      CardSettings.POSITIONS.userInfo.y + 22
    );
    // ---
    ctx.font = '26px "Caveat"';
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      member.sparkController.count.toString(),
      CardSettings.POSITIONS.wallet.sparks.x -
        Math.floor(
          ctx.measureText(member.sparkController.count.toString()).width / 2
        ),
      CardSettings.POSITIONS.wallet.sparks.y + 26
    );
    ctx.fillText(
      member.reputationController.count.toString(),
      CardSettings.POSITIONS.wallet.warmth.x -
        Math.floor(
          ctx.measureText(member.reputationController.count.toString()).width /
            2
        ),
      CardSettings.POSITIONS.wallet.warmth.y + 26
    );
    ctx.fillText(
      "-",
      CardSettings.POSITIONS.wallet.pents.x -
        Math.floor(ctx.measureText("-").width / 2),
      CardSettings.POSITIONS.wallet.pents.y + 26
    );

    // Draw Avatar
    ctx.beginPath();
    ctx.arc(
      CardSettings.POSITIONS.avatar.x + CardSettings.AVATAR_SIZE.r,
      CardSettings.POSITIONS.avatar.y + CardSettings.AVATAR_SIZE.r,
      CardSettings.AVATAR_SIZE.r,
      0,
      2 * Math.PI,
      true
    );
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(
      avatar,
      CardSettings.POSITIONS.avatar.x,
      CardSettings.POSITIONS.avatar.y,
      CardSettings.AVATAR_SIZE.x,
      CardSettings.AVATAR_SIZE.y
    );
    return new MessageAttachment(canvas.toBuffer(), "cartunsual.png");
  }
}

function wrap(ctx: CanvasRenderingContext2D, str: string) {
  let words = str.split("");
  let line = "";
  let result: string[] = [];
  if (!str) return "";
  words.forEach((symb, index) => {
    if (ctx.measureText(line + symb).width < 340) {
      line += symb;
      if (index + 1 === words.length) result.push(line);
    } else {
      result.push(line);
      line = symb === " " ? "" : symb;
    }
  });
  return result.join("\n");
}
