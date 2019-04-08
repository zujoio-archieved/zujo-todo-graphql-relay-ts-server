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
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
const lodash_1 = require("lodash");
const index_1 = require("../../schemas/user/index");
/**
 * Generate token from specified payload
 * @param payload payload for generating token
 */
exports.generateToken = (payload) => {
    return `JWT ${jwt.sign({ payload }, process.env.SESSION_SECRET, { expiresIn: 60 * 60 })}`;
};
exports.getUserId = (context, withToken = false) => __awaiter(this, void 0, void 0, function* () {
    var authorization = lodash_1.has(context.headers, "authorization")
        ? context.headers.authorization
        : undefined;
    if (authorization) {
        var token = authorization.replace("JWT ", "");
        var { userId } = jwt.verify(token, process.env.SESSION_SECRET);
        return withToken
            ? { userId: yield exports.findToken(userId, authorization), token }
            : exports.findToken(userId, authorization);
    }
    else {
        throw new Error("Authentication required!");
    }
});
exports.findToken = (userId, tokenAuth) => __awaiter(this, void 0, void 0, function* () {
    const user = yield index_1.User.findById(userId).then(user => user);
    const token = user.tokens.filter(token => token.accessToken === tokenAuth);
    if (token[0]) {
        return userId;
    }
    else {
        throw new Error("Token not found!");
    }
});
exports.encryptPassword = (password) => bcrypt.hashSync(password, 10);
exports.comparePassword = (plain, hashed) => bcrypt.compareSync(plain, hashed);
//# sourceMappingURL=user.utils.js.map