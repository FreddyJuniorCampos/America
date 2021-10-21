import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Country} from '../models';
import {CountryRepository, GroupRepository} from '../repositories';

export class CountryController {
  constructor(
    @repository(CountryRepository)
    public countryRepository: CountryRepository,
    @repository(GroupRepository) protected groupRepository: GroupRepository,
  ) { }

  @post('/countries')
  @response(200, {
    description: 'Country model instance',
    content: {'application/json': {schema: getModelSchemaRef(Country)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Country, {
            title: 'NewCountry',
            exclude: ['id'],
          }),
        },
      },
    })
    country: Omit<Country, 'id'>,
  ): Promise<Country> {
    const fullGroup = await this.fullGroup(country.groupId);
    if (fullGroup) {
      throw new HttpErrors[409]('The group is full (maximum 5 countries per group)');
    }
    return this.countryRepository.create(country);
  }

  @get('/countries/count')
  @response(200, {
    description: 'Country model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Country) where?: Where<Country>,
  ): Promise<Count> {
    return this.countryRepository.count(where);
  }

  @get('/countries')
  @response(200, {
    description: 'Array of Country model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Country, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Country) filter?: Filter<Country>,
  ): Promise<Country[]> {
    return this.countryRepository.find(filter);
  }

  @get('/countries/{id}')
  @response(200, {
    description: 'Country model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Country, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Country, {exclude: 'where'}) filter?: FilterExcludingWhere<Country>
  ): Promise<Country> {
    const include = [
      {
        relation: 'players',
        scope: {
          fields: [
            'firstName',
            'lastName',
            'numberShirt',
            'position',
            'countryId'
          ],
        }
      },
      {
        relation: 'dt',
        scope: {
          fields: [
            'firstName',
            'lastName',
            'countryId'
          ]
        }
      },
      {
        relation: 'local_matches',
        scope: {
          fields: [
            'date',
            'result',
            'state',
            'tournamentPhase',
            'localTeam',
            'visitTeam'
          ]
        }
      },
      {
        relation: 'visit_matches',
        scope: {
          fields: [
            'date',
            'result',
            'state',
            'tournamentPhase',
            'localTeam',
            'visitTeam'
          ]
        }
      },
    ];
    if (filter) {
      filter.include = include;
    } else {
      filter = {
        include: include
      };
    }
    return this.countryRepository.findById(id, filter);
  }

  @patch('/countries/{id}')
  @response(204, {
    description: 'Country PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Country, {partial: true}),
        },
      },
    })
    country: Country,
  ): Promise<void> {
    await this.countryRepository.updateById(id, country);
  }

  @put('/countries/{id}')
  @response(204, {
    description: 'Country PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() country: Country,
  ): Promise<void> {
    await this.countryRepository.replaceById(id, country);
  }

  @del('/countries/{id}')
  @response(204, {
    description: 'Country DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.countryRepository.deleteById(id);
  }

  async fullGroup(
    id: number | undefined,
  ) {
    const filter = {
      include: [
        'countries'
      ],
    };
    const countriesGroup = await this.groupRepository.findById(id, filter);
    if (countriesGroup.countries) {
      if (countriesGroup.countries.length >= 5)
        return true
    }
    return false;
  }
}
