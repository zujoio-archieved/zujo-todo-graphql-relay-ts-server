"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression")); // compresses requests
const express_session_1 = __importDefault(require("express-session"));
const express_validator_1 = __importDefault(require("express-validator"));
const express_flash_1 = __importDefault(require("express-flash"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const body_parser_1 = __importDefault(require("body-parser"));
const lusca_1 = __importDefault(require("lusca"));
const dotenv_1 = __importDefault(require("dotenv"));
const bluebird_1 = __importDefault(require("bluebird"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const mongoose_1 = __importDefault(require("mongoose"));
const graphql_yoga_1 = require("graphql-yoga");
const schema_1 = require("./graphql/schema");
const common_middlewares_1 = require("./common/utils/common.middlewares");
const context_1 = require("./context");
require("./common/utils/passport");
/**
 * Initialize express server
 */
// context
const context = (req, res) => __awaiter(this, void 0, void 0, function* () { return (new context_1.Context(req.request, res)); });
const yogaServer = new graphql_yoga_1.GraphQLServer({
    schema: schema_1.schema,
    context: context,
    middlewares: [common_middlewares_1.authentication]
});
exports.yogaServer = yogaServer;
const app = yogaServer.express;
exports.app = app;
/**
 * Configure mongo store
 */
const MongoStore = connect_mongo_1.default(express_session_1.default);
/**
 * Load Enviroment Configuration
 */
dotenv_1.default.config();
/**
 * Configure mongodb connection
 */
const mongoUrl = process.env.MONGODB_URI_LOCAL;
mongoose_1.default.Promise = bluebird_1.default;
mongoose_1.default.connect(mongoUrl).then(() => { }).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});
/**
 * Configure express
 */
app.set("port", process.env.PORT || 3000);
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(express_validator_1.default());
app.use(express_session_1.default({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    })
}));
app.use(express_flash_1.default());
app.use(lusca_1.default.xframe("SAMEORIGIN"));
app.use(lusca_1.default.xssProtection(true));
/**
 * Configure static
 */
app.use(express_1.default.static(path_1.default.join(__dirname, "public"), { maxAge: 31557600000 }));
/**
 * Configure other routes
 */
app.get("/index", (req, res) => {
    res.render("index", {
        title: "Home"
    });
});
app.post('/auth/google', passport_1.default.authenticate('google-token', { session: false, prompt: 'consent', scope: ['profile', 'email'] }), (req, res) => {
    console.log(req.user);
    res.json(req.user);
});
app.post('/auth/facebook', passport_1.default.authenticate('facebook-token', { session: false }), (req, res) => {
    res.json(req.user);
});
//# sourceMappingURL=app.js.map