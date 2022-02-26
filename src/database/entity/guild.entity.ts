import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import {
  GuildChannelsSettings,
  GuildReputationSettings,
} from "@res";
@Entity()
export class GuildEntity extends BaseEntity {
  @PrimaryColumn("char", { length: 18 })
  id!: string;

  @Column("simple-json", { default: GuildReputationSettings })
  reputation!: typeof GuildReputationSettings;

  @Column("simple-json", { default: GuildChannelsSettings })
  channels!: typeof GuildChannelsSettings;
}
