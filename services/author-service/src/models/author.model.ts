import {Entity, model, property} from '@loopback/repository';

@model()
export class Author extends Entity {
  @property({type: 'string', id: true, generated: true, postgresql: {columnName: 'author_id', dataType: 'uuid'}})
  id?: string;

  @property({type: 'string', required: true, postgresql: {columnName: 'author_name'}})
  name: string;

  @property({type: 'string'})
  country?: string;


  constructor(data?: Partial<Author>) {
    super(data);
  }
}

export interface AuthorRelations {
  // describe navigational properties here
}

export type AuthorWithRelations = Author & AuthorRelations;
