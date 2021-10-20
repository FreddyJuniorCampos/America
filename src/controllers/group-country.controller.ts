import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Country
} from '../models';
import {GroupRepository} from '../repositories';

export class GroupCountryController {
  constructor(
    @repository(GroupRepository) protected groupRepository: GroupRepository,
  ) { }

  @get('/groups/{id}/countries', {
    responses: {
      '200': {
        description: 'Array of Group has many Country',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Country)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Country>,
  ): Promise<Country[]> {
    return this.groupRepository.countries(id).find(filter);
  }
}
