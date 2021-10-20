import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Match,
  Referee,
} from '../models';
import {MatchRepository} from '../repositories';

export class MatchRefereeController {
  constructor(
    @repository(MatchRepository)
    public matchRepository: MatchRepository,
  ) { }

  @get('/matches/{id}/referee', {
    responses: {
      '200': {
        description: 'Referee belonging to Match',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Referee)},
          },
        },
      },
    },
  })
  async getReferee(
    @param.path.number('id') id: typeof Match.prototype.id,
  ): Promise<Referee> {
    return this.matchRepository.referee(id);
  }
}
