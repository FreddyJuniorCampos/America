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
  Player,
} from '../models';
import {CountryRepository} from '../repositories';

export class CountryPlayerController {
  constructor(
    @repository(CountryRepository) protected countryRepository: CountryRepository,
  ) { }

  @get('/countries/{id}/players', {
    responses: {
      '200': {
        description: 'Array of Country has many Player',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Player)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Player>,
  ): Promise<Player[]> {
    return this.countryRepository.players(id).find(filter);
  }

  @post('/countries/{id}/players', {
    responses: {
      '200': {
        description: 'Country model instance',
        content: {'application/json': {schema: getModelSchemaRef(Player)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Country.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {
            title: 'NewPlayerInCountry',
            exclude: ['id'],
            optional: ['countryId']
          }),
        },
      },
    }) player: Omit<Player, 'id'>,
  ): Promise<Player> {
    return this.countryRepository.players(id).create(player);
  }

  @patch('/countries/{id}/players', {
    responses: {
      '200': {
        description: 'Country.Player PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {partial: true}),
        },
      },
    })
    player: Partial<Player>,
    @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return this.countryRepository.players(id).patch(player, where);
  }

  @del('/countries/{id}/players', {
    responses: {
      '200': {
        description: 'Country.Player DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return this.countryRepository.players(id).delete(where);
  }
}
