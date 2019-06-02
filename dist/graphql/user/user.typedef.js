"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_relay_1 = require("graphql-relay");
const global_defination_1 = require("../global.defination");
const todo_typedef_1 = require("../todo/todo.typedef");
const index_1 = require("../../repository/todo/index");
const common_graphql_1 = require("../../common/utils/common.graphql");
const index_2 = require("../../schemas/todo/index");
const index_3 = require("../../schemas/post/index");
const post_typedef_1 = require("../post/post.typedef");
const index_4 = require("../../repository/post/index");
const GraphQLUser = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: graphql_relay_1.globalIdField('User'),
        email: {
            type: graphql_1.GraphQLString
        },
        todos: {
            type: todo_typedef_1.TodosConnection,
            args: Object.assign({ status: {
                    type: graphql_1.GraphQLString,
                    defaultValue: 'any'
                } }, graphql_relay_1.connectionArgs),
            resolve: (obj, _a) => __awaiter(this, void 0, void 0, function* () {
                var { status } = _a, args = __rest(_a, ["status"]);
                const todoRepo = new index_1.TodoRepository();
                const todos = yield todoRepo.getTodos(status, args);
                return yield common_graphql_1.mongooseConnectionFromArray(index_2.ToDo, todos, args);
            })
        },
        posts: {
            type: post_typedef_1.PostsConnection,
            args: Object.assign({}, graphql_relay_1.connectionArgs),
            resolve: (obj, _b) => __awaiter(this, void 0, void 0, function* () {
                var args = __rest(_b, []);
                const postRepo = new index_4.PostRepository();
                const posts = yield postRepo.getPosts(args);
                return yield common_graphql_1.mongooseConnectionFromArray(index_3.Post, posts, args);
            })
        },
        numPosts: {
            type: graphql_1.GraphQLInt,
            resolve: () => __awaiter(this, void 0, void 0, function* () {
                const postRepo = new index_4.PostRepository();
                return yield postRepo.getNumPosts();
            }),
        },
        numTodos: {
            type: graphql_1.GraphQLInt,
            resolve: () => __awaiter(this, void 0, void 0, function* () {
                const todoRepo = new index_1.TodoRepository();
                return yield todoRepo.getNumTodos();
            }),
        },
        numCompletedTodos: {
            type: graphql_1.GraphQLInt,
            resolve: () => __awaiter(this, void 0, void 0, function* () {
                const todoRepo = new index_1.TodoRepository();
                return yield todoRepo.getNumTodos();
            }),
        },
    }),
    interfaces: [global_defination_1.nodeInterface]
});
exports.GraphQLUser = GraphQLUser;
//# sourceMappingURL=user.typedef.js.map