
import { ImageRepository } from '../../repository/Image';
import { GraphQLImage } from './image.typedef';

import { objectIdToCursor,mongooseConnectionFromArray } from '../../common/utils/common.graphql'

import { nodeField, nodeInterface } from "../global.defination"
import {Image} from '../../schemas/Image'
const GraphqlImageQuery = {
    viewer: {
      type: GraphQLImage,
      resolve: async (obj,{  ...args  }) =>{
        const imgRepo = new ImageRepository()
        const images = await imgRepo.getImages(args)
        return await mongooseConnectionFromArray(Image, images, args)
      }
    }
    
  };
  export {
    GraphqlImageQuery
  }
  