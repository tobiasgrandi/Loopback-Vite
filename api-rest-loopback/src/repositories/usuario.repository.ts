import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {Usuario, UsuarioRelations} from '../models/usuario.model';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.ID,
  UsuarioRelations
> {
  constructor(
    @inject('datasources.MongodbDatasource') dataSource: MongodbDatasourceDataSource,
  ) {
    super(Usuario, dataSource);
  }
}
