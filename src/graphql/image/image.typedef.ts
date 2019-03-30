import { GraphQLObjectType, GraphQLBoolean, GraphQLString } from "graphql";
import { 
    globalIdField,
    connectionDefinitions
} from "graphql-relay"

import { nodeField, nodeInterface } from "../global.defination"

const GraphQLImage = new GraphQLObjectType({
    name:'Image',
    fields: () => ({
        id: globalIdField('Image'),
        type: { type: GraphQLString },
        path: { type: GraphQLString }
    }),
    interfaces: [nodeInterface]
})

const {
    connectionType: TodosConnection,
    edgeType: GraphQLImageEdge,
} = connectionDefinitions({ nodeType: GraphQLImage }); 

export {
    GraphQLImage,
    TodosConnection,
    GraphQLImageEdge
}