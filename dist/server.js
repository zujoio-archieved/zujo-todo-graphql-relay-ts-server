"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandler_1 = __importDefault(require("errorhandler"));
const app_1 = require("./app");
require('events').EventEmitter.defaultMaxListeners = 20;
/**
 * Error Handler. Provides full stack - remove for production
 */
app_1.app.use(errorhandler_1.default());
const options = {
    port: process.env.PORT,
    endpoint: '/graphql',
    subscriptions: '/subscription',
    playground: '/playground'
};
app_1.yogaServer.start(options, () => console.log(`Server is running on localhost:${process.env.PORT}`));
exports.default = app_1.yogaServer;
//# sourceMappingURL=server.js.map