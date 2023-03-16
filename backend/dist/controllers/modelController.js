"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchModels = exports.addNewModel = exports.postComment = exports.getRecentComments = exports.getComments = exports.getModel = exports.getModels = void 0;
const modelModel_1 = __importDefault(require("../models/modelModel"));
const commentModel_1 = __importDefault(require("../models/commentModel"));
const express_validator_1 = require("express-validator");
function getModels(req, res, next) {
    modelModel_1.default.find({ visible: true }, (err, result) => {
        if (err)
            return next(err);
        res.json(result);
    });
}
exports.getModels = getModels;
function getModel(req, res, next) {
    const urlString = req.params.urlString;
    modelModel_1.default.find({ urlString: urlString }, (err, result) => {
        if (err)
            return next(err);
        res.json(result);
    });
}
exports.getModel = getModel;
// Helper function
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
function getComments(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        try {
            const resultsArray = yield commentModel_1.default.find({ postId: id })
                .populate('postId')
                .populate('user');
            const responseArray = [];
            resultsArray.map((comment) => {
                const filteredComment = filterComment(comment);
                responseArray.push(filteredComment);
            });
            res.json(responseArray);
        }
        catch (err) {
            if (err)
                return next(err);
        }
    });
}
exports.getComments = getComments;
function getRecentComments(req, res, next) {
    commentModel_1.default.find({})
        .populate('postId')
        .populate('user', 'username')
        .sort({ _id: -1 })
        .limit(10)
        .exec((err, results) => {
        if (err)
            return next(err);
        res.json(results);
    });
}
exports.getRecentComments = getRecentComments;
exports.postComment = [
    // body('user').trim().escape(),
    (0, express_validator_1.body)('postId').trim().escape(),
    (0, express_validator_1.body)('content').trim().isLength({ min: 2 }),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        // Check for validation errors, send them back if there are.
        if (!errors.isEmpty()) {
            res.json({
                message: 'Errors in validation',
                errors: errors.array(),
            });
            return;
        }
        // All clear, add new comment in DB with the details
        const newComment = new commentModel_1.default({
            user: req.user.body._id,
            postId: req.body.postId,
            content: req.body.content,
        });
        newComment.save((err) => {
            if (err)
                return next(err);
            //success
            res.json(newComment);
        });
    },
];
exports.addNewModel = [
    (0, express_validator_1.body)('title').trim().isLength({ min: 3 }).escape(),
    (0, express_validator_1.body)('shaper').trim().isLength({ min: 3 }).escape(),
    (0, express_validator_1.body)('visible')
        .isBoolean()
        .trim()
        .escape()
        .withMessage('Visible must be a boolean'),
    (0, express_validator_1.body)('imgLink').trim().escape(),
    (0, express_validator_1.body)('description')
        .trim()
        .escape()
        .isLength({ min: 10 })
        .withMessage('Must be at least ten characters'),
    (0, express_validator_1.body)('category')
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
    (0, express_validator_1.body)('urlString').trim().escape(),
    // After validation and sanitation we can process the req
    (req, res, next) => {
        if (!req.user.body.admin) {
            res.status(403).json({
                message: 'Access forbidden - Only admins can add / edit posts',
                user: req.user,
            });
            return;
        }
        const errors = (0, express_validator_1.validationResult)(req);
        // Check for validation errors, send them back if there are.
        if (!errors.isEmpty()) {
            res.json({
                message: 'Errors in validation',
                errors: errors.array(),
            });
            return;
        }
        // All clear, add new document in DB with the details
        const newModel = new modelModel_1.default({
            title: req.body.title,
            shaper: req.body.shaper,
            visible: req.body.visible,
            imgLink: req.body.imgLink,
            description: req.body.description,
            category: req.body.category,
            urlString: req.body.urlString,
        });
        newModel.save((err) => {
            if (err)
                return next(err);
            //success
            res.json(newModel);
        });
    },
];
function searchModels(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield modelModel_1.default.aggregate([
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
        }
        catch (err) {
            res.status(500).send({ message: err.message });
            next();
        }
    });
}
exports.searchModels = searchModels;
//# sourceMappingURL=modelController.js.map