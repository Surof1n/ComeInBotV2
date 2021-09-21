import { Snowflake } from "discord.js";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
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
    this.memberID = memberID;
    this.receiverID = reciverID;
    this.guildID = guildID;
    this.type = type;
    this.count = count;
  }
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("char", { length: 18 })
  memberID: string;

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
