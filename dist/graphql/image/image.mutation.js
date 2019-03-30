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
const graphql_relay_1 = require("graphql-relay");
const graphql_1 = require("graphql");
const Image_1 = require("../../repository/Image");
const image_typedef_1 = require("./image.typedef");
const common_graphql_1 = require("../../common/utils/common.graphql");
const GraphQlAddImageMutation = graphql_relay_1.mutationWithClientMutationId({
    name: 'addImage',
    inputFields: {
        type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        path: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    },
    outputFields: {
        viewer: {
            type: image_typedef_1.GraphQLImageEdge,
            resolve: (node) => __awaiter(this, void 0, void 0, function* () {
                return node;
            })
        }
    },
    mutateAndGetPayload: ({ type, path }) => __awaiter(this, void 0, void 0, function* () {
        const imgRepo = new Image_1.ImageRepository();
        const uploadImages = yield imgRepo.addImage(type, path);
        const cursor = common_graphql_1.objectIdToCursor(uploadImages["_id"].toHexString());
        const imageEdge = {
            cursor: cursor,
            node: uploadImages
        };
        return imageEdge;
    })
});
const GraphQLimageMutations = {
    addImage: GraphQlAddImageMutation,
};
exports.GraphQLimageMutations = GraphQLimageMutations;
//# sourceMappingURL=image.mutation.js.map