import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Campus} from '../models';
import {CampusRepository} from '../repositories';

export class CampusController {
  constructor(
    @repository(CampusRepository)
    public campusRepository : CampusRepository,
  ) {}

  @post('/campuses')
  @response(200, {
    description: 'Campus model instance',
    content: {'application/json': {schema: getModelSchemaRef(Campus)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Campus, {
            title: 'NewCampus',
            exclude: ['id', 'cupDataId'],
          }),
        },
      },
    })
    campus: Omit<Campus, 'id'>,
  ): Promise<Campus> {
    campus = { ...campus, cupDataId: 1 };
    return this.campusRepository.create(campus);
  }

  @get('/campuses')
  @response(200, {
    description: 'Array of Campus model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Campus, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Campus) filter?: Filter<Campus>,
  ): Promise<Campus[]> {
    return this.campusRepository.find(filter);
  }

  @get('/campuses/{id}')
  @response(200, {
    description: 'Campus model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Campus, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Campus, {exclude: 'where'}) filter?: FilterExcludingWhere<Campus>
  ): Promise<Campus> {
    return this.campusRepository.findById(id, filter);
  }

  @patch('/campuses/{id}')
  @response(204, {
    description: 'Campus PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Campus, {partial: true}),
        },
      },
    })
    campus: Campus,
  ): Promise<void> {
    await this.campusRepository.updateById(id, campus);
  }

  @put('/campuses/{id}')
  @response(204, {
    description: 'Campus PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() campus: Campus,
  ): Promise<void> {
    await this.campusRepository.replaceById(id, campus);
  }

  @del('/campuses/{id}')
  @response(204, {
    description: 'Campus DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.campusRepository.deleteById(id);
  }
}
