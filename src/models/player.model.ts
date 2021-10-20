import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Country} from './country.model';

@model({
  settings: {
    foreignKeys: {
      fk_player_country: {
        name: 'fk_player_country',
        entity: 'Country',
        entityKey: 'id',
        foreignKey: 'countryId',
      },
    },
  },
})
export class Player extends Entity {
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
    type: 'string',
  })
  nickname?: string;

  @property({
    type: 'string',
    required: true,
  })
  nameShirt: string;

  @property({
    type: 'number',
    required: true,
  })
  numberShirt: number;

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
  club: string;

  @property({
    type: 'string',
    required: true,
  })
  clubCountry: string;

  @property({
    type: 'string',
    required: true,
  })
  position: string;

  @property({
    type: 'string',
    required: true,
  })
  weight: string;

  @property({
    type: 'string',
    required: true,
  })
  height: string;

  @belongsTo(() => Country)
  countryId: number;

  constructor(data?: Partial<Player>) {
    super(data);
  }
}

export interface PlayerRelations {
  // describe navigational properties here
}

export type PlayerWithRelations = Player & PlayerRelations;
