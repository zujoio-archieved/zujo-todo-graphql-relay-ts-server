"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const todoSchema = new mongoose_1.default.Schema({
    complete: { type: Boolean, default: false },
    text: String,
    attachmentpath: { type: String, default: "Null" }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret._v;
        }
    }
});
const ToDo = mongoose_1.default.model("ToDo", todoSchema);
exports.ToDo = ToDo;
//# sourceMappingURL=todo.model.js.map