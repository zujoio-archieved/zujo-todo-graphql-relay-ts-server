"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Exception email already exists
 */
class EmailAlreadyExists extends Error {
    constructor() {
        super(...arguments);
        this.code = 1000;
        this.message = this.message ||
            'User already registered using this email address!';
    }
}
exports.EmailAlreadyExists = EmailAlreadyExists;
/**
 * Exception invalid token
 */
class InvalidToken extends Error {
    constructor() {
        super(...arguments);
        this.code = 1001;
        this.message = this.message ||
            'Invalid token!';
    }
}
exports.InvalidToken = InvalidToken;
//# sourceMappingURL=common.exceptions.js.map