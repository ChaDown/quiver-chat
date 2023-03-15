import passport from 'passport';
import passportLocal from 'passport-local';
import UserModel, { UserDocument } from './models/userModel';
import jwt from 'passport-jwt';
import dotenv from 'dotenv';
dotenv.config();

const JWTstrategy = jwt.Strategy;
const LocalStrategy = passportLocal.Strategy;

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username: string, password: string, done) => {
      try {
        const user: UserDocument = await UserModel.create({
          email: req.body.email,
          username,
          password,
          admin: req.body.admin || false,
        });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Middleware to handle login

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username: string, password: string, done) => {
      try {
        const user: UserDocument = await UserModel.findOne({
          $or: [{ email: username }, { username: username }],
        });

        if (!user) {
          return done(null, false, {
            message: 'Incorrect password or username',
          });
        }
        const validate: boolean = await user.isValidPassword(password);

        if (!validate || !user) {
          return done(null, false, {
            message: 'Incorrect password or username',
          });
        }

        return done(null, user, { message: 'Logged in successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

const cookieExtractor = (req) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies['accessToken'];
  }
  return jwt;
};

passport.use(
  'jwt',
  new JWTstrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_KEY,
    },
    (jwtPayload, done) => {
      done(null, jwtPayload);
    }
  )
);
