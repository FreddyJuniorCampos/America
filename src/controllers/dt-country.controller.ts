import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Dt,
  Country,
} from '../models';
import {DtRepository} from '../repositories';

export class DtCountryController {
  constructor(
    @repository(DtRepository)
    public dtRepository: DtRepository,
  ) { }

  @get('/dts/{id}/country', {
    responses: {
      '200': {
        description: 'Country belonging to Dt',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Country)},
          },
        },
      },
    },
  })
  async getCountry(
    @param.path.number('id') id: typeof Dt.prototype.id,
  ): Promise<Country> {
    return this.dtRepository.country(id);
  }
}
