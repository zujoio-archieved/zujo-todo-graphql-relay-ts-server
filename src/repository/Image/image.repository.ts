import lodash from "lodash"
import mongoose from 'mongoose'
import { Image } from "../../schemas/Image/index"
import { getPaginatedRecords } from '../../common/utils/common.mongoose'
import uploadFiles from './uploadfile'
export class ImageRepository{

    public async getImage(id: string){
        let where = {
            _id: mongoose.Types.ObjectId(id)
        }
        return await Image.findById(where)
    }
    public async addImage(format: string,location:string){
        const imgPayload = new Image({
            type : format,
            path: location

        })
        // let req:any,res:any
        // uploadFiles(req,res)
       
        const imgsave = await imgPayload.save()
        return imgsave
    }
    public async getImages(args: any){
        const query = Image.find()
        let where = {}
        const Imagess = await getPaginatedRecords(query, where, args)
        return Imagess
    }
}
