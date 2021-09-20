import { TimeOutSet } from "@res";
import type { TimeOutTypes } from "@types";
import type { Snowflake } from "discord.js";
import {
  BaseEntity,
  Column,
  Entity, PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class CheckIntervalEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("char", { length: 18 })
  guildID!: Snowflake;

  @Column({ type: "enum", enum: Array.from(TimeOutSet) })
  type!: TimeOutTypes;

  @Column({ type: "timestamp" })
  date!: Date;

  @Column("bool")
  status!: boolean;
}
