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
const dataloader_1 = __importDefault(require("dataloader"));
const todo_1 = require("../schemas/todo");
class TodoLoader {
    constructor() {
        this._loader = new dataloader_1.default((keys) => __awaiter(this, void 0, void 0, function* () {
            return yield todo_1.ToDo.find({
                _id: { $in: keys }
            });
        }));
    }
    todoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._loader.load(id);
        });
    }
    todosById(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._loader.loadMany(ids);
        });
    }
    primeTodo(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            this._loader.prime(todo._id, todo);
        });
    }
    primeTodos(todos) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let todo of todos) {
                this.primeTodo(todo);
            }
        });
    }
}
exports.TodoLoader = TodoLoader;
//# sourceMappingURL= todo.loaders.js.map