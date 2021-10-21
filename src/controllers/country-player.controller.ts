import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Player
} from '../models';
import {CountryRepository, PlayerRepository} from '../repositories';

export class CountryPlayerController {
  constructor(
    @repository(CountryRepository) protected countryRepository: CountryRepository,
    @repository(PlayerRepository) protected playerRepository: PlayerRepository,
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

}
