"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Convert string to mongoose ObjectId
 * @param id string
 */
exports.convertToObjectId = (id) => mongoose_1.default.Types.ObjectId(id);
//# sourceMappingURL=utils.js.map