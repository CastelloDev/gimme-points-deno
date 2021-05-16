// import { serve } from "https://deno.land/std@0.96.0/http/server.ts";

// const server = serve({ port: 8080 });
// console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

// for await (const request of server) {
//   let bodyContent = "Your user-agent is:\n\n";
//   bodyContent += request.headers.get("user-agent") || "Unknown";

//   request.respond({ status: 200, body: bodyContent });
// }

// console.log("Hello World")

import { serve } from "https://deno.land/std@0.96.0/http/server.ts";
import { initAndSeed } from './db/db.ts'

const server = serve({ port: 8000 });
console.log("http://localhost:8000/");


for await (const req of server) {
  
  await initAndSeed()
  req.respond({ body: "Hello World\n" });
}