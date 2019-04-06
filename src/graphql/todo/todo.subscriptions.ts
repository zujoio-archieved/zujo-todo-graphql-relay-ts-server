import { TodosConnection, GraphQLTodo, GraphQLTodoEdge } from './todo.typedef'
import pubSub from '../publisher'
import { TODO_SUBSCRIPTION_TRIGGERS } from '../../common/utils/common.constant'
import { GraphQLList, GraphQLString, GraphQLObjectType } from 'graphql';

const GraphQLTodoSubscription = {
    /**
     * Subscription trigger for created ToDo
     */
    todoAdded:{
        type: new GraphQLObjectType({
            name: 'todoAdded',
            fields: () => ({
                todoEdge: { type: GraphQLTodoEdge },
                clientSubscriptionId: { type: GraphQLString }
            })
        }),
        subscribe: () => pubSub.asyncIterator(TODO_SUBSCRIPTION_TRIGGERS.todo_created)
    },

    /**
     * Subscription trigger for changed status of todo
     */
    todoChangedStatus: {
        type: GraphQLTodo,
        subscribe: () => pubSub.asyncIterator(TODO_SUBSCRIPTION_TRIGGERS.change_todo_status)
    },

    /**
     * Subscription trigger for remove completted status
     */
    todoRemovedCompleted: {
        type: new GraphQLObjectType({
            name:'deletedIds',
            fields: () => ({
                deletedIds: { type: new GraphQLList(GraphQLString) }
            })
        }),
        subscribe: () => pubSub.asyncIterator(TODO_SUBSCRIPTION_TRIGGERS.remove_completed_todo)
    },

    /**
     * Subscription trigger for removed todo
     */
    todoRemoved:{
        type: GraphQLTodo,
        subscribe: () => pubSub.asyncIterator(TODO_SUBSCRIPTION_TRIGGERS.remove_todo)
    },

    /**
     * Subscription trigger for renamed todo
     */
    todoRenamed:{
        type: GraphQLTodo,
        subscribe: () => pubSub.asyncIterator(TODO_SUBSCRIPTION_TRIGGERS.rename_todo)
    }
}

export { GraphQLTodoSubscription }