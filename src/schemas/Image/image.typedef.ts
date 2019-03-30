import mongoose from "mongoose"

export interface ImageModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    type: string,
    path: string
};