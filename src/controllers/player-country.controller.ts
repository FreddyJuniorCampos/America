import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Player,
  Country,
} from '../models';
import {PlayerRepository} from '../repositories';

export class PlayerCountryController {
  constructor(
    @repository(PlayerRepository)
    public playerRepository: PlayerRepository,
  ) { }

  @get('/players/{id}/country', {
    responses: {
      '200': {
        description: 'Country belonging to Player',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Country)},
          },
        },
      },
    },
  })
  async getCountry(
    @param.path.number('id') id: typeof Player.prototype.id,
  ): Promise<Country> {
    return this.playerRepository.country(id);
  }
}
