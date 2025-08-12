import { Book } from "../../models";

export interface BookServiceProxy 
{
    createBook(data: Partial<Book>) : Promise<Book>;
    getBook() : Promise<Book[]>;
    findBookByIsbn(isbn: string) : Promise<Book>;
}