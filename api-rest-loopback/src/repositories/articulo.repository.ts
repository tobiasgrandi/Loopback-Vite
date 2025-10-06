import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {Articulo, ArticuloRelations} from '../models/articulo.model';

export class ArticuloRepository extends DefaultCrudRepository<
  Articulo,
  typeof Articulo.prototype.ID,
  ArticuloRelations
> {
  constructor(
    @inject('datasources.MongodbDatasource') dataSource: MongodbDatasourceDataSource,
  ) {
    super(Articulo, dataSource);
  }
}
