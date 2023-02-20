"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const modelSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    shaper: {
        type: String,
        required: true,
    },
    visible: {
        type: Boolean,
        default: true,
        required: true,
    },
    imgLink: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        minLength: 10,
        required: true,
    },
    category: {
        type: String,
        enum: [
            'Shortboard',
            'Longboard',
            'Fish',
            'Foamboard',
            'Funboard',
            'Twin-Fin',
            'Step-Up',
            'Mini-Mal',
        ],
        required: true,
    },
    urlString: {
        type: String,
        required: true,
    },
});
modelSchema.virtual('url').get(function () {
    return `/surfboard-model/${this.urlString}`;
});
exports.default = mongoose_1.default.model('Model', modelSchema);
//# sourceMappingURL=modelModel.js.map