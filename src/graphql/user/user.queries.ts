
import { GraphQLUser } from "./user.typedef"
import { UserRepository } from "../../repository/user"
import { nodeField } from "../global.defination";

const GraphQLUserQueries = {
    viewer:{
        type: GraphQLUser,
        resolve: async () =>{
            const userRepo = new UserRepository()
            return await userRepo.me()
        }
    },
    node: nodeField
}

export {
    GraphQLUserQueries
}