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
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../../schemas/Image/index");
const common_mongoose_1 = require("../../common/utils/common.mongoose");
class ImageRepository {
    getImage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = {
                _id: mongoose_1.default.Types.ObjectId(id)
            };
            return yield index_1.Image.findById(where);
        });
    }
    addImage(format, location) {
        return __awaiter(this, void 0, void 0, function* () {
            const imgPayload = new index_1.Image({
                type: format,
                path: location
            });
            // let req:any,res:any
            // uploadFiles(req,res)
            const imgsave = yield imgPayload.save();
            return imgsave;
        });
    }
    getImages(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = index_1.Image.find();
            let where = {};
            const Imagess = yield common_mongoose_1.getPaginatedRecords(query, where, args);
            return Imagess;
        });
    }
}
exports.ImageRepository = ImageRepository;
//# sourceMappingURL=image.repository.js.map