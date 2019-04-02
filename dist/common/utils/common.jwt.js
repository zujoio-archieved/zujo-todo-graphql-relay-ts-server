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
const common_exceptions_1 = require("./common.exceptions");
class JWT {
    /**
     * Generate token
     * @param payload payload for generating token
     */
    static generateToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return `JWT ${jwt.sign({ payload }, process.env.SESSION_SECRET, { expiresIn: 60 * 60 * 60 })}`;
        });
    }
    /**
     * extract token from Authorization header
     * @param token JWT token
     */
    static extractToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return token.split(' ').pop();
        });
    }
    /**
     * Verify JWT token
     * @param token jwt token
     */
    static verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return jwt.verify(token, process.env.SESSION_SECRET);
            }
            catch (error) {
                throw new common_exceptions_1.InvalidToken();
            }
        });
    }
    /**
     * Extract user id from Express req using token verification
     * @param req Express request
     */
    static extractUserIdfromReq(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req) {
                const headers = req && req.headers;
                if (headers && headers['authorization']) {
                    try {
                        const authorization = headers['authorization'];
                        const extractedToken = yield this.extractToken(authorization);
                        const jwtPayload = yield this.verifyToken(extractedToken);
                        return jwtPayload && jwtPayload.payload;
                    }
                    catch (error) {
                        throw error;
                    }
                }
                else {
                    throw new common_exceptions_1.Authorization();
                }
            }
            else {
                return null;
            }
        });
    }
}
exports.JWT = JWT;
//# sourceMappingURL=common.jwt.js.map