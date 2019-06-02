"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_relay_1 = require("graphql-relay");
const global_defination_1 = require("../global.defination");
/**
 * Graphql Post Defination
 */
const GraphQLPost = new graphql_1.GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: graphql_relay_1.globalIdField('Post'),
        title: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString }
    }),
    interfaces: [global_defination_1.nodeInterface]
});
exports.GraphQLPost = GraphQLPost;
const { connectionType: PostsConnection, edgeType: GraphQLPostEdge, } = graphql_relay_1.connectionDefinitions({ nodeType: GraphQLPost });
exports.PostsConnection = PostsConnection;
exports.GraphQLPostEdge = GraphQLPostEdge;
//# sourceMappingURL=post.typedef.js.map