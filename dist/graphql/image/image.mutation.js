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
const graphql_relay_1 = require("graphql-relay");
const graphql_1 = require("graphql");
const image_1 = require("../../repository/image");
const image_typedef_1 = require("./image.typedef");
const common_graphql_1 = require("../../common/utils/common.graphql");
const path_1 = require("path");
const uuid_1 = __importDefault(require("uuid"));
const imagepath = path_1.join(__dirname, `../../../src/Upload/`);
const uploadfile_1 = require("../../repository/image/uploadfile");
const fs = require('fs');
const GraphQlAddImageMutation = graphql_relay_1.mutationWithClientMutationId({
    name: 'addImage',
    inputFields: {
        file: { type: image_typedef_1.UploadType },
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
    mutateAndGetPayload: (args, context) => __awaiter(this, void 0, void 0, function* () {
        const formData = yield context.getFormData();
        const { createReadStream, stream, filename, mimetype, encoding } = yield formData.variables.file;
        const fileenc = uuid_1.default(filename);
        uploadfile_1.storeUpload(stream, fileenc);
        const imgRepo = new image_1.ImageRepository();
        const uploadImages = yield imgRepo.addImage(`${".jpg"}`, imagepath + fileenc);
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