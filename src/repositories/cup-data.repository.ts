import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {CupData, CupDataRelations, Group, Campus, Match, Referee} from '../models';
import {GroupRepository} from './group.repository';
import {CampusRepository} from './campus.repository';
import {MatchRepository} from './match.repository';
import {RefereeRepository} from './referee.repository';

export class CupDataRepository extends DefaultCrudRepository<
  CupData,
  typeof CupData.prototype.id,
  CupDataRelations
> {

  public readonly groups: HasManyRepositoryFactory<Group, typeof CupData.prototype.id>;

  public readonly campuses: HasManyRepositoryFactory<Campus, typeof CupData.prototype.id>;

  public readonly matches: HasManyRepositoryFactory<Match, typeof CupData.prototype.id>;

  public readonly referees: HasManyRepositoryFactory<Referee, typeof CupData.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('GroupRepository') protected groupRepositoryGetter: Getter<GroupRepository>, @repository.getter('CampusRepository') protected campusRepositoryGetter: Getter<CampusRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>, @repository.getter('RefereeRepository') protected refereeRepositoryGetter: Getter<RefereeRepository>,
  ) {
    super(CupData, dataSource);
    this.referees = this.createHasManyRepositoryFactoryFor('referees', refereeRepositoryGetter,);
    this.registerInclusionResolver('referees', this.referees.inclusionResolver);
    this.matches = this.createHasManyRepositoryFactoryFor('matches', matchRepositoryGetter,);
    this.registerInclusionResolver('matches', this.matches.inclusionResolver);
    this.campuses = this.createHasManyRepositoryFactoryFor('campuses', campusRepositoryGetter,);
    this.registerInclusionResolver('campuses', this.campuses.inclusionResolver);
    this.groups = this.createHasManyRepositoryFactoryFor('groups', groupRepositoryGetter,);
    this.registerInclusionResolver('groups', this.groups.inclusionResolver);
  }
}
