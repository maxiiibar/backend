import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserServices from "../services/userServices.js";
const userServices = new UserServices();

const strategyConfig = {
    usernameField: 'email',
    passportField: 'password',
    passReqToCallback: true
}

const signUp = async (req, email, password, done) => {
    try {
        const user = await userServices.getUserByEmail(email);
        if (user) return done(null, false);
        const newUser = await userServices.register(req.body);
        return done(null, newUser);
    } catch (error) {
        console.log(error);
        return done(error);
    }
};

const login = async (req, email, password, done) => {
    try {
        const userlogin = await userServices.login({email, password});
        if (!userlogin){
            req.session.destroy();
            return done(null, false);
        }
        return done(null, userlogin);
    } catch (error) {
        console.log(error)
        return done(error)
    }
}

const signUpStrategy = new LocalStrategy(strategyConfig, signUp);
const loginStrategy = new LocalStrategy(strategyConfig, login);

passport.use('register', signUpStrategy);
passport.use('login', loginStrategy);