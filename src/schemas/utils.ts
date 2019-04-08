import mongoose from "mongoose"

/**
 * Convert string to mongoose ObjectId
 * @param id string
 */
export const convertToObjectId = (id: String) => mongoose.Types.ObjectId(<string>id);