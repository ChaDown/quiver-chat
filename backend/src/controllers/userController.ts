import userModel, { UserDocument } from '../models/userModel';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import commentModel, { Comment } from '../models/commentModel';
dotenv.config();

export const signUpPost = [
  body('username')
    .trim()
    .isLength({ min: 6, max: 30 })
    .withMessage('Must be between 6 - 30 characters')
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 6, max: 30 })
    .withMessage('Must be between 6 - 30 characters')
    .escape(),
  // After validation we can check for errors then proceed

  (req, res, next) => {
    // Extract errors using validationResult
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.json({
        errors: errors.array(),
      });
      return;
    }

    if (req.err) {
      res.status(403).json(req.info);
      return next(req.err);
    }
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  },
];

export async function logInPost(req, res, next) {
  passport.authenticate(
    'login',
    { session: 'false' },
    async (err, user, info) => {
      try {
        if (err || !user) {
          res.status(403).json(info);
          return;
        }

        const body = {
          _id: user._id,
          username: user.username,
          admin: user.admin,
          email: user.email,
        };
        const token = jwt.sign({ body }, process.env.JWT_KEY);

        res.cookie('accessToken', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400),
        });

        return res.json({ message: 'success', user: body });
        //   });
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
}

export async function getUser(req, res) {
  return res.json({
    message: 'User is logged in',
    user: req.user.body,
  });
}

export async function getUserComments(req, res, next) {
  const userId = req.user.body._id;

  try {
    const comments: Comment[] = await commentModel
      .find({ user: userId })
      .populate('postId');

    const responseArray = [];

    comments.map((comment) => {
      const filteredComment = {
        date: comment.date,
        comment: comment.content,
        modelName: comment.postId.title,
        shaper: comment.postId.shaper,
        username: comment.user.username,
        urlString: comment.postId.urlString,
      };
      responseArray.push(filteredComment);
    });

    res.json(responseArray);
  } catch (e) {
    return next(e);
  }
}

export const changeUsername = [
  body('username')
    .trim()
    .isLength({ min: 6, max: 30 })
    .withMessage('Must be between 6 - 30 characters')
    .escape(),
  (req, res) => {
    userModel
      .updateOne(
        {
          _id: req.user.body._id,
        },
        { username: req.body.username }
      )
      .then((response) => {
        if (response) res.json({ message: 'Username Changed' });
      });
  },
];

export async function changePassword(req, res, next) {
  try {
    const user: UserDocument = await userModel.findOne({
      _id: req.user.body._id,
    });

    const valid: boolean = await user.isValidPassword(req.body.password);

    if (valid) {
      const user: UserDocument = await userModel.findOne({
        _id: req.user.body._id,
      });
      user.password = req.body.newPassword;
      await user.save();
      res.json({ message: 'Password Changed!' });
    } else res.json({ message: 'Invalid Password' });
  } catch (err) {
    return next(err);
  }
}

export function logoutUser(req, res) {
  if (req.cookies['accessToken']) {
    res.status(200).clearCookie('accessToken').json({
      message: 'You have logged out',
      cookie: req.cookies['accessToken'],
    });
  } else {
    res.status(401).json({
      error: 'Invalid jwt',
    });
  }
}
