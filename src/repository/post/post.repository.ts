import lodash from "lodash"
import mongoose from 'mongoose'
import DataLoader from 'dataloader'
import { join } from 'path';
import { createWriteStream } from 'fs';
const imagepath = join(__dirname, `../../../Assets/Upload/`);

import { Post } from "../../schemas/post/index"
import { getPaginatedRecords } from '../../common/utils/common.mongoose'
import { PostLoader } from "../../loaders/post.loaders";

export class PostRepository{
    private _loader: PostLoader = new PostLoader()
    /**
     * Fetch post(s)
     * @param args Pagination arguments
     */
    public async getPosts(args: any){
        let where = {}

        

        const posts = await getPaginatedRecords(Post, where, args)

        // prime records to loader
        this._loader.primePosts(posts)

        return posts
    }

    /**
     * Get single post
     * @param id Unique Id
     */
    public async getPost(id: string){
        return await this._loader.postById(id)
    }

    /**
     * Fetch number of Post(s)
     */
    public async getNumPosts(){
        let where = {}
        
        return await Post.count(where)
    }


    /**
     * Adding post
     * @param title Text of Post
     * @param description of Post
     */
    public async addPost(title: string,description:string){
        const postPayload = {
            title: title,
            description:description 
           
        }
        const post = await Post.create(postPayload)
        return post
    }


    /**
     * Remove single Post
     * @param id Id of post
     */
    public async removePost(id: string){
        return await Post.deleteOne({ _id: id })
    }
   


  
}

