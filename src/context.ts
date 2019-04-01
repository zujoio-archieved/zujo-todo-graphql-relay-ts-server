import { Request } from "express";
import { UserRepository } from './repository/user';
import { TodoRepository } from './repository/todo';
import { JWT } from './common/utils/common.jwt'
import { UserLoader } from "./loaders/user.loaders";

class Context{
    private _request: Request
    private _response: Response
    private _userRepository: UserRepository = new UserRepository()
    private _todoRepository: TodoRepository = new TodoRepository()

    private _userLoader: UserLoader = new UserLoader()

    constructor(request: Request, response: Response){
        this._request = request;
        this._response = response;
    }

    get request(): Request{
        return this._request
    }
    get response(): Response{
        return this._response
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

    public async userId(): Promise<string>{
        return JWT.extractUserIdfromReq(this._request)
    }
}

export { Context }