import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Book} from '../models';
import {BookRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class BookService
{
  constructor(
    @repository(BookRepository)
    private bookRepository : BookRepository
  ) {}

  async createNewBook(bookData : Book) : Promise<Book>
  {
    const newBook = await this.bookRepository.create(bookData);

    return newBook;
  }

  async getBookList() : Promise<Book[]>
  {
    return this.bookRepository.find();
  }

  async findBookByIsbn(bookIsbn : string) : Promise<Book>
  {
    const book = await this.bookRepository.findOne({where : {isbn : bookIsbn}});

    if(!book)
      {
        throw new Error(`Book not found on this isbn:  ${bookIsbn}`)
      };

    return book;
  }

  async updateBookByIsbn(bookData : Book, bookIsbn : string ) : Promise <Book>
  {
    const book = await this.findBookByIsbn(bookIsbn);

    if(!book)
      {
        throw new Error("Book cannot be Updated");
      }

    const bookCount = await this.bookRepository.updateAll(bookData , {isbn : bookIsbn});
    if(bookCount.count === 0)
      {
        throw new Error("Book not updated")
      }
    return this.findBookByIsbn(bookData.isbn);
  }
}
