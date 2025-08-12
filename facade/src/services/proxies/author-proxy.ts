import { Author } from "../../models";

export interface AuthorServiceProxy 
{
    findAuthorByName(name: string) : Promise<Author>;
    createAuthor(data: Partial<Author>) : Promise<Author>;
    findAuthorById(id: string) : Promise<Author>;
}