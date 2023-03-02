import userModel, { UserDocument } from '../models/userModel';
import express from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
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
      return;
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

export async function getUser(req, res, next) {
  const user: UserDocument = await userModel.findOne({
    _id: req.user.body._id,
  });

  return res.json({
    message: 'User is logged in',
    user: user,
  });
}

export const changeUsername = [
  body('username')
    .trim()
    .isLength({ min: 6, max: 30 })
    .withMessage('Must be between 6 - 30 characters')
    .escape(),
  (req, res, next) => {
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
  const user: UserDocument = await userModel.findOne({
    _id: req.user.body._id,
  });

  console.log(user);
  console.log(req.body.password);
  const valid: boolean = await user.isValidPassword(req.body.password);
  console.log(valid);

  if (valid) {
    const user: UserDocument = await userModel.findOne({
      _id: req.user.body._id,
    });
    user.password = req.body.newPassword;
    await user.save();
    res.json({ message: 'Password Changed!' });
  } else res.json({ message: 'Invalid Password' });
}

export function commentPost(req, res, next) {
  return res.json({
    message: 'Your a commentor',
    user: req.user,
    // token: req.query.secret_token,
  });
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
