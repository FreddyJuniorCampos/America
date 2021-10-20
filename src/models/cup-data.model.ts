import {Entity, model, property, hasMany} from '@loopback/repository';
import {Group} from './group.model';
import {Campus} from './campus.model';
import {Match} from './match.model';
import {Referee} from './referee.model';

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

  @hasMany(() => Group)
  groups: Group[];

  @hasMany(() => Campus)
  campuses: Campus[];

  @hasMany(() => Match)
  matches: Match[];

  @hasMany(() => Referee)
  referees: Referee[];

  constructor(data?: Partial<CupData>) {
    super(data);
  }
}

export interface CupDataRelations {
  // describe navigational properties here
}

export type CupDataWithRelations = CupData & CupDataRelations;
