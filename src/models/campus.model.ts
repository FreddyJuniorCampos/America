import {Entity, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<Campus>) {
    super(data);
  }
}

export interface CampusRelations {
  // describe navigational properties here
}

export type CampusWithRelations = Campus & CampusRelations;
