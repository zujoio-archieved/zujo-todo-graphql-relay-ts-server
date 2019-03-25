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
const GraphQLUserMutations = {
    register: GraphQLRegisterUserMutations
};
exports.GraphQLUserMutations = GraphQLUserMutations;
//# sourceMappingURL=user.mutations.js.map