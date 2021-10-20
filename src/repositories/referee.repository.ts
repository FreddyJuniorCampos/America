import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Referee, RefereeRelations} from '../models';

export class RefereeRepository extends DefaultCrudRepository<
  Referee,
  typeof Referee.prototype.id,
  RefereeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Referee, dataSource);
  }
}
