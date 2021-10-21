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
  getModelSchemaRef,
  HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Player} from '../models';
import {PlayerRepository} from '../repositories';

export class PlayerController {
  constructor(
    @repository(PlayerRepository)
    public playerRepository: PlayerRepository,
  ) { }

  @post('/players')
  @response(200, {
    description: 'Player model instance',
    content: {'application/json': {schema: getModelSchemaRef(Player)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {
            title: 'NewPlayer',
            exclude: ['id'],
          }),
        },
      },
    })
    player: Omit<Player, 'id'>,
  ): Promise<Player> {
    if (player.countryId !== undefined) {
      await this.validatePlayer(player.countryId, player);
    }
    return this.playerRepository.create(player);
  }

  @get('/players/count')
  @response(200, {
    description: 'Player model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Player) where?: Where<Player>,
  ): Promise<Count> {
    return this.playerRepository.count(where);
  }

  @get('/players')
  @response(200, {
    description: 'Array of Player model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Player, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Player) filter?: Filter<Player>,
  ): Promise<Player[]> {
    return this.playerRepository.find(filter);
  }

  @get('/players/{id}')
  @response(200, {
    description: 'Player model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Player, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Player, {exclude: 'where'}) filter?: FilterExcludingWhere<Player>
  ): Promise<Player> {
    return this.playerRepository.findById(id, filter);
  }

  @patch('/players/{id}')
  @response(204, {
    description: 'Player PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {partial: true}),
        },
      },
    })
    player: Player,
  ): Promise<void> {
    if (player.countryId !== undefined) {
      await this.validatePlayer(player.countryId, player);
    }
    await this.playerRepository.updateById(id, player);
  }

  @put('/players/{id}')
  @response(204, {
    description: 'Player PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() player: Player,
  ): Promise<void> {
    if (player.countryId !== undefined) {
      await this.validatePlayer(player.countryId, player);
    }
    await this.playerRepository.replaceById(id, player);
  }

  @del('/players/{id}')
  @response(204, {
    description: 'Player DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.playerRepository.deleteById(id);
  }

  async validatePlayer(
    id: number | undefined,
    player: Omit<Player, 'id'>,
  ) {
    const numberPlayers = await this.countPlayer(id);
    if (numberPlayers.count >= 23) {
      throw new HttpErrors[409]('This country has full its players');
    }

    const numberInUse = await this.numberInUse(id, player.numberShirt);
    if (numberInUse) {
      throw new HttpErrors[409]('Exists a player with this number');
    }

    if (player.numberShirt === 1) {
      if (!['arquero', 'portero', 'Arquero', 'Portero'].includes(player.position)) {
        throw new HttpErrors[409](
          'This number can only be assigned to a goalkeeper ("arquero", "portero", "Arquero", "Portero")'
        );
      }
    }
  }

  async countPlayer(
    id: number | undefined,
  ) {
    const where: Where<Player> = {'countryId': id};
    const numberPlayers = await this.playerRepository.count(where);
    return numberPlayers;
  }

  async numberInUse(
    id: number | undefined,
    number: number | undefined,
  ) {
    const where: Where<Player> = {'countryId': id, 'numberShirt': number};
    const numberUsed = await this.playerRepository.count(where);
    if (numberUsed.count > 0) {
      return true;
    }
    return false;
  }
}
