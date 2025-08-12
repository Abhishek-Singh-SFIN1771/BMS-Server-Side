import { Category } from "../../models";

export interface CategoryServiceProxy 
{
    findCategoryByName(name: string) : Promise<Category>;
    createCategory(data: Partial<Category>) : Promise<Category>;
    findCategoryById(id: string) : Promise<Category>;
}