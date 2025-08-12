import {injectable,BindingScope, inject} from '@loopback/core';
import { AuthorService } from './author.service';
import { CategoryService } from './category.service';
import { Book } from '../models';
import { BookServiceProxy } from './proxies/book-proxy';
import { juggler } from '@loopback/repository';
import { BookDataSource } from '../datasources';
import { getService } from '@loopback/service-proxy';

@injectable({scope: BindingScope.TRANSIENT})
export class BookService {

  private bookProxy: BookServiceProxy

  constructor(

    @inject('datasources.book')
    private ds: juggler.DataSource = new BookDataSource(), 

    @inject('services.AuthorService')
    public authorService : AuthorService,
    
    @inject('services.CategoryService')
    public categoryService : CategoryService
  ) {}

  private async getBookProxy(): Promise<BookServiceProxy> {
      if (!this.bookProxy) {
        this.bookProxy = await getService<BookServiceProxy>(this.ds);
      }
      return this.bookProxy;
    }

  async createNewBook(bookData : Book) : Promise<Book> 
  {
    const author = await this.authorService.findAuthor({name : bookData.authorName});
    const category =  await this.categoryService.findCategory({name : bookData.categoryName});

    const payload = {
    title: bookData.title,
    isbn: bookData.isbn,
    publishYear: bookData.publishYear,
    authorId: author.id,
    categoryId: category.id,
   };

    const proxy = await this.getBookProxy();

    const newBook = await proxy.createBook(payload)

    const book = new Book({
      ...newBook,
      authorName: author.name,
      categoryName: category.name

    })

    return book
  }

  async getBookList() : Promise<Book[]> 
  {
    const proxy = await this.getBookProxy();
    const allBook = await proxy.getBook();
    const books = allBook

    const bookList = []

    for(const book of books)
      {
        if (!book.authorId) 
        {
          throw new Error('Book is missing authorId');
        }
      if (!book.categoryId)
        {
          throw new Error('Book is missing categoryId');
        }
       
      const author = await this.authorService.findAuthorById(book.authorId);
      const category = await this.categoryService.findCategoryById(book.categoryId); 
      
      book.authorId = author.id;
      book.authorName = author.name;

      book.categoryId = category.id;
      book.categoryName= category.name;
      
      bookList.push(book)

      }
      return bookList;
      
  }

  async getBookByIsbn(bookIsbn : string) : Promise<Book>
  {
    const proxy = await this.getBookProxy();
    const bookDetail = await proxy.findBookByIsbn(bookIsbn);

    if (!bookDetail.authorId) 
      {
        throw new Error('Book detail is missing authorId');
      }
    
    if (!bookDetail.categoryId) 
      {
        throw new Error('Book detail is missing authorId');
      }  

    const author = await this.authorService.findAuthorById(bookDetail.authorId);
    console.log(author);
    
    const category = await this.categoryService.findCategoryById(bookDetail.categoryId);
    console.log(category);
    

    bookDetail.authorId = author.id;
    bookDetail.authorName = author.name;
    
    bookDetail.categoryId = category.id;
    bookDetail.categoryName = category.name

    const book = new Book({
    ...bookDetail,
    authorId: author.id,
    authorName: author.name,
    categoryId: category.id,
    categoryName: category.name,
  });

  return book;
  }
}