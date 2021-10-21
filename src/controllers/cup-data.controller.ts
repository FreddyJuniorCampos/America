import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, response
} from '@loopback/rest';
import {CupData} from '../models';
import {CupDataRepository} from '../repositories';

export class CupDataController {
  constructor(
    @repository(CupDataRepository)
    public cupDataRepository: CupDataRepository,
  ) { }

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
  async findById(
    id: number = 1,
  ): Promise<CupData> {
    const filter = {
      include: [
        {
          relation:
            'groups',
          scope: {
            include: ['countries'],
          },
        },
        'matches',
        'referees',
        'campuses'
      ],
    };
    return this.cupDataRepository.findById(
      id,
      filter
    );
  }
}
