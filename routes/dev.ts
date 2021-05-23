import { Status } from 'https://deno.land/std/http/http_status.ts';
import { Request, Toolkit } from 'https://deno.land/x/pogo/main.ts';
import db from '../db/db.ts'

const create = { 
    method : 'GET', 
    path : '/', 
    handler : () => 'Hello Worldsssss!' 
}

const seed = { 
    method : 'GET', 
    path : '/seed', 
    handler : async(request: Request, h: Toolkit) => {
        await db.seed();
        return h.response().code(Status.OK);
    }
}

const routes = [create, seed]
export default routes