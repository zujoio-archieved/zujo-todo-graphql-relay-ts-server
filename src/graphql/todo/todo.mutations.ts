import {
    mutationWithClientMutationId,
    fromGlobalId,
    toGlobalId,
    cursorForObjectInConnection,
    offsetToCursor
} from 'graphql-relay'
import { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } from 'graphql';
import lodash from 'lodash'

import { GraphQLUser } from '../user';
import { UserRepository } from '../../repository/user';
import { GraphQLTodo } from './todo.typedef';
import { GraphQLTodoEdge } from './todo.typedef';
import { TodoRepository } from '../../repository/todo';

import pubSub from '../publisher'
import { TODO_SUBSCRIPTION_TRIGGERS } from '../../common/utils/common.constant'

const GraphQlAddTodoMutation = mutationWithClientMutationId({
    name: 'addTodo',
    inputFields: {
        text: { type: new GraphQLNonNull(GraphQLString) },
    },
    outputFields: {
        viewer:{
            type: GraphQLUser,
            resolve: async () => {
                const userRepo = new UserRepository()
                return await userRepo.me()
            }
        },
        todoEdge: {
            type: GraphQLTodoEdge,
            resolve: async (node) => {
                return node;
            }
        }
    },
    mutateAndGetPayload: async ({ text }) => {
        // Create todo
        const todoRepo = new TodoRepository()
        const createdTodo = await todoRepo.addTodo(text);
        const todos = await todoRepo.getTodos('any')

        // Find matching index
        const index = lodash.findIndex(todos, function(todo) { 
          return todo._id.toHexString() == createdTodo._id.toHexString(); 
        });

        // Generate cursor
        const cursor = offsetToCursor(index)
        const todoEdge = {
          cursor: cursor,
          node: todos[index]
        }
        const nodeEdge = {
          todoEdge: todoEdge,
          clientSubscriptionId: new Buffer(TODO_SUBSCRIPTION_TRIGGERS.todo_created).toString('base64')
        };

        // Publish created todo
        pubSub.publish(TODO_SUBSCRIPTION_TRIGGERS.todo_created,{
          todoAdded: nodeEdge
        });

        return todoEdge;
    }
})

const GraphQLChangeTodoStatusMutation = mutationWithClientMutationId({
    name: 'changeTodoStatus',
    inputFields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      complete: { type: new GraphQLNonNull(GraphQLBoolean) },
    },
    outputFields: {
      viewer: {
        type: GraphQLUser,
        resolve: async () => {
            const userRepo = new UserRepository()
            return await userRepo.me()
        }
      },
      todo: {
        type: GraphQLTodo,
        resolve: async ({ todo }) => {
            return todo
        },
      },
    },
    mutateAndGetPayload: async ({ id, complete }) => {
      // Update status
      const { id: todoId } = fromGlobalId(id);
      const todoRepo = new TodoRepository()
      await todoRepo.changeTodoStatus(todoId, complete);
      const todo = await todoRepo.getTodo(todoId)

      // publish changed status
      pubSub.publish(TODO_SUBSCRIPTION_TRIGGERS.change_todo_status,{
        todoChangedStatus: todo
      });


      return { todo };
    },
  });

const GraphQLMarkAllTodosMutation = mutationWithClientMutationId({
    name: 'markAllTodos',
    inputFields: {
      complete: { type: new GraphQLNonNull(GraphQLBoolean) },
    },
    outputFields: {
      viewer: {
        type: GraphQLUser,
        resolve: async () => {
            const userRepo = new UserRepository()
            return await userRepo.me()
        },
      },
      changedTodos: {
        type: new GraphQLList(GraphQLTodo),
        resolve: async ({ changedTodoIds }) =>{ 
            const todoRepo = new TodoRepository()
            changedTodoIds.map(await todoRepo.getTodo) 
        },
      },
    },
    mutateAndGetPayload: ({ complete }) => {
        const todoRepo = new TodoRepository()
        const changedTodoIds = todoRepo.markAllTodos(complete);
        return { changedTodoIds };
    },
});

const GraphQLRemoveCompletedTodosMutation = mutationWithClientMutationId({
    name: 'removeCompletedTodos',
    outputFields: {
      viewer: {
        type: GraphQLUser,
        resolve: async () => {
            const userRepo = new UserRepository()
            return await userRepo.me()
        },
      },
      deletedIds: {
        type: new GraphQLList(GraphQLString),
        resolve: ({ deletedIds }) => deletedIds,
      },
    },
    mutateAndGetPayload: async () => {
        // Remove todo(s)
        const todoRepo = new TodoRepository()
        const deletedTodoIds = await todoRepo.removeCompletedTodos();
        const deletedIds = deletedTodoIds.map(toGlobalId.bind(null, 'Todo'));

        // publish changes
        pubSub.publish(TODO_SUBSCRIPTION_TRIGGERS.remove_completed_todo,{
          todoRemovedCompleted: { deletedIds: deletedIds }
        });

        return { deletedIds };
    },
});

const GraphQLRemoveTodoMutation = mutationWithClientMutationId({
    name: 'removeTodo',
    inputFields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    outputFields: {
      viewer: {
        type: GraphQLUser,
        resolve: async () => {
            const userRepo = new UserRepository()
            return await userRepo.me()
        },
      },
      deletedId: {
        type: GraphQLID,
        resolve: ({ id }) => id,
      },
    },
    mutateAndGetPayload: async ({ id }) => {
      const { id: todoId } = fromGlobalId(id);
      const todoRepo = new TodoRepository()
      const todo = await todoRepo.getTodo(todoId)
      await todoRepo.removeTodo(todoId);

      // publish changes
      pubSub.publish(TODO_SUBSCRIPTION_TRIGGERS.remove_todo,{
        todoRemoved: todo
      });

      return { id };
    },
});

const GraphQLRenameTodoMutation = mutationWithClientMutationId({
    name: 'renameTodo',
    inputFields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      text: { type: new GraphQLNonNull(GraphQLString) },
    },
    outputFields: {
      todo: {
        type: GraphQLTodo,
        resolve: async ({ todo }) =>{
            return todo;
        },
      },
    },
    mutateAndGetPayload: async ({ id, text }) => {
      const { id: todoId } = fromGlobalId(id);
      const todoRepo = new TodoRepository();
      await todoRepo.renameTodo(todoId, text);
      const todo = await todoRepo.getTodo(todoId)

      // publish changes
      pubSub.publish(TODO_SUBSCRIPTION_TRIGGERS.rename_todo,{
        todoRenamed: todo
      });

      return { todo };
    },
});

const GraphQLTodoMutations = {
    addTodo: GraphQlAddTodoMutation,
    changeTodoStatus: GraphQLChangeTodoStatusMutation,
    markAllTodos: GraphQLMarkAllTodosMutation,
    removeCompletedTodos: GraphQLRemoveCompletedTodosMutation,
    removeTodo: GraphQLRemoveTodoMutation,
    renameTodo: GraphQLRenameTodoMutation
}

export {
    GraphQLTodoMutations
}