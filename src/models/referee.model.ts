import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {CupData} from './cup-data.model';
import {Match} from './match.model';

@model({
  settings: {
    foreignKeys: {
      fk_referee_cupData: {
        name: 'fk_referee_cupData',
        entity: 'CupData',
        entityKey: 'id',
        foreignKey: 'cupDataId',
      },
    },
  },
})
export class Referee extends Entity {
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
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'date',
    required: true,
  })
  dateBirth: string;

  @property({
    type: 'string',
    required: true,
  })
  passport: string;

  @property({
    type: 'date',
    required: true,
  })
  passportExpiration: string;

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  @belongsTo(() => CupData)
  cupDataId: number;

  @hasMany(() => Match)
  matches: Match[];

  constructor(data?: Partial<Referee>) {
    super(data);
  }
}

export interface RefereeRelations {
  // describe navigational properties here
}

export type RefereeWithRelations = Referee & RefereeRelations;
