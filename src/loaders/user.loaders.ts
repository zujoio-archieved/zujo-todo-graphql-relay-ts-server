import DataLoader from 'dataloader'
import { User, UserModel } from '../schemas/user'
import { toObjectId } from '../common/utils/common.mongoose'

class UserLoader{
    private _loader = new DataLoader(
        async keys => {
            return await User.find({
                _id: { $in: keys } 
            }) 
        } 
    )

    public async userById(id: string): Promise<UserModel>{
        return this._loader.load(id)
    }

    public async usersByID(ids: Array<string>): Promise<Array<UserModel>>{
        return this._loader.loadMany(ids)
    }

    public async primeUser(user: UserModel){
        this._loader.prime(user._id, user);
    }

    public async primeUsers(users: Array<UserModel>){
        for(let user of users){
            this.primeUser(user)
        }
    }
}

export { UserLoader }