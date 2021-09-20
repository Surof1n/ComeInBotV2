import { Snowflake } from "discord.js";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from "typeorm";

const transferEnum = ["spark", "penta", "reputation"] as const;
type TransferTypes = typeof transferEnum[number];
@Entity()
export class TransferEntity extends BaseEntity {
  constructor(
    memberID: Snowflake,
    reciverID: Snowflake,
    guildID: Snowflake,
    type: TransferTypes,
    count: number
  ) {
    super();
    this.id = memberID;
    this.receiverID = reciverID;
    this.guildID = guildID;
    this.type = type;
    this.count = count;
  }
  @PrimaryColumn("char", { length: 18 })
  id: string;

  @Column("char", { length: 18 })
  receiverID: string;
  
  @Column("char", { length: 18 })
  guildID: string;

  @Column({ type: "enum", enum: transferEnum })
  type: TransferTypes;

  @Column("int")
  count: number;

  @CreateDateColumn()
  date!: Date;
}
