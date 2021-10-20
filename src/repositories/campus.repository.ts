import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Campus, CampusRelations} from '../models';

export class CampusRepository extends DefaultCrudRepository<
  Campus,
  typeof Campus.prototype.id,
  CampusRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Campus, dataSource);
  }
}
