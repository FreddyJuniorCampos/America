import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  HttpErrors,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Country,
  Dt
} from '../models';
import {CountryRepository, DtRepository} from '../repositories';

export class CountryDtController {
  constructor(
    @repository(CountryRepository) protected countryRepository: CountryRepository,
    @repository(DtRepository) protected dtRepository: DtRepository,
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
            exclude: ['id', 'countryId'],
          }),
        },
      },
    }) dt: Omit<Dt, 'id'>,
  ): Promise<Dt> {
    if (id !== undefined) {
      const exists = await this.exists(id);
      if (exists) {
        throw new HttpErrors[409]('This country have a Dt');
      }
      dt = { ...dt, countryId: id };
    }
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

  async exists(
    id: number | undefined,
  ) {
    const where: Where<Dt> = { 'countryId': id };
    const dtNumber = await this.dtRepository.count(where);
    if (dtNumber.count > 0) {
      return true
    }
    return false;
  }

}
