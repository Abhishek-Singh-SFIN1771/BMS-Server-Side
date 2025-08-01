import {Model, model, property} from '@loopback/repository';

@model()
export class Book extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  isbn: string;

  @property({
    type: 'number',
    required: true,
  })
  publishYear: number;

  @property({
    type: 'string',
    required: true,
  })
  authorName: string;

  @property({
    type: 'string',
    required: true,
  })
  categoryName: string;


  constructor(data?: Partial<Book>) {
    super(data);
  }
}

export interface BookRelations {
  // describe navigational properties here
}

export type BookWithRelations = Book & BookRelations;
