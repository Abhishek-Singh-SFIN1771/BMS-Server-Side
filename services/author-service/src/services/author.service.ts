import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Author} from '../models';
import {AuthorRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthorService {
  constructor(
    @repository(AuthorRepository)
    public authorRepository: AuthorRepository
  ) { }

  async findAuthorbyName(name : string ) : Promise<Author>
  {
    const author =await this.authorRepository.findOne({where: {name : name}});

    if (!author)
      {
        throw new Error('Author not found');
      }

      return author;
  }

  async createNewAuthor(authorData: Author) : Promise<Author>
  {
    const author = this.authorRepository.create(authorData)

    return author;
  }

  async findAuthorById(authorId: string): Promise<Author>
  {
    return this.authorRepository.findById(authorId)
  }

}
