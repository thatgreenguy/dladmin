import { readAll } from "https://deno.land/std@0.99.0/io/util.ts";
import { Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { Book, NewBook } from "../models/bookModels.ts";

let books: Book[] = [
    { id: '1', title: 'call of the wild', author: 'rufus randall', pages: 680 },
    { id: '2', title: 'the way of kings', author: 'brandon sanderson', pages: 435 },
    { id: '3', title: 'good omens', author: 'terry pratchett', pages: 878 },
];

export const get_all_books = (ctx: Context) => {
    return ctx.json(books, 200);
}

export const get_book = (ctx: Context) => {
    const { id } = ctx.params;
    const book = books.find((b: Book) => b.id === id );
    if ( book ) {
        return ctx.json(book, 200);        
    } 
    return ctx.string('no book found with that id', 404);
}

export const create_book = async (ctx: Context) => {

    // const data: unknown = await ctx.body;
    // const sss: any = await ctx.request.body
    // json(await ctx.body);
    const buf: Uint8Array = await readAll(ctx.request.body);
    const data = new TextDecoder().decode(buf);
    
    console.log('ctx body: ', data)
    console.log('typeof well: ', typeof(data))

    // To create a book expect title, author and pages
    // value data expected to be passed as json string in body of request
    if ( data && typeof data === 'string') {

        const dataJson = JSON.parse(data);
        console.log('ctx json: ', dataJson)

        // create new book with new id
        const id = globalThis.crypto.randomUUID();
        const { title, author, pages} = dataJson;       
        const book = { id, title, author, pages };

        // Check book has the expected number of values (4) else insufficient number of values supplied
        const valCount: number = Object.keys( book ).length - 1;
        if ( valCount === 3 ) {
            books.push( book );
            return ctx.json(book, 201);
        } else {
            return ctx.string(`missing values from expected list of: title, author and pages. Only ${valCount} supplied.`, 400);
        }
    }
    return ctx.string('missing values from expected list of: title, author and pages', 400);
}

export const delete_book = (ctx: Context) => {
    const { id } = ctx.params;
    const book = books.find((b: Book) => b.id === id );
    if ( book ) {
        books = books.filter((b: Book) => b.id !== id);
        return ctx.json(book, 200);
    }
    return ctx.string('no book with that id', 404);
}