"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_typedef_1 = require("./post.typedef");
const publisher_1 = __importDefault(require("../publisher"));
const common_constant_1 = require("../../common/utils/common.constant");
const graphql_1 = require("graphql");
const GraphQLPostSubscription = {
    /**
     * Subscription trigger for created post
     */
    postAdded: {
        type: new graphql_1.GraphQLObjectType({
            name: 'postAdded',
            fields: () => ({
                postEdge: { type: post_typedef_1.GraphQLPostEdge },
                clientSubscriptionId: { type: graphql_1.GraphQLString }
            })
        }),
        subscribe: () => publisher_1.default.asyncIterator(common_constant_1.POST_SUBSCRIPTION_TRIGGERS.post_created)
    },
    postRemoved: {
        type: post_typedef_1.GraphQLPost,
        subscribe: () => publisher_1.default.asyncIterator(common_constant_1.POST_SUBSCRIPTION_TRIGGERS.remove_post)
    },
};
exports.GraphQLPostSubscription = GraphQLPostSubscription;
//# sourceMappingURL=post.subscriptions.js.map