"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Image_1 = require("../../repository/Image");
const image_typedef_1 = require("./image.typedef");
const common_graphql_1 = require("../../common/utils/common.graphql");
const Image_2 = require("../../schemas/Image");
const GraphqlImageQuery = {
    viewer: {
        type: image_typedef_1.GraphQLImage,
        resolve: (obj, _a) => __awaiter(this, void 0, void 0, function* () {
            var args = __rest(_a, []);
            const imgRepo = new Image_1.ImageRepository();
            const images = yield imgRepo.getImages(args);
            return yield common_graphql_1.mongooseConnectionFromArray(Image_2.Image, images, args);
        })
    }
};
exports.GraphqlImageQuery = GraphqlImageQuery;
//# sourceMappingURL=image.query.js.map