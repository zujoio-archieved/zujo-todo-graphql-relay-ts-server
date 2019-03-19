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
const common_encoding_1 = require("./common.encoding");
/**
 * Get condition for pagination
 * @param where Conditional where
 * @param args pagination arguments { before, after, first, last }
 */
const getPaginatedRecords = (query, where, args) => __awaiter(this, void 0, void 0, function* () {
    const { before, after, first, last } = args;
    if (before) {
        const _id = common_encoding_1.fromBase64(before);
        where["_id"] = { $lt: _id };
    }
    if (after) {
        const _id = common_encoding_1.fromBase64(after);
        where["_id"] = { $gt: _id };
    }
    let orderBy = { _id: 1 };
    let limit = first;
    if (last) {
        limit = last;
        orderBy["_id"] = -1;
    }
    const edges = yield query.find(where)
        .limit(limit)
        .sort(orderBy);
    return edges;
});
exports.getPaginatedRecords = getPaginatedRecords;
//# sourceMappingURL=common.mongoose.js.map