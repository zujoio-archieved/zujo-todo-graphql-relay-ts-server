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
const dotenv_1 = require("dotenv");
const passport_1 = __importDefault(require("passport"));
const passport_google_token_1 = require("passport-google-token");
const passport_facebook_token_1 = __importDefault(require("passport-facebook-token"));
const user_repository_1 = require("../../repository/user/user.repository");
dotenv_1.config();
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
// passport.deserializeUser((user, done) => {
// })
passport_1.default.use(new passport_google_token_1.Strategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => __awaiter(this, void 0, void 0, function* () {
        const userRepo = new user_repository_1.UserRepository();
        try {
            const user = yield userRepo.oauthGoogle(profile);
            if (user)
                return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    }));
}));
passport_1.default.use(new passport_facebook_token_1.default({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => __awaiter(this, void 0, void 0, function* () {
        const userRepo = new user_repository_1.UserRepository();
        try {
            const user = yield userRepo.oauthFacebook(profile);
            if (user)
                return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    }));
}));
//# sourceMappingURL=passport.js.map