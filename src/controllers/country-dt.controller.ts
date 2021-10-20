import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Country,
  Dt,
} from '../models';
import {CountryRepository} from '../repositories';

export class CountryDtController {
  constructor(
    @repository(CountryRepository) protected countryRepository: CountryRepository,
  ) { }

  @get('/countries/{id}/dt', {
    responses: {
      '200': {
        description: 'Country has one Dt',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Dt),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Dt>,
  ): Promise<Dt> {
    return this.countryRepository.dt(id).get(filter);
  }

  @post('/countries/{id}/dt', {
    responses: {
      '200': {
        description: 'Country model instance',
        content: {'application/json': {schema: getModelSchemaRef(Dt)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Country.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dt, {
            title: 'NewDtInCountry',
            exclude: ['id'],
            optional: ['countryId']
          }),
        },
      },
    }) dt: Omit<Dt, 'id'>,
  ): Promise<Dt> {
    return this.countryRepository.dt(id).create(dt);
  }

  @patch('/countries/{id}/dt', {
    responses: {
      '200': {
        description: 'Country.Dt PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dt, {partial: true}),
        },
      },
    })
    dt: Partial<Dt>,
    @param.query.object('where', getWhereSchemaFor(Dt)) where?: Where<Dt>,
  ): Promise<Count> {
    return this.countryRepository.dt(id).patch(dt, where);
  }

  @del('/countries/{id}/dt', {
    responses: {
      '200': {
        description: 'Country.Dt DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Dt)) where?: Where<Dt>,
  ): Promise<Count> {
    return this.countryRepository.dt(id).delete(where);
  }
}
