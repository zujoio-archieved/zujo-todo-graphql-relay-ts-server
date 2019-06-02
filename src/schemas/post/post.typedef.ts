import mongoose from "mongoose"

/**
 * IPost interface for basic types
 */
export interface IPost{
    id: string,
    title: string,
    description: string
}

/**
 * Mongoose defination for post
 */
export interface PostModel extends mongoose.Document{
    _id: mongoose.Types.ObjectId,
    title : string,
    description: string
}