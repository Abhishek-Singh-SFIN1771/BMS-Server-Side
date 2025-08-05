import {inject} from '@loopback/core';
import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {Author} from '../models';
import {AuthorRepository} from '../repositories';
import {AuthorService} from '../services';

export class AuthorController {
  constructor(
    @repository(AuthorRepository)
    public authorRepository: AuthorRepository,

    @inject('services.AuthorService')
    public authorService : AuthorService
  ) { }

  @post('/authors')
  @response(200, {
    description: 'Author model instance',
    content: {'application/json': {schema: getModelSchemaRef(Author)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Author, {
            title: 'NewAuthor',
            exclude: ['id'],
          }),
        },
      },
    })
    author: Omit<Author, 'id'>,
  ): Promise<Author> {
    return this.authorService.createNewAuthor(author)
  }

  @get('/authors/{name}')
  @response(200, {
    description: 'Author model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Author, {includeRelations: true}),
      },
    },
  })
  async findByName(@param.path.string('name') name: string,): Promise<Author> {
    return this.authorService.findAuthorbyName(name);
  }

  // @get('/authors/count')
  // @response(200, {
  //   description: 'Author model count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async count(
  //   @param.where(Author) where?: Where<Author>,
  // ): Promise<Count> {
  //   return this.authorRepository.count(where);
  // }

  @get('/authors/id/{id}')
  @response(200, {
    description: 'Array of Author model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Author, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.path.string('id') id: string): Promise<Author> {
    return this.authorService.findAuthorById(id);
  }

  // @patch('/authors')
  // @response(200, {
  //   description: 'Author PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Author, {partial: true}),
  //       },
  //     },
  //   })
  //   author: Author,
  //   @param.where(Author) where?: Where<Author>,
  // ): Promise<Count> {
  //   return this.authorRepository.updateAll(author, where);
  // }

  // @patch('/authors/{id}')
  // @response(204, {
  //   description: 'Author PATCH success',
  // })
  // async updateById(
  //   @param.path.string('id') id: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Author, {partial: true}),
  //       },
  //     },
  //   })
  //   author: Author,
  // ): Promise<void> {
  //   await this.authorRepository.updateById(id, author);
  // }

  // @put('/authors/{id}')
  // @response(204, {
  //   description: 'Author PUT success',
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() author: Author,
  // ): Promise<void> {
  //   await this.authorRepository.replaceById(id, author);
  // }

  // @del('/authors/{id}')
  // @response(204, {
  //   description: 'Author DELETE success',
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.authorRepository.deleteById(id);
  // }
}
