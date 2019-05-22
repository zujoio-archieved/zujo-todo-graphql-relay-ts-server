import DataLoader from 'dataloader'
import { Post, PostModel } from '../schemas/post'

class PostLoader{
    private _loader = new DataLoader(
        async keys => {
            return await Post.find({
                _id: { $in: keys } 
            }) 
        } 
    )

    public async postById(id: string): Promise<PostModel>{
        return this._loader.load(id)
    }

    public async postssById(ids: Array<string>): Promise<Array<PostModel>>{
        return this._loader.loadMany(ids)
    }


    public async primePost(post: PostModel){
        this._loader.prime(post._id, post);
    }

    public async primePosts(posts: Array<PostModel>){
        for(let post of posts){
            this.primePost(post)
        }
    }

}

export { PostLoader }
