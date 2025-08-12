import {injectable, /* inject, */ BindingScope, inject} from '@loopback/core';
import { Category } from '../models';
import { CategoryServiceProxy } from './proxies/category-proxy';
import { CategoryDataSource } from '../datasources';
import { juggler } from '@loopback/repository';
import { getService } from '@loopback/service-proxy';

@injectable({scope: BindingScope.TRANSIENT})
  export class CategoryService {

    private categoryProxy: CategoryServiceProxy

    constructor(
      @inject('datasources.category')
      private ds: juggler.DataSource = new CategoryDataSource()) {}

    private async getCategoryProxy(): Promise<CategoryServiceProxy> {
        if (!this.categoryProxy) {
          this.categoryProxy = await getService<CategoryServiceProxy>(this.ds);
        }
        return this.categoryProxy;
      }  

    async findCategory(data :  Partial<Category>): Promise <Category> 
    {
      if (!data.name) 
      {
        throw new Error("Author name is required");
      }

      try
        {
          const proxy = await this.getCategoryProxy();
          const category = await proxy.findCategoryByName(data.name)
          return category
        }
        catch (error :any)
        {
          return this.createNewCategory(data) 
        }
    }

    async createNewCategory (data : Partial<Category>) : Promise <Category> 
    {
      const proxy = await this.getCategoryProxy();
      const category =  await proxy.createCategory(data)

      if(!category) 
          {
              throw new Error("Category not Created");
          }

      return category;
    }

    async findCategoryById(id: string): Promise<Category> 
    {
      const proxy = await this.getCategoryProxy();
      const categoryDetail = await proxy.findCategoryById(id)

      if(!categoryDetail) 
          {
              throw new Error("Author details are not found")
          }
      return categoryDetail;    
    }
  }
