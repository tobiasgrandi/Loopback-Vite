import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  ID?: string;

  @property({
    type: 'string',
  })
  Nombre?: string;

  @property({
    type: 'string',
  })
  Email?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }

  setNombre(nomb: string) {
    this.Nombre = nomb;
  }

  setEmail(email: string) {
    this.Email = email;
  }

}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
