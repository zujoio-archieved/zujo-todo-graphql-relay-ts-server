import errorHandler from "errorhandler";
import { schema } from "./graphql/schema"

import {app, yogaServer} from "./app";
require('events').EventEmitter.defaultMaxListeners = 20;

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());


const options = {
    port: process.env.PORT,
    endpoint: '/graphql',
    subscriptions: '/subscription',
    playground: '/playground'
}
yogaServer.start(options, () => console.log(`Server is running on localhost:${process.env.PORT}`))


export default yogaServer;
