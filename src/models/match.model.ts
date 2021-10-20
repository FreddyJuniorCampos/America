import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Campus} from './campus.model';
import {CupData} from './cup-data.model';
import {Referee} from './referee.model';

@model({
  settings: {
    foreignKeys: {
      fk_match_cupData: {
        name: 'fk_match_cupData',
        entity: 'CupData',
        entityKey: 'id',
        foreignKey: 'cupDataId',
      },
      fk_match_referee: {
        name: 'fk_match_referee',
        entity: 'Referee',
        entityKey: 'id',
        foreignKey: 'refereeId',
      },
      fk_match_campus: {
        name: 'fk_match_campus',
        entity: 'Campus',
        entityKey: 'id',
        foreignKey: 'campusId',
      },
    },
  },
})
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

  @belongsTo(() => CupData)
  cupDataId: number;

  @belongsTo(() => Referee)
  refereeId: number;

  @belongsTo(() => Campus)
  campusId: number;

  constructor(data?: Partial<Match>) {
    super(data);
  }
}

export interface MatchRelations {
  // describe navigational properties here
}

export type MatchWithRelations = Match & MatchRelations;
