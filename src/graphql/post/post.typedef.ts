import { GraphQLObjectType, GraphQLBoolean, GraphQLString,GraphQLScalarType } from "graphql";
import { 
    globalIdField,
    connectionDefinitions
} from "graphql-relay"

import { nodeField, nodeInterface } from "../global.defination"

/**
 * Graphql Post Defination
 */
const GraphQLPost = new GraphQLObjectType({
    name:'Post',
    fields: () => ({
        id: globalIdField('Post'),
        title: { type: GraphQLString },
        description:{type:GraphQLString}
    }),
    interfaces: [nodeInterface]
})

const {
    connectionType: PostsConnection,
    edgeType: GraphQLPostEdge,
} = connectionDefinitions({ nodeType: GraphQLPost }); 

export {
    GraphQLPost,
    PostsConnection,
    GraphQLPostEdge
}