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
import { mongooseConnectionFromArray } from "../../common/utils/common.graphql"
import { ToDo } from "../../schemas/todo/index";
import { Post } from "../../schemas/post/index";

import { PostsConnection } from "../post/post.typedef";
import { PostRepository } from "../../repository/post/index"

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
                const todos = await todoRepo.getTodos(status, args)
                return await mongooseConnectionFromArray(ToDo, todos, args)
            } 
        },
        posts: {
            type: PostsConnection,
            args:{
                
                ...connectionArgs
            },
            resolve: async (obj,{...args}) =>{
                const postRepo = new PostRepository()
                const posts = await postRepo.getPosts(args)
                return await mongooseConnectionFromArray(Post, posts, args)
            } 
        },
        numPosts: {
            type: GraphQLInt,
            resolve: async () => {
              const postRepo = new PostRepository()
              return await postRepo.getNumPosts();
            },
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