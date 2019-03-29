"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_relay_1 = require("graphql-relay");
const graphql_1 = require("graphql");
const user_typedef_1 = require("./user.typedef");
const index_1 = require("../../repository/user/index");
require("../../common/utils/passport");
const GraphQLRegisterUserMutations = graphql_relay_1.mutationWithClientMutationId({
    name: 'register',
    inputFields: {
        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    },
    outputFields: {
        viewer: {
            type: user_typedef_1.GraphQLUser,
            resolve: ({ user, token, error }) => __awaiter(this, void 0, void 0, function* () {
                return user;
            })
        },
        token: {
            type: graphql_1.GraphQLString,
            resolve: ({ user, token, error }) => __awaiter(this, void 0, void 0, function* () {
                return token;
            })
        }
    },
    mutateAndGetPayload: ({ email, password }) => __awaiter(this, void 0, void 0, function* () {
        // register user
        const userRepo = new index_1.UserRepository();
        const userInput = {
            email,
            password
        };
        try {
            const { user, authToken } = yield userRepo.register(userInput);
            return {
                user,
                token: authToken.accessToken
            };
        }
        catch (error) {
            throw error;
        }
    })
});
const GraphQLLoginUserMutation = graphql_relay_1.mutationWithClientMutationId({
    name: 'login',
    inputFields: {
        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    },
    outputFields: {
        viewer: {
            type: user_typedef_1.GraphQLUser,
            resolve: ({ user, token, error }) => __awaiter(this, void 0, void 0, function* () {
                return user;
            })
        },
        token: {
            type: graphql_1.GraphQLString,
            resolve: ({ user, token, error }) => __awaiter(this, void 0, void 0, function* () {
                return token;
            })
        }
    },
    mutateAndGetPayload: ({ email, password }) => __awaiter(this, void 0, void 0, function* () {
        const userRepo = new index_1.UserRepository();
        try {
            const { user, authToken } = yield userRepo.login(email, password);
            return {
                user,
                token: authToken.accessToken
            };
        }
        catch (error) {
            throw error;
        }
    })
});
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
};
exports.GraphQLUserMutations = GraphQLUserMutations;
//# sourceMappingURL=user.mutations.js.map