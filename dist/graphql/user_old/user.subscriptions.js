"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_typedef_1 = require("./user.typedef");
const publisher_1 = __importDefault(require("../publisher"));
const common_constant_1 = require("../../common/utils/common.constant");
const UserSubscription = {
    /**
     * Subscriptions of registered user
     */
    userRegistered: {
        type: user_typedef_1.UserType,
        subscribe: () => publisher_1.default.asyncIterator(common_constant_1.USER_SUBSCRIPTION_TRIGGERS.user_created)
    },
    /**
     * Subscriptions of updated user
     */
    userUpdated: {
        type: user_typedef_1.UserType,
        subscribe: () => publisher_1.default.asyncIterator(common_constant_1.USER_SUBSCRIPTION_TRIGGERS.user_updated)
    },
    /**
     * Subscriptions of deleted user
     */
    userDeleted: {
        type: user_typedef_1.UserType,
        subscribe: () => publisher_1.default.asyncIterator(common_constant_1.USER_SUBSCRIPTION_TRIGGERS.user_deleted)
    },
    /**
     * Subscriptions of logged In user
     */
    userLoggedIn: {
        type: user_typedef_1.UserType,
        subscribe: () => publisher_1.default.asyncIterator(common_constant_1.USER_SUBSCRIPTION_TRIGGERS.user_logged_in)
    },
};
exports.UserSubscription = UserSubscription;
//# sourceMappingURL=user.subscriptions.js.map