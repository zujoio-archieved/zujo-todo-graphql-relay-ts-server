"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataloader_1 = __importDefault(require("dataloader"));
const user_1 = require("../schemas/user");
class UserLoader {
    constructor() {
        this._loader = new dataloader_1.default((keys) => __awaiter(this, void 0, void 0, function* () {
            return yield user_1.User.find({
                $in: keys
            });
        }));
    }
    load(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
}
//# sourceMappingURL=user.loaders.js.map