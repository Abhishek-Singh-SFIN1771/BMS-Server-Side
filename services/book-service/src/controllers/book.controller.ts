import {inject} from '@loopback/core';
import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Book} from '../models';
import {BookRepository} from '../repositories';
import {BookService} from '../services';

export class BookController {
  constructor(
    @repository(BookRepository)
    public bookRepository : BookRepository,

    @inject('services.BookService')
    private bookService: BookService
  ) {}

  @post('/books')
  @response(200, {
    description: 'Book model instance',
    content: {'application/json': {schema: getModelSchemaRef(Book)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {
            title: 'NewBook',
            exclude: ['id'],
          }),
        },
      },
    })
    book: Omit<Book, 'id'>,
  ): Promise<Book> {
    return this.bookRepository.create(book);
  }

  @get('/books')
  @response(200, {
    description: 'Array of Book model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Book),
        },
      },
    },
  })
  async find(@param.filter(Book) filter?: Filter<Book>,): Promise<Book[]> {
    return this.bookService.getBookList()
  }

  @get('/books/{isbn}')
  @response(200, {
    description: 'Book model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Book),
      },

    },
  })
  async findByBookIsbn(@param.path.string('isbn') isbn: string): Promise<Book> {
    return this.bookService.findBookByIsbn(isbn);
  }

  @patch('/books/{isbn}')
  @response(204, {
    description: 'Book PATCH success',
    content: {'application/json': {schema: getModelSchemaRef(Book)}}
  })
  async updateByBookIsbn(@param.path.string('isbn') isbn: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {
          partial: true,
          exclude: ['id']}),
        },
      },
    })
    book: Book,
  ): Promise<Book> {
    const updatedBook = await this.bookService.updateBookByIsbn(book , isbn)
    return updatedBook;
  }

  // @get('/books/count')
  // @response(200, {
  //   description: 'Book model count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async count(
  //   @param.where(Book) where?: Where<Book>,
  // ): Promise<Count> {
  //   return this.bookRepository.count(where);
  // }

  // @patch('/books')
  // @response(200, {
  //   description: 'Book PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Book, {partial: true}),
  //       },
  //     },
  //   })
  //   book: Book,
  //   @param.where(Book) where?: Where<Book>,
  // ): Promise<Count> {
  //   return this.bookRepository.updateAll(book, where);
  // }

  // @put('/books/{id}')
  // @response(204, {
  //   description: 'Book PUT success',
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() book: Book,
  // ): Promise<void> {
  //   await this.bookRepository.replaceById(id, book);
  // }

  // @del('/books/{id}')
  // @response(204, {
  //   description: 'Book DELETE success',
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.bookRepository.deleteById(id);
  // }
}
