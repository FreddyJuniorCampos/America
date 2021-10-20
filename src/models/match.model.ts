import {Entity, model, property} from '@loopback/repository';

@model()
export class Match extends Entity {
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
  localTeam: string;

  @property({
    type: 'string',
    required: true,
  })
  visitTeam: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    default: '0 - 0',
  })
  result?: string;

  @property({
    type: 'string',
    default: 'not started',
  })
  state?: string;

  @property({
    type: 'string',
    required: true,
  })
  tournamentPhase: string;


  constructor(data?: Partial<Match>) {
    super(data);
  }
}

export interface MatchRelations {
  // describe navigational properties here
}

export type MatchWithRelations = Match & MatchRelations;
