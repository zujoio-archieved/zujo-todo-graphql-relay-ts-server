import { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLInt
} from "graphql";
import { 
    connectionArgs,
    connectionFromArray,
    globalIdField
} from "graphql-relay"

import { nodeInterface } from "../global.defination";
import { TodosConnection } from "../todo/todo.typedef";
import { TodoRepository } from "../../repository/todo/index"


const GraphQLUser = new GraphQLObjectType({
    name:'User',
    fields: () => ({
        id: globalIdField('User'),
        email: {
            type: GraphQLString
        },
        todos: {
            type: TodosConnection,
            args:{
                status:{
                    type: GraphQLString,
                    defaultValue: 'any'
                },
                ...connectionArgs
            },
            resolve: async (obj, { status, ...args }) =>{
                const todoRepo = new TodoRepository()
                const todos = await todoRepo.getTodos(status)
                return connectionFromArray(todos, args)
            }
        },
        numTodos: {
          type: GraphQLInt,
          resolve: async () => {
            const todoRepo = new TodoRepository()
            return await todoRepo.getNumTodos();
          },
        },
        numCompletedTodos: {
          type: GraphQLInt,
          resolve: async () => {
            const todoRepo = new TodoRepository()
            return await todoRepo.getNumTodos();
          },
        },
    }),
    interfaces:[nodeInterface]
})

export {
    GraphQLUser
}