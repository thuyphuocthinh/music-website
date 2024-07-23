"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const topicsSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    avatar: String,
    status: String,
    slug: {
        type: String,
        slug: "title",
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, { timestamps: true });
const Topics = mongoose_1.default.model("Topics", topicsSchema, "topics");
exports.default = Topics;
