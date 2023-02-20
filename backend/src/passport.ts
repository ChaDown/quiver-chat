import passport from 'passport';
import passportLocal from 'passport-local';
import UserModel, { UserDocument } from './models/userModel';
import jwt from 'passport-jwt';

const JWTstrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
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
        const user: UserDocument = await UserModel.findOne({ username });

        // if (!user) {
        //   return done(null, false, { message: 'User not found' });
        // }

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

passport.use(
  'jwt',
  new JWTstrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: 'TOP_SECRET',
    },
    (jwtPayload, done) => {
      //   const { expiration } = jwtPayload;

      //   if (Date.now() > expiration) {
      //     done('Unauthorized', false);
      //   }

      done(null, jwtPayload);
    }
  )
);
