"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const user_1 = require("./user");
const todo_1 = require("./todo");
/**
 * Root queries
 */
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "Root",
    fields: Object.assign({}, user_1.GraphQLUserQueries)
});
/**
 * Root Mutations
 */
const RootMutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: Object.assign({}, user_1.GraphQLUserMutations, todo_1.GraphQLTodoMutations)
});
/**
 * Root Subscriptions
 */
const RootSubscription = new graphql_1.GraphQLObjectType({
    name: "Subscription",
    fields: Object.assign({}, todo_1.GraphQLTodoSubscription)
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
    subscription: RootSubscription
});
exports.schema = schema;
//# sourceMappingURL=schema.js.map