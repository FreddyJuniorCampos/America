import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {CupData} from './cup-data.model';
import {Match} from './match.model';

@model({
  settings: {
    foreignKeys: {
      fk_campus_cupData: {
        name: 'fk_campus_cupData',
        entity: 'CupData',
        entityKey: 'id',
        foreignKey: 'cupDataId',
      },
    },
  },
})
export class Campus extends Entity {
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
  stadium: string;

  @property({
    type: 'number',
    required: true,
  })
  capacity: number;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @belongsTo(() => CupData)
  cupDataId: number;

  @hasMany(() => Match)
  matches: Match[];

  constructor(data?: Partial<Campus>) {
    super(data);
  }
}

export interface CampusRelations {
  // describe navigational properties here
}

export type CampusWithRelations = Campus & CampusRelations;
