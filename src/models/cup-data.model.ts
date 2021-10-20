import {Entity, model, property} from '@loopback/repository';

@model()
export class CupData extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'date',
    required: true,
  })
  endDate: string;

  @property({
    type: 'string',
    required: true,
  })
  edition: string;

  @property({
    type: 'string',
    required: true,
  })
  organizers: string;


  constructor(data?: Partial<CupData>) {
    super(data);
  }
}

export interface CupDataRelations {
  // describe navigational properties here
}

export type CupDataWithRelations = CupData & CupDataRelations;
