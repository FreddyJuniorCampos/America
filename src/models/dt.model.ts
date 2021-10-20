import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Country} from './country.model';

@model({
  settings: {
    foreignKeys: {
      fk_dt_country: {
        name: 'fk_dt_country',
        entity: 'Country',
        entityKey: 'id',
        foreignKey: 'countryId',
      },
    },
  },
})
export class Dt extends Entity {
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

  @belongsTo(() => Country)
  countryId: number;

  constructor(data?: Partial<Dt>) {
    super(data);
  }
}

export interface DtRelations {
  // describe navigational properties here
}

export type DtWithRelations = Dt & DtRelations;
