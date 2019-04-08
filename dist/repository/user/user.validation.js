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
const index_1 = require("../../schemas/user/index");
class UserValidation {
    /**
     * Validate email address of user already exists or not
     * @param email Email address of user
     * @returns True | False
     */
    static emailAlreadyExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {
                email: email
            };
            const user = yield index_1.User.findOne(where);
            if (user)
                return true;
            else
                return false;
        });
    }
    /**
     * Validate email address of user already exists or not except specified Id
     * @param email Email address of user
     * @returns True | False
     */
    static emailAlreadyExistsExceptId(id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {
                _id: { "$ne": id },
                email: email
            };
            const user = yield index_1.User.findOne(where);
            if (user)
                return true;
            else
                return false;
        });
    }
}
exports.UserValidation = UserValidation;
//# sourceMappingURL=user.validation.js.map