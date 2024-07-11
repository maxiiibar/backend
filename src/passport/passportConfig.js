import passport from "passport"
import UserServices from "../services/userServices.js";
const userServices = new UserServices();

import "./localStrategy.js"
import "./jwtStrategy.js"

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userServices.getUserById(id);
        return done(null, user);
    } catch (error) {
        done(error);
    }
})

export default passport
