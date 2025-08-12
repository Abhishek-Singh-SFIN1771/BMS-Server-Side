import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {Category} from '../models';
import {CategoryRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class CategoryService {
  constructor(
    @repository(CategoryRepository)
    private categoryRepository : CategoryRepository
  ) {}

  async findCategoryByName(filter?: Filter<Category>) : Promise<Category>
  {
    const category = await this.categoryRepository.findOne(filter)

    if(!category)
      {
        throw new Error ("Category not found")
      }

      return category;
  }

  async createNewCategory(categoryData: Category) : Promise<Category>
  {
    const category = await this.categoryRepository.create(categoryData);

    return category;
  }

  async findCategoryById(categoryId : string) : Promise<Category> 
  {
    return this.categoryRepository.findById(categoryId);
  } 

}
