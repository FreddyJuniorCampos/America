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
import {CupData} from '../models';
import {CupDataRepository} from '../repositories';

export class CupDataController {
  constructor(
    @repository(CupDataRepository)
    public cupDataRepository : CupDataRepository,
  ) {}

  @post('/cup-data')
  @response(200, {
    description: 'CupData model instance',
    content: {'application/json': {schema: getModelSchemaRef(CupData)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CupData, {
            title: 'NewCupData',
            exclude: ['id'],
          }),
        },
      },
    })
    cupData: Omit<CupData, 'id'>,
  ): Promise<CupData> {
    return this.cupDataRepository.create(cupData);
  }

  @get('/cup-data/count')
  @response(200, {
    description: 'CupData model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CupData) where?: Where<CupData>,
  ): Promise<Count> {
    return this.cupDataRepository.count(where);
  }

  @get('/cup-data')
  @response(200, {
    description: 'Array of CupData model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CupData, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CupData) filter?: Filter<CupData>,
  ): Promise<CupData[]> {
    return this.cupDataRepository.find(filter);
  }

  @patch('/cup-data')
  @response(200, {
    description: 'CupData PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CupData, {partial: true}),
        },
      },
    })
    cupData: CupData,
    @param.where(CupData) where?: Where<CupData>,
  ): Promise<Count> {
    return this.cupDataRepository.updateAll(cupData, where);
  }

  @get('/cup-data/{id}')
  @response(200, {
    description: 'CupData model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CupData, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CupData, {exclude: 'where'}) filter?: FilterExcludingWhere<CupData>
  ): Promise<CupData> {
    return this.cupDataRepository.findById(id, filter);
  }

  @patch('/cup-data/{id}')
  @response(204, {
    description: 'CupData PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CupData, {partial: true}),
        },
      },
    })
    cupData: CupData,
  ): Promise<void> {
    await this.cupDataRepository.updateById(id, cupData);
  }

  @put('/cup-data/{id}')
  @response(204, {
    description: 'CupData PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cupData: CupData,
  ): Promise<void> {
    await this.cupDataRepository.replaceById(id, cupData);
  }

  @del('/cup-data/{id}')
  @response(204, {
    description: 'CupData DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cupDataRepository.deleteById(id);
  }
}
