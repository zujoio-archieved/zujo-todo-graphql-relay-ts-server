import { Request } from "express";
import { UserRepository } from './repository/user';
import { TodoRepository } from './repository/todo';
import { JWT } from './common/utils/common.jwt'
import { UserLoader } from "./ loaders/ user.loaders";

class Context{
    private _request: Request
    private _userRepository: UserRepository = new UserRepository()
    private _todoRepository: TodoRepository = new TodoRepository()

    private _userLoader: UserLoader = new UserLoader()

    constructor(request: Request){
        this._request = request;
    }

    get request(): Request{
        return this._request
    }
    get userRepository(): UserRepository{
        return this._userRepository;
    }
    get todoRepository(): TodoRepository{
        return this._todoRepository
    }

    get userLoader(): UserLoader{
        return this._userLoader
    }

    public async getFormData(): Promise<any>{
        let formData = this._request.body
        // console.log("formData", formData)
        return formData
    }

    public async userId(): Promise<string>{
        return JWT.extractUserIdfromReq(this._request)
    }
}

export { Context }
