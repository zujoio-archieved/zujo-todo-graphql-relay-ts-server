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
const user_1 = require("./repository/user");
const todo_1 = require("./repository/todo");
const common_jwt_1 = require("./common/utils/common.jwt");
const user_loaders_1 = require("./loaders/user.loaders");
class Context {
    constructor(request, response) {
        this._userRepository = new user_1.UserRepository();
        this._todoRepository = new todo_1.TodoRepository();
        this._userLoader = new user_loaders_1.UserLoader();
        this._request = request;
        this._request = request;
        this._response = response;
    }
    get request() {
        return this._request;
    }
    get response() {
        return this._response;
    }
    get userRepository() {
        return this._userRepository;
    }
    get todoRepository() {
        return this._todoRepository;
    }
    get userLoader() {
        return this._userLoader;
    }
    userId() {
        return __awaiter(this, void 0, void 0, function* () {
            return common_jwt_1.JWT.extractUserIdfromReq(this._request);
        });
    }
    getFormData() {
        return __awaiter(this, void 0, void 0, function* () {
            let formData = this._request.body;
            return formData;
        });
    }
}
exports.Context = Context;
//# sourceMappingURL=context.js.map