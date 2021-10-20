import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Referee} from '../models';
import {RefereeRepository} from '../repositories';

export class RefereeController {
  constructor(
    @repository(RefereeRepository)
    public refereeRepository : RefereeRepository,
  ) {}

  @post('/referees')
  @response(200, {
    description: 'Referee model instance',
    content: {'application/json': {schema: getModelSchemaRef(Referee)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Referee, {
            title: 'NewReferee',
            exclude: ['id'],
          }),
        },
      },
    })
    referee: Omit<Referee, 'id'>,
  ): Promise<Referee> {
    return this.refereeRepository.create(referee);
  }

  @get('/referees/count')
  @response(200, {
    description: 'Referee model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Referee) where?: Where<Referee>,
  ): Promise<Count> {
    return this.refereeRepository.count(where);
  }

  @get('/referees')
  @response(200, {
    description: 'Array of Referee model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Referee, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Referee) filter?: Filter<Referee>,
  ): Promise<Referee[]> {
    return this.refereeRepository.find(filter);
  }

  @patch('/referees')
  @response(200, {
    description: 'Referee PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Referee, {partial: true}),
        },
      },
    })
    referee: Referee,
    @param.where(Referee) where?: Where<Referee>,
  ): Promise<Count> {
    return this.refereeRepository.updateAll(referee, where);
  }

  @get('/referees/{id}')
  @response(200, {
    description: 'Referee model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Referee, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Referee, {exclude: 'where'}) filter?: FilterExcludingWhere<Referee>
  ): Promise<Referee> {
    return this.refereeRepository.findById(id, filter);
  }

  @patch('/referees/{id}')
  @response(204, {
    description: 'Referee PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Referee, {partial: true}),
        },
      },
    })
    referee: Referee,
  ): Promise<void> {
    await this.refereeRepository.updateById(id, referee);
  }

  @put('/referees/{id}')
  @response(204, {
    description: 'Referee PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() referee: Referee,
  ): Promise<void> {
    await this.refereeRepository.replaceById(id, referee);
  }

  @del('/referees/{id}')
  @response(204, {
    description: 'Referee DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.refereeRepository.deleteById(id);
  }
}
