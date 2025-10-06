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
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['ID'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'ID'>,
  ): Promise<Usuario> {
    const existe = await this.usuarioRepository.findOne({
      where: {email: usuario.Email}
    })
    if (existe) {
    throw new HttpErrors.BadRequest('El correo ya está en uso');
    }
    return this.usuarioRepository.create(usuario);
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    const existe = await this.usuarioRepository.findOne({
      where: {email: usuario.Email}
    })
    if (existe) {
    throw new HttpErrors.BadRequest('El correo ya está en uso');
    }
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    const existe = await this.usuarioRepository.findOne({
      where: {email: usuario.Email}
    })
    if (existe) {
    throw new HttpErrors.BadRequest('El correo ya está en uso');
    }
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }

  @patch('/usuarios/{id}/nombre')
  async setNombre(
    @param.path.string('id') id: string,
    @requestBody() body: {nombre: string}
  ): Promise<Usuario> {
    const user = await this.usuarioRepository.findById(id);
    user.setNombre(body.nombre);
    await this.usuarioRepository.update(user);
    return this.usuarioRepository.findById(id);
  }

  @patch('/usuarios/{id}/email')
  async setEmail(
    @param.path.string('id') id: string,
    @requestBody() body: {email: string}
  ): Promise<Usuario> {
    const existe = await this.usuarioRepository.findOne({
      where: {email: body.email}
    })
    if (existe) {
      throw new HttpErrors.BadRequest('El correo ya está en uso');
    }
    const user = await this.usuarioRepository.findById(id);
    user.setEmail(body.email);
    await this.usuarioRepository.update(user);
    return this.usuarioRepository.findById(id);
  }
}
