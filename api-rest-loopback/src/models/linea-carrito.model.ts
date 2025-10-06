import {Model, model, property} from '@loopback/repository';
import { Articulo } from './articulo.model';

@model({settings: {strict: false}})
export class LineaCarrito extends Model {
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

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  ID?: number;

  @property({
    type: 'number',
  })
  Subtotal?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<LineaCarrito>) {
    super(data);
  }
}

export interface LineaCarritoRelations {
  // describe navigational properties here
}

export type LineaCarritoWithRelations = LineaCarrito & LineaCarritoRelations;
