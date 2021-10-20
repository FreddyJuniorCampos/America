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
import {CampusRepository} from '../repositories';

export class CampusMatchController {
  constructor(
    @repository(CampusRepository) protected campusRepository: CampusRepository,
  ) { }

  @get('/campuses/{id}/matches', {
    responses: {
      '200': {
        description: 'Array of Campus has many Match',
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
    return this.campusRepository.matches(id).find(filter);
  }
}
