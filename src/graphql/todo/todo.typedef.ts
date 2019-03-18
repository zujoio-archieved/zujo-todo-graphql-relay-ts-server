import { GraphQLObjectType, GraphQLBoolean, GraphQLString } from "graphql";
import { 
    globalIdField,
    connectionDefinitions
} from "graphql-relay"

import { nodeField, nodeInterface } from "../global.defination"

/**
 * Graphql ToDo Defination
 */
const GraphQLTodo = new GraphQLObjectType({
    name:'Todo',
    fields: () => ({
        id: globalIdField('Todo'),
        complete: { type: GraphQLBoolean },
        text: { type: GraphQLString }
    }),
    interfaces: [nodeInterface]
})

const {
    connectionType: TodosConnection,
    edgeType: GraphQLTodoEdge,
} = connectionDefinitions({ nodeType: GraphQLTodo }); 

export {
    GraphQLTodo,
    TodosConnection,
    GraphQLTodoEdge
}