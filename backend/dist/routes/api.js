"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController = __importStar(require("../controllers/userController"));
const passport_1 = __importDefault(require("passport"));
const modelController_1 = require("../controllers/modelController");
const router = express_1.default.Router();
router.get('/model/:modelId', (req, res, next) => {
    res.json({ message: 'All good' });
});
router.post('/signup', passport_1.default.authenticate('signup', { session: false }), userController.signUpPost);
router.post('/login', userController.logInPost);
router.post('/comment', passport_1.default.authenticate('jwt', { session: false }), userController.commentPost);
router.get('/surfboard-model/:urlString', modelController_1.getModel);
router.post('/surfboard-model/add-model', passport_1.default.authenticate('jwt', { session: false }), modelController_1.addNewModel);
router.get('/search', modelController_1.searchModels);
exports.default = router;
//# sourceMappingURL=api.js.map