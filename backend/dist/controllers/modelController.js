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
exports.searchModels = exports.addNewModel = exports.getModel = void 0;
const modelModel_1 = __importDefault(require("../models/modelModel"));
const express_validator_1 = require("express-validator");
function getModel(req, res, next) {
    const urlString = req.params.urlString;
    modelModel_1.default.find({ urlString: urlString }, (err, result) => {
        if (err)
            return next(err);
        res.json(result);
    });
}
exports.getModel = getModel;
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
        if (!req.user.admin) {
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
                        text: {
                            query: `${req.query.term}`,
                            path: 'models.title',
                            fuzzy: {
                                maxEdits: 2,
                            },
                        },
                    },
                },
            ]);
            res.send(result);
        }
        catch (err) {
            res.status(500).send({ message: err.message });
        }
    });
}
exports.searchModels = searchModels;
//# sourceMappingURL=modelController.js.map