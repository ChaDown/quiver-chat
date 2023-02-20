"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const userModel_1 = __importDefault(require("./models/userModel"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const JWTstrategy = passport_jwt_1.default.Strategy;
const ExtractJWT = passport_jwt_1.default.ExtractJwt;
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.use('signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
}, (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.create({
            email: req.body.email,
            username,
            password,
            admin: req.body.admin || false,
        });
        return done(null, user);
    }
    catch (error) {
        done(error);
    }
})));
// Middleware to handle login
passport_1.default.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne({ username });
        // if (!user) {
        //   return done(null, false, { message: 'User not found' });
        // }
        const validate = yield user.isValidPassword(password);
        if (!validate || !user) {
            return done(null, false, {
                message: 'Incorrect password or username',
            });
        }
        return done(null, user, { message: 'Logged in successfully' });
    }
    catch (error) {
        return done(error);
    }
})));
// passport.use(
//   new JWTstrategy(
//     {
//       secretOrKey: 'TOP_SECRET',
//       jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
//     },
//     async (token, done) => {
//       try {
//         return done(null, token.user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );
const cookieExtractor = (req) => {
    let jwt = null;
    if (req && req.cookies) {
        jwt = req.cookies['accessToken'];
    }
    return jwt;
};
passport_1.default.use('jwt', new JWTstrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: 'TOP_SECRET',
}, (jwtPayload, done) => {
    //   const { expiration } = jwtPayload;
    //   if (Date.now() > expiration) {
    //     done('Unauthorized', false);
    //   }
    done(null, jwtPayload);
}));
//# sourceMappingURL=passport.js.map