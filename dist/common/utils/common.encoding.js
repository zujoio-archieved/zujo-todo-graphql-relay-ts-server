"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Convert to base64
 * @param str simple string
 */
const toBase64 = (str) => {
    return new Buffer(str.toString()).toString('base64');
};
exports.toBase64 = toBase64;
/**
 * Convert from base64 to string
 * @param str Simple string
 */
const fromBase64 = (str) => {
    return Buffer.from(str, 'base64');
};
exports.fromBase64 = fromBase64;
//# sourceMappingURL=common.encoding.js.map