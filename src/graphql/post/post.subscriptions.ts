import { PostsConnection, GraphQLPost, GraphQLPostEdge } from './post.typedef'
import pubSub from '../publisher'
import { POST_SUBSCRIPTION_TRIGGERS } from '../../common/utils/common.constant'
import { GraphQLList, GraphQLString, GraphQLObjectType } from 'graphql';

const GraphQLPostSubscription = {
    /**
     * Subscription trigger for created post
     */
    postAdded:{
        type: new GraphQLObjectType({
            name: 'postAdded',
            fields: () => ({
                postEdge: { type: GraphQLPostEdge },
                clientSubscriptionId: { type: GraphQLString }
            })
        }),
        subscribe: () => pubSub.asyncIterator(POST_SUBSCRIPTION_TRIGGERS.post_created)
    },

    

    postRemoved:{
        type: GraphQLPost,
        subscribe: () => pubSub.asyncIterator(POST_SUBSCRIPTION_TRIGGERS.remove_post)
    },

   
}

export { GraphQLPostSubscription }