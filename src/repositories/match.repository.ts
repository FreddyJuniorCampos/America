import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Match, MatchRelations, CupData, Referee, Campus} from '../models';
import {CupDataRepository} from './cup-data.repository';
import {RefereeRepository} from './referee.repository';
import {CampusRepository} from './campus.repository';

export class MatchRepository extends DefaultCrudRepository<
  Match,
  typeof Match.prototype.id,
  MatchRelations
> {

  public readonly cupData: BelongsToAccessor<CupData, typeof Match.prototype.id>;

  public readonly referee: BelongsToAccessor<Referee, typeof Match.prototype.id>;

  public readonly campus: BelongsToAccessor<Campus, typeof Match.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CupDataRepository') protected cupDataRepositoryGetter: Getter<CupDataRepository>, @repository.getter('RefereeRepository') protected refereeRepositoryGetter: Getter<RefereeRepository>, @repository.getter('CampusRepository') protected campusRepositoryGetter: Getter<CampusRepository>,
  ) {
    super(Match, dataSource);
    this.campus = this.createBelongsToAccessorFor('campus', campusRepositoryGetter,);
    this.registerInclusionResolver('campus', this.campus.inclusionResolver);
    this.referee = this.createBelongsToAccessorFor('referee', refereeRepositoryGetter,);
    this.registerInclusionResolver('referee', this.referee.inclusionResolver);
    this.cupData = this.createBelongsToAccessorFor('cupData', cupDataRepositoryGetter,);
    this.registerInclusionResolver('cupData', this.cupData.inclusionResolver);
  }
}
