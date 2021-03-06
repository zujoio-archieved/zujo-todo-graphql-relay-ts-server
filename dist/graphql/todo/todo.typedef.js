"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_relay_1 = require("graphql-relay");
const global_defination_1 = require("../global.defination");
/**
 * Graphql ToDo Defination
 */
const GraphQLTodo = new graphql_1.GraphQLObjectType({
    name: 'Todo',
    fields: () => ({
        id: graphql_relay_1.globalIdField('Todo'),
        complete: { type: graphql_1.GraphQLBoolean },
        text: { type: graphql_1.GraphQLString },
        attachmentpath: { type: graphql_1.GraphQLString }
    }),
    interfaces: [global_defination_1.nodeInterface]
});
exports.GraphQLTodo = GraphQLTodo;
const UploadType = new graphql_1.GraphQLScalarType({
    name: 'UploadImage',
    description: 'The `Upload` scalar type represents a file upload.',
    parseValue: value => value,
    parseLiteral() {
        throw new Error('‘Upload’ scalar literal unsupported.');
    },
    serialize() {
        throw new Error('‘Upload’ scalar serialization unsupported.');
    }
});
exports.UploadType = UploadType;
const { connectionType: TodosConnection, edgeType: GraphQLTodoEdge, } = graphql_relay_1.connectionDefinitions({ nodeType: GraphQLTodo });
exports.TodosConnection = TodosConnection;
exports.GraphQLTodoEdge = GraphQLTodoEdge;
//# sourceMappingURL=todo.typedef.js.map