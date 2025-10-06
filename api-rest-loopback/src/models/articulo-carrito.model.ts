import {Model, model, property} from '@loopback/repository';
import { Articulo } from './articulo.model';

@model({settings: {strict: false}})
export class ArticuloCarrito extends Model {
  @property({
    type: 'object',
    required: true,
  })
  Articulo: Articulo;

  @property({
    type: 'number',
    required: true,
  })
  Cantidad: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ArticuloCarrito>) {
    super(data);
  }
}

export interface ArticuloCarritoRelations {
  // describe navigational properties here
}

export type ArticuloCarritoWithRelations = ArticuloCarrito & ArticuloCarritoRelations;
