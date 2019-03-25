"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailAlreadyExists extends Error {
    constructor() {
        super(...arguments);
        this.code = 1000;
        this.message = this.message ||
            'User already registered using this email address!';
    }
}
exports.EmailAlreadyExists = EmailAlreadyExists;
//# sourceMappingURL=common.exceptions.js.map