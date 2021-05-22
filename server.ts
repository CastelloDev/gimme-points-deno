import pogo from 'https://deno.land/x/pogo/main.ts';
import routes from './routes/index.ts'
import db from './db/db.ts'

const server = pogo.server({ port : 8000 });
console.log("http://localhost:8000/");

// await db.seed();
const dbContext = db.dbName
console.log("Database Ready", dbContext);

server.route(routes)
console.log("Routes initialised");

server.start();