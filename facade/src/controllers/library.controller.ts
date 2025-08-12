// Uncomment these imports to begin using these cool features!

import { service } from "@loopback/core";
import { AuthorService, BookService, CategoryService } from "../services";
import { post, requestBody, get, param} from "@loopback/rest";
import { Author, Book, Category } from "../models";


export class LibraryController {
  constructor(
    @service(AuthorService)
    private authorService: AuthorService,

    @service(CategoryService)
    private categoryService: CategoryService,

    @service(BookService)
    private bookService: BookService,
  ) {}

  @post('/Author')
  async findOrCreateAuthor(@requestBody() authorData: Author) : Promise<Author> 
  {
    const author = await this.authorService.findAuthor(authorData);
    return author;
  }

  @post('/Category')
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

  @get('/books/{isbn}')
  async getBookByIsbn(@param.path.string('isbn') isbn: string) : Promise<Book> 
  {
    console.log(isbn);
    
    return this.bookService.getBookByIsbn(isbn);
  }

}
