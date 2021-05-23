import { Task } from '../db/models/Task.ts'
import { Request, Toolkit } from 'https://deno.land/x/pogo/main.ts';

const getAll = { 
    method : 'GET', 
    path : '/', 
    handler : async()  =>  {
        return await Task.select().all(); 
    }
}

const getUserByTaskId = { 
    method : 'GET', 
    path : '/user/{id}', 
    handler : async(request: Request)  =>  {
        return await Task.where('id', request.route.params[`id`]).createdBy();
    }
}

// const getAllCreated = { 
//     method : 'GET', 
//     path : '/', 
//     handler : async()  =>  {
//         return await Task.select().all(); 
//     }
// }

// const getAllAssigned = { 
//     method : 'GET', 
//     path : '/', 
//     handler : async()  =>  {
//         return await Task.select().all(); 
//     }
// }

// const getAllSubmitted = { 
//     method : 'GET', 
//     path : '/', 
//     handler : async()  =>  {
//         return await Task.select().all(); 
//     }
// }

const routes = [getAll, getUserByTaskId].map(route=>({...route, path:`/task${route.path}`}))
export default routes