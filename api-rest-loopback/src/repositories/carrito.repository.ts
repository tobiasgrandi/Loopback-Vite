import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {Carrito, CarritoRelations} from '../models/carrito.model';

export class CarritoRepository extends DefaultCrudRepository<
  Carrito,
  typeof Carrito.prototype.ID,
  CarritoRelations
> {
  constructor(
    @inject('datasources.MongodbDatasource') dataSource: MongodbDatasourceDataSource,
  ) {
    super(Carrito, dataSource);
  }
}
