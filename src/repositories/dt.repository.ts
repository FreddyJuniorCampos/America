import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Dt, DtRelations, Country} from '../models';
import {CountryRepository} from './country.repository';

export class DtRepository extends DefaultCrudRepository<
  Dt,
  typeof Dt.prototype.id,
  DtRelations
> {

  public readonly country: BelongsToAccessor<Country, typeof Dt.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>,
  ) {
    super(Dt, dataSource);
    this.country = this.createBelongsToAccessorFor('country', countryRepositoryGetter,);
    this.registerInclusionResolver('country', this.country.inclusionResolver);
  }
}
