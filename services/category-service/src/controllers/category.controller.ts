import {inject} from '@loopback/core';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {Category} from '../models';
import {CategoryService} from '../services';
import { Filter } from '@loopback/repository';

export class CategoryController {
  constructor(
    @inject('services.CategoryService')
    private categoryService : CategoryService
  ) {}

  @post('/categories')
  @response(200, {
    description: 'Category model instance',
    content: {'application/json': {schema: getModelSchemaRef(Category)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {
            title: 'NewCategory',
            exclude: ['id'],
          }),
        },
      },
    })
    category: Omit<Category, 'id'>,
  ): Promise<Category> {
    return this.categoryService.createNewCategory(category)
  }

  @get('/categories')
  @response(200, {
    description: 'Category model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Category, {includeRelations: true}),
      },
    },
  })
  async findByName(@param.filter(Category) filter?: Filter<Category>): Promise<Category> {
    return this.categoryService.findCategoryByName(filter)
  }

  @get('/categories/{id}')
  @response(200, {
    description: 'Category model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Category, {includeRelations: true}),
      },
    },
  })
  async findCategoryById(@param.path.string('id') id: string,): Promise<Category> {
    return this.categoryService.findCategoryById(id);
  }


}
