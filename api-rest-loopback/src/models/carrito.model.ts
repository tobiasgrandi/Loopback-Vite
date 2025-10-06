import {Entity, model, property} from '@loopback/repository';
import {Articulo} from './articulo.model';
import {Usuario} from './usuario.model';
import { LineaCarrito } from './linea-carrito.model';

@model({settings: {strict: false}})
export class Carrito extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  ID?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  ListaArticulos?: LineaCarrito[];

  @property({
    type: 'object'
  })
  Usuario?: Usuario

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Carrito>) {
    super(data);
  }

  AddArticulo(art: Articulo, cantidad: number = 1) {
    if (!this.ListaArticulos) {
      this.ListaArticulos = [];
    }

    
    const existe = this.ListaArticulos.find(linea => linea.Articulo.ID == art.ID);

    if (existe) {
      existe.Cantidad += cantidad;
      existe.Subtotal = existe.Articulo.Costo! * existe.Cantidad;
    } else {
      const nuevaLinea = new LineaCarrito({
        Articulo: art,
        Cantidad: cantidad,
        Subtotal: art.Costo!*cantidad,
      })
      this.ListaArticulos.push(nuevaLinea);
    }

    
  }

  getListArticulo(): LineaCarrito[] {
    return this.ListaArticulos ?? [];
  }

  setUsuario(usr: Usuario) {
    this.Usuario = usr;
  }

  removeArticulo(id: string, cantidad: number = 1): void {
    if (!this.ListaArticulos) return;

    const index = this.ListaArticulos.findIndex(linea => linea.Articulo.ID === id);
    if (index !== -1) {
      const linea = this.ListaArticulos[index];
      linea.Cantidad -= 1;
      linea.Subtotal = linea.Articulo.Costo! * linea.Cantidad;

      if (linea.Cantidad === 0) {
        this.ListaArticulos.splice(index, 1);
      }
    }
  }
}

export interface CarritoRelations {
  // describe navigational properties here
}

export type CarritoWithRelations = Carrito & CarritoRelations;
