import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Group,
  CupData,
} from '../models';
import {GroupRepository} from '../repositories';

export class GroupCupDataController {
  constructor(
    @repository(GroupRepository)
    public groupRepository: GroupRepository,
  ) { }

  @get('/groups/{id}/cup-data', {
    responses: {
      '200': {
        description: 'CupData belonging to Group',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CupData)},
          },
        },
      },
    },
  })
  async getCupData(
    @param.path.number('id') id: typeof Group.prototype.id,
  ): Promise<CupData> {
    return this.groupRepository.cupData(id);
  }
}
