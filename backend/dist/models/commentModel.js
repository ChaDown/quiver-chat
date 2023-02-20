"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Model',
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    visible: {
        type: Boolean,
        default: true,
        required: true,
    },
    content: {
        type: String,
        minLength: 2,
        required: true,
    },
});
exports.default = mongoose_1.default.model('Comment', commentSchema);
//# sourceMappingURL=commentModel.js.map