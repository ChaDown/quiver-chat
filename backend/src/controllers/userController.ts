import userModel from '../models/userModel';
import express from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

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

      const body = {
        _id: user._id,
        email: user.email,
        username: user.username,
        admin: user.admin,
      };
      const token = jwt.sign({ body }, process.env.JWT_KEY);

      // res.setHeader('Set-Cookie', [
      //   `accessToken=${token}; HttpOnly; Max-Age=${60000 * 10}`,
      // ]);

      res.cookie('accessToken', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
      });

      return res.json({ token });
      //   });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
}

export function getUser(req, res, next) {
  return res.json({
    message: 'User is logged in',
    user: req.user,
  });
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
