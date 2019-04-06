import { GraphQLSchema, GraphQLObjectType } from "graphql";

import {  GraphQLUserMutations, GraphQLUserQueries } from "./user"
import { GraphQLTodoMutations, GraphQLTodoSubscription } from "./todo"

/**
 * Root queries 
 */
const RootQuery = new GraphQLObjectType({
    name: "Root",
    fields: { 
        ...GraphQLUserQueries 
    }
});
  
/**
 * Root Mutations
 */
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{ 
        ...GraphQLUserMutations,
        ...GraphQLTodoMutations,
     
    }
});
  
/**
 * Root Subscriptions
 */
const RootSubscription = new GraphQLObjectType({
    name: "Subscription",
    fields:{
        ...GraphQLTodoSubscription
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
    subscription: RootSubscription
})

export {schema} 
  