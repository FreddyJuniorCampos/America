import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Dt, DtRelations} from '../models';

export class DtRepository extends DefaultCrudRepository<
  Dt,
  typeof Dt.prototype.id,
  DtRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Dt, dataSource);
  }
}
