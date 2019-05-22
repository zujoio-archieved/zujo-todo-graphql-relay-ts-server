"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    title: String,
    description: { type: String, default: "Null" }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret._v;
        }
    }
});
const Post = mongoose_1.default.model("Post", postSchema);
exports.Post = Post;
//# sourceMappingURL=post.model.js.map