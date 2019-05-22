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
const path_1 = require("path");
const imagepath = path_1.join(__dirname, `../../../Assets/Upload/`);
const index_1 = require("../../schemas/post/index");
const common_mongoose_1 = require("../../common/utils/common.mongoose");
const post_loaders_1 = require("../../loaders/post.loaders");
class PostRepository {
    constructor() {
        this._loader = new post_loaders_1.PostLoader();
    }
    /**
     * Fetch post(s)
     * @param args Pagination arguments
     */
    getPosts(args) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = {};
            const posts = yield common_mongoose_1.getPaginatedRecords(index_1.Post, where, args);
            // prime records to loader
            this._loader.primePosts(posts);
            return posts;
        });
    }
    /**
     * Get single post
     * @param id Unique Id
     */
    getPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._loader.postById(id);
        });
    }
    /**
     * Fetch number of Post(s)
     */
    getNumPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            let where = {};
            return yield index_1.Post.count(where);
        });
    }
    /**
     * Adding post
     * @param title Text of Post
     * @param description of Post
     */
    addPost(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const postPayload = {
                title: title,
                description: description
            };
            const post = yield index_1.Post.create(postPayload);
            return post;
        });
    }
    /**
     * Remove single Post
     * @param id Id of post
     */
    removePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.Post.deleteOne({ _id: id });
        });
    }
}
exports.PostRepository = PostRepository;
//# sourceMappingURL=post.repository.js.map