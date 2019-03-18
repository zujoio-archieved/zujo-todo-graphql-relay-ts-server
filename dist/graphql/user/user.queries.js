"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_typedef_1 = require("./user.typedef");
const user_1 = require("../../repository/user");
const global_defination_1 = require("../global.defination");
const GraphQLUserQueries = {
    viewer: {
        type: user_typedef_1.GraphQLUser,
        resolve: () => __awaiter(this, void 0, void 0, function* () {
            const userRepo = new user_1.UserRepository();
            return yield userRepo.me();
        })
    },
    node: global_defination_1.nodeField
};
exports.GraphQLUserQueries = GraphQLUserQueries;
//# sourceMappingURL=user.queries.js.map