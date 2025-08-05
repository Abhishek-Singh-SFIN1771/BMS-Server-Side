import {injectable,  BindingScope} from '@loopback/core';
import { Author, Book } from '../models';
import axios from 'axios';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthorService {
  constructor() {}

  private authorBaseUrl = 'http://localhost:3002/authors';

  async findAuthor(data : Partial<Author>): Promise<Author> 
  {
        try{
            const author = await axios.get(`${this.authorBaseUrl}/${data.name}`);
            return author.data
        }catch (error: any) 
        {
            return this.createNewAuthor(data);
        }
  }

  async createNewAuthor(data : Partial<Author>) : Promise <Author> 
  {

    const author = await axios.post(this.authorBaseUrl, data)

    if(!author) 
        {
            throw new Error("Author not Created");
        }

    return author.data;
  }

  async findAuthorById(authorId: string): Promise<Author> 
  {
    const authorDetail = await axios.get(`${this.authorBaseUrl}/id/${authorId}`)

    if(!authorDetail) 
        {
            throw new Error("Author details are not found")
        }
    return authorDetail.data;    
  }
}