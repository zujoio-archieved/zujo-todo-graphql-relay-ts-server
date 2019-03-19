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
const lodash_1 = __importDefault(require("lodash"));
const common_encoding_1 = require("./common.encoding");
/**
 * Convert ObjectId into cursor
 * @param objectId ObjectId of record
 */
const objectIdToCursor = (objectId) => {
    return new Buffer(objectId.toString()).toString('base64');
};
exports.objectIdToCursor = objectIdToCursor;
/**
 *
 * @param query Query to execute
 * @param cursor current cursor as per previous and next
 * @param args pagination argument(s) {before, after, first, last}
 */
const hasPage = (query, type, cursor, args) => __awaiter(this, void 0, void 0, function* () {
    const { before, after, first, last } = args;
    let where = {};
    if (type == 'previous') {
        where["_id"] = { $lt: cursor };
    }
    else if (type == "next") {
        where["_id"] = { $gt: cursor };
    }
    // Overwrite by before after
    if (before) {
        where["_id"] = { $lt: common_encoding_1.fromBase64(before) };
    }
    if (after) {
        where["_id"] = { $gt: common_encoding_1.fromBase64(after) };
    }
    const count = yield query.count(where);
    return count > 0;
});
/**
 * Return connection of mongoose model
 * @param query Mongoose model
 * @param cursor current cursor
 * @param edges List of edges
 */
const mongooseConnectionFromArray = (query, edges, args) => __awaiter(this, void 0, void 0, function* () {
    const { before, after, first, last } = args;
    const firstEdge = lodash_1.default.first(edges);
    const lastEdge = lodash_1.default.last(edges);
    const hasPreviousPage = yield hasPage(query, 'previous', firstEdge && firstEdge["_id"], args);
    const hasNextPage = yield hasPage(query, 'next', lastEdge && lastEdge["_id"], args);
    const cursorEdges = edges.map((value, index) => {
        return { cursor: objectIdToCursor(value["_id"]), node: value };
    });
    return {
        edges: cursorEdges,
        pageInfo: {
            startCursor: firstEdge && firstEdge["_id"] ? objectIdToCursor(firstEdge["_id"]) : null,
            endCursor: lastEdge && lastEdge["_id"] ? objectIdToCursor(lastEdge["_id"]) : null,
            hasPreviousPage: hasPreviousPage,
            hasNextPage: hasNextPage
        }
    };
});
exports.mongooseConnectionFromArray = mongooseConnectionFromArray;
//# sourceMappingURL=common.graphql.js.map