import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class GuildMemberEntity extends BaseEntity {
  @PrimaryColumn("char", { length: 18 })
  id!: string;

  @Column("char", { length: 18 })
  guildID!: string;

  @Column("int", { default: 0 })
  reputationCount!: number;
}
