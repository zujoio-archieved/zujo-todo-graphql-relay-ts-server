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
const post_typedef_1 = require("./post.typedef");
const post_1 = require("../../repository/post");
const common_graphql_1 = require("../../common/utils/common.graphql");
const publisher_1 = __importDefault(require("../publisher"));
const common_constant_1 = require("../../common/utils/common.constant");
// import{storeUpload} from '../../repository/todo/todo.repository'
const GraphQlAddPostMutation = graphql_relay_1.mutationWithClientMutationId({
    name: 'addPost',
    inputFields: {
        title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        description: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    outputFields: {
        viewer: {
            type: user_1.GraphQLUser,
            resolve: (obj, args, context, info) => __awaiter(this, void 0, void 0, function* () {
                const userRepo = new user_2.UserRepository();
                const userId = yield context.userId();
                return yield userRepo.me(userId);
            })
        },
        postEdge: {
            type: post_typedef_1.GraphQLPostEdge,
            resolve: (node) => __awaiter(this, void 0, void 0, function* () {
                return node;
            })
        }
    },
    mutateAndGetPayload: ({ title, description }, context) => __awaiter(this, void 0, void 0, function* () {
        const postRepo = new post_1.PostRepository();
        const formData = yield context.getFormData();
        const createdPost = yield postRepo.addPost(title, description);
        // Generate cursor
        const cursor = common_graphql_1.objectIdToCursor(createdPost["_id"].toHexString());
        const postEdge = {
            cursor: cursor,
            node: createdPost
        };
        const nodeEdge = {
            postEdge: postEdge,
            clientSubscriptionId: new Buffer(common_constant_1.POST_SUBSCRIPTION_TRIGGERS.post_created).toString('base64')
        };
        // Publish created todo
        publisher_1.default.publish(common_constant_1.POST_SUBSCRIPTION_TRIGGERS.post_created, {
            postAdded: nodeEdge
        });
        return postEdge;
    })
});
const GraphQLRemovePostMutation = graphql_relay_1.mutationWithClientMutationId({
    name: 'removePost',
    inputFields: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
    },
    outputFields: {
        viewer: {
            type: user_1.GraphQLUser,
            resolve: (obj, args, context, info) => __awaiter(this, void 0, void 0, function* () {
                const userRepo = new user_2.UserRepository();
                const userId = yield context.userId();
                return yield userRepo.me(userId);
            }),
        },
        deletedId: {
            type: graphql_1.GraphQLID,
            resolve: ({ id }) => id,
        },
    },
    mutateAndGetPayload: ({ id }) => __awaiter(this, void 0, void 0, function* () {
        const { id: postId } = graphql_relay_1.fromGlobalId(id);
        const postRepo = new post_1.PostRepository();
        const post = yield postRepo.getPost(postId);
        yield postRepo.removePost(postId);
        // publish changes
        publisher_1.default.publish(common_constant_1.POST_SUBSCRIPTION_TRIGGERS.remove_post, {
            todoRemoved: post
        });
        return { id };
    }),
});
const GraphQLPostMutations = {
    addPost: GraphQlAddPostMutation,
    removePost: GraphQLRemovePostMutation
};
exports.GraphQLPostMutations = GraphQLPostMutations;
//# sourceMappingURL=post.mutations.js.map