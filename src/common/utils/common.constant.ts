/**
 * Type of User Token
 */
const USER_TOKEN_KIND = {
    session:"SESSION"
}

/**
 * Triggers of User subscriptions 
 */
const USER_SUBSCRIPTION_TRIGGERS = {
    user_created:"USER_CREATED",
    user_updated:"USER_UPDATED",
    user_deleted:"USER_DELETED",
    user_logged_in:"USER_LOGGED_IN"
}

const TODO_SUBSCRIPTION_TRIGGERS = {
    todo_created:"TODO_CREATED",
    change_todo_status:"CHANGE_TODO_STATUS",
    mark_all_todos:"MARK_ALL_TODO",
    remove_completed_todo:"REMOVE_COMPLETED_TODO",
    remove_todo:"REMOVE_TODO",
    rename_todo:"RENAME_TODO"
}
const POST_SUBSCRIPTION_TRIGGERS = {
    post_created:"POST_CREATED",
    remove_post:"REMOVE_POST",
    rename_post:"RENAME_POST"
}


const CURSOR_PREFIX = 'arrayconnection:';

export {
    USER_TOKEN_KIND,
    USER_SUBSCRIPTION_TRIGGERS,
    TODO_SUBSCRIPTION_TRIGGERS,
    CURSOR_PREFIX,
    POST_SUBSCRIPTION_TRIGGERS
}