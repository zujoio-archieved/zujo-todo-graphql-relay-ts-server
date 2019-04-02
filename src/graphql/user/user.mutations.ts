import {
    mutationWithClientMutationId,
    fromGlobalId,
    toGlobalId
} from 'graphql-relay'
import { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } from 'graphql';
import { GraphQLUser } from './user.typedef';
import { UserRepository } from '../../repository/user/index';
import { tokenize } from 'protobufjs';
import passport from 'passport';
import { validateMiddleware } from 'graphql-middleware/dist/validation';
import {sendMail} from '../../common/mailer/mailer';
import '../../common/utils/passport';


const GraphQLRegisterUserMutations = mutationWithClientMutationId({
    name: 'register',
    inputFields:{
        email:{ type: new GraphQLNonNull(GraphQLString) },
        password:{ type: new GraphQLNonNull(GraphQLString) }
    },
    outputFields:{
        viewer:{
            type: GraphQLUser,
            resolve: async ({user, token, error}) => {
                return user;
            }
        },
        token:{
            type: GraphQLString,
            resolve: async ({user, token, error}) => {
                return token;
            }
        }
    },
    mutateAndGetPayload: async ({ email, password }) => {
        // register user
        const userRepo = new UserRepository();
        const userInput = {
            email,
            password
        }
        try {
            const { user, authToken} = await userRepo.register(userInput);
            sendMail(email, email, `Warm welcome ${email} - Zujo`, 'signup')
            return { 
                user,
                token: authToken.accessToken
            }
        } catch (error) {
            throw error
        }
    }
})

const GraphQLLoginUserMutation = mutationWithClientMutationId({
    name: 'login',
    inputFields:{
        email:{ type: new GraphQLNonNull(GraphQLString) },
        password:{ type: new GraphQLNonNull(GraphQLString) }
    },
    outputFields:{
        viewer:{
            type: GraphQLUser,
            resolve: async ({user, token, error}) => {
                return user;
            }
        },
        token:{
            type: GraphQLString,
            resolve: async ({user, token, error}) => {
                return token;
            }
        }
    },
    mutateAndGetPayload: async ({ email, password }) => {
        const userRepo = new UserRepository();
        try {
            const { user, authToken} = await userRepo.login(email, password);
            sendMail(email, email, `Welcome back ${email} - Zujo`, 'login')
            return { 
                user,
                token: authToken.accessToken
            }
        } catch (error) {
            throw error
        }
    }
})

const GraphQLUserMutations = {
    register: GraphQLRegisterUserMutations,
    login: GraphQLLoginUserMutation
}

export {
    GraphQLUserMutations
}