import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Referee, RefereeRelations, CupData, Match} from '../models';
import {CupDataRepository} from './cup-data.repository';
import {MatchRepository} from './match.repository';

export class RefereeRepository extends DefaultCrudRepository<
  Referee,
  typeof Referee.prototype.id,
  RefereeRelations
> {

  public readonly cupData: BelongsToAccessor<CupData, typeof Referee.prototype.id>;

  public readonly matches: HasManyRepositoryFactory<Match, typeof Referee.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CupDataRepository') protected cupDataRepositoryGetter: Getter<CupDataRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>,
  ) {
    super(Referee, dataSource);
    this.matches = this.createHasManyRepositoryFactoryFor('matches', matchRepositoryGetter,);
    this.registerInclusionResolver('matches', this.matches.inclusionResolver);
    this.cupData = this.createBelongsToAccessorFor('cupData', cupDataRepositoryGetter,);
    this.registerInclusionResolver('cupData', this.cupData.inclusionResolver);
  }
}
