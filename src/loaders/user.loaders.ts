import DataLoader from 'dataloader'
import { User, UserModel } from '../schemas/user'

class UserLoader{
    private _loader = new DataLoader(
        async keys => await User.find({
            $in: keys
        }) 
    )

    public async userById(id: string): Promise<UserModel>{
        return this._loader.load(id)
    }
}

export { UserLoader }