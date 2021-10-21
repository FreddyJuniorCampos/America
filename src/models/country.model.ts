import {belongsTo, Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Dt} from './dt.model';
import {Group} from './group.model';
import {Player} from './player.model';
import {Match} from './match.model';

@model({
  settings: {
    foreignKeys: {
      fk_country_group: {
        name: 'fk_country_group',
        entity: 'Group',
        entityKey: 'id',
        foreignKey: 'groupId',
      },
    },
  },
})
export class Country extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  countryName: string;

  @belongsTo(() => Group)
  groupId: number;

  @hasOne(() => Dt)
  dt: Dt;

  @hasMany(() => Player)
  players: Player[];

  @hasMany(() => Match, {keyTo: 'localTeam'})
  local_matches: Match[];

  @hasMany(() => Match, {keyTo: 'visitTeam'})
  visit_matches: Match[];

  constructor(data?: Partial<Country>) {
    super(data);
  }
}

export interface CountryRelations {
  // describe navigational properties here
}

export type CountryWithRelations = Country & CountryRelations;
