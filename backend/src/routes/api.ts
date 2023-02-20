import express from 'express';
import * as userController from '../controllers/userController';
import passport from 'passport';
import {
  getModel,
  addNewModel,
  searchModels,
} from '../controllers/modelController';

const router = express.Router();

router.get('/model/:modelId', (req, res, next) => {
  res.json({ message: 'All good' });
});

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  userController.signUpPost
);

router.post('/login', userController.logInPost);

router.post(
  '/comment',
  passport.authenticate('jwt', { session: false }),
  userController.commentPost
);

router.get('/surfboard-model/:urlString', getModel);

router.post(
  '/surfboard-model/add-model',
  passport.authenticate('jwt', { session: false }),
  addNewModel
);

router.get('/search', searchModels);

export default router;
