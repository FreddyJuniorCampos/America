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
  Campus,
} from '../models';
import {MatchRepository} from '../repositories';

export class MatchCampusController {
  constructor(
    @repository(MatchRepository)
    public matchRepository: MatchRepository,
  ) { }

  @get('/matches/{id}/campus', {
    responses: {
      '200': {
        description: 'Campus belonging to Match',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Campus)},
          },
        },
      },
    },
  })
  async getCampus(
    @param.path.number('id') id: typeof Match.prototype.id,
  ): Promise<Campus> {
    return this.matchRepository.campus(id);
  }
}
