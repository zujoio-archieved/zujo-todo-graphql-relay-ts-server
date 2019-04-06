"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_typedef_1 = require("./todo.typedef");
const publisher_1 = __importDefault(require("../publisher"));
const common_constant_1 = require("../../common/utils/common.constant");
const graphql_1 = require("graphql");
const GraphQLTodoSubscription = {
    /**
     * Subscription trigger for created ToDo
     */
    todoAdded: {
        type: new graphql_1.GraphQLObjectType({
            name: 'todoAdded',
            fields: () => ({
                todoEdge: { type: todo_typedef_1.GraphQLTodoEdge },
                clientSubscriptionId: { type: graphql_1.GraphQLString }
            })
        }),
        subscribe: () => publisher_1.default.asyncIterator(common_constant_1.TODO_SUBSCRIPTION_TRIGGERS.todo_created)
    },
    /**
     * Subscription trigger for changed status of todo
     */
    todoChangedStatus: {
        type: todo_typedef_1.GraphQLTodo,
        subscribe: () => publisher_1.default.asyncIterator(common_constant_1.TODO_SUBSCRIPTION_TRIGGERS.change_todo_status)
    },
    /**
     * Subscription trigger for remove completted status
     */
    todoRemovedCompleted: {
        type: new graphql_1.GraphQLObjectType({
            name: 'deletedIds',
            fields: () => ({
                deletedIds: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) }
            })
        }),
        subscribe: () => publisher_1.default.asyncIterator(common_constant_1.TODO_SUBSCRIPTION_TRIGGERS.remove_completed_todo)
    },
    /**
     * Subscription trigger for removed todo
     */
    todoRemoved: {
        type: todo_typedef_1.GraphQLTodo,
        subscribe: () => publisher_1.default.asyncIterator(common_constant_1.TODO_SUBSCRIPTION_TRIGGERS.remove_todo)
    },
    /**
     * Subscription trigger for renamed todo
     */
    todoRenamed: {
        type: todo_typedef_1.GraphQLTodo,
        subscribe: () => publisher_1.default.asyncIterator(common_constant_1.TODO_SUBSCRIPTION_TRIGGERS.rename_todo)
    }
};
exports.GraphQLTodoSubscription = GraphQLTodoSubscription;
//# sourceMappingURL=todo.subscriptions.js.map