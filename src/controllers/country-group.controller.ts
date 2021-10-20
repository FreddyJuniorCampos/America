import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Country,
  Group,
} from '../models';
import {CountryRepository} from '../repositories';

export class CountryGroupController {
  constructor(
    @repository(CountryRepository)
    public countryRepository: CountryRepository,
  ) { }

  @get('/countries/{id}/group', {
    responses: {
      '200': {
        description: 'Group belonging to Country',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Group)},
          },
        },
      },
    },
  })
  async getGroup(
    @param.path.number('id') id: typeof Country.prototype.id,
  ): Promise<Group> {
    return this.countryRepository.group(id);
  }
}
