import {injectable,  BindingScope, inject} from '@loopback/core';
import { Author} from '../models';
import { AuthorServiceProxy } from './proxies/author-proxy';
import { getService, juggler } from '@loopback/service-proxy';
import { AuthorDataSource } from '../datasources';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthorService {

  private authorProxy: AuthorServiceProxy;

  constructor(
    @inject('datasources.author')
    private ds: juggler.DataSource = new AuthorDataSource() 
    ) {}

   private async getAuthorProxy(): Promise<AuthorServiceProxy> {
    if (!this.authorProxy) {
      this.authorProxy = await getService<AuthorServiceProxy>(this.ds);
    }
    return this.authorProxy;
  }

  async findAuthor(data : Partial<Author>): Promise<Author> 
  {
    if (!data.name) 
      {
        throw new Error("Author name is required");
      }

        try{
          const proxy = await this.getAuthorProxy();
          const author = await proxy.findAuthorByName(data.name)
          return author
        }catch (error: any) 
        {
            return this.createNewAuthor(data);
        }
  }

  async createNewAuthor(data : Partial<Author>) : Promise <Author> 
  {
    const proxy = await this.getAuthorProxy();
    const author = await proxy.createAuthor(data)

    if(!author) 
        {
            throw new Error("Author not Created");
        }

    return author;
  }

  async findAuthorById(authorId: string): Promise<Author> 
  {
    const proxy = await this.getAuthorProxy();
    const authorDetail = await proxy.findAuthorById(authorId);

    if(!authorDetail) 
        {
            throw new Error("Author details are not found")
        }
    return authorDetail;    
  }
}