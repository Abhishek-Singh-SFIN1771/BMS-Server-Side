import {injectable,BindingScope, inject} from '@loopback/core';
import { AuthorService } from './author.service';
import { CategoryService } from './category.service';
import { Book } from '../models';
import axios from 'axios';

@injectable({scope: BindingScope.TRANSIENT})
export class BookService {

  private bookBaseUrl = 'http://localhost:3001/books';

  constructor(
    @inject('services.AuthorService')
    public authorService : AuthorService,
    
    @inject('services.CategoryService')
    public categoryService : CategoryService
  ) {}

  async createNewBook(bookData : Book) : Promise<Book> 
  {
    const author = await this.authorService.findAuthor({name : bookData.authorName});
    const category =  await this.categoryService.findCategory({name : bookData.categoryName});

    const newBook = await axios.post(this.bookBaseUrl,{
      title: bookData.title,
      isbn: bookData.isbn,
      publishYear: bookData.publishYear,
      authorId: author.id,
      categoryId: category.id
    })

    return {...newBook.data, author, category};
  }

  async getBookList() : Promise<Book[]> 
  {
    const allBook = await axios.get(this.bookBaseUrl)
    const books = allBook.data

    const bookList = []

    for(const book of books)
      {
        const author = await this.authorService.findAuthorById(book.authorId)
        const category =  await this.categoryService.findCategoryById(book.categoryId)
        
        bookList.push({...book , author , category})
      }
      
      return bookList;
  }

  async getBookByIsbn(bookIsbn : string) : Promise<Book>
  {
    const bookDetail = await axios.get(`${this.bookBaseUrl}/${bookIsbn}`);
    
    const author = await this.authorService.findAuthorById(bookDetail.data.authorId)
    const category =  await this.categoryService.findCategoryById(bookDetail.data.categoryId)

    if(!bookDetail) 
      {
        throw new Error("Book not found")
      }
    return {...bookDetail.data , author , category};
  }

  // async updateBookByIsbn(bookData: Book , isbn : string) : Promise<Book> 
  // {
  //   const bookDetails = await this.getBookByIsbn(isbn);
    

  // }

}
