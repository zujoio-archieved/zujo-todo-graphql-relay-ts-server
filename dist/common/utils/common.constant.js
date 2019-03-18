"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Type of User Token
 */
const USER_TOKEN_KIND = {
    session: "SESSION"
};
exports.USER_TOKEN_KIND = USER_TOKEN_KIND;
/**
 * Triggers of User subscriptions
 */
const USER_SUBSCRIPTION_TRIGGERS = {
    user_created: "USER_CREATED",
    user_updated: "USER_UPDATED",
    user_deleted: "USER_DELETED",
    user_logged_in: "USER_LOGGED_IN"
};
exports.USER_SUBSCRIPTION_TRIGGERS = USER_SUBSCRIPTION_TRIGGERS;
const TODO_SUBSCRIPTION_TRIGGERS = {
    todo_created: "TODO_CREATED",
    change_todo_status: "CHANGE_TODO_STATUS",
    mark_all_todos: "MARK_ALL_TODO",
    remove_completed_todo: "REMOVE_COMPLETED_TODO",
    remove_todo: "REMOVE_TODO",
    rename_todo: "RENAME_TODO"
};
exports.TODO_SUBSCRIPTION_TRIGGERS = TODO_SUBSCRIPTION_TRIGGERS;
//# sourceMappingURL=common.constant.js.map