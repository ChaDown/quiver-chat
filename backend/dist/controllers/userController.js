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
exports.logoutUser = exports.changePassword = exports.changeUsername = exports.getUserComments = exports.getUser = exports.logInPost = exports.signUpPost = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const express_validator_1 = require("express-validator");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const commentModel_1 = __importDefault(require("../models/commentModel"));
dotenv_1.default.config();
exports.signUpPost = [
    (0, express_validator_1.body)('username')
        .trim()
        .isLength({ min: 6, max: 30 })
        .withMessage('Must be between 6 - 30 characters')
        .escape(),
    (0, express_validator_1.body)('password')
        .trim()
        .isLength({ min: 6, max: 30 })
        .withMessage('Must be between 6 - 30 characters')
        .escape(),
    // After validation we can check for errors then proceed
    (req, res, next) => {
        // Extract errors using validationResult
        const errors = (0, express_validator_1.validationResult)(req);
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
function logInPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        passport_1.default.authenticate('login', { session: 'false' }, (err, user, info) => __awaiter(this, void 0, void 0, function* () {
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
                const token = jsonwebtoken_1.default.sign({ body }, process.env.JWT_KEY);
                res.cookie('accessToken', token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 1000 * 86400),
                });
                return res.json({ message: 'success', user: body });
                //   });
            }
            catch (error) {
                return next(error);
            }
        }))(req, res, next);
    });
}
exports.logInPost = logInPost;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.json({
            message: 'User is logged in',
            user: req.user.body,
        });
    });
}
exports.getUser = getUser;
function getUserComments(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user.body._id;
        try {
            const comments = yield commentModel_1.default
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
        }
        catch (e) {
            return next(e);
        }
    });
}
exports.getUserComments = getUserComments;
exports.changeUsername = [
    (0, express_validator_1.body)('username')
        .trim()
        .isLength({ min: 6, max: 30 })
        .withMessage('Must be between 6 - 30 characters')
        .escape(),
    (req, res) => {
        userModel_1.default
            .updateOne({
            _id: req.user.body._id,
        }, { username: req.body.username })
            .then((response) => {
            if (response)
                res.json({ message: 'Username Changed' });
        });
    },
];
function changePassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findOne({
                _id: req.user.body._id,
            });
            const valid = yield user.isValidPassword(req.body.password);
            if (valid) {
                const user = yield userModel_1.default.findOne({
                    _id: req.user.body._id,
                });
                user.password = req.body.newPassword;
                yield user.save();
                res.json({ message: 'Password Changed!' });
            }
            else
                res.json({ message: 'Invalid Password' });
        }
        catch (err) {
            return next(err);
        }
    });
}
exports.changePassword = changePassword;
function logoutUser(req, res) {
    if (req.cookies['accessToken']) {
        res.status(200).clearCookie('accessToken').json({
            message: 'You have logged out',
            cookie: req.cookies['accessToken'],
        });
    }
    else {
        res.status(401).json({
            error: 'Invalid jwt',
        });
    }
}
exports.logoutUser = logoutUser;
//# sourceMappingURL=userController.js.map