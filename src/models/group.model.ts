import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Country} from './country.model';
import {CupData} from './cup-data.model';

@model({
  settings: {
    foreignKeys: {
      fk_group_cupData: {
        name: 'fk_group_cupData',
        entity: 'CupData',
        entityKey: 'id',
        foreignKey: 'cupDataId',
      },
    },
  },
})
export class Group extends Entity {
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
  groupName: string;

  @belongsTo(() => CupData)
  cupDataId: number;

  @hasMany(() => Country)
  countries: Country[];

  constructor(data?: Partial<Group>) {
    super(data);
  }
}

export interface GroupRelations {
  // describe navigational properties here
}

export type GroupWithRelations = Group & GroupRelations;
