import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { GuildReputationSettings } from "@res";
@Entity()
export class GuildEntity extends BaseEntity {
  @PrimaryColumn("char", { length: 18 })
  id!: string;

  @Column("simple-json")
  reputation!: typeof GuildReputationSettings;
}
