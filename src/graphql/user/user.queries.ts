
import { GraphQLUser } from "./user.typedef"
import { UserRepository } from "../../repository/user"
import { nodeField } from "../global.defination";

const GraphQLUserQueries = {
    viewer:{
        type: GraphQLUser,
        resolve: async (obj, args, context, info) =>{
            const userId = await context.userId()
            const userRepo = new UserRepository()
            return await userRepo.me(userId)
        }
    },
    node: nodeField
}

export {
    GraphQLUserQueries
}