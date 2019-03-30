import {
    nodeDefinitions,
    fromGlobalId
} from "graphql-relay"


import { UserRepository } from "../repository/user/index"
import { User } from "../schemas/user"
import { ToDo } from "../schemas/todo"
import { Image } from "../schemas/Image"
import { TodoRepository } from "../repository/todo";
import { ImageRepository } from "../repository/Image";


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
        if (type === 'Image') {
            const imageRepo = new ImageRepository()
            return imageRepo.getImage(id);
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
        if (obj instanceof Image) {
            const types = await import("./image/image.typedef")
            return types.GraphQLImage;
        }
        return null
    },
);

export { nodeInterface, nodeField }
