import {Model, model, property} from '@loopback/repository';
import { Author } from './author.model';
import { Category } from './category.model';

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
    required: false,
  })
  authorId?: string;

  @property({
    type: 'string',
    required: true,
  })
  authorName: string;

   @property({
    type: 'string',
    required: false,
  })
  categoryId?: string;

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
  author: Author;
  category: Category;
}

export type BookWithRelations = Book & BookRelations;
