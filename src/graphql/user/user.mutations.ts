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
            return { 
                user,
                token: authToken.accessToken
            }
        } catch (error) {
            throw error
        }
    }
})
// const authenticateGoogle = (req: Request, res: Response) => new Promise((resolve, reject) => {
//     console.log('\n====> body', req.body);
//     passport.authenticate('google-token', { session: false }, (err, data, info) => {
//         if (err) reject(err);
//         resolve({ data, info });
//     })(req, res);
// });

// const GraphQLGoogleOAuthMutation = mutationWithClientMutationId({
//     name: 'googleAuth',
//     inputFields:{
//         accessToken:{ type: new GraphQLNonNull(GraphQLString) },
//     },
//     outputFields: {
//         viewer: {
//             type: GraphQLString,
//             resolve: async ({viewer}) => viewer
//         },
//         token: {
//             type: GraphQLString,
//             resolve: async ({token}) => token
//         }
//     },
//     mutateAndGetPayload: async (obj, context, _info) => {
//         context.req.body = {access_token: obj.accessToken, ...context.req.body}
//         const { data, info } = await authenticateGoogle(context.req, context.res);
//         console.log("data", data)
//         console.log("info", info)
//         return { viewer:"abc", token:"333" }
//     }
// })

const GraphQLUserMutations = {
    register: GraphQLRegisterUserMutations,
    login: GraphQLLoginUserMutation
}

export {
    GraphQLUserMutations
}