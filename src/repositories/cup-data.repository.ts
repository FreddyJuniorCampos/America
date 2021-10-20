import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {CupData, CupDataRelations} from '../models';

export class CupDataRepository extends DefaultCrudRepository<
  CupData,
  typeof CupData.prototype.id,
  CupDataRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(CupData, dataSource);
  }
}
