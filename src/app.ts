import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import expressValidator from "express-validator";
import flash from "express-flash";
import path from "path";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import lusca from "lusca";
import dotenv from "dotenv";
import bluebird, { any } from "bluebird"
import mongo from "connect-mongo";
import mongoose from "mongoose";
import cors from 'cors'
import { GraphQLServer } from "graphql-yoga"
import passport from 'passport'


import { schema } from "./graphql/schema"
import { authentication } from './common/utils/common.middlewares'
import { Context } from "./context";

/**
 * Initialize express server
 */
// context
const context = async (req, res) => (new Context(req.request, res));
const yogaServer = new GraphQLServer({ 
  schema:schema, 
  context: context,
  middlewares:[authentication]
})
const app = yogaServer.express

/**
 * Configure mongo store
 */
const MongoStore = mongo(session);

/**
 * Load Enviroment Configuration
 */
dotenv.config();

/**
 * Configure mongodb connection
 */
const mongoUrl = process.env.MONGODB_URI_LOCAL;
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  process.exit();
});

/**
 * Configure express
 */
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: mongoUrl,
    autoReconnect: true
  })
}));
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

/**
 * Configure static 
 */
app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);
app.use(express.static(path.join(__dirname, '../Assets/Upload')))

/**
 * Configure other routes
 */
app.get("/index", (req: Request, res: Response) => {
  res.render("index", {
    title: "Home"
  });
});

app.post('/auth/google', passport.authenticate('google-token',{ session: false, prompt: 'consent', scope: ['profile', 'email'] }), 
  (req: Request, res: Response) => {
    console.log(req.user);
    res.json(req.user);
});

app.post('/auth/facebook', passport.authenticate('facebook-token', {session: false}), 
  (req: Request, res: Response) => {
    res.json(req.user);
  }
);

export { app, yogaServer }
