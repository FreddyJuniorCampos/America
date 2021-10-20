import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Group, GroupRelations, CupData, Country} from '../models';
import {CupDataRepository} from './cup-data.repository';
import {CountryRepository} from './country.repository';

export class GroupRepository extends DefaultCrudRepository<
  Group,
  typeof Group.prototype.id,
  GroupRelations
> {

  public readonly cupData: BelongsToAccessor<CupData, typeof Group.prototype.id>;

  public readonly countries: HasManyRepositoryFactory<Country, typeof Group.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CupDataRepository') protected cupDataRepositoryGetter: Getter<CupDataRepository>, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>,
  ) {
    super(Group, dataSource);
    this.countries = this.createHasManyRepositoryFactoryFor('countries', countryRepositoryGetter,);
    this.registerInclusionResolver('countries', this.countries.inclusionResolver);
    this.cupData = this.createBelongsToAccessorFor('cupData', cupDataRepositoryGetter,);
    this.registerInclusionResolver('cupData', this.cupData.inclusionResolver);
  }
}
