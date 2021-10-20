import {Entity, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<Referee>) {
    super(data);
  }
}

export interface RefereeRelations {
  // describe navigational properties here
}

export type RefereeWithRelations = Referee & RefereeRelations;
