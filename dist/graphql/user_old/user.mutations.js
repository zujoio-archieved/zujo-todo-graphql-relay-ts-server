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
const graphql_1 = require("graphql");
const user_typedef_1 = require("./user.typedef");
const common_constant_1 = require("../../common/utils/common.constant");
const user_1 = require("../../repository/user");
const publisher_1 = __importDefault(require("../publisher"));
const UserMutations = {
    login: {
        type: user_typedef_1.AuthPayload,
        args: {
            email: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            password: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const userRepo = new user_1.UserRepository();
                const { accessToken, user } = yield userRepo.login(args.email, args.password);
                // Publish User
                publisher_1.default.publish(common_constant_1.USER_SUBSCRIPTION_TRIGGERS.user_logged_in, {
                    user: user
                });
                return {
                    token: accessToken,
                    user: user
                };
            });
        }
    },
    /**
     * create User
     * @param user: user payload
     */
    register: {
        type: user_typedef_1.AuthPayload,
        args: {
            user: {
                type: user_typedef_1.CreateUserInput
            }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                // Create and validate user
                try {
                    const userRepo = new user_1.UserRepository();
                    const { accessToken, user } = yield userRepo.create(args.user);
                    // Publish User
                    publisher_1.default.publish(common_constant_1.USER_SUBSCRIPTION_TRIGGERS.user_created, {
                        user: user
                    });
                    // Return payload
                    return {
                        token: accessToken,
                        user: user
                    };
                }
                catch (e) {
                    throw e;
                }
            });
        }
    },
    /**
     * Update user
     * @param user: user payload
     */
    updateUser: {
        type: new graphql_1.GraphQLObjectType({
            name: "UpdateUserReturnType",
            description: "This represent a update user return type",
            fields: () => ({
                user: {
                    type: user_typedef_1.UserType
                },
            })
        }),
        args: {
            user: {
                type: user_typedef_1.UpdateUserInput
            }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const userRepo = new user_1.UserRepository();
                const user = yield userRepo.update(args.user);
                // Publish User
                publisher_1.default.publish(common_constant_1.USER_SUBSCRIPTION_TRIGGERS.user_updated, {
                    user: user
                });
                return {
                    user
                };
            });
        }
    },
    /**
     * Delete User
     * @param user: payload for delete user
     */
    deleteUser: {
        type: new graphql_1.GraphQLObjectType({
            name: "DeleteUserReturnType",
            description: "This represent a delete user return type",
            fields: () => ({
                user: {
                    type: user_typedef_1.UserType
                }
            })
        }),
        args: {
            user: {
                type: user_typedef_1.DeleteUserInput
            }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const userRepo = new user_1.UserRepository();
                const user = yield userRepo.delete(args.user);
                // Publish User
                publisher_1.default.publish(common_constant_1.USER_SUBSCRIPTION_TRIGGERS.user_deleted, {
                    user: user
                });
                return {
                    user
                };
            });
        }
    }
};
exports.UserMutations = UserMutations;
//# sourceMappingURL=user.mutations.js.map