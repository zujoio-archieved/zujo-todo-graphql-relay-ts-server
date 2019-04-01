import DataLoader from 'dataloader'
import { ToDo, TodoModel } from '../schemas/todo'

class TodoLoader{
    private _loader = new DataLoader(
        async keys => {
            return await ToDo.find({
                _id: { $in: keys } 
            }) 
        } 
    )

    public async todoById(id: string): Promise<TodoModel>{
        return this._loader.load(id)
    }

    public async todosById(ids: Array<string>): Promise<Array<TodoModel>>{
        return this._loader.loadMany(ids)
    }

    public async primeTodo(todo: TodoModel){
        this._loader.prime(todo._id, todo);
    }

    public async primeTodos(todos: Array<TodoModel>){
        for(let todo of todos){
            this.primeTodo(todo)
        }
    }
}

export { TodoLoader }