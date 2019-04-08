"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_relay_1 = require("graphql-relay");
const index_1 = require("../repository/user/index");
const user_1 = require("../schemas/user");
const todo_1 = require("../schemas/todo");
const todo_2 = require("../repository/todo");
/**
 * Defination for
 */
const { nodeInterface, nodeField } = graphql_relay_1.nodeDefinitions((globalId) => __awaiter(this, void 0, void 0, function* () {
    const { type, id } = graphql_relay_1.fromGlobalId(globalId);
    // Log to NodeJS console the mapping from globalId/Node ID  
    // to actual object type and id
    console.log("NodeDefinitions (globalId), id:", id);
    console.log("NodeDefinitions (globalId), type:", type);
    if (type === 'Todo') {
        const todoRepo = new todo_2.TodoRepository();
        return todoRepo.getTodo(id);
    }
    if (type === 'User') {
        const userRepo = new index_1.UserRepository();
        return userRepo.findOne(id);
    }
    return null;
}), (obj) => __awaiter(this, void 0, void 0, function* () {
    if (obj instanceof todo_1.ToDo) {
        const types = yield Promise.resolve().then(() => __importStar(require("./todo/todo.typedef")));
        return types.GraphQLTodo;
    }
    if (obj instanceof user_1.User) {
        const types = yield Promise.resolve().then(() => __importStar(require("./user/user.typedef")));
        return types.GraphQLUser;
    }
    return null;
}));
exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;
//# sourceMappingURL=global.defination.js.map