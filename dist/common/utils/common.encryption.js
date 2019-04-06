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
const bcrypt = __importStar(require("bcrypt"));
class Encryption {
    /**
     * Generate hash of payload
     * @param payload
     * @returns Hash of payload
     */
    static encrypt(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.hashSync(payload, 10);
        });
    }
    /**
     * Compare plain string with Hash
     * @param plain plain string needs to compare with hashsed
     * @param hashed hashed string version of plain string
     * @returns Returns boolean defines True or False comparision
     */
    static compareHash(plain, hashed) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.compareSync(plain, hashed);
        });
    }
}
exports.Encryption = Encryption;
//# sourceMappingURL=common.encryption.js.map