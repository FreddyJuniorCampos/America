import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Country, CountryRelations, Group, Dt, Player, Match} from '../models';
import {GroupRepository} from './group.repository';
import {DtRepository} from './dt.repository';
import {PlayerRepository} from './player.repository';
import {MatchRepository} from './match.repository';

export class CountryRepository extends DefaultCrudRepository<
  Country,
  typeof Country.prototype.id,
  CountryRelations
> {

  public readonly group: BelongsToAccessor<Group, typeof Country.prototype.id>;

  public readonly dt: HasOneRepositoryFactory<Dt, typeof Country.prototype.id>;

  public readonly players: HasManyRepositoryFactory<Player, typeof Country.prototype.id>;

  public readonly local_matches: HasManyRepositoryFactory<Match, typeof Country.prototype.id>;

  public readonly visit_matches: HasManyRepositoryFactory<Match, typeof Country.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('GroupRepository') protected groupRepositoryGetter: Getter<GroupRepository>, @repository.getter('DtRepository') protected dtRepositoryGetter: Getter<DtRepository>, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>,
  ) {
    super(Country, dataSource);
    this.visit_matches = this.createHasManyRepositoryFactoryFor('visit_matches', matchRepositoryGetter,);
    this.registerInclusionResolver('visit_matches', this.visit_matches.inclusionResolver);
    this.local_matches = this.createHasManyRepositoryFactoryFor('local_matches', matchRepositoryGetter,);
    this.registerInclusionResolver('local_matches', this.local_matches.inclusionResolver);
    this.players = this.createHasManyRepositoryFactoryFor('players', playerRepositoryGetter,);
    this.registerInclusionResolver('players', this.players.inclusionResolver);
    this.dt = this.createHasOneRepositoryFactoryFor('dt', dtRepositoryGetter);
    this.registerInclusionResolver('dt', this.dt.inclusionResolver);
    this.group = this.createBelongsToAccessorFor('group', groupRepositoryGetter,);
    this.registerInclusionResolver('group', this.group.inclusionResolver);
  }
}
