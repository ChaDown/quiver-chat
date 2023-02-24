import express from 'express';
import * as userController from '../controllers/userController';
import passport from 'passport';
import {
  getModels,
  getModel,
  addNewModel,
  searchModels,
  getComments,
  getRecentComments,
} from '../controllers/modelController';

const router = express.Router();

// router.get('/model/:modelId', getModel);

router.get('/model/all-models', getModels);

router.get('/model/get-comments', getComments);

router.get('/model/get-recent-comments', getRecentComments);

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  userController.signUpPost
);

router.post('/login', userController.logInPost);

router.post(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  userController.logoutUser
);

router.post(
  '/comment',
  passport.authenticate('jwt', { session: false }),
  userController.commentPost
);

router.get(
  '/user/me',
  passport.authenticate('jwt', { session: false }),
  userController.getUser
);

router.get('/surfboard-model/:urlString', getModel);

router.post(
  '/surfboard-model/add-model',
  passport.authenticate('jwt', { session: false }),
  addNewModel
);

router.get('/search', searchModels);

export default router;
