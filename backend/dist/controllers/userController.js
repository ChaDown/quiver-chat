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
exports.logoutUser = exports.commentPost = exports.logInPost = exports.signUpPost = void 0;
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signUpPost(req, res, next) {
    res.json({
        message: 'Signup successful',
        user: req.user,
    });
}
exports.signUpPost = signUpPost;
function logInPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        passport_1.default.authenticate('login', (err, user, info) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (err || !user) {
                    const error = new Error('An Error occurred');
                    return next(error);
                }
                const body = { _id: user._id, email: user.email, admin: user.admin };
                const token = jsonwebtoken_1.default.sign({ user: body }, 'TOP_SECRET');
                res.setHeader('Set-Cookie', [
                    `accessToken=${token}; HttpOnly; Max-Age=${60000 * 10}`,
                ]);
                return res.json({ token });
                //   });
            }
            catch (error) {
                return next(error);
            }
        }))(req, res, next);
    });
}
exports.logInPost = logInPost;
function commentPost(req, res, next) {
    return res.json({
        message: 'Your a commentor',
        user: req.user,
        token: req.query.secret_token,
    });
}
exports.commentPost = commentPost;
function logoutUser(req, res) {
    if (req.cookies['accessToken']) {
        res.clearCookie('accessToken').status(200).json({
            message: 'You have logged out',
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