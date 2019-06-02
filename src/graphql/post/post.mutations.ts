import {
    mutationWithClientMutationId,
    fromGlobalId,
    toGlobalId
  } from 'graphql-relay'
  import { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } from 'graphql';
  import uuid from 'uuid'
  import { GraphQLUser } from '../user';
  import { UserRepository } from '../../repository/user';
  import { GraphQLPost } from './post.typedef';
  import { GraphQLPostEdge } from './post.typedef';
  import { PostRepository } from '../../repository/post';
  import { objectIdToCursor } from '../../common/utils/common.graphql'
  import pubSub from '../publisher'
  import { POST_SUBSCRIPTION_TRIGGERS } from '../../common/utils/common.constant'
  
  
  
  // import{storeUpload} from '../../repository/todo/todo.repository'
  const GraphQlAddPostMutation = mutationWithClientMutationId({
      name: 'addPost',
      inputFields: {
        
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        
      },
      outputFields: {
          viewer:{
              type: GraphQLUser,
            
              resolve: async (obj, args, context, info) => {
                  const userRepo = new UserRepository()
                  const userId = await context.userId()
                  return await userRepo.me(userId)
              }
          },
          postEdge: {
              type: GraphQLPostEdge,
              resolve: async (node) => {
                  return node;
              }
          }
      },
      mutateAndGetPayload: async ({ title,description },context) => {
      
         const postRepo = new PostRepository()
         const formData = await context.getFormData()
         
         
         const createdPost = await postRepo.addPost(title,description);
      
  
          // Generate cursor
          const cursor = objectIdToCursor(createdPost["_id"].toHexString())
          const postEdge = {
            cursor: cursor,
            node: createdPost
          }
          const nodeEdge = {
            postEdge: postEdge,
            clientSubscriptionId: new Buffer(POST_SUBSCRIPTION_TRIGGERS.post_created).toString('base64')
          };
  
          // Publish created todo
          pubSub.publish(POST_SUBSCRIPTION_TRIGGERS.post_created,{
            postAdded: nodeEdge
          });
  
          return postEdge;
      }
  })
  
  
  
  
  
  const GraphQLRemovePostMutation = mutationWithClientMutationId({
      name: 'removePost',
      inputFields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      outputFields: {
        viewer: {
          type: GraphQLUser,
          resolve: async (obj, args, context, info) => {
              const userRepo = new UserRepository();
              const userId = await context.userId()
              return await userRepo.me(userId)
          },
        },
        deletedId: {
          type: GraphQLID,
          resolve: ({ id }) => id,
        },
      },
      mutateAndGetPayload: async ({ id }) => {
        const { id: postId } = fromGlobalId(id);
        const postRepo = new PostRepository()
        const post = await postRepo.getPost(postId)
        await postRepo.removePost(postId);
  
        // publish changes
        pubSub.publish(POST_SUBSCRIPTION_TRIGGERS.remove_post,{
          todoRemoved: post
        });
  
        return { id };
      },
  });
  

  
  const GraphQLPostMutations = {
      addPost: GraphQlAddPostMutation,
      removePost: GraphQLRemovePostMutation    
  }
  
  export {
      GraphQLPostMutations
  }