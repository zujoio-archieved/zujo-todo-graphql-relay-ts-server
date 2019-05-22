import { GraphQLSchema, GraphQLObjectType } from "graphql";

import {  GraphQLUserMutations, GraphQLUserQueries } from "./user"
import { GraphQLTodoMutations, GraphQLTodoSubscription } from "./todo"
import {GraphQLPostMutations,GraphQLPostSubscription} from './post'

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
        ...GraphQLPostMutations,
     
    }
});
  
/**
 * Root Subscriptions
 */
const RootSubscription = new GraphQLObjectType({
    name: "Subscription",
    fields:{
        ...GraphQLTodoSubscription,
        ...GraphQLPostSubscription
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
    subscription: RootSubscription
})

export {schema} 
  