import ModelModel from '../models/modelModel';
import CommentModel, { Comment } from '../models/commentModel';
import { body, validationResult } from 'express-validator';
import express from 'express';

export function getModels(req: express.Request, res: express.Response, next) {
  ModelModel.find({ visible: true }, (err, result) => {
    if (err) return next(err);
    res.json(result);
  });
}

export function getModel(req: express.Request, res: express.Response, next) {
  const urlString: string = req.params.urlString;
  ModelModel.find({ urlString: urlString }, (err, result) => {
    if (err) return next(err);
    res.json(result);
  });
}

// export function getAllModels(
//   req: express.Request,
//   res: express.Response,
//   next
// ) {
//   ModelModel.find({}, (err, result) => {
//     if (err) return next(err);
//     res.json(result);
//   });
// }

// export function getRecentModels(
//   req: express.Request,
//   res: express.Response,
//   next
// ) {
//   ModelModel.find({}, (err, result) => {
//     if (err) return next(err);
//     res.json(result);
//   });
// }

function filterComment(comment) {
  const filteredComment = {
    date: comment.date,
    comment: comment.content,
    modelName: comment.postId.title,
    shaper: comment.postId.shaper,
    username: comment.user.username,
    urlString: comment.postId.urlString,
  };
  return filteredComment;
}

export async function getComments(
  req: express.Request,
  res: express.Response,
  next
) {
  const id = req.params.postId;

  const resultsArray: Comment[] = await CommentModel.find({ postId: id })
    .populate('postId')
    .populate('user');

  const responseArray = [];

  resultsArray.map((comment) => {
    const filteredComment = filterComment(comment);
    // {
    //   date: comment.date,
    //   comment: comment.content,
    //   modelName: comment.postId.title,
    //   shaper: comment.postId.shaper,
    //   username: comment.user.username,
    //   urlString: comment.postId.urlString,
    // };
    responseArray.push(filteredComment);
  });

  res.json(responseArray);
}

export function getRecentComments(
  req: express.Request,
  res: express.Response,
  next
) {
  CommentModel.find({})
    .populate('postId')
    .populate('user', 'username')
    .sort({ _id: -1 })
    .limit(10)
    .exec((err, results) => {
      if (err) return next(err);
      res.json(results);
    });
}

export const postComment = [
  // body('user').trim().escape(),
  body('postId').trim().escape(),
  body('content').trim().isLength({ min: 2 }),
  (req, res, next) => {
    const errors = validationResult(req);
    // Check for validation errors, send them back if there are.
    if (!errors.isEmpty()) {
      res.json({
        message: 'Errors in validation',
        errors: errors.array(),
      });
      return;
    }

    // All clear, add new comment in DB with the details
    const newComment = new CommentModel({
      user: req.user.body._id,
      postId: req.body.postId,
      content: req.body.content,
    });

    newComment.save((err) => {
      if (err) return next(err);
      //success
      res.json(newComment);
    });
  },
];

export const addNewModel = [
  body('title').trim().isLength({ min: 3 }).escape(),
  body('shaper').trim().isLength({ min: 3 }).escape(),
  body('visible')
    .isBoolean()
    .trim()
    .escape()
    .withMessage('Visible must be a boolean'),
  body('imgLink').trim().escape(),
  body('description')
    .trim()
    .escape()
    .isLength({ min: 10 })
    .withMessage('Must be at least ten characters'),
  body('category')
    .trim()
    .escape()
    .isIn([
      'Shortboard',
      'Longboard',
      'Fish',
      'Foamboard',
      'Funboard',
      'Twin-Fin',
      'Step-Up',
      'Mini-Mal',
    ])
    .withMessage('Please choose one of the style options provided'),
  body('urlString').trim().escape(),
  // After validation and sanitation we can process the req
  (req, res, next) => {
    if (!req.user.body.admin) {
      res.status(403).json({
        message: 'Access forbidden - Only admins can add / edit posts',
        user: req.user,
      });
      return;
    }

    const errors = validationResult(req);
    // Check for validation errors, send them back if there are.
    if (!errors.isEmpty()) {
      res.json({
        message: 'Errors in validation',
        errors: errors.array(),
      });
      return;
    }

    // All clear, add new document in DB with the details
    const newModel = new ModelModel({
      title: req.body.title,
      shaper: req.body.shaper,
      visible: req.body.visible,
      imgLink: req.body.imgLink,
      description: req.body.description,
      category: req.body.category,
      urlString: req.body.urlString,
    });

    newModel.save((err) => {
      if (err) return next(err);
      //success
      res.json(newModel);
    });
  },
];

export async function searchModels(req, res, next) {
  try {
    const result = await ModelModel.aggregate([
      {
        $search: {
          index: 'searchModels',
          autocomplete: {
            query: `${req.query.term}`,
            path: 'title',
            fuzzy: {
              maxEdits: 1,
            },
          },
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 1,
          urlString: 1,
          title: 1,
          shaper: 1,
        },
      },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
