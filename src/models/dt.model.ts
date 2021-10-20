import {Entity, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<Dt>) {
    super(data);
  }
}

export interface DtRelations {
  // describe navigational properties here
}

export type DtWithRelations = Dt & DtRelations;
