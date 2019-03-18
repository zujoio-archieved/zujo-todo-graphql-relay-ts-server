import lodash from "lodash"

import { IRepository } from "../interface/repository.interface"
import { ToDo } from "../../schemas/todo/index"
import mongoose from 'mongoose'

export class TodoRepository{

    /**
     * Fetch todo(s)
     * @param status filter by status
     */
    public async getTodos(status: string){
        let where = {}
        if(status === 'completed'){
            where["complete"] = true
        }
        const todos = await ToDo.find(where)
        return todos
    }

    /**
     * Get single todo
     * @param id Unique Id
     */
    public async getTodo(id: string){
        let where = {
            _id: mongoose.Types.ObjectId(id)
        }
        return await ToDo.findById(where)
    }

    /**
     * Fetch number of ToDo(s)
     * @param status filter by status
     */
    public async getNumTodos(status: string = "all"){
        let where = {}
        if(status === 'completed'){
            where["completed"] = true
        }
        return await ToDo.count(where)
    }

    /**
     * Adding todo
     * @param text Text of ToDo
     */
    public async addTodo(text: string){
        const todoPayload = {
            text: text
        }
        const todo = await ToDo.create(todoPayload)
        return todo
    }

    /**
     * 
     * @param id ID of todo
     * @param complete Status of completion
     */
    public async changeTodoStatus(id: string, complete: boolean){
        const where = {
            _id: id
        }
        const payload = {
            complete: complete
        }
        return await ToDo.updateOne(where, payload);
    }

    /**
     * mark all todos
     * @param complete status of todo
     */
    public async markAllTodos(complete: boolean){
        return await ToDo.updateMany({},{ complete: complete })
    }

    /**
     * Remove all completed
     */
    public async removeCompletedTodos(){
        const todos = await ToDo.find({ complete: true });
        await ToDo.remove({ complete: true });
        const todoIds = lodash.map(todos, todo =>{
            return todo._id.toHexString()
        });
        return todoIds
    }

    /**
     * Remove single todo
     * @param id Id of todo
     */
    public async removeTodo(id: string){
        return await ToDo.deleteOne({ _id: id })
    }

    /**
     * Rename single todo
     * @param id Id of todo
     * @param text Text payload
     */
    public async renameTodo(id: string, text: string){
        const where ={
            _id: id
        }
        const payload = {
            text: text
        }
        return await ToDo.updateOne(where, payload)
    }
}