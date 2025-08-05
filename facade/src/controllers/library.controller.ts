// Uncomment these imports to begin using these cool features!

import { inject } from "@loopback/core";
import { AuthorService, BookService, CategoryService } from "../services";
import { post, requestBody, get, param, patch } from "@loopback/rest";
import { Author, Book, Category } from "../models";


// import {inject} from '@loopback/core';


export class LibraryController {
  constructor(
    @inject('services.AuthorService')
    public authorService : AuthorService,

    @inject('services.CategoryService')
    public categoryService : CategoryService,

    @inject('services.BookService')
    public bookService : BookService
  ) {}

  @post('/findOrCreateAuthor')
  async findOrCreateAuthor(@requestBody() authorData: Author) : Promise<Author> 
  {
    const author = this.authorService.findAuthor(authorData);
    return author;
  }

  @post('/findOrCreateCategory')
  async findOrCreateCategory(@requestBody() categoryData: Category) : Promise <Category> 
  {
    const category =  await this.categoryService.findCategory(categoryData);
    return category;
  }

  @post('/books')
  async createNewBook(@requestBody() bookData: Book) : Promise <Book> 
  {
    const newBook = await this.bookService.createNewBook(bookData)

    return newBook;
  }

  @get('/books')
  async getbookList() : Promise<Book[]> 
  {
    return this.bookService.getBookList();
  }

  @get('/books/isbn/{isbn}')
  async getBookByIsbn(@param.path.string('isbn') isbn: string) : Promise<Book> 
  {
    return this.bookService.getBookByIsbn(isbn);
  }

}
