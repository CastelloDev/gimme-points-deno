import { Task } from '../db/models/Task.ts'
// import db from '../db/db.ts'
// import {Request} from 'https://deno.land/x/pogo/main.ts';

// const dbContext = db.getDatabase;

const getAll = { 
    method : 'GET', 
    path : '/', 
    handler : async()  =>  {
        // return "Hello"
        return await Task.select().all(); 
    }
}

const routes = [getAll].map(route=>({...route, path:`/task${route.path}`}))
export default routes