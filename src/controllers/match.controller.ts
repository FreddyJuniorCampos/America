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
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Match} from '../models';
import {MatchRepository} from '../repositories';

export class MatchController {
  constructor(
    @repository(MatchRepository)
    public matchRepository: MatchRepository,
  ) { }

  @post('/matches')
  @response(200, {
    description: 'Match model instance',
    content: {'application/json': {schema: getModelSchemaRef(Match)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {
            title: 'NewMatch',
            exclude: ['id', 'cupDataId'],
          }),
        },
      },
    })
    match: Omit<Match, 'id'>,
  ): Promise<Match> {
    match = {...match, cupDataId: 1};
    return this.matchRepository.create(match);
  }

  @get('/matches/count')
  @response(200, {
    description: 'Match model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Match) where?: Where<Match>,
  ): Promise<Count> {
    return this.matchRepository.count(where);
  }

  @get('/matches')
  @response(200, {
    description: 'Array of Match model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Match, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Match) filter?: Filter<Match>,
  ): Promise<Match[]> {
    return this.matchRepository.find(filter);
  }

  @get('/matches/{id}')
  @response(200, {
    description: 'Match model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Match, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Match, {exclude: 'where'}) filter?: FilterExcludingWhere<Match>
  ): Promise<Match> {
    const include = [
      {
        relation: 'local_team',
        scope: {
          fields: [
            'id',
            'countryName',
          ],
        }
      },
      {
        relation: 'visit_team',
        scope: {
          fields: [
            'id',
            'countryName',
          ],
        }
      },
      {
        relation: 'referee',
        scope: {
          fields: [
            'id',
            'firstName',
            'lastName',
            'country',
          ],
        }
      },
      {
        relation: 'campus',
        scope: {
          fields: [
            'id',
            'stadium',
            'capacity',
            'city',
          ],
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
    return this.matchRepository.findById(id, filter);
  }

  @patch('/matches/{id}')
  @response(204, {
    description: 'Match PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {partial: true}),
        },
      },
    })
    match: Match,
  ): Promise<void> {
    await this.matchRepository.updateById(id, match);
  }

  @put('/matches/{id}')
  @response(204, {
    description: 'Match PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() match: Match,
  ): Promise<void> {
    await this.matchRepository.replaceById(id, match);
  }

  @del('/matches/{id}')
  @response(204, {
    description: 'Match DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.matchRepository.deleteById(id);
  }
}
