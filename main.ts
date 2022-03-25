import { Application } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { 
  get_all_books,
  get_book,
  create_book,
  delete_book
 } from "./controllers/bookController.ts";

const app = new Application();

console.log("http://localhost:8090/");

// Static files
app.static('/', "./public");

// Routes
app.get("/", async (ctx ) => {
  await ctx.file('./public/index.html');
})

app
  .get("/books", get_all_books)
  .get("/books/:id", get_book)
  .post("/books", create_book)
  .delete("/books/:id", delete_book)

app.start({ port: 8090 });





// import {Application, Router, Context, send} from 'https://deno.land/x/oak/mod.ts';
// import {
//   viewEngine,
//   engineFactory,
//   adapterFactory,
// } from 'https://deno.land/x/view_engine/mod.ts';

// import { camelCase, paramCase, pascalCase, snakeCase } from "https://deno.land/x/case/mod.ts";

// const text = 'hello some text matey';

// const camel = camelCase(text);
// const param  = paramCase(text);
// const pascal  = pascalCase(text);
// const snake = snakeCase(text);

// console.log(camel, param, snake, pascal)

// const ejsEngine = await engineFactory.getEjsEngine();
// const oakAdapter = await adapterFactory.getOakAdapter();

// const app = new Application();
// const PORT = 8080;

// app.addEventListener("error", (event) => {
//   log.error(event.error);
// });

// app.use( viewEngine( oakAdapter, ejsEngine, { 
//   viewRoot: '.',
//   viewExt: '.ejs'
// }));

// const indexController = ( ctx: Context ) => {
//   ctx.render("index", { data: { name: "John" } });
// };

// const indexRouter: Router = new Router();
// indexRouter.get( '/', indexController );

// app.use( indexRouter.routes() );

// await app.listen({ port: PORT });

// import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
// const BOOK_ROUTE = new URLPattern({ pathname: "/books/:id" });

// function handler(req: Request): Response {
//   const match = BOOK_ROUTE.exec(req.url);
//   if (match) {
//     const id = match.pathname.groups.id;
//     return new Response(`Booky XXXXXX ${id}`);
//   }
//   return new Response("Not found (try /books/1)", {
//     status: 404,
//   });
// }
// console.log("Listening on http://localhost:8000");
// serve(handler);