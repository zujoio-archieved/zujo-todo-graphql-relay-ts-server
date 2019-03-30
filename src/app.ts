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
import bluebird from "bluebird"

import mongo from "connect-mongo";
import mongoose from "mongoose";

import { GraphQLServer } from "graphql-yoga"

import { schema } from "./graphql/schema"
import { authentication } from './common/utils/common.middlewares'
import { JWT } from './common/utils/common.jwt'

/**
 * Initialize express server
 */
// context
const context = async (req) => ({
  req: req.request,
  user_id: await JWT.extractUserIdfromReq(req.request)
});
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
app.use(express.static(path.join(__dirname, '../Upload')))

/**
 * Configure express
 */
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

/**
 * Configure other routes
 */
app.get("/index", (req: Request, res: Response) => {
  res.render("index", {
    title: "Home"
  });
});


export { app, yogaServer }

