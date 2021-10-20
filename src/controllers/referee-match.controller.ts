import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Match
} from '../models';
import {RefereeRepository} from '../repositories';

export class RefereeMatchController {
  constructor(
    @repository(RefereeRepository) protected refereeRepository: RefereeRepository,
  ) { }

  @get('/referees/{id}/matches', {
    responses: {
      '200': {
        description: 'Array of Referee has many Match',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Match)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Match>,
  ): Promise<Match[]> {
    return this.refereeRepository.matches(id).find(filter);
  }
}
