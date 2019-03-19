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
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../../schemas/todo/index");
const common_mongoose_1 = require("../../common/utils/common.mongoose");
class TodoRepository {
    /**
     * Fetch todo(s)
     * @param status filter by status
     * @param args Pagination arguments
     */
    getTodos(status, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = {};
            if (status === 'completed') {
                where["complete"] = true;
            }
            const todos = yield common_mongoose_1.getPaginatedRecords(index_1.ToDo, where, args);
            return todos;
        });
    }
    /**
     * Get single todo
     * @param id Unique Id
     */
    getTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = {
                _id: mongoose_1.default.Types.ObjectId(id)
            };
            return yield index_1.ToDo.findById(where);
        });
    }
    /**
     * Fetch number of ToDo(s)
     * @param status filter by status
     */
    getNumTodos(status = "all") {
        return __awaiter(this, void 0, void 0, function* () {
            let where = {};
            if (status === 'completed') {
                where["completed"] = true;
            }
            return yield index_1.ToDo.count(where);
        });
    }
    /**
     * Adding todo
     * @param text Text of ToDo
     */
    addTodo(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const todoPayload = {
                text: text
            };
            const todo = yield index_1.ToDo.create(todoPayload);
            return todo;
        });
    }
    /**
     *
     * @param id ID of todo
     * @param complete Status of completion
     */
    changeTodoStatus(id, complete) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {
                _id: id
            };
            const payload = {
                complete: complete
            };
            return yield index_1.ToDo.updateOne(where, payload);
        });
    }
    /**
     * mark all todos
     * @param complete status of todo
     */
    markAllTodos(complete) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.ToDo.updateMany({}, { complete: complete });
        });
    }
    /**
     * Remove all completed
     */
    removeCompletedTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = yield index_1.ToDo.find({ complete: true });
            yield index_1.ToDo.remove({ complete: true });
            const todoIds = lodash_1.default.map(todos, todo => {
                return todo._id.toHexString();
            });
            return todoIds;
        });
    }
    /**
     * Remove single todo
     * @param id Id of todo
     */
    removeTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.ToDo.deleteOne({ _id: id });
        });
    }
    /**
     * Rename single todo
     * @param id Id of todo
     * @param text Text payload
     */
    renameTodo(id, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {
                _id: id
            };
            const payload = {
                text: text
            };
            return yield index_1.ToDo.updateOne(where, payload);
        });
    }
}
exports.TodoRepository = TodoRepository;
//# sourceMappingURL=todo.repository.js.map