import mongoose from "mongoose"

/**
 * ITodo interface for basic types
 */
export interface ITodo{
    id: string,
    complete: boolean,
    text: string,
    attachmentpath:string
}

/**
 * Mongoose defination for todo
 */
export interface TodoModel extends mongoose.Document{
    _id: mongoose.Types.ObjectId,
    complete: boolean,
    text: string,
    attachmentpath:string
}