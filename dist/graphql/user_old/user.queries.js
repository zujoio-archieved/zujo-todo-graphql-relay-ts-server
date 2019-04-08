"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const user_typedef_1 = require("./user.typedef");
const user_1 = require("../../schemas/user");
const UserQueries = {
    users: {
        type: new graphql_1.GraphQLList(user_typedef_1.UserType),
        args: {
            limit: {
                description: "limit items in result",
                type: graphql_1.GraphQLInt
            }
        },
        resolve: (root, { limit }) => {
            return user_1.User.find().limit(limit);
        }
    },
};
exports.UserQueries = UserQueries;
//# sourceMappingURL=user.queries.js.map