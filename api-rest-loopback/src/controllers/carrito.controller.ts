import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Articulo, Carrito, LineaCarrito, Usuario} from '../models';
import {CarritoRepository} from '../repositories';


export class CarritoController {
  constructor(
    @repository(CarritoRepository)
    public carritoRepository: CarritoRepository,
  ) { }

  @post('/carritos')
  @response(200, {
    description: 'Carrito model instance',
    content: {'application/json': {schema: getModelSchemaRef(Carrito)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carrito, {
            title: 'NewCarrito',
            exclude: ['ID'],
          }),
        },
      },
    })
    carrito: Omit<Carrito, 'ID'>,
  ): Promise<Carrito> {
    const existe = await this.carritoRepository.findOne({
      where: {'Usuario.ID': carrito.Usuario.ID}
    })
    if (existe){
      throw new HttpErrors.BadRequest('El usuario ya tiene un carrito');
    }
    return this.carritoRepository.create(carrito);
  }

  @get('/carritos/count')
  @response(200, {
    description: 'Carrito model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Carrito) where?: Where<Carrito>,
  ): Promise<Count> {
    return this.carritoRepository.count(where);
  }

  @get('/carritos')
  @response(200, {
    description: 'Array of Carrito model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Carrito, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Carrito) filter?: Filter<Carrito>,
  ): Promise<Carrito[]> {
    return this.carritoRepository.find(filter);
  }

  @patch('/carritos')
  @response(200, {
    description: 'Carrito PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carrito, {partial: true}),
        },
      },
    })
    carrito: Carrito,
    @param.where(Carrito) where?: Where<Carrito>,
  ): Promise<Count> {
    return this.carritoRepository.updateAll(carrito, where);
  }

  @get('/carritos/{id}')
  @response(200, {
    description: 'Carrito model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Carrito, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Carrito, {exclude: 'where'}) filter?: FilterExcludingWhere<Carrito>
  ): Promise<Carrito> {
    return this.carritoRepository.findById(id, filter);
  }

  @patch('/carritos/{id}')
  @response(204, {
    description: 'Carrito PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carrito, {partial: true}),
        },
      },
    })
    carrito: Carrito,
  ): Promise<void> {
    await this.carritoRepository.updateById(id, carrito);
  }

  @put('/carritos/{id}')
  @response(204, {
    description: 'Carrito PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() carrito: Carrito,
  ): Promise<void> {
    await this.carritoRepository.replaceById(id, carrito);
  }

  @del('/carritos/{id}')
  @response(204, {
    description: 'Carrito DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.carritoRepository.deleteById(id);
  }

  @post('/carritos/{id}/articulos')
  async addArticulo(
    @param.path.string('id') id: string,
    @requestBody() body: {art: Articulo, cantidad: number}
  ): Promise<Carrito> {
    const carrito = await this.carritoRepository.findById(id);
    if (!carrito) {
      throw new HttpErrors.NotFound(`Carrito con id ${id} no encontrado`)
    }
    carrito.AddArticulo(body.art, body.cantidad);
    await this.carritoRepository.update(carrito);
    return this.carritoRepository.findById(id);
  }

  @post('/carritos/{id}/articulos/remove')
  async removeArticulo(
    @param.path.string('id') id: string,
    @requestBody() artId: {id: string}
  ): Promise<Carrito> {
    const carrito = await this.carritoRepository.findById(id);
    if (!carrito) {
      throw new HttpErrors.NotFound(`Carrito con id ${id} no encontrado`)
    }
    carrito.removeArticulo(artId.id);
    await this.carritoRepository.update(carrito);
    return this.carritoRepository.findById(id);
  }

  @post('/carritos/{id}/usuario')
  async setUsuario(
    @param.path.string('id') id: string,
    @requestBody() usr: Usuario
  ): Promise<Carrito> {
    const carrito = await this.carritoRepository.findById(id);
    if (!carrito) {
      throw new HttpErrors.NotFound(`Carrito con id ${id} no encontrado`)
    }
    carrito.setUsuario(usr);
    await this.carritoRepository.update(carrito);
    return this.carritoRepository.findById(id);
  }

  @get('/carritos/{id}/listaArticulos')
  async getListaArticulos(
    @param.path.string('id') id: string
  ): Promise<LineaCarrito[]> {
    const carrito = await this.carritoRepository.findById(id);

    if (!carrito) {
      throw new HttpErrors.NotFound(`Carrito con id ${id} no encontrado`)
    }

    return carrito.getListArticulo();
  }
}
