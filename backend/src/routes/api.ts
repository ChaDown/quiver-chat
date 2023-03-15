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
  postComment,
} from '../controllers/modelController';

const router = express.Router();

// router.get('/model/:modelId', getModel);

router.get('/model/all-models', getModels);

router.get('/model/get-comments/:postId', getComments);

router.get('/get-recent-comments', getRecentComments);

router.get(
  '/user/get-user-comments',
  passport.authenticate('jwt', { session: false }),
  userController.getUserComments
);

router.post(
  '/comment',
  passport.authenticate('jwt', { session: false }),
  postComment
);

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

router.get(
  '/user/me',
  passport.authenticate('jwt', { session: false }),
  userController.getUser
);

router.put(
  '/user/change-username',
  passport.authenticate('jwt', { session: false }),
  userController.changeUsername
);

router.put(
  '/user/change-password',
  passport.authenticate('jwt', { session: false }),
  userController.changePassword
);

router.get('/surfboard-model/:urlString', getModel);

router.post(
  '/surfboard-model/add-model',
  passport.authenticate('jwt', { session: false }),
  addNewModel
);

router.get('/search', searchModels);

export default router;
