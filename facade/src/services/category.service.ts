import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { Category } from '../models';
import axios from 'axios';

@injectable({scope: BindingScope.TRANSIENT})
export class CategoryService {

  private categoryBaseUrl = 'http://localhost:3003/categories'

  constructor() {}

  async findCategory(data :  Partial<Category>): Promise <Category> 
  {
    try
    {
      const category = await axios.get(`${this.categoryBaseUrl}/${data.name}`)
      return category.data
    }
    catch (error :any)
    {
      return this.createNewCategory(data) 
    }
  }

  async createNewCategory (data : Partial<Category>) : Promise <Category> 
  {
    const category =  await axios.post(this.categoryBaseUrl, data)

    if(!category) 
        {
            throw new Error("Category not Created");
        }

    return category.data;
  }

  async findCategoryById(id: string): Promise<Category> 
  {
    const categoryDetail = await axios.get(`${this.categoryBaseUrl}/id/${id}`)

    if(!categoryDetail) 
        {
            throw new Error("Author details are not found")
        }
    return categoryDetail.data;    
  }
}
