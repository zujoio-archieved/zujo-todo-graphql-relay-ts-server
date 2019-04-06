import { GraphQLObjectType, GraphQLBoolean, GraphQLString,GraphQLScalarType } from "graphql";
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
        text: { type: GraphQLString },
        attachmentpath:{type:GraphQLString}
    }),
    interfaces: [nodeInterface]
})
const UploadType = new GraphQLScalarType({
    name: 'UploadImage',
    description: 'The `Upload` scalar type represents a file upload.',
    parseValue: value => value,
    parseLiteral() {
      throw new Error('‘Upload’ scalar literal unsupported.')
    },
    serialize() {
      throw new Error('‘Upload’ scalar serialization unsupported.')
    }
  })


const {
    connectionType: TodosConnection,
    edgeType: GraphQLTodoEdge,
} = connectionDefinitions({ nodeType: GraphQLTodo }); 

export {
    GraphQLTodo,
    TodosConnection,
    GraphQLTodoEdge,
    UploadType
}