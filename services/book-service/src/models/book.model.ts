import {Entity, model, property} from '@loopback/repository';

@model()
export class Book extends Entity {
  @property({type: 'string', id: true, generated: true, postgresql: { columnName: 'book_id',dataType: 'uuid'}})
  id?: string;

  @property({type: 'string', required: true, postgresql: { columnName: 'book_title'} })
  title: string;

  @property({type: 'string',required: true, postgresql: { columnName: 'book_isbn'} })
  isbn: string;

  @property({type: 'number', required: true, postgresql: { columnName: 'book_release_year'} })
  publishYear: number;

  @property({ type: 'string', postgresql: { columnName: 'author_id'} })
  authorId?: string;

  @property({ type: 'string', postgresql: { columnName: 'category_id'} })
  categoryId?: string;


  constructor(data?: Partial<Book>) {
    super(data);
  }
}

export interface BookRelations {
  // describe navigational properties here
}

export type BookWithRelations = Book & BookRelations;
