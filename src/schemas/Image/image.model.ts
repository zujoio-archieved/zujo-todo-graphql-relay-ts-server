import mongoose from "mongoose"
import{ImageModel} from './image.typedef'
const imageSchema = new mongoose.Schema({
   type:String,
   path:String
}, 
{ 
  timestamps: true,
}
);
const Image = mongoose.model<ImageModel>("Image", imageSchema);
export { Image }