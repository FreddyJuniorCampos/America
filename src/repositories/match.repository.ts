import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Match, MatchRelations, CupData, Referee, Campus, Country} from '../models';
import {CupDataRepository} from './cup-data.repository';
import {RefereeRepository} from './referee.repository';
import {CampusRepository} from './campus.repository';
import {CountryRepository} from './country.repository';

export class MatchRepository extends DefaultCrudRepository<
  Match,
  typeof Match.prototype.id,
  MatchRelations
> {

  public readonly cupData: BelongsToAccessor<CupData, typeof Match.prototype.id>;

  public readonly referee: BelongsToAccessor<Referee, typeof Match.prototype.id>;

  public readonly campus: BelongsToAccessor<Campus, typeof Match.prototype.id>;

  public readonly local_team: BelongsToAccessor<Country, typeof Match.prototype.id>;

  public readonly visit_team: BelongsToAccessor<Country, typeof Match.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CupDataRepository') protected cupDataRepositoryGetter: Getter<CupDataRepository>, @repository.getter('RefereeRepository') protected refereeRepositoryGetter: Getter<RefereeRepository>, @repository.getter('CampusRepository') protected campusRepositoryGetter: Getter<CampusRepository>, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>,
  ) {
    super(Match, dataSource);
    this.visit_team = this.createBelongsToAccessorFor('visit_team', countryRepositoryGetter,);
    this.registerInclusionResolver('visit_team', this.visit_team.inclusionResolver);
    this.local_team = this.createBelongsToAccessorFor('local_team', countryRepositoryGetter,);
    this.registerInclusionResolver('local_team', this.local_team.inclusionResolver);
    this.campus = this.createBelongsToAccessorFor('campus', campusRepositoryGetter,);
    this.registerInclusionResolver('campus', this.campus.inclusionResolver);
    this.referee = this.createBelongsToAccessorFor('referee', refereeRepositoryGetter,);
    this.registerInclusionResolver('referee', this.referee.inclusionResolver);
    this.cupData = this.createBelongsToAccessorFor('cupData', cupDataRepositoryGetter,);
    this.registerInclusionResolver('cupData', this.cupData.inclusionResolver);
  }
}
