import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Articulo extends Entity {
  @property({
    type: 'string',
  })
  Descripcion?: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  ID?: string;

  @property({
    type: 'string',
  })
  Codigo?: string;

  @property({
    type: 'number',
  })
  Costo?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Articulo>) {
    super(data);
  }

  setDescripcion(Descrip: string) {
    this.Descripcion = Descrip;
  }

  setCodigo(Cod: string) {
    this.Codigo = Cod;
  }

  setCosto(Cost: number) {
    this.Costo = Cost;
  }

}

export interface ArticuloRelations {
  // describe navigational properties here
}

export type ArticuloWithRelations = Articulo & ArticuloRelations;
