import {config} from 'dotenv';
import passport from 'passport';
import {Strategy as GoogleTokenStrategy} from 'passport-google-token';
import FacebookTokenStrategy from 'passport-facebook-token';
import {UserRepository} from '../../repository/user/user.repository';

config();

passport.serializeUser((user, done) => {
    done(null, user);
})

// passport.deserializeUser((user, done) => {

// })

passport.use( new GoogleTokenStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET
}, 
(accessToken, refreshToken, profile, done) => {
    process.nextTick(async ()=> {
        const userRepo = new UserRepository();
        try{
            const user = await userRepo.oauthGoogle(profile);
            if(user) return done(null, user);
        }
        catch(err){
            return done(err);
        }
    })
}));

passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET
},
(accessToken, refreshToken, profile, done) => {
    process.nextTick(async () => {
        const userRepo = new UserRepository();
        try{
            const user = await userRepo.oauthFacebook(profile);
            if(user) return done(null, user);
        }
        catch(err){
            return done(err);
        }
    })
}))