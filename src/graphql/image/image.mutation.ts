import {
    mutationWithClientMutationId,
    fromGlobalId,
    toGlobalId
} from 'graphql-relay'
import { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } from 'graphql';

import { ImageRepository } from '../../repository/Image';
import { GraphQLImage } from './image.typedef';
import { GraphQLImageEdge } from './image.typedef';
import { objectIdToCursor } from '../../common/utils/common.graphql'



const GraphQlAddImageMutation = mutationWithClientMutationId({
    name: 'addImage',
    inputFields: {
        type: { type: new GraphQLNonNull(GraphQLString) },
        path: { type: new GraphQLNonNull(GraphQLString) }
    },
    outputFields: {
        viewer:{
            type: GraphQLImageEdge,
            resolve: async (node) => {
                return node;
            }
        }
    },
    mutateAndGetPayload: async ({type,path}) => {
        const imgRepo = new ImageRepository()
        const uploadImages = await imgRepo.addImage(type,path);
        const cursor = objectIdToCursor(uploadImages["_id"].toHexString())
        const imageEdge = {
          cursor: cursor,
          node: uploadImages
        }
        return imageEdge;
    }
})



const GraphQLimageMutations = {
    addImage: GraphQlAddImageMutation,
   
}

export {
    GraphQLimageMutations
}