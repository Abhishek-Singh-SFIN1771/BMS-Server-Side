import { Entity, model, property } from '@loopback/repository';

@model()
export class Category extends Entity {
  @property({type: 'string',id: true,generated: true , postgresql: {columnName: 'category_id', dataType: 'uuid'}})
  id?: string;

  @property({type: 'string',required: true, postgresql: {columnName: 'category_name'}})
  name: string;

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
