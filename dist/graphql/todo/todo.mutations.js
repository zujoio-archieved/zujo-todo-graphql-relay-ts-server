"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_relay_1 = require("graphql-relay");
const graphql_1 = require("graphql");
const user_1 = require("../user");
const user_2 = require("../../repository/user");
const todo_typedef_1 = require("./todo.typedef");
const todo_typedef_2 = require("./todo.typedef");
const todo_1 = require("../../repository/todo");
const common_graphql_1 = require("../../common/utils/common.graphql");
const publisher_1 = __importDefault(require("../publisher"));
const common_constant_1 = require("../../common/utils/common.constant");
const GraphQlAddTodoMutation = graphql_relay_1.mutationWithClientMutationId({
    name: 'addTodo',
    inputFields: {
        text: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    outputFields: {
        viewer: {
            type: user_1.GraphQLUser,
            resolve: (obj, args, context, info) => __awaiter(this, void 0, void 0, function* () {
                const userRepo = new user_2.UserRepository();
                return yield userRepo.me(context.user_id);
            })
        },
        todoEdge: {
            type: todo_typedef_2.GraphQLTodoEdge,
            resolve: (node) => __awaiter(this, void 0, void 0, function* () {
                return node;
            })
        }
    },
    mutateAndGetPayload: ({ text }) => __awaiter(this, void 0, void 0, function* () {
        // Create todo
        const todoRepo = new todo_1.TodoRepository();
        const createdTodo = yield todoRepo.addTodo(text);
        // Generate cursor
        const cursor = common_graphql_1.objectIdToCursor(createdTodo["_id"].toHexString());
        const todoEdge = {
            cursor: cursor,
            node: createdTodo
        };
        const nodeEdge = {
            todoEdge: todoEdge,
            clientSubscriptionId: new Buffer(common_constant_1.TODO_SUBSCRIPTION_TRIGGERS.todo_created).toString('base64')
        };
        // Publish created todo
        publisher_1.default.publish(common_constant_1.TODO_SUBSCRIPTION_TRIGGERS.todo_created, {
            todoAdded: nodeEdge
        });
        return todoEdge;
    })
});
const GraphQLChangeTodoStatusMutation = graphql_relay_1.mutationWithClientMutationId({
    name: 'changeTodoStatus',
    inputFields: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        complete: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean) },
    },
    outputFields: {
        viewer: {
            type: user_1.GraphQLUser,
            resolve: (obj, args, context, info) => __awaiter(this, void 0, void 0, function* () {
                const userRepo = new user_2.UserRepository();
                return yield userRepo.me(context.user_id);
            })
        },
        todo: {
            type: todo_typedef_1.GraphQLTodo,
            resolve: ({ todo }) => __awaiter(this, void 0, void 0, function* () {
                return todo;
            }),
        },
    },
    mutateAndGetPayload: ({ id, complete }) => __awaiter(this, void 0, void 0, function* () {
        // Update status
        const { id: todoId } = graphql_relay_1.fromGlobalId(id);
        const todoRepo = new todo_1.TodoRepository();
        yield todoRepo.changeTodoStatus(todoId, complete);
        const todo = yield todoRepo.getTodo(todoId);
        // publish changed status
        publisher_1.default.publish(common_constant_1.TODO_SUBSCRIPTION_TRIGGERS.change_todo_status, {
            todoChangedStatus: todo
        });
        return { todo };
    }),
});
const GraphQLMarkAllTodosMutation = graphql_relay_1.mutationWithClientMutationId({
    name: 'markAllTodos',
    inputFields: {
        complete: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean) },
    },
    outputFields: {
        viewer: {
            type: user_1.GraphQLUser,
            resolve: (obj, args, context, info) => __awaiter(this, void 0, void 0, function* () {
                const userRepo = new user_2.UserRepository();
                return yield userRepo.me(context.user_id);
            }),
        },
        changedTodos: {
            type: new graphql_1.GraphQLList(todo_typedef_1.GraphQLTodo),
            resolve: ({ changedTodoIds }) => __awaiter(this, void 0, void 0, function* () {
                const todoRepo = new todo_1.TodoRepository();
                changedTodoIds.map(yield todoRepo.getTodo);
            }),
        },
    },
    mutateAndGetPayload: ({ complete }) => {
        const todoRepo = new todo_1.TodoRepository();
        const changedTodoIds = todoRepo.markAllTodos(complete);
        return { changedTodoIds };
    },
});
const GraphQLRemoveCompletedTodosMutation = graphql_relay_1.mutationWithClientMutationId({
    name: 'removeCompletedTodos',
    outputFields: {
        viewer: {
            type: user_1.GraphQLUser,
            resolve: (obj, args, context, info) => __awaiter(this, void 0, void 0, function* () {
                const userRepo = new user_2.UserRepository();
                return yield userRepo.me(context.user_id);
            }),
        },
        deletedIds: {
            type: new graphql_1.GraphQLList(graphql_1.GraphQLString),
            resolve: ({ deletedIds }) => deletedIds,
        },
    },
    mutateAndGetPayload: () => __awaiter(this, void 0, void 0, function* () {
        // Remove todo(s)
        const todoRepo = new todo_1.TodoRepository();
        const deletedTodoIds = yield todoRepo.removeCompletedTodos();
        const deletedIds = deletedTodoIds.map(graphql_relay_1.toGlobalId.bind(null, 'Todo'));
        // publish changes
        publisher_1.default.publish(common_constant_1.TODO_SUBSCRIPTION_TRIGGERS.remove_completed_todo, {
            todoRemovedCompleted: { deletedIds: deletedIds }
        });
        return { deletedIds };
    }),
});
const GraphQLRemoveTodoMutation = graphql_relay_1.mutationWithClientMutationId({
    name: 'removeTodo',
    inputFields: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
    },
    outputFields: {
        viewer: {
            type: user_1.GraphQLUser,
            resolve: (obj, args, context, info) => __awaiter(this, void 0, void 0, function* () {
                const userId = context.user_id;
                const userRepo = new user_2.UserRepository();
                return yield userRepo.me(userId);
            }),
        },
        deletedId: {
            type: graphql_1.GraphQLID,
            resolve: ({ id }) => id,
        },
    },
    mutateAndGetPayload: ({ id }) => __awaiter(this, void 0, void 0, function* () {
        const { id: todoId } = graphql_relay_1.fromGlobalId(id);
        const todoRepo = new todo_1.TodoRepository();
        const todo = yield todoRepo.getTodo(todoId);
        yield todoRepo.removeTodo(todoId);
        // publish changes
        publisher_1.default.publish(common_constant_1.TODO_SUBSCRIPTION_TRIGGERS.remove_todo, {
            todoRemoved: todo
        });
        return { id };
    }),
});
const GraphQLRenameTodoMutation = graphql_relay_1.mutationWithClientMutationId({
    name: 'renameTodo',
    inputFields: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        text: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    outputFields: {
        todo: {
            type: todo_typedef_1.GraphQLTodo,
            resolve: ({ todo }) => __awaiter(this, void 0, void 0, function* () {
                return todo;
            }),
        },
    },
    mutateAndGetPayload: ({ id, text }) => __awaiter(this, void 0, void 0, function* () {
        const { id: todoId } = graphql_relay_1.fromGlobalId(id);
        const todoRepo = new todo_1.TodoRepository();
        yield todoRepo.renameTodo(todoId, text);
        const todo = yield todoRepo.getTodo(todoId);
        // publish changes
        publisher_1.default.publish(common_constant_1.TODO_SUBSCRIPTION_TRIGGERS.rename_todo, {
            todoRenamed: todo
        });
        return { todo };
    }),
});
const GraphQLTodoMutations = {
    addTodo: GraphQlAddTodoMutation,
    changeTodoStatus: GraphQLChangeTodoStatusMutation,
    markAllTodos: GraphQLMarkAllTodosMutation,
    removeCompletedTodos: GraphQLRemoveCompletedTodosMutation,
    removeTodo: GraphQLRemoveTodoMutation,
    renameTodo: GraphQLRenameTodoMutation
};
exports.GraphQLTodoMutations = GraphQLTodoMutations;
//# sourceMappingURL=todo.mutations.js.map