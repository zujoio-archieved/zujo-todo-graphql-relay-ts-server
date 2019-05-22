import {
    nodeDefinitions,
    fromGlobalId
} from "graphql-relay"


import { UserRepository } from "../repository/user/index"
import { User } from "../schemas/user"
import { ToDo } from "../schemas/todo"
import { TodoRepository } from "../repository/todo";
import { Post } from "../schemas/post"
import { PostRepository } from "../repository/post";



/**
 * Defination for 
 */
const { nodeInterface, nodeField } = nodeDefinitions(
    async globalId => {
      const { type, id } = fromGlobalId(globalId);
        // Log to NodeJS console the mapping from globalId/Node ID  
        // to actual object type and id
        console.log("NodeDefinitions (globalId), id:", id);
        console.log("NodeDefinitions (globalId), type:", type);
        if (type === 'Todo') {
            const todoRepo = new TodoRepository()
            return todoRepo.getTodo(id)
        }
        if (type === 'User') {
            const userRepo = new UserRepository()
            return userRepo.findOne(id);
        }
        if (type === 'Post') {
            const postRepo = new PostRepository()
            return postRepo.getPost(id);
        }
        return null;
    },
    async obj => {
        if (obj instanceof ToDo) {
            const types = await import("./todo/todo.typedef")
            return types.GraphQLTodo;
        }
        if (obj instanceof User) {
            const types = await import("./user/user.typedef")
            return types.GraphQLUser;
        }
        if (obj instanceof Post) {
            const types = await import("./post/post.typedef")
            return types.GraphQLPost;
        }
        return null
    },
);

export { nodeInterface, nodeField }
