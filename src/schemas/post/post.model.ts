import mongoose from "mongoose"

import { PostModel } from "./post.typedef"

const postSchema = new mongoose.Schema(
    {
        title: String,
        description: { type: String, default: "Null" }
    }, 
    { 
      timestamps: true,
      toJSON:{
        transform: (doc, ret) =>{
          delete ret._v
        }
      }
    }
);

const Post = mongoose.model<PostModel>("Post", postSchema);
export { Post } 