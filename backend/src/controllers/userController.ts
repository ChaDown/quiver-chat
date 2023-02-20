import userModel from '../models/userModel';
import express from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import jwt from 'jsonwebtoken';

export function signUpPost(req, res, next) {
  res.json({
    message: 'Signup successful',
    user: req.user,
  });
}

export async function logInPost(req, res, next) {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occurred');

        return next(error);
      }

      const body = { _id: user._id, email: user.email, admin: user.admin };
      const token = jwt.sign({ user: body }, 'TOP_SECRET');

      res.setHeader('Set-Cookie', [
        `accessToken=${token}; HttpOnly; Max-Age=${60000 * 10}`,
      ]);

      return res.json({ token });
      //   });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
}

export function commentPost(req, res, next) {
  return res.json({
    message: 'Your a commentor',
    user: req.user,
    token: req.query.secret_token,
  });
}

export function logoutUser(req, res) {
  if (req.cookies['accessToken']) {
    res.clearCookie('accessToken').status(200).json({
      message: 'You have logged out',
    });
  } else {
    res.status(401).json({
      error: 'Invalid jwt',
    });
  }
}
